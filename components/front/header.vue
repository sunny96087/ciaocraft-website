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
    <div class="max-w-screen-xl mx-auto">
      <ul class="flex justify-between items-center my-3.5 lg:my-[30px]">
        <li>
          <h1>
            <a
              href="#"
              class="bg-[url('~/assets/images/Logo_Img.svg')] block w-40 h-10 indent-[115%] overflow-hidden whitespace-nowrap"
              >Ciao!Craft</a
            >
          </h1>
        </li>
        <li class="hidden lg:block">
          <ul class="flex items-center">
            <li class="text-Primary-Orange pr-6">
              <a href="#" class="py-2 px-6 hover:text-Primary-light">我要開課</a>
            </li>
            <li class="text-white pr-6">
              <button class="bg-Primary-Orange hover:bg-Primary-light py-2 px-6 rounded">
                登入/註冊
              </button>
            </li>
            <li class="pr-6">
              <a href="#"><img src="~/assets/images/Button.svg" alt="我的收藏" /></a>
            </li>
            <li>
              <a href="#"
                ><img src="~/assets/images/Button(money).svg" alt="關於我們/如何累積點數"
              /></a>
            </li>
          </ul>
        </li>
        <li class="lg:hidden">
          <ul class="flex items-center">
            <li class="pr-6">
              <a href="#"><img src="~/assets/images/Button.svg" alt="我的收藏" /></a>
            </li>
            <li class="active:cursor-pointer" @click="toggleMenu">
              <a href="#" class="relative block">
                <div
                  class="w-8 h-8 bg-center bg-[url('~/assets/images/Button(ham).svg')] hover:bg-[url('~/assets/images/Icon_new(ham).svg')]"
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
      'absolute top-[69px] w-full bg-white',
      { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
    ]"
  >
    <ul
      :class="[
        'overflow-hidden mx-[60px]',
        { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen, 'pt-5': isMenuOpen, 'pb-6': isMenuOpen }
      ]"
    >
      <li class="border-b border-[#AAAAAA]">
        <a href="#" class="block p-2 pb-5 pl-5">登入/註冊</a>
      </li>
      <li class="mt-3"><a href="#" class="block py-2 pl-5">我要開課</a></li>
      <li><a href="#" class="block py-2 pl-5">如何累積點數</a></li>
    </ul>
  </div>
</template>

<style scoped></style>
