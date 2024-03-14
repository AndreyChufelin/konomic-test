import { defineStore } from "pinia";
import { useSettingsStore } from "./settings";

let ws;

function update(item, arr) {
  const index = arr.findIndex((i) => i[0] === item[0]);

  if (index === -1) {
    // arr.push(item);
    return;
  }

  const b = arr[index];

  if (item[1] == 0) {
    arr.splice(index, 1);
  } else {
    b[1] = item[1];
  }
}

export const useOrderBookStore = defineStore("orderBook", {
  state: () => ({ bids: [], asks: [] }),
  getters: {
    getBids() {
      const result = [];
      this.bids.forEach((item) => {
        const price = Number(item[0]);
        const quantity = Number(item[1]);
        result.push({
          price,
          quantity,
          total: price * quantity,
        });
      });

      return result;
    },
    getAsks() {
      const result = [];
      this.asks.forEach((item) => {
        const price = Number(item[0]);
        const quantity = Number(item[1]);
        result.push({
          price,
          quantity,
          total: price * quantity,
        });
      });

      return result;
    },
  },
  actions: {
    async getOrderBook() {
      ws?.close();
      const settings = useSettingsStore();

      const res = await fetch(
        `https://api.binance.com/api/v3/depth?symbol=${settings.currencyPair}&limit=1000`
      );
      const data = await res.json();
      const lastUpdateId = data.lastUpdateId;
      this.bids = data.bids;
      this.asks = data.asks;

      ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${settings.currencyPair.toLowerCase()}@depth`
      );
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.u <= lastUpdateId) {
          return;
        }
        data.b.forEach((item) => {
          update(item, this.bids);
        });
        data.a.forEach((item) => {
          update(item, this.asks);
        });
      };
    },
  },
});
