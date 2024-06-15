<script setup lang="ts"></script>

<template>
  <img
    src="~/assets/images/front/Banner_2.png"
    alt="品牌賣場橫幅圖片"
    class="h-[300px] w-full object-cover"
  />
  <section class="mb-[30px] mt-14 lg:mb-[50px]">
    <ul class="md:flex">
      <li class="mb-[30px] flex justify-center md:mb-0 md:mr-5 md:flex-none">
        <img
          src="~/assets/images/front/Banner_3.png"
          alt="品牌logo"
          class="h-[180px] w-[180px] lg:h-[287px] lg:w-[287px]"
        />
      </li>
      <li>
        <ul>
          <li
            class="mb-[30px] text-4xl font-medium leading-[54px] lg:text-[40px] lg:leading-[48px]"
          >
            品牌名稱品牌名稱品牌名稱品牌名稱品牌名稱品牌名稱品牌名稱品牌名稱品牌名稱品牌名稱品牌名稱
          </li>
          <li class="mb-5">
            <ul class="flex items-center">
              <li class="mr-2 text-[18px] font-medium leading-[26px]">4.0</li>
              <li class="mr-2 flex">
                <Icon name="ph:star-fill" class="text-2xl text-primary" />
                <Icon name="ph:star-fill" class="text-2xl text-primary" />
                <Icon name="ph:star-fill" class="text-2xl text-primary" />
                <Icon name="ph:star-fill" class="text-2xl text-primary" />
                <Icon name="ph:star-bold" class="text-2xl text-primary" />
              </li>
              <li>(61)</li>
            </ul>
          </li>
          <li class="mb-5 flex items-start justify-between">
            <div class="flex">
              <div class="mr-5 text-center text-sm leading-[22px]">
                課程
                <p class="text-4xl font-medium leading-[54px] lg:text-3xl lg:leading-[38px]">30</p>
              </div>
              <div class="text-center text-sm leading-[22px]">
                學員累積
                <p class="text-4xl font-medium leading-[54px] lg:text-3xl lg:leading-[38px]">8</p>
              </div>
            </div>
            <div
              class="flex items-center justify-center rounded border border-primary hover:bg-primary-light hover:text-white"
            >
              <button class="px-[93px] py-2 text-lg leading-[26px]">
                <Icon name="ph:chats" class="mr-2 text-base" />
                品牌聊聊
              </button>
            </div>
          </li>
          <li class="mb-5 flex items-center justify-end">
            <a href="#"><Icon name="ph:facebook-logo-fill" class="mr-3 text-[40px]" /></a
            ><a href="#"><Icon name="ph:instagram-logo-fill" class="mr-3 text-[40px]" /></a>
            <a href="#"><Icon name="ph:house-fill" class="text-[40px]" /></a>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
