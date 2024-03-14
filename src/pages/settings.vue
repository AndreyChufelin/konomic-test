<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useSettingsStore } from "@/stores/settings";
import { computed } from "vue";

const store = useSettingsStore();

const currencyPair = computed({
  get() {
    return store.currencyPair;
  },
  set(value) {
    store.setCurrencyPair(value);
  },
});
</script>
<template>
  <v-container>
    <v-responsive class="mx-auto" max-width="900">
      <v-select
        v-model="currencyPair"
        label="Select"
        :items="['BTCUSDT', 'BNBBTC', 'ETHBTC']"
        :items-per-page="-1"
      ></v-select>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Было</th>
            <th class="text-left">Стало</th>
            <th class="text-left">Время</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.log" :key="item.time">
            <td>{{ item.old }}</td>
            <td>{{ item.new }}</td>
            <td><SettingsTime :date="item.time"></SettingsTime></td>
          </tr>
        </tbody>
      </v-table>
    </v-responsive>
  </v-container>
</template>