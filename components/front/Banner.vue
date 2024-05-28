<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

import 'swiper/css/navigation'

// import required modules
import { Navigation, Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Pagination, Navigation]
    }
  }
}
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
    class="bannerSwiper h-[400px] w-full overflow-hidden"
  >
    <swiper-slide
      ><a href="#"
        ><img
          src="~/assets/images/front/Banner_2.png"
          alt="banner圖片2"
          class="h-[400px] w-[800px] rounded-xl object-cover object-top" /></a
    ></swiper-slide>
    <swiper-slide
      ><a href="#"
        ><img
          src="~/assets/images/front/Banner_1.png"
          alt="banner圖片1"
          class="h-[400px] w-[800px] rounded-xl object-cover object-top" /></a
    ></swiper-slide>
    <swiper-slide
      ><a href="#"
        ><img
          src="~/assets/images/front/Banner_3.png"
          alt="banner圖片3"
          class="h-[400px] w-[800px] rounded-xl object-cover object-top" /></a
    ></swiper-slide>
  </swiper>
</template>

<style scoped>
.bannerSwiper .swiper-pagination-bullet {
  background: #292524;
  width: 12px;
  height: 12px;
}

/* .bannerSwiper .swiper-slide .swiper-slide-active:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
} */

.bannerSwiper .swiper-button-prev:after,
.bannerSwiper .swiper-button-next:after {
  display: none;
}

.bannerSwiper .swiper-button-prev {
  left: 170px;
  top: 200px;
  background-image: url('~/assets/images/front/Button_left_small.png');
  width: 36px;
  height: 36px;
}

.bannerSwiper .swiper-button-next {
  right: 150px;
  top: 200px;
  background-image: url('~/assets/images/front/Button_right_small.png');
  width: 36px;
  height: 36px;
}

@media (min-width: 768px) {
  .bannerSwiper .swiper-button-prev {
    left: 240px;
    background-image: url('~/assets/images/front/Button_left.png');
    width: 60px;
    height: 60px;
  }
  .bannerSwiper .swiper-button-next {
    right: 210px;
    background-image: url('~/assets/images/front/Button_right.png');
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 1024px) {
  .bannerSwiper .swiper-button-prev {
    left: 330px;
  }
  .bannerSwiper .swiper-button-next {
    right: 290px;
  }
}

@media (min-width: 1057px) {
  .bannerSwiper .swiper-button-prev {
    left: 635px;
  }
  .bannerSwiper .swiper-button-next {
    right: 570px;
  }
}
</style>
