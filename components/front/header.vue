<script setup lang="ts">
// 使用 ref 選取 dom 元素
import { ref } from 'vue'

// 定義 isMenuOpen 為布林類型的 ref
// 使用 ref 管理漢堡選單的顯示狀態
const isMenuOpen = ref<boolean>(false)

// 定義 toggleMenu 函數，其返回類型為 void
// 切換漢堡選單顯示狀態
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="mx-9 lg:mx-[100px]">
    <div class="mx-auto max-w-screen-xl">
      <ul class="my-3.5 flex items-center justify-between lg:my-[30px]">
        <li>
          <h1>
            <a
              href="#"
              class="block h-10 w-40 overflow-hidden whitespace-nowrap bg-[url('~/assets/images/front/Logo_Img.png')] indent-[115%]"
              >Ciao!Craft</a
            >
          </h1>
        </li>
        <li class="hidden lg:block">
          <ul class="flex items-center">
            <li class="text-primary pr-6">
              <a href="#" class="hover:text-primary-light px-6 py-2">我要開課</a>
            </li>
            <li class="pr-6 text-white">
              <button class="bg-primary hover:bg-primary-light rounded px-6 py-2">登入/註冊</button>
            </li>
            <li class="pr-6 text-white">
              <button class="bg-primary hover:bg-primary-light rounded px-6 py-2">
                <NuxtLink to="/adminLogin">管理員登入</NuxtLink>
              </button>
            </li>
            <li class="pr-6">
              <a href="#"><img src="~/assets/images/front/Icon_new_star.png" alt="我的收藏" /></a>
            </li>
            <li>
              <a href="#"
                ><img src="~/assets/images/front/Button(money).png" alt="關於我們/如何累積點數"
              /></a>
            </li>
          </ul>
        </li>
        <li class="lg:hidden">
          <ul class="flex items-center">
            <li class="pr-6">
              <a href="#"><img src="~/assets/images/front/Icon_new_star.png" alt="我的收藏" /></a>
            </li>
            <li class="active:cursor-pointer" @click="toggleMenu">
              <a href="#" class="relative block">
                <div
                  class="h-8 w-8 bg-[url('~/assets/images/front/Button(ham).png')] bg-center hover:bg-[url('~/assets/images/front/Button(hoverham).png')]"
                ></div>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- 漢堡選單 -->
  <div
    :class="[
      'absolute top-[69px] z-50 w-full bg-white',
      { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
    ]"
  >
    <ul
      :class="[
        'mx-[60px] overflow-hidden',
        { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen, 'pt-5': isMenuOpen, 'pb-6': isMenuOpen }
      ]"
    >
      <li class="border-b border-[#AAAAAA]">
        <a href="#" class="block p-2 pb-5 pl-5">登入/註冊</a>
      </li>
      <li><NuxtLink to="/adminLogin" class="block p-2 pb-5 pl-5">管理員登入</NuxtLink></li>
      <li class="mt-3"><a href="#" class="block py-2 pl-5">我要開課</a></li>
      <li><a href="#" class="block py-2 pl-5">如何累積點數</a></li>
    </ul>
  </div>
</template>

<style scoped></style>
