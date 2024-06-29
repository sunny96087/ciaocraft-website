<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['toggleBooking', 'scrollBooking'])

const handleBookingClick = (): void => {
  if (!authStore.isLogin) {
    authStore.openLoginModal()
    return
  }
  emit('toggleBooking')
  emit('scrollBooking')
}

import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()

// 格式化價格的計算屬性
const formattedPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const memberStore = useMemberStore()
const authStore = useAuthStore()
const isCollected = ref(false)
const router = useRouter()

onMounted(async () => {
  courseStore.resetoneCourseData()
  try {
    authStore.checkLogin()
    if (authStore.isLogin) {
      await fetchMemberCollection()
      watch(
        () => courseStore.oneCourseData[0].id,
        (newVal) => {
          if (newVal.length > 0) {
            checkIfCollected(newVal)
          }
        },
        { immediate: true, deep: true }
      )
    }
  } catch (err) {
    console.log('header checkLogin err', err)
  }
})

// 取得收藏資料
let memberCollection: any = computed(() => memberStore.collections)

const fetchMemberCollection = async () => {
  try {
    const res = await memberStore.getMemberCollection()
    const result = res.data
    memberStore.collections = result.data
    memberCollection.value = memberStore.collections
  } catch (err) {
    showToast('發生錯誤，請聯繫客服人員', 'error')
  }
}

const checkIfCollected = (courseId: string) => {
  isCollected.value = memberCollection.value.some((item: any) => item.courseId === courseId)
}

// 加入收藏
const addCollection = async (courseId: string) => {
  if (!authStore.isLogin) {
    authStore.openLoginModal()
    return
  }

  try {
    if (authStore.isLogin) {
      let postData = {
        courseId: courseId
      }
      const res: any = await memberStore.addCollection(postData)
      const result = res.data

      request(result)
    }
  } catch (e) {
    showToast('課程收藏失敗，請聯繫客服人員', 'error')
  }
}

function request(result: { statusCode: number; data: any }) {
  if (result.statusCode === 200) {
    memberStore.collections.push(result.data)
    isCollected.value = true
    showToast('課程收藏成功')
  } else {
    showToast('課程收藏失敗，請聯繫客服人員', 'error')
  }
}

// 移除收藏
const removeCollection = async (courseId: string) => {
  if (!authStore.isLogin) {
    authStore.openLoginModal()
    return
  }

  try {
    if (authStore.isLogin) {
      let postData = {
        courseId: courseId
      }
      console.log(courseId)
      const res: any = await memberStore.removeCollection(postData)
      const result = res.data

      if (result.statusCode === 200) {
        memberStore.collections = memberStore.collections.filter(
          (item: any) => item.courseId !== courseId
        )
        showToast('已取消收藏')
        isCollected.value = false
      } else {
        showToast('取消收藏失敗，請聯繫客服人員', 'error')
      }
    }
  } catch (e) {
    showToast('取消收藏失敗，請聯繫客服人員', 'error')
  }
}

// 品牌聊聊必須登入才行操作
// 登入/註冊 modal 控制
const openLoginModal = (): void => {
  if (!authStore.isLogin) {
    authStore.openLoginModal()
    return
  } else {
    router.push({
      name: 'index-index-message',
      query: { vendorId: courseStore.oneCourseData[0].vendorId._id }
    })
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
        <Icon
          v-for="index in 5"
          :key="index"
          :name="index <= Math.round(item.courseAvgRating) ? 'ph:star-fill' : 'ph:star'"
          class="text-2xl text-primary"
        />
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
      <li>{{ item.courseAddress }}</li>
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
    <div class="mb-3">
      <button
        class="flex w-full items-center justify-center rounded bg-secondary text-lg leading-[3rem] text-white hover:bg-[#2B71BF]"
        @click="addCollection(courseStore.oneCourseData[0].id)"
        v-if="!isCollected"
      >
        <Icon name="ph:star-bold" class="mr-2 text-xl" />
        收藏課程
      </button>
      <button
        class="flex w-full items-center justify-center rounded border border-primary bg-white text-lg leading-[3rem] hover:border-[#2B71BF] hover:bg-[#2B71BF]"
        @click="removeCollection(courseStore.oneCourseData[0].id)"
        v-else
      >
        <Icon name="ph:star-bold" class="mr-2 text-xl" />
        已收藏
      </button>
    </div>
    <div class="rounded border border-primary bg-white hover:bg-primary-light hover:text-white">
      <button
        class="flex w-full items-center justify-center text-lg leading-[3rem]"
        @click="openLoginModal"
      >
        <Icon name="ph:chats" class="mr-2 text-xl" />
        品牌聊聊
      </button>
    </div>
  </div>
</template>
