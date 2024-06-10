<script>
import { ref } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const thumbsSwiper = ref(null)

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper
    }

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs]
    }
  }
}
</script>

<template>
  <div class="crouseCarousel">
    <swiper
      v-if="thumbsSwiper"
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff'
      }"
      :loop="true"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="crouseSwiper2"
    >
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :loop="true"
      :spaceBetween="10"
      :slidesPerView="4"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="crouseSwiper"
    >
      <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
/* #app {
  height: 100%;
} */
/* html,
body {
  position: relative;
  height: 100%;
} */

.crouseCarousel {
  position: relative;
  /* height: 100%; */
  width: 100%;
}

/* @media (min-width: 768px) {
  .crouseCarousel {
    width: 100%;
  }
} */

@media (min-width: 1024px) {
  .crouseCarousel {
    width: 48%;
    /* max-width: 590px; */
  }
}

/* body {
  background: #eee;
  font-family:
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
} */

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

/* body {
  background: #000;
  color: #000;
} */

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.crouseSwiper2 {
  /* width: 590px; */
  height: 539px;
  /* height: 80%;
  width: 100%; */
}

@media (min-width: 768px) {
  .crouseSwiper2 {
    height: 728px;
  }
}

@media (min-width: 1024px) {
  .crouseSwiper2 {
    height: 590px;
  }
}

.crouseSwiper {
  /* width: 590px; */
  height: 101px;
  /* height: 20%; */
  box-sizing: border-box;
  padding: 10px 0;
}

@media (min-width: 768px) {
  .crouseSwiper {
    height: 138px;
  }
}

@media (min-width: 1024px) {
  .crouseSwiper {
    height: 112px;
  }
}

.crouseSwiper .swiper-slide {
  width: 100px;
  height: 101px;
  /* width: 112px;
  height: 112px; */
  /* width: 25%;
  height: 100%; */
  opacity: 0.4;
}

@media (min-width: 768px) {
  .crouseSwiper .swiper-slide {
    width: 139px;
    height: 138px;
  }
}

@media (min-width: 1024px) {
  .crouseSwiper .swiper-slide {
    width: 112px;
    height: 112px;
  }
}

.crouseSwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.crouseSwiper2 :deep(.swiper-button-prev),
.crouseSwiper2 :deep(.swiper-button-next) {
  background-color: #aaaaaacc;
}
</style>
