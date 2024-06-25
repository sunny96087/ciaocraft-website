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

onMounted(async () => {
  await fetchMemberCollection()
  checkIfCollected(courseStore.oneCourseData[0].id)
  console.log(isCollected.value)
})

const memberStore = useMemberStore()
const authStore = useAuthStore()
const isCollected = ref(false)

// 取得收藏資料
let memberCollection: any = computed(() => memberStore.collections)

const fetchMemberCollection = async () => {
  try {
    const res = await memberStore.getMemberCollection()
    const result = res.data
    memberStore.collections = result.data
    memberCollection.value = memberStore.collections
  } catch (err) {
    showToast('發生錯誤，請聯繫客服人員')
  }
}

const checkIfCollected = (courseId: string) => {
  isCollected.value = memberCollection.value.some((item: any) => item.courseId === courseId)
}

// 加入收藏
const addCollection = async (courseId: string) => {
  try {
    if (authStore.isLogin) {
      let postData = {
        courseId: courseId
      }
      if (isCollected.value) {
        const res: any = await memberStore.addCollection(postData)
        const result = res.data

        if (result.statusCode === 200) {
          memberStore.collections.push(result.data)
          showToast('課程已收藏')
        } else {
          showToast('收藏失敗，請聯繫客服人員')
        }
      }
    }
  } catch (e) {
    showToast('收藏失敗，請聯繫客服人員')
  }
}
</script>

<template>
  <div class="lg:w-[45%]" v-for="(item, index) in courseStore.oneCourseData" :key="index">
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
    <div class="mb-3 rounded">
      <button
        class="flex w-full items-center justify-center text-lg leading-[3rem]"
        @click="addCollection(courseStore.oneCourseData[0].id)"
        :disabled="!isCollected"
        :class="{
          'bg-secondary text-white hover:bg-[#2B71BF]': isCollected,
          'cursor-not-allowed bg-gray5': !isCollected
        }"
      >
        <Icon name="ph:star-bold" class="mr-2 text-xl" />
        收藏課程
      </button>
    </div>
    <div class="rounded border border-primary bg-white hover:bg-primary-light hover:text-white">
      <NuxtLink to="/message">
        <button class="flex w-full items-center justify-center text-lg leading-[3rem]">
          <Icon name="ph:chats" class="mr-2 text-xl" />
          品牌聊聊
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
