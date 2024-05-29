<script setup lang="ts"></script>

<template>
  <div class="mb-[30px]">
    <front-banner />
  </div>
  <div class="mx-5 mb-[30px] rounded-[40px] border border-gray md:mx-[84px] lg:mx-[360px]">
    <front-search />
  </div>
  <div class="mx-5 mb-[66px] rounded-xl border border-white filter md:mx-10 lg:mx-[350px]">
    <front-filter />
  </div>
  <div class="mx-5 lg:mx-[100px]">
    <div class="mx-auto max-w-screen-xl">
      <div class="mb-9">
        <div class="mb-[30px] flex items-end">
          <h2 class="mr-5 text-3xl font-medium leading-[38px]">單堂體驗課程</h2>
          <a href="#" class="flex">
            <p class="mr-1 text-primary">更多</p>
            <img src="~/assets/images/front/Icon_new_more.png" alt="箭頭" />
          </a>
        </div>
        <front-product-card-swiper />
      </div>
      <div class="mb-9">
        <div class="mb-[30px] flex items-end">
          <h2 class="mr-5 text-3xl font-medium leading-[38px]">系統培訓課程</h2>
          <a href="#" class="flex">
            <p class="mr-1 text-primary">更多</p>
            <img src="~/assets/images/front/Icon_new_more.png" alt="箭頭" />
          </a>
        </div>
        <front-product-card-swiper />
      </div>
      <div class="mb-9">
        <div class="mb-[30px] flex items-end">
          <h2 class="mr-5 text-3xl font-medium leading-[38px]">你可能適合</h2>
          <a href="#" class="flex">
            <p class="mr-1 text-primary">更多</p>
            <img src="~/assets/images/front/Icon_new_more.png" alt="箭頭" />
          </a>
        </div>
        <front-product-card-swiper />
      </div>
      <div class="mb-9 text-dark1">
        <front-about />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter {
  box-shadow: 0px 10px 15px 0px #050d1d2e;
}
</style>
