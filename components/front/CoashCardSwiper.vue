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
        slidesPerView: 4
      },
      '1400': {
        slidesPerView: 6
      }
    }"
    :pagination="false"
    :modules="modules"
    class="coachCardSwiper"
  >
    <swiper-slide>
      <div class="rounded-lg border border-gray3 bg-white p-4">
        <a href="#">
          <img
            src="~/assets/images/front/Card_Img.png"
            alt="課程圖片"
            class="d-block mx-auto mb-3 h-[120px] w-[120px] rounded-full"
          />
          <p class="mb-2 text-center text-xl font-medium leading-[30px]">Joan Hsu</p>
          <p class="mb-4">
            自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述
          </p>
          <button
            class="flex w-full items-center justify-center rounded bg-primary py-2 text-white hover:bg-primary-light"
          >
            了解更多
          </button>
        </a>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="rounded-lg border border-gray3 bg-white p-4">
        <a href="#">
          <img
            src="~/assets/images/front/Card_Img.png"
            alt="課程圖片"
            class="d-block mx-auto mb-3 h-[120px] w-[120px] rounded-full"
          />
          <p class="mb-2 text-center text-xl font-medium leading-[30px]">Joan Hsu</p>
          <p class="mb-4">
            自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述
          </p>
          <button
            class="flex w-full items-center justify-center rounded bg-primary py-2 text-white hover:bg-primary-light"
          >
            了解更多
          </button>
        </a>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="rounded-lg border border-gray3 bg-white p-4">
        <a href="#">
          <img
            src="~/assets/images/front/Card_Img.png"
            alt="課程圖片"
            class="d-block mx-auto mb-3 h-[120px] w-[120px] rounded-full"
          />
          <p class="mb-2 text-center text-xl font-medium leading-[30px]">Joan Hsu</p>
          <p class="mb-4">
            自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述
          </p>
          <button
            class="flex w-full items-center justify-center rounded bg-primary py-2 text-white hover:bg-primary-light"
          >
            了解更多
          </button>
        </a>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="rounded-lg border border-gray3 bg-white p-4">
        <a href="#">
          <img
            src="~/assets/images/front/Card_Img.png"
            alt="課程圖片"
            class="d-block mx-auto mb-3 h-[120px] w-[120px] rounded-full"
          />
          <p class="mb-2 text-center text-xl font-medium leading-[30px]">Joan Hsu</p>
          <p class="mb-4">
            自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述
          </p>
          <button
            class="flex w-full items-center justify-center rounded bg-primary py-2 text-white hover:bg-primary-light"
          >
            了解更多
          </button>
        </a>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="rounded-lg border border-gray3 bg-white p-4">
        <a href="#">
          <img
            src="~/assets/images/front/Card_Img.png"
            alt="課程圖片"
            class="d-block mx-auto mb-3 h-[120px] w-[120px] rounded-full"
          />
          <p class="mb-2 text-center text-xl font-medium leading-[30px]">Joan Hsu</p>
          <p class="mb-4">
            自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述
          </p>
          <button
            class="flex w-full items-center justify-center rounded bg-primary py-2 text-white hover:bg-primary-light"
          >
            了解更多
          </button>
        </a>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="rounded-lg border border-gray3 bg-white p-4">
        <a href="#">
          <img
            src="~/assets/images/front/Card_Img.png"
            alt="課程圖片"
            class="d-block mx-auto mb-3 h-[120px] w-[120px] rounded-full"
          />
          <p class="mb-2 text-center text-xl font-medium leading-[30px]">Joan Hsu</p>
          <p class="mb-4">
            自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述自我簡述
          </p>
          <button
            class="flex w-full items-center justify-center rounded bg-primary py-2 text-white hover:bg-primary-light"
          >
            了解更多
          </button>
        </a>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.coachCardSwiper :deep(.swiper-button-prev):after,
.coachCardSwiper :deep(.swiper-button-next):after {
  display: none;
}

.coachCardSwiper :deep(.swiper-button-prev) {
  background-image: url('~/assets/images/front/Button_left_small.png');
  width: 36px;
  height: 36px;
}

.coachCardSwiper :deep(.swiper-button-next) {
  background-image: url('~/assets/images/front/Button_right_small.png');
  width: 36px;
  height: 36px;
}
</style>
