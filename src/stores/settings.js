import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({ currencyPair: "BTCUSDT", log: [] }),
  actions: {
    setCurrencyPair(payload) {
      this.log.unshift({old: this.currencyPair, new: payload, time: Date.now()})
      this.currencyPair = payload;
    },
  },
});
