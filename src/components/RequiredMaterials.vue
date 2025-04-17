<script setup>
import {ref, computed, watch, onMounted} from 'vue'
import InputModal from './InputModal.vue'

const props = defineProps({
  title: String,
  needs: Number,
  ranks: Array,
  name: String,
  isPieceEnabled: {
    type: Boolean,
    default: false,
  },
  defaultQuantity: {
    type: Number,
    default: 1,
  },
})

const query = new URLSearchParams(window.location.search)

const selectedRankIndex = ref(Number(query.get(props.name + '_selected') ?? props.ranks.length - 1))
const quantity = ref(Number(query.get(props.name + '_quantity') ?? props.defaultQuantity))
const counts = ref(
    (query.get(props.name + '_counts') ?? props.ranks.map(() => 0).join(','))
        .split(',')
        .filter(x => x !== '')
        .map(Number)
)
console.log(quantity.value)
const perPiece = ref(Number(query.get(props.name + '_pp') ?? 25))
const pieceCount = ref(Number(query.get(props.name + '_pc') ?? 0))

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

  if (props.isPieceEnabled) {
    query.set(props.name + '_pp', (perPiece.value ?? 25).toString())
    query.set(props.name + '_pc', (pieceCount.value ?? 0).toString())
  }

  const newUrl = `${window.location.pathname}?${query.toString()}`
  window.history.replaceState(null, '', newUrl)
}

watch([quantity, selectedRankIndex, counts, perPiece, pieceCount], updateQuery, {deep: true})

