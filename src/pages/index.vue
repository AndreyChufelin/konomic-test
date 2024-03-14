<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useOrderBookStore } from "@/stores/orderBook";

const store = useOrderBookStore();

if (!store.getBids.length) {
  store.getOrderBook();
}
</script>

<template>
  <v-container>
    <v-responsive class="mx-auto fill-height" max-width="1200">
      <v-row>
        <v-col>
          <OrderBookTable :items="store.getBids" />
        </v-col>
        <v-col>
          <OrderBookTable :items="store.getAsks" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
<style scoped>
.table {
  max-height: calc(100vh - 100px);
}
</style>
