import { defineStore } from "pinia";
import { useOrderBookStore } from "@/stores/orderBook";

export const useSettingsStore = defineStore("settings", {
  state: () => ({ currencyPair: "BTCUSDT", log: [] }),
  actions: {
    setCurrencyPair(payload) {
      const orderBook = useOrderBookStore();

      this.log.unshift({
        old: this.currencyPair,
        new: payload,
        time: Date.now(),
      });
      this.currencyPair = payload;
      orderBook.getOrderBook();
    },
  },
});
