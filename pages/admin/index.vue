<script setup lang="ts">
const barOpen = ref(false)
</script>
<template>
  <div class="flex min-h-screen">
    <!-- 左側選單 -->
    <div
      class="hover-auto flex min-h-full w-[96px] shrink-0 flex-col items-center gap-5 bg-[#FFFBF8] px-2 py-6"
      :class="{ 'min-w-[240px]': barOpen, 'min-w-[96px]': !barOpen }"
    >
      <div class="logo flex gap-2" @click="barOpen = !barOpen">
        <img src="~/assets/images/admin/slidebar/icon.svg" alt="logo" />
        <img v-show="barOpen" src="~/assets/images/admin/slidebar/text.svg" alt="Ciao!Craft" />
      </div>

      <!-- 路由 -->
      <!-- 
      首頁 index
      課程管理 course
      師資管理 teacher
      訂單管理 order
      財務管理 payment
      訊息中心 message
      評論管理 comment
      品牌管理 brand
      -->
      <div class="flex w-full flex-col">
        <nuxt-link
          to="/admin/"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">首頁</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/course"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">課程管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/teacher"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">師資管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/order"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">訂單管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/payment"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">財務管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/message"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">訊息中心</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/comment"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">評論管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/brand"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">品牌管理</span>
        </nuxt-link>

        <nuxt-link
          to="/admin/profile"
          class="bar-link"
          exact-active-class="bar-link-active"
          :class="{ 'justify-start': barOpen, 'justify-center': !barOpen }"
        >
          <Icon size="24" name="fluent:key-24-regular" />
          <span v-show="barOpen" class="ml-[10px]">帳號管理</span>
        </nuxt-link>
      </div>
    </div>

    <!-- 頁面 -->
    <div class="w-full grow bg-[#F9F7F7] px-6 py-10 xl:px-8 xl:py-12">
      <NuxtPage class="w-full" />
    </div>
  </div>
</template>
<style scoped>
.bar-link {
  @apply flex w-full items-center text-nowrap rounded-[6px] px-6 py-[14px];
}

.bar-link:hover {
  @apply bg-[var(--color-primary)] text-white;
}

.bar-link-active {
  @apply bg-[var(--color-primary)] text-white;
}
</style>
