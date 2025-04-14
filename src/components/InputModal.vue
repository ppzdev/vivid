<template>
  <div
      v-if="visible"
      class="absolute left-0 top-0 w-full z-50 bg-black/50 flex items-center justify-center"
      :style="{ height: '100dvh' }"
      @click.self="cancel"
  >
    <div class="bg-white rounded shadow-md w-80 p-4">
      <h2 class="text-lg font-bold text-center mb-3">{{ message }}</h2>

      <input
          ref="inputRef"
          v-model.number="inputValue"
          type="number"
          inputmode="numeric"
          class="
          h-10 w-full text-center text-xl font-mono border border-gray-300 rounded py-1
          appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          [-moz-appearance:textfield]
        "
          autofocus
          @blur="handleBlur"
      />

      <p
          v-if="typeof inputValue === 'number' && !isNaN(inputValue)"
          class="text-center text-sm text-gray-600 font-mono"
      >
        {{ props.modelValue }} + {{ inputValue }} = {{ props.modelValue + inputValue }}
      </p>

      <div class="flex justify-between mt-4">
        <button
            @click="cancel"
            class="h-10 px-4 bg-gray-300 text-black font-bold rounded hover:bg-gray-200"
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
</template>


<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  visible: Boolean,
  index: Number,
  message: String,
  modelValue: Number,
})

const emits = defineEmits(['close', 'confirm'])

const inputValue = ref(0)
const inputRef = ref(null)
let blurTimeout = null
let confirmed = false

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