const required = computed(() => {
  let all = props.needs ** (selectedRankIndex.value) * quantity.value
  let useCounts = counts.value.slice(0, selectedRankIndex.value + 1)
  let required = useCounts.reduce((sum, val, index) => sum - props.needs ** index * val, all)
  required -= pieceCount.value / perPiece.value
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

let clearIfZero = (index) => {
  if (counts.value[index] === 0) {
    counts.value[index] = null
  }
}

const clearIfZeroRef = (name) => {
  switch (name) {
    case 'perPiece':
      perPiece.value = perPiece.value > 0 ? perPiece.value : null
      break
    case 'pieceCount':
      pieceCount.value = pieceCount.value > 0 ? pieceCount.value : null
      break
    default:
      break
  }
}

let restoreIfEmpty = (index) => {
  if (counts.value[index] === '' || counts.value[index] === null) {
    counts.value[index] = 0
  }
}

let restoreIfEmptyRef = (name) => {
  switch (name) {
    case 'perPiece':
      if (!perPiece.value || perPiece.value < 1) {
        perPiece.value = 25
      }
      break
    case 'pieceCount':
      if (!pieceCount.value) {
        pieceCount.value = 0
      }
      break
    default:
      break
  }
  if (!ref.value) {
    ref.value = 0
  }
}

// Modal
const showModal = ref(false)
const modalIndex = ref(0)

let openModal = (index) => {
  modalIndex.value = index
  showModal.value = true
}

let addToCount = (index, value) => {
  counts.value[index] += value
  showModal.value = false
}

let splitNumber = (index) => {
  let n = parseFloat((required.value / ((props.needs ** index))).toFixed(4))
  const integer = Math.trunc(n)
  const decimalRaw = Math.abs(n - integer)
  const decimal = decimalRaw === 0 ? '' : decimalRaw.toFixed(4).slice(1)
  return {integer, decimal}
}
</script>

<template>
  <h2 class="font-bold text-xl">{{ title }}(素材数: {{ needs }}個)</h2>

  <h3><label for="rank" class="font-bold text-l block mb-2">1. 必要数を計算したいもの</label></h3>
  <select
      id="rank"
      v-model="selectedRankIndex"
      class="block w-full max-w-xs h-10 px-3 py-2 text-xl font-bold rounded mb-4
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
      class="h-10 w-20 text-center text-xl rounded px-3 py-1 mb-4
         bg-white text-black border border-gray-300
         dark:bg-gray-800 dark:text-white dark:border-gray-600
         appearance-none focus:outline-none focus:ring-0
         [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
         [-moz-appearance:textfield]"
  />
  <span class="align-middle ml-1">個</span>

  <h3 class="font-bold text-l">2. すでに持っているもの</h3>
  <ul class="mb-4">
    <li
        v-if="isPieceEnabled"
    >
      <div
          class="mb-4 px-2 py-1 rounded-md grade-frame grade-bg grade-p"
      >
        <div class="flex items-center gap-2 flex-nowrap overflow-hidden">
          <h4
              class="font-bold flex-shrink-0 whitespace-nowrap pl-1 min-w-[5ch] grade-mark grade-p"
          >
            破片
          </h4>

          <input
              type="number"
              class="grade-p
                h-10 min-w-[80px] max-w-[100%] flex-1 text-center text-xl font-mono rounded py-1
               appearance-none focus:outline-none focus:ring-0
               bg-white text-black border border-gray-300
               dark:bg-gray-800 dark:text-white dark:border-gray-600
               [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
               [-moz-appearance:textfield]"
              v-model.number="pieceCount"
              @focus="clearIfZeroRef('pieceCount')"
              @blur="restoreIfEmptyRef('pieceCount')"
              min="0"
          />
          ←
          <input
              type="number"
              class="grade-p
                h-10 min-w-[2em] max-w-[2em] flex-1 text-center text-xl font-mono rounded py-1
               appearance-none focus:outline-none focus:ring-0
               bg-white text-black border border-gray-300
               dark:bg-gray-800 dark:text-white dark:border-gray-600
               [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
               [-moz-appearance:textfield]"
              v-model.number="perPiece"
              @focus="clearIfZeroRef('perPiece')"
              @blur="restoreIfEmptyRef('perPiece')"
              min="1"
          />
          個でLv.1

        </div>
      </div>

    </li>

    <li
        v-for="(rank, index) in ranks.slice(0, selectedRankIndex + 1)"
        :key="index"
    >
      <div
          class="mb-4 px-2 py-1 rounded-md grade-frame grade-bg"
          :class="getGradeLabel(index, ranks.length)"
      >
        <div class="flex items-center gap-2 flex-nowrap overflow-hidden">
          <h4
              class="font-bold flex-shrink-0 whitespace-nowrap grade-mark pl-1 min-w-[5ch]"
              :class="getGradeLabel(index, ranks.length)"
          >
            {{ rank }}
          </h4>

          <input
              type="number"
              class="h-10 min-w-[80px] max-w-[100%] flex-1 text-center text-xl font-mono rounded py-1
               appearance-none focus:outline-none focus:ring-0
               bg-white text-black border border-gray-300
               dark:bg-gray-800 dark:text-white dark:border-gray-600
               [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
               [-moz-appearance:textfield]"
              :class="getGradeLabel(index, ranks.length)"
              v-model.number="counts[index]"
              @focus="clearIfZero(index)"
              @blur="restoreIfEmpty(index)"
              min="0"
          />

          <button
              @click="openModal(index)"
              class="h-10 px-3 bg-gray-900/50 text-white font-bold rounded hover:bg-gray-900/60 flex-shrink-0"
          >
            ＋
          </button>
        </div>
      </div>
    </li>
  </ul>

  <section class="mb-4">
    <h3 class="font-bold text-xl">必要数</h3>

    <ul class="mb-4 tabular-nums">
      <li
          v-if="isPieceEnabled"
      >
        <span
            class="pl-2 grade-mark"
        >
          <span class="font-bold text-xl">
            破片:
          </span>
          <span class="font-bold text-xl inline-block text-right w-16">
            {{ Math.trunc(parseFloat((required * perPiece).toFixed(4))) }}
          </span>
        </span>

      </li>
      <li v-for="(rank, index) in ranks.slice(0, selectedRankIndex + 1)" :key="index">
        <span
            class="font-bold pl-2 text-xl grade-mark"
            :class="getGradeLabel(index, ranks.length)"
        >
          <span
              class="font-bold text-xl"
          >
            {{ ranks[index] }}:
          </span>
          <span class="font-bold inline-block text-right"
                :class="index > 8 ? 'w-[3.2rem]' : 'w-16'"
          >
            {{ splitNumber(index).integer }}
          </span>
          <span class="font-bold">
            {{ splitNumber(index).decimal }}
          </span>
        </span>
      </li>
    </ul>
  </section>

  <InputModal
      :visible="showModal"
      :index="modalIndex"
      :modelValue="counts[modalIndex]"
      message="入力した数値を加算"
      @confirm="addToCount"
      @close="showModal = false"
  />
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
  border: 1px solid #ccc;

  @each $name, $color in $theme-colors-dark {
    &.#{$name} {
      border-color: #{$color};
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
  border-left: 8px solid rgba(#000, 0);

  @each $name, $color in $theme-colors {
    &.#{$name} {
      border-left-color: #{$color};
    }
  }
}

* {
  -webkit-tap-highlight-color: transparent;
}

input,
textarea,
select,
button {
  outline: none;
  box-shadow: none;
}

input:focus,
textarea:focus,
select:focus,
button:focus {
  box-shadow: none !important;
}

</style>