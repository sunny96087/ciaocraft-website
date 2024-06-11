<script setup lang="ts">
// 需要的 icon 再引入即可

// 使用 ref 選取 dom 元素
import { ref } from 'vue'

// 定義 isBookingVisible 為布林類型的 ref
// 使用 ref 管理元件顯示狀態
const isBookingVisible = ref(false)

// 定義 toggleBooking 函數，其返回類型為 void
// 切換預定選單顯示狀態
const toggleBookingVisible = (): void => {
  isBookingVisible.value = !isBookingVisible.value
}

// 子層按了"取消預定"，要將 isBookingVisible 恢復預設
const handleBookingCancel = () => {
  isBookingVisible.value = false
}
</script>

<template>
  <div class="mx-[20px] pt-14 lg:mx-[100px]">
    <nav class="mb-5 flex items-center">
      <a href="#" class="py-[3px]">
        <span class="mr-2.5">所有課程</span>
      </a>
      <Icon name="ph:caret-right" class="mr-2.5 text-2xl" />
      <!-- <PhCaretRight :size="24" class="mr-2.5" /> -->
      <a href="#" class="py-[3px]">
        <span class="mr-2.5 py-[3px]">體驗課程</span>
      </a>
      <Icon name="ph:caret-right" class="mr-2.5 text-2xl" />
      <!-- <PhCaretRight :size="24" class="mr-2.5" /> -->
      <!-- 切缺：所在位置字體末端黑色 -->
      <a href="#" class="py-[3px]">
        <span class="py-[3px]">課程名稱</span>
      </a>
    </nav>
    <section class="mb-[60px] justify-between lg:mb-[30px] lg:flex">
      <front-photo-carousel class="mb-[60px] lg:mb-0" />
      <front-course-title @toggleBooking="toggleBookingVisible" />
    </section>
    <section class="mb-[30px]" v-if="isBookingVisible">
      <front-course-booking @bookingReset="handleBookingCancel" />
    </section>
    <section class="mb-[30px]">
      <front-course-info />
    </section>
    <article class="mb-[30px]">
      <front-course-detail />
    </article>
    <article class="mb-[30px]">
      <front-course-comments />
    </article>
    <div class="pb-9">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
        其他相似的課程
      </h4>
      <front-product-card class="mb-5" />
      <div class="flex justify-center">
        <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
          更多課程
        </button>
      </div>
    </div>
  </div>
</template>
