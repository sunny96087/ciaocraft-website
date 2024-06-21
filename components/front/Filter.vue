<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'

const modules = [Pagination]
</script>

<template>
  <div class="flex bg-white px-5 py-2.5">
    <swiper
      :slides-per-view="2"
      space-between="20"
      :breakpoints="{
        '400': {
          slidesPerView: 3
        },
        '576': {
          slidesPerView: 4
        },
        '768': {
          slidesPerView: 5
        },
        '1024': {
          slidesPerView: 6
        }
      }"
      :autoplay="false"
      :modules="modules"
      class="filterSwiper"
    >
      <swiper-slide>
        <a href="#" class="hover:text-primary">
          <img src="~/assets/images/front/Category_Img_1.png" alt="單堂體驗icon" class="mb-3" />
          <p class="text-xl font-medium leading-[30px]">單堂體驗</p>
        </a>
      </swiper-slide>
      <swiper-slide>
        <a href="#" class="hover:text-primary">
          <img src="~/assets/images/front/Category_Img_2.png" alt="專業培訓icon" class="mb-3" />
          <p class="text-xl font-medium leading-[30px]">專業培訓</p>
        </a>
      </swiper-slide>
      <swiper-slide>
        <a href="#" class="hover:text-primary">
          <img src="~/assets/images/front/Category_Img_3.png" alt="工藝手作icon" class="mb-3" />
          <p class="text-xl font-medium leading-[30px]">工藝手作</p>
        </a>
      </swiper-slide>
      <swiper-slide>
        <a href="#" class="hover:text-primary">
          <img src="~/assets/images/front/Category_Img_4.png" alt="烹飪烘焙icon" class="mb-3" />
          <p class="text-xl font-medium leading-[30px]">烹飪烘焙</p>
        </a>
      </swiper-slide>
      <swiper-slide>
        <a href="#" class="hover:text-primary">
          <img src="~/assets/images/front/Category_Img_5.png" alt="藝術人文icon" class="mb-3" />
          <p class="text-xl font-medium leading-[30px]">藝術人文</p>
        </a>
      </swiper-slide>
      <swiper-slide>
        <a href="#" class="hover:text-primary">
          <img src="~/assets/images/front/Category_Img_6.png" alt="生活品味icon" class="mb-3" />
          <p class="text-xl font-medium leading-[30px]">生活品味</p>
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.filterSwiper :deep(.swiper-slide) {
  width: auto !important;
}
</style>
