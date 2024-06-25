<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    // imageUrl 屬性是必要的
    required: true
  }
})

const emit = defineEmits(['close'])

// 點擊背景關閉 modal
const clickMaskToCloseModal = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <div class="modal-bg z-40" @click.capture="clickMaskToCloseModal">
    <div class="z-50 mx-auto w-9/12 flex-col items-center justify-center rounded-lg bg-white p-2">
      <img :src="imageUrl" alt="評論照片" class="mx-auto h-auto max-w-full" />
    </div>
  </div>
</template>

<style scoped>
.inputReport {
  resize: none;
}
</style>
