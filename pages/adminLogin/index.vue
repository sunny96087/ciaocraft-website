<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const tab = ref(0)
</script>
<template>
  <div
    class="bg-[#F9FAFB] min-h-screen lg:grid lg:grid-cols-2 lg:gap-[80px] xl:gap-[140px] lg:justify-center lg:items-center lg:px-[80px] xl:px-[140px] px-5"
  >
    <!-- * 歡迎文字 -->
    <div class="p-8 lg:p-0 items-center w-full flex flex-col gap-5 lg:gap-10 lg:items-start">
      <div class="w-[80%] lg:w-full max-w-[560px]">
        <img src="~/assets/images/admin/logo.svg" alt="logo" class="pic-auto" />
      </div>
      <div class="text-[20px] lg:text-[24px]">Enjoy Your Learning !</div>
    </div>

    <!-- * 登入框 -->
    <div class="login-block">
      <!-- 登入 -->
      <div v-if="tab === 0" class="">
        <div class="text-[24px] font-bold">用 賣家帳號 登入</div>
        <div class="login-block-input mt-8 lg:mt-10">
          <Icon size="20" name="bi:envelope" />
          <input type="text" placeholder="電子信箱" />
        </div>
        <div class="login-block-input mt-5">
          <Icon size="20" name="fluent:key-24-regular" />
          <input type="password" placeholder="密碼" />
        </div>
        <button class="bg-black text-white w-full py-2 rounded-[4px] mt-8 lg:mt-10">登入</button>
        <div class="flex justify-center lg:justify-end mt-10 lg:mt-[60px] gap-5">
          <div class="cursor-pointer" @click="tab = 1">忘記密碼</div>
          <span>|</span>
          <nuxt-link to="/">成為賣家</nuxt-link>
        </div>
      </div>
      <!-- 忘記密碼 -->
      <div v-if="tab === 1" class="">
        <div class="text-[24px] font-bold">忘記密碼</div>

        <div class="cursor-pointer" @click="tab = 0">回上一頁</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-block {
  @apply p-8 bg-white rounded-[20px] w-full max-w-[560px] mx-auto lg:py-[80px] lg:px-14 xl:py-[125px] xl:px-20;
  box-shadow: 0px 5px 10px 0px #0000001a;
}

.login-block-input {
  @apply border border-black rounded-[4px] pl-5 pr-[16px] py-[9px] flex gap-2 items-center;
}
.login-block-input input {
  @apply w-full;
}
</style>
