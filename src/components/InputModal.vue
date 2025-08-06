<template>
  <transition name="fade" appear>
    <div
        v-show="visible"
        class="fixed left-0 top-0 w-full z-50 bg-black/50 flex items-center justify-center"
        :style="{ height: '100dvh' }"
        @click.self="cancel"
    >
      <div class="bg-white dark:bg-gray-700 rounded shadow-md w-80 p-4 mb-16">
        <h2 class="text-lg font-bold text-center mb-3">{{ message }}</h2>

        <input
            ref="inputRef"
            :name="name+'-input'"
            v-model.number="inputValue"
            type="number"
            inputmode="numeric"
            class="
             h-10 w-full text-center text-xl font-mono rounded py-1
             bg-white text-black border border-gray-300
             dark:bg-gray-800 dark:text-white dark:border-gray-600
             appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
             [-moz-appearance:textfield]
            "
            autofocus
            @blur="handleBlur"
        />

        <p
            v-if="typeof inputValue === 'number' && !isNaN(inputValue)"
            class="text-center text-sm text-gray-600 dark:text-gray-300 font-mono"
        >
          {{ props.modelValue }} + {{ inputValue }} = {{ props.modelValue + inputValue }}
        </p>

        <div class="flex justify-between mt-4">
          <button
              @click="cancel"
              class="h-10 px-4 bg-gray-300 text-black font-bold rounded
               dark:bg-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
          >
            キャンセル
          </button>
          <button
              @click="confirm"
              class="h-10 px-4 bg-gray-800 text-white font-bold rounded hover:bg-gray-900"
          >
            決定
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>


<script setup>
import {ref, watch, nextTick} from 'vue'

const props = defineProps({
  visible: Boolean,
  index: Number,
  name: String,
  message: String,
  modelValue: {
    type: [Number, String],
    default: 0,
  },
})

const emits = defineEmits(['close', 'confirm'])

const inputValue = ref(0)
const inputRef = ref(null)
let blurTimeout = null
let confirmed = false

let scrollPosition = 0

watch(() => props.visible, (val) => {
  if (val) {
    confirmed = false
    inputValue.value = null
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

function confirm() {
  if (confirmed) return
  confirmed = true

  const value = Number(inputValue.value)
  if (!isNaN(value)) {
    emits('confirm', props.index, value)
  }
  emits('close')
}

function handleBlur() {
  blurTimeout = setTimeout(() => {
    confirm()
  }, 100)
}

function cancel() {
  clearTimeout(blurTimeout)
  emits('close')
  inputValue.value = 0
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>