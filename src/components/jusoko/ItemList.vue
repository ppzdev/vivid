<script setup lang="ts">
import type {PrizeItemList} from "../../config/simulator_types.ts"

defineProps<{
  items: PrizeItemList
}>()
</script>

<template>
  <ul class="flex flex-wrap gap-4">
    <li
        v-for="(result, key) in items" :key="key"
        class="relative"
    >
      <img class="w-20" :src="result.image" alt="key">
      <span class="leading-none font-bold text-white text-sm absolute bottom-1.5 right-1.5">{{ result.quantity }}</span>
    </li>
  </ul>
</template>
