<script setup lang="ts">
import type {RewardSetting} from "../../config/simulator_types.ts";

const props = defineProps<{
  useTicket: number,
  rewardSettings: RewardSetting[],
  gotRewards: number[]
}>()

function isGotReward(rewardIndex: number) {
  return props.gotRewards.find(i => i === rewardIndex) !== undefined
}
</script>

<template>
  <ul class="flex flex-wrap gap-4">
    <li
        v-for="(setting, index) in rewardSettings" :key="index"
    >
      <span
          class="relative block"
          :class="{
            'opacity-50': useTicket < setting.count,
          }"
      >
        <img class="w-20" src="../../assets/img/jusoko/prize_coin.png" alt="key">
        <span class="leading-none font-bold text-white text-sm absolute bottom-1.5 right-1.5">{{ setting.reward }}</span>
        <img
            v-if="isGotReward(index)"
            class="absolute bottom-6 right-6"
            src="../../assets/img/check.png" alt="done"
        >
      </span>
      <span class="text-center font-bold text-sm block">{{ setting.count }}回</span>
    </li>
  </ul>
</template>
