<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

import 'swiper/css/navigation'

// import required modules
import { Navigation, Pagination } from 'swiper/modules'

const modules = [Pagination, Navigation, SwiperAutoplay]
</script>

<template>
  <client-only>
    <swiper
      :loop="true"
      :navigation="true"
      :slides-per-view="1.6"
      :centered-slides="true"
      :space-between="20"
      :pagination="{
        clickable: true
      }"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: true
      }"
      :modules="modules"
      class="bannerSwiper relative h-[200px] w-full overflow-hidden md:h-[300px] lg:h-[400px]"
    >
      <swiper-slide class="overflow-hidden rounded-xl">
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
      <swiper-slide class="overflow-hidden rounded-xl">
        <a href="#">
          <img
            src="~/assets/images/front/Banner_3.png"
            alt="banner圖片3"
            class="h-full w-full rounded-xl object-cover object-top"
          />
        </a>
        <div class="absolute left-0 top-0 h-full w-full bg-black opacity-40"></div>
      </swiper-slide>
      <swiper-slide class="overflow-hidden rounded-xl">
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
      <swiper-slide class="overflow-hidden rounded-xl">
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
  </client-only>
</template>

<style scoped>
.bannerSwiper ::v-deep(.swiper-pagination .swiper-pagination-bullet-active) {
  background: #292524;
  width: 36px;
  height: 12px;
  border-radius: 8px;
}

.bannerSwiper ::v-deep(.swiper-button-prev):after,
.bannerSwiper ::v-deep(.swiper-button-next):after {
  display: none;
}

.bannerSwiper ::v-deep(.swiper-button-prev) {
  left: 16%;
  /* top: 200px; */
  top: 50%;
  /* transform: translateY(-50%); */
  background-image: url('~/assets/images/front/Button_left_small.png');
  width: 36px;
  height: 36px;
}

.bannerSwiper ::v-deep(.swiper-button-next) {
  right: 16%;
  /* top: 200px; */
  top: 50%;
  /* transform: translateY(50%); */
  background-image: url('~/assets/images/front/Button_right_small.png');
  width: 36px;
  height: 36px;
}

@media (min-width: 768px) {
  .bannerSwiper ::v-deep(.swiper-button-prev) {
    /* left: 240px; */
    background-image: url('~/assets/images/front/Button_left.png');
    width: 60px;
    height: 60px;
  }
  .bannerSwiper ::v-deep(.swiper-button-next) {
    /* right: 210px; */
    background-image: url('~/assets/images/front/Button_right.png');
    width: 60px;
    height: 60px;
  }
}

::v-deep .swiper-slide-prev,
.swiper-slide-next {
  opacity: 0.6;
}
</style>
