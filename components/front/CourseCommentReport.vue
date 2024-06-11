<script setup lang="ts">
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
    <div
      class="z-50 mx-auto w-full max-w-[560px] flex-col items-center justify-center rounded-lg bg-white p-5"
    >
      <div class="mx-auto mb-[30px] w-[160px]">
        <img
          src="/assets/images/front/Logo_Img.png"
          alt="ciao-craft-logo"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="modal-content">
        <p class="mb-4 text-center text-2xl font-medium leading-[30px]">檢舉評論</p>
        <p class="mb-[30px] text-center">我們不會向對方透漏檢舉人的身分</p>
        <div class="mb-[30px] rounded border border-gray p-5">
          <textarea
            name="suggest"
            cols="30"
            rows="5"
            placeholder="請輸入檢舉原因"
            class="inputReport w-full"
          ></textarea>
        </div>
        <button class="w-full rounded bg-primary py-2 text-white hover:bg-primary-light">
          送出
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inputReport {
  resize: none;
}
</style>
