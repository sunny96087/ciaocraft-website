<script setup lang="ts">
import {
  PhUserCircle,
  PhHouse,
  PhBooks,
  PhAddressBook,
  PhNewspaperClipping,
  PhCardholder,
  PhCurrencyCircleDollar,
  PhChatCenteredDots,
  PhStar,
  PhSealCheck,
  PhSignOut,
  PhHeart
} from '@phosphor-icons/vue'
// <PhHeart :size="32" color="hotpink" weight="fill" />

import { useRoute } from 'vue-router'
import { APIStore } from '~/stores/apiService'
const store = APIStore()

const router = useRouter()
const route = useRoute()

const barOpen = ref(false)
const barOpenM = ref(false)

onMounted(() => {
  const vendorInfo = store.getVendorInfoFromLocalStorage()
  console.log(vendorInfo)

  if (vendorInfo) {
    store.setVendorInfo(vendorInfo)
  }
})

function logout() {
  store.logoutVendor()
  router.push('/adminLogin')
}

watch(route, () => {
  barOpenM.value = false
})
</script>
<template>
  <div class="hiddex relative flex min-h-screen w-full">
    <!-- * mb 選單 -->
    <!-- ? 按鈕 -->
    <button
      @click="barOpenM = !barOpenM"
      class="fixed right-4 top-4 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-primary-light bg-white bg-opacity-50 p-1 shadow-md md:hidden"
    >
      <div class="logo">
        <img src="~/assets/images/admin/slidebar/icon.svg" alt="logo" class="pic-auto" />
      </div>
    </button>

    <!-- ? 選單 -->
    <div
      class="hide-scrollbar fixed inset-0 z-30 overflow-y-auto bg-[#FFFBF8] pb-10 pt-[84px] md:hidden"
      v-show="barOpenM"
    >
      <div class="flex w-full flex-col" v-if="store.vendorInfo">
        <nuxt-link
          to="/admin/profile"
          class="bar-link"
          exact-active-class="bar-link-active "
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <div v-if="store.vendorInfo.avatar" class="h-6 w-6 overflow-hidden rounded-full">
            <img :src="store.vendorInfo?.avatar" alt="" class="pic-auto" />
          </div>
          <!-- <Icon v-else size="24" name="material-symbols:account-circle-full" /> -->
          <PhUserCircle v-else :size="24" />
          <span class="ml-[10px]">{{ store.vendorInfo?.brandName || 'Member' }}</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:house-light" /> -->
          <PhHouse :size="24" />
          <span class="ml-[10px]">首頁</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/course"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:books-light" /> -->
          <PhBooks :size="24" />
          <span class="ml-[10px]">課程管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/teacher"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ri:contacts-book-3-line" /> -->
          <PhAddressBook :size="24" />
          <span class="ml-[10px]">師資管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/order"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:newspaper-clipping-light" /> -->
          <PhNewspaperClipping :size="24" />
          <span class="ml-[10px]">訂單管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/bank"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="heroicons:wallet" /> -->
          <PhCardholder :size="24" />
          <span class="ml-[10px]">帳戶管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/payment"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="material-symbols-light:monetization-on-outline-rounded" /> -->
          <PhCurrencyCircleDollar :size="24" />
          <span class="ml-[10px]">我的進帳</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/message"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:chat-centered-dots-light" /> -->
          <PhChatCenteredDots :size="24" />
          <span class="ml-[10px]">訊息中心</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/comment"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:star-light" /> -->
          <PhStar :size="24" />
          <span class="ml-[10px]">評論管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/brand"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:circle-wavy-check-light" /> -->
          <PhSealCheck :size="24" />
          <span class="ml-[10px]">品牌管理</span>
        </nuxt-link>

        <!-- logout -->
        <div
          to="/admin/profile"
          class="bar-link"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
          @click="logout"
        >
          <!-- <Icon size="24" name="material-symbols:logout-rounded" /> -->
          <PhSignOut :size="24" />
          <span class="ml-[10px]">登出</span>
        </div>
      </div>
    </div>

    <!-- * pc 左側選單 -->
    <div
      class="hover-auto fixed bottom-0 left-0 top-0 z-50 hidden min-h-full w-[96px] shrink-0 flex-col items-center gap-5 overflow-y-auto bg-[#FFFBF8] px-2 py-6 shadow-lg md:flex"
      :class="{ 'min-w-[240px]': barOpen, 'min-w-[96px]': !barOpen }"
      @mouseover="barOpen = true"
      @mouseleave="barOpen = false"
    >
      <!-- @click="barOpen = !barOpen" -->
      <div class="logo flex gap-2">
        <img src="~/assets/images/admin/slidebar/icon.svg" alt="logo" />
        <img v-show="barOpen" src="~/assets/images/admin/slidebar/text.svg" alt="Ciao!Craft" />
      </div>

      <!-- 路由 -->
      <!-- 
      首頁 index
      課程管理 course
      師資管理 teacher
      訂單管理 order
      我的進帳 payment
      訊息中心 message
      評論管理 comment
      品牌管理 brand
      -->
      <div class="flex w-full flex-col" v-if="store.vendorInfo">
        <!-- <div class="bar-item" :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }">
          <Icon size="24" name="material-symbols:account-circle-full" />
          <span v-show="barOpen" class="ml-[10px]">{{
            store.vendorInfo?.brandName || 'Member'
          }}</span>
        </div> -->

        <nuxt-link
          to="/admin/profile"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <div v-if="store.vendorInfo.avatar" class="h-6 w-6 overflow-hidden rounded-full">
            <img :src="store.vendorInfo?.avatar" alt="" class="pic-auto" />
          </div>
          <!-- <Icon v-else size="24" name="material-symbols:account-circle-full" /> -->
          <PhUserCircle v-else :size="24" />
          <span v-show="barOpen" class="ml-[10px]">{{
            store.vendorInfo?.brandName || 'Member'
          }}</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:house-light" /> -->
          <PhHouse :size="24" />
          <span v-show="barOpen" class="ml-[10px]">首頁</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/course"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:books-light" /> -->
          <PhBooks :size="24" />
          <span v-show="barOpen" class="ml-[10px]">課程管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/teacher"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ri:contacts-book-3-line" /> -->
          <PhAddressBook :size="24" />

          <span v-show="barOpen" class="ml-[10px]">師資管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/order"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:newspaper-clipping-light" /> -->
          <PhNewspaperClipping :size="24" />
          <span v-show="barOpen" class="ml-[10px]">訂單管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/bank"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="heroicons:wallet" /> -->
          <PhCardholder :size="24" />
          <span v-show="barOpen" class="ml-[10px]">帳戶管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/payment"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="material-symbols-light:monetization-on-outline-rounded" /> -->
          <PhCurrencyCircleDollar :size="24" />
          <span v-show="barOpen" class="ml-[10px]">我的進帳</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/message"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:chat-centered-dots-light" /> -->
          <PhChatCenteredDots :size="24" />
          <span v-show="barOpen" class="ml-[10px]">訊息中心</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/comment"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:star-light" /> -->
          <PhStar :size="24" />
          <span v-show="barOpen" class="ml-[10px]">評論管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/brand"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <!-- <Icon size="24" name="ph:circle-wavy-check-light" /> -->
          <PhSealCheck :size="24" />
          <span v-show="barOpen" class="ml-[10px]">品牌管理</span>
        </nuxt-link>

        <!-- logout -->
        <div
          to="/admin/profile"
          class="bar-link"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
          @click="logout"
        >
          <!-- <Icon size="24" name="material-symbols:logout-rounded" /> -->
          <PhSignOut :size="24" />
          <span v-show="barOpen" class="ml-[10px]">登出</span>
        </div>
      </div>
    </div>

    <!-- * pc 左側選單 保留空間用 -->
    <div class="hidden w-[96px] shrink-0 md:block"></div>
    <!-- * page -->
    <div class="w-full grow overflow-auto bg-[#F9F7F7] px-6 py-10 xl:px-8 xl:py-12">
      <NuxtPage class="w-full" />
    </div>
  </div>
</template>
<style scoped>
.bar-link {
  @apply flex w-full items-center text-nowrap rounded-[6px] px-6 py-[14px];
}

.bar-item {
  @apply flex w-full items-center text-nowrap rounded-[6px] px-6 py-[14px];
}

.bar-link:hover {
  @apply bg-[var(--color-primary)] text-white;
}

.bar-link-active {
  @apply bg-[var(--color-primary)] text-white;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
