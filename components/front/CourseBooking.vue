<script setup lang="ts">
// 需要的 icon 再引入即可
// import { PhPaperPlaneRight } from '@phosphor-icons/vue'

import { defineEmits } from 'vue'

const emit = defineEmits(['bookingReset'])

const handleBookingCancel = () => {
  emit('bookingReset')
}
</script>

<template>
  <ul class="rounded-xl border border-[#DFE4EA] bg-white p-5">
    <li class="mb-5 flex justify-between">
      <h4 class="text-[30px] font-medium leading-[38px]">預約課程</h4>
      <button
        class="rounded border border-primary px-6 py-2 hover:bg-primary-light hover:text-white"
        @click="handleBookingCancel"
      >
        取消預約
      </button>
    </li>
    <li class="mb-5 flex items-center rounded bg-gray3 py-2 pl-2">
      <p class="mr-2.5 inline-block rounded bg-danger px-2 py-1 text-secondary text-white">注意</p>
      <p>預約3天內完成付款即完成報名課程</p>
    </li>
    <li class="mb-5 flex justify-between">
      <p class="text-lg font-medium leading-[26px]">選擇課程日期、場次、人數</p>
      <a href="#" class="flex items-center text-primary">
        重新填寫
        <Icon name="ph:arrow-clockwise" class="ml-1 text-xl text-primary" />
        <!-- <PhArrowClockwise :size="20" color="#EA580C" class="ml-1" /> -->
      </a>
    </li>
    <li>
      <ul class="mb-10 justify-between lg:flex">
        <li class="mb-[30px] lg:mb-0 lg:w-[43%]">
          <div class="mb-[30px]">
            <p class="mb-5">場次時間*</p>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                class="rounded border px-6 py-2 text-secondary hover:bg-secondary hover:text-white"
              >
                2024/05/20 春季班
              </button>
              <button
                class="rounded border px-6 py-2 text-secondary hover:bg-secondary hover:text-white"
              >
                2024/05/20 春季班
              </button>
              <button
                class="rounded border px-6 py-2 text-secondary hover:bg-secondary hover:text-white"
              >
                2024/05/20 春季班
              </button>
            </div>
          </div>
          <div class="mb-5">
            <p class="mb-5">預約人數*</p>
            <ul class="flex items-center justify-between border-b border-black pb-5">
              <li class="flex items-center">
                <p class="mr-5">NT$<span class="mx-2">9,999</span>/ 每人</p>
                <div class="flex items-center">
                  <Icon name="ph:minus-circle" class="text-[32px] hover:cursor-pointer" />
                  <!-- <PhMinusCircle :size="32" class="hover:cursor-pointer" /> -->
                  <p class="mx-5">1</p>
                  <Icon name="ph:plus-circle" class="text-[32px] hover:cursor-pointer" />
                  <!-- <PhPlusCircle :size="32" class="hover:cursor-pointer" /> -->
                </div>
              </li>
              <li>剩餘<span class="mx-2">8</span>人</li>
            </ul>
          </div>
          <ul>
            <li class="mb-2 flex items-center justify-between">
              <p>總金額</p>
              <p class="text-2xl font-medium leading-[36px]">NT$<span>9,999</span></p>
            </li>
            <li class="flex items-center justify-between">
              <p>獲得點數</p>
              <p>99</p>
            </li>
          </ul>
        </li>
        <li class="lg:w-[53%]">
          <p class="mb-2">備註</p>
          <div class="rounded border border-black p-5">
            <textarea
              name="suggest"
              cols="30"
              rows="10"
              placeholder="請填寫不超過500字"
              class="inputSuggest w-full"
            ></textarea>
          </div>
        </li>
      </ul>
      <div class="flex justify-end">
        <button
          class="flex items-center rounded bg-primary px-6 py-2 text-white hover:bg-primary-light"
        >
          <Icon name="ph:paper-plane-right" class="mr-2 text-xl" />
          <!-- <PhPaperPlaneRight :size="20" class="mr-2" /> -->
          送出訂單
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.inputSuggest {
  resize: none;
}
</style>
