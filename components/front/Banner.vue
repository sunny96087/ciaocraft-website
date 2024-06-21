<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

import 'swiper/css/navigation'

// import required modules
import { Navigation, Pagination } from 'swiper/modules'

const modules = [Pagination, Navigation]
</script>

<template>
  <swiper
    :navigation="true"
    :slides-per-view="2.9"
    :space-between="30"
    :pagination="{
      clickable: true
    }"
    :modules="modules"
    class="bannerSwiper relative h-[200px] w-full overflow-hidden md:h-[300px] lg:h-[400px]"
  >
    <swiper-slide class="overflow-hidden rounded-r-xl">
      <a href="#"
        ><img
          src="~/assets/images/front/Banner_2.png"
          alt="banner圖片2"
          class="h-full w-full rounded-xl object-cover object-top"
        />
      </a>
      <div class="absolute left-0 top-0 h-full w-full bg-black opacity-40"></div>
    </swiper-slide>
    <swiper-slide class="overflow-hidden rounded-xl">
      <a href="#"
        ><img
          src="~/assets/images/front/Banner_1.png"
          alt="banner圖片1"
          class="h-full w-full rounded-xl object-cover object-top"
        /> </a
    ></swiper-slide>
    <swiper-slide class="overflow-hidden rounded-l-xl">
      <a href="#">
        <img
          src="~/assets/images/front/Banner_3.png"
          alt="banner圖片3"
          class="h-full w-full rounded-xl object-cover object-top"
        />
      </a>
      <div class="absolute left-0 top-0 h-full w-full bg-black opacity-40"></div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.bannerSwiper :deep(.swiper-pagination .swiper-pagination-bullet-active) {
  background: #292524;
  width: 36px;
  height: 12px;
  border-radius: 8px;
}

.bannerSwiper :deep(.swiper-button-prev):after,
.bannerSwiper :deep(.swiper-button-next):after {
  display: none;
}

.bannerSwiper :deep(.swiper-button-prev) {
  left: 170px;
  top: 200px;
  background-image: url('~/assets/images/front/Button_left_small.png');
  width: 36px;
  height: 36px;
}

.bannerSwiper :deep(.swiper-button-next) {
  right: 150px;
  top: 200px;
  background-image: url('~/assets/images/front/Button_right_small.png');
  width: 36px;
  height: 36px;
}

@media (min-width: 200px) {
  .bannerSwiper :deep(.swiper-button-prev) {
    left: 140px;
  }
  .bannerSwiper :deep(.swiper-button-next) {
    right: 110px;
  }
}

@media (min-width: 768px) {
  .bannerSwiper :deep(.swiper-button-prev) {
    left: 240px;
    background-image: url('~/assets/images/front/Button_left.png');
    width: 60px;
    height: 60px;
  }
  .bannerSwiper :deep(.swiper-button-next) {
    right: 210px;
    background-image: url('~/assets/images/front/Button_right.png');
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 1024px) {
  .bannerSwiper :deep(.swiper-button-prev) {
    left: 330px;
  }
  .bannerSwiper :deep(.swiper-button-next) {
    right: 290px;
  }
}

@media (min-width: 1057px) {
  .bannerSwiper :deep(.swiper-button-prev) {
    left: 635px;
  }
  .bannerSwiper :deep(.swiper-button-next) {
    right: 570px;
  }
}
</style>
