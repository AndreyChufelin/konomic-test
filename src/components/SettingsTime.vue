<script setup>
import { computed } from "vue";

const props = defineProps({
  date: Number,
});

const time = computed(() => {
  const d = new Date(props.date);

  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
});
</script>

<template>
  <div>{{ time }}</div>
</template>
