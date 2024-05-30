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

<!-- 切版缺：卡片點擊時星星變色並留停 -->
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
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
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
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
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
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
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
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
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
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
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
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
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
</template>

<style scoped>
.productCardSwiper :deep(.swiper-button-prev):after,
.productCardSwiper :deep(.swiper-button-next):after {
  display: none;
}

.productCardSwiper :deep(.swiper-button-prev) {
  background-image: url('~/assets/images/front/Button_left_small.png');
  width: 36px;
  height: 36px;
}

.productCardSwiper :deep(.swiper-button-next) {
  background-image: url('~/assets/images/front/Button_right_small.png');
  width: 36px;
  height: 36px;
}

.productCardSwiper :deep(.swiper-slide):hover .course {
  background: #000000;
  opacity: 0.5;
}

.productCardSwiper :deep(.swiper-slide):hover .course-star {
  display: block;
  background-image: url('~/assets/images/front/Button(star).png');
}

.productCardSwiper :deep(.swiper-slide):hover .course-star:hover {
  background-image: url('~/assets/images/front/Button(star_hover).png');
  background-size: contain;
}

/* .productCardSwiper :deep(.swiper-slide) .course:active + .course-star:hover {
  display: block;
  background-image: url('~/assets/images/front/Button(star_hover).png');
  width: 32px;
  height: 32px;
} */
</style>
