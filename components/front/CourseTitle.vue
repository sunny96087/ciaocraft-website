<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['toggleBooking'])

const handleBookingClick = (): void => {
  emit('toggleBooking')
}

import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()

// 格式化價格的計算屬性
const formattedPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<template>
  <div class="lg:w-[45%]" v-for="(item, index) in courseStore.oneCourseData" :key="index">
    <!-- <p class="mb-3 inline-block rounded bg-[#2B71BF] px-2 py-0.5 text-secondary text-white"> -->
    <p
      class="mb-3 inline-block rounded bg-[#2B71BF] px-2 py-0.5 text-center"
      :class="{
        'bg-blue4 text-secondary': item.courseTerm === 0,
        'bg-primary text-white': item.courseTerm !== 0
      }"
    >
      {{ item.courseTerm === 0 ? '單堂體驗' : '專業培訓' }}
    </p>
    <h3 class="mb-5 text-[40px] font-medium leading-[48px]">{{ item.courseName }}</h3>
    <ul class="mb-[22px] flex items-center">
      <li class="mr-2 text-[18px] font-medium leading-[26px]">{{ item.courseAvgRating }}</li>
      <li class="mr-2 flex">
        <Icon name="ph:star-fill" class="text-2xl text-primary" />
        <Icon name="ph:star-fill" class="text-2xl text-primary" />
        <Icon name="ph:star-fill" class="text-2xl text-primary" />
        <Icon name="ph:star-fill" class="text-2xl text-primary" />
        <Icon name="ph:star-bold" class="text-2xl text-primary" />
      </li>
      <li>({{ item.courseCommentsCount }})</li>
    </ul>
    <p class="mb-5 text-secondary">
      NT$<span class="ml-2 font-medium leading-[30px]">{{ formattedPrice(item.coursePrice) }}</span>
    </p>
    <ul class="mb-5 flex">
      <li>
        <Icon name="ph:map-pin-line" class="mr-2 text-2xl" />
      </li>
      <li>{{ item.courseAddress.substring(0, 3) }}</li>
    </ul>
    <p class="mb-2">課程簡述</p>
    <p class="mb-[30px]">
      {{ item.courseSummary }}
    </p>
    <div class="mb-3 rounded bg-primary hover:bg-primary-light">
      <button
        class="flex w-full items-center justify-center text-lg leading-[3rem] text-white"
        @click="handleBookingClick"
      >
        <Icon name="ph:calendar-dots" class="mr-2 text-xl" />
        預約課程
      </button>
    </div>
    <div class="mb-3 rounded bg-secondary hover:bg-[#2B71BF]">
      <button class="flex w-full items-center justify-center text-lg leading-[3rem] text-white">
        <Icon name="ph:star-bold" class="mr-2 text-xl" />
        收藏課程
      </button>
    </div>
    <div class="rounded border border-primary bg-white hover:bg-primary-light hover:text-white">
      <button class="flex w-full items-center justify-center text-lg leading-[3rem]">
        <Icon name="ph:chats" class="mr-2 text-xl" />
        品牌聊聊
      </button>
    </div>
  </div>
</template>
