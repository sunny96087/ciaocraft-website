<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Navigation]
    }
  }
}
</script>

<template>
  <swiper
    :navigation="true"
    :space-between="30"
    :breakpoints="{
      '576': {
        slidesPerView: 2
      },
      '768': {
        slidesPerView: 3
      },
      '1024': {
        slidesPerView: 5
      }
    }"
    :pagination="false"
    :modules="modules"
    class="productCardSwiper"
  >
    <swiper-slide>
      <a href="#">
        <img src="~/assets/images/front/Card_Img.png" alt="課程圖片" class="mb-2 rounded" />
        <div>
          <div class="mb-2 flex items-start">
            <p class="text-secondary bg-blue4 mr-[8px] rounded px-2 py-0.5">體驗</p>
            <p>課程名稱課程名稱</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </swiper-slide>
    <swiper-slide>
      <a href="#">
        <img src="~/assets/images/front/Card_Img.png" alt="課程圖片" class="mb-2 rounded" />
        <div>
          <div class="mb-2 flex items-start">
            <p class="text-secondary bg-blue4 mr-[8px] rounded px-2 py-0.5">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </swiper-slide>
    <swiper-slide>
      <a href="#">
        <img src="~/assets/images/front/Card_Img.png" alt="課程圖片" class="mb-2 rounded" />
        <div>
          <div class="mb-2 flex items-start">
            <p class="text-secondary bg-blue4 mr-[8px] rounded px-2 py-0.5">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </swiper-slide>
    <swiper-slide>
      <a href="#">
        <img src="~/assets/images/front/Card_Img.png" alt="課程圖片" class="mb-2 rounded" />
        <div>
          <div class="mb-2 flex items-start">
            <p class="text-secondary bg-blue4 mr-[8px] rounded px-2 py-0.5">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </swiper-slide>
    <swiper-slide>
      <a href="#">
        <img src="~/assets/images/front/Card_Img.png" alt="課程圖片" class="mb-2 rounded" />
        <div>
          <div class="mb-2 flex items-start">
            <p class="text-secondary bg-blue4 mr-[8px] rounded px-2 py-0.5">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </swiper-slide>
    <swiper-slide>
      <a href="#">
        <img src="~/assets/images/front/Card_Img.png" alt="課程圖片" class="mb-2 rounded" />
        <div>
          <div class="mb-2 flex items-start">
            <p class="text-secondary bg-blue4 mr-[8px] rounded px-2 py-0.5">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </swiper-slide>
  </swiper>

  <!-- <ul class="grid grid-cols-5 gap-x-[30px] mx-[30px]">
    <li>
      <a href="#">
        <img src="~/assets/images/front/Card_Img.png" alt="課程圖片" class="rounded mb-2" />
        <div>
          <div class="flex items-start mb-2">
            <p class="text-secondary bg-blue4 py-0.5 px-2 mr-[8px] rounded">體驗</p>
            <p>課程名稱課程名稱課程名稱課程名稱課程名稱課程名稱課程名稱課程名稱課程名稱</p>
          </div>
          <p class="text-sm leading-[22px] mb-1">品牌名稱</p>
          <p class="text-secondary">NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span></p>
        </div>
      </a>
    </li>
  </ul> -->
</template>

<style>
.productCardSwiper .swiper-button-prev:after,
.productCardSwiper .swiper-button-next:after {
  display: none;
}

.productCardSwiper .swiper-button-prev {
  background-image: url('~/assets/images/front/Button_left_small.png');
  width: 36px;
  height: 36px;
}

.productCardSwiper .swiper-button-next {
  background-image: url('~/assets/images/front/Button_right_small.png');
  width: 36px;
  height: 36px;
}
</style>
