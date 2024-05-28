<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Pagination]
    }
  }
}
</script>

<template>
  <div class="mx-5 my-2.5 flex">
    <swiper
      :slides-per-view="1"
      :space-between="20"
      :pagination="false"
      :breakpoints="{
        '200': {
          slidesPerView: 2
        },
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
