<script setup>
import { computed, onMounted, ref } from "vue";

defineProps({
  items: Array,
});

const screenWidth = ref();

const headers = computed(() => {
  if (screenWidth.value >= 600) {
    return [
      { title: "Price", value: "price" },
      { title: "Quantity", value: "quantity" },
      { title: "Total", value: "total" },
    ];
  } else {
    return [
      { title: "Price", value: "price" },
      { title: "Quantity", value: "quantity" },
    ];
  }
});

onMounted(() => {
  screenWidth.value = window.innerWidth;
  window.addEventListener("resize", onResize);
});

function onResize() {
  screenWidth.value = window.innerWidth;
}
</script>

<template>
  <v-data-table
    class="table"
    items-per-page="100"
    :items-per-page-options="[
      { value: 100, title: '100' },
      { value: 500, title: '500' },
      { value: 1000, title: '1000' },
    ]"
    :headers="headers"
    :items="items"
  ></v-data-table>
</template>
<style scoped>
.table {
  max-height: calc(100vh - 100px);
}
</style>
