<script setup>
import {ref, computed, watch, onMounted} from 'vue'

const props = defineProps({
  title: String,
  needs: Number,
  ranks: Array,
  name: String,
})

const query = new URLSearchParams(window.location.search)

const selectedRankIndex = ref(Number(query.get(props.name + '_selected') ?? props.ranks.length - 1))
const quantity = ref(Number(query.get(props.name + '_quantity') ?? 1))
const counts = ref(
    (query.get(props.name + '_counts') ?? props.ranks.map(() => 0).join(','))
        .split(',')
        .filter(x => x !== '')
        .map(Number)
)

onMounted(() => {
  padCountsToRanks()
})

function padCountsToRanks() {
  while (counts.value.length < props.ranks.length) {
    counts.value.push(0)
  }
}

function updateQuery() {
  const query = new URLSearchParams(window.location.search)

  query.set(props.name + '_quantity', quantity.value.toString())
  query.set(props.name + '_selected', selectedRankIndex.value.toString())
  query.set(props.name + '_counts', counts.value.join(','))

  const newUrl = `${window.location.pathname}?${query.toString()}`
  window.history.replaceState(null, '', newUrl)
}

watch([quantity, selectedRankIndex, counts], updateQuery, {deep: true})

const increment = (index) => {
  if (quantity.value === 1 && counts.value[index] + 1 === props.needs && index < props.ranks.length - 1) {
    counts.value[index] = 0
    if (index < selectedRankIndex.value) {
      increment(index + 1)
    }
  } else {
    counts.value[index]++
  }
}

const decrement = (index) => {
  if (counts.value[index] > 0) counts.value[index]--
}

const required = computed(() => {
  let all = props.needs ** (selectedRankIndex.value) * quantity.value
  let useCounts = counts.value.slice(0, selectedRankIndex.value + 1)
  let required = useCounts.reduce((sum, val, index) => sum - props.needs ** index * val, all)
  return required > 0 ? required : 0
})

let visibleRanks = computed(() => {
  return props.ranks.slice(0, selectedRankIndex + 1)
})

let getGradeLabel = (index, total) => {
  const ratio = index / total;

  if (ratio < 0.2) return 'grade-5';
  if (ratio < 0.4) return 'grade-4';
  if (ratio < 0.6) return 'grade-3';
  if (ratio < 0.8) return 'grade-2';
  return 'grade-1';
}

</script>

<template>
  <h2 class="font-bold text-xl">{{ title }}(素材数: {{ needs }}個)</h2>

  <h3><label for="rank" class="font-bold text-l block mb-2">1. 必要数を計算したいものを選択</label></h3>
  <select
      id="rank"
      v-model="selectedRankIndex"
      class="block w-full max-w-xs p-2 rounded mb-4
         bg-white text-black border border-gray-300
         dark:bg-gray-800 dark:text-white dark:border-gray-600"
  >
    <option v-for="(rank, index) in ranks.slice(1)" :key="index" :value="index + 1">
      {{ rank }}
    </option>
  </select>

  <input
      type="number"
      v-model="quantity"
      class="w-20 max-w-xs p-2 rounded mb-4
         bg-white text-black border border-gray-300
         dark:bg-gray-800 dark:text-white dark:border-gray-600"
  /> 個

  <h3 class="font-bold text-l">2. すでに持っているものを入力</h3>
  <ul class="table mb-4">
    <li
        v-for="(rank, index) in ranks.slice(0, selectedRankIndex + 1)"
        :key="index">
      <div
          class="mb-4 px-2 py-1 rounded-md grade-frame grade-bg"
          :class="getGradeLabel(index, ranks.length)"
      >
        <h4 class="pl-1 mb-1 grade-mark font-bold" :class="getGradeLabel(index, ranks.length)">{{ rank }}</h4>
        <div class="flex items-center justify-center gap-4 pb-1">
          <button
              @click="decrement(index)"
              class="px-4 py-2 bg-gray-600/30 text-white font-bold rounded hover:bg-gray-600/20"
          >
            −
          </button>

          <div
              class="w-12 text-center text-xl font-mono border border-gray-300 rounded py-1"
              :class="getGradeLabel(index, ranks.length)"
          >
            {{ counts[index] }}
          </div>

          <button
              @click="increment(index)"
              class="px-4 py-2 bg-gray-900/50 text-white font-bold rounded hover:bg-gray-900/60"
          >
            ＋
          </button>
        </div>
      </div>
    </li>
  </ul>

  <section class="mb-4">
    <h3 class="font-bold text-xl">必要数</h3>

    <ul class="table mb-4">
      <li v-for="(rank, index) in ranks.slice(0, selectedRankIndex + 1)" :key="index">
        <span
            class="font-bold pl-2 text-xl grade-mark"
            :class="getGradeLabel(index, ranks.length)"
        >
          {{ ranks[index] }}: {{ parseFloat((required / ((needs ** index))).toFixed(4)) }}
        </span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@use "sass:map";
@use "sass:color";

$theme-colors: (
    grade-1: #F7B55B,
    grade-2: #C67BEB,
    grade-3: #54A4EB,
    grade-4: #5BCD81,
    grade-5: #A7B9D1
);

$theme-colors-text: ();
@each $key, $color in $theme-colors {
  $theme-colors-text: map.merge(
          $theme-colors-text,
          ($key: color.adjust($color, $lightness: -35%))
  );
}

$theme-colors-light: ();
@each $key, $color in $theme-colors {
  $theme-colors-light: map.merge(
          $theme-colors-light,
          ($key: rgba($color, 0.2))
  );
}

$theme-colors-dark: ();
@each $key, $color in $theme-colors {
  $theme-colors-dark: map.merge(
          $theme-colors-dark,
          ($key: color.adjust($color, $lightness: -20%))
  );
}

.grade-text {
  @each $name, $color in $theme-colors-text {
    &.#{$name} {
      color: #{$color};
    }
  }
}

.grade-frame {
  @each $name, $color in $theme-colors-dark {
    &.#{$name} {
      border: 1px solid #{$color};
    }
  }
}

.grade-bg {
  @each $name, $color in $theme-colors-light {
    &.#{$name} {
      background-color: #{$color};
    }
  }
}

.grade-mark {
  @each $name, $color in $theme-colors {
    &.#{$name} {
      border-left: 8px solid #{$color};
    }
  }
}

</style>