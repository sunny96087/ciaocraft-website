<!-- <script>
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
</script> -->

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const modules = [Navigation]

// 串接 API
import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()

const artCourseInfo: any = ref({})
const handCourseInfo: any = ref({})
const allCourseInfo: any = ref({})

onMounted(() => {
  getCourse()
})

// 定義接收的 props
const props = defineProps({
  courseType: String
})

let data = {
  courseType: props.courseType,
  pageSize: 6
}

async function getCourse() {
  try {
    let res
    if (props.courseType === '藝術人文' || props.courseType === '工藝手作') {
      res = await courseStore.apiGetOneCourse(data)
    } else {
      res = await courseStore.apiGetAllCourse(data)
    }
    const result = res.data
    // console.log(result)

    request(result)
  } catch (e) {
    console.log(e)
  }
}

function request(result: { statusCode: number; data: any }) {
  if (result.statusCode === 200) {
    if (props.courseType === '藝術人文') {
      artCourseInfo.value = result.data
      // console.log(`artCourseInfo = ${JSON.stringify(artCourseInfo.value)}`)
    } else if (props.courseType === '工藝手作') {
      handCourseInfo.value = result.data
      console.log(`handCourseInfo `, handCourseInfo.value)
      // console.log(`handCourseInfo = ${JSON.stringify(handCourseInfo.value)}`)
    } else {
      allCourseInfo.value = result.data
      // console.log(`allCourseInfo = ${JSON.stringify(allCourseInfo.value)}`)
    }
  } else {
    console.log('取得課程資料失敗')
  }
}

// 格式化價格的計算屬性
const formattedPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
    class="productCardSwiper grid grid-cols-2 gap-8 px-4 md:grid-cols-3 md:px-8 lg:grid-cols-5"
  >
    <swiper-slide v-for="item in artCourseInfo" :key="item.id">
      <NuxtLink
        :to="{ name: 'index-index-course-id', params: { id: item._id } }"
        class="group flex h-full flex-col justify-between"
        :id="item._id"
      >
        <div>
          <div class="relative mx-auto mb-2">
            <div class="mx-auto aspect-square overflow-hidden rounded bg-gray2">
              <img
                :src="item.courseImage[0]"
                alt="course-img"
                class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
              />
            </div>
            <button class="absolute right-0 top-0 block p-3">
              <Icon
                name="ph:star"
                class="text-xl opacity-0 transition duration-300 hover:text-dark4 group-hover:-translate-y-1 group-hover:opacity-100"
              />
            </button>
          </div>
          <div class="flex space-x-2">
            <div
              class="mb-2 self-start whitespace-nowrap rounded-[4px] px-2 py-0.5 text-sm leading-6"
              :class="{
                'bg-secondary text-white': item.courseTerm === 0,
                'bg-primary text-white': item.courseTerm === 1
              }"
            >
              {{ item.courseTerm === 0 ? '體驗' : '培訓' }}
            </div>
            <h2 class="line-clamp-2 group-hover:text-dark3">
              {{ item.courseName }}
            </h2>
          </div>
        </div>
        <div>
          <p class="mb-1 truncate text-sm leading-[22px]">{{ item.brandName }}</p>
          <div class="flex">
            <span class="mr-1 font-normal leading-6 tracking-[0.5px] text-secondary">NT$</span>
            <span class="font-medium leading-[30px] text-secondary">{{
              formatCurrency(item.coursePrice)
            }}</span>
          </div>
        </div>
      </NuxtLink>
    </swiper-slide>
    <swiper-slide v-for="item in handCourseInfo" :key="item.id">
      <NuxtLink
        :to="{ name: 'index-index-course-id', params: { id: item._id } }"
        class="group flex h-full flex-col justify-between"
        :id="item._id"
      >
        <div>
          <div class="relative mx-auto mb-2">
            <div class="mx-auto aspect-square overflow-hidden rounded bg-gray2">
              <img
                :src="item.courseImage[0]"
                alt="course-img"
                class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
              />
            </div>
            <button class="absolute right-0 top-0 block p-3">
              <Icon
                name="ph:x"
                class="text-xl opacity-0 transition duration-300 hover:text-dark4 group-hover:-translate-y-1 group-hover:opacity-100"
              />
            </button>
          </div>
          <div class="flex space-x-2">
            <div
              class="mb-2 self-start whitespace-nowrap rounded-[4px] px-2 py-0.5 text-sm leading-6"
              :class="{
                'bg-secondary text-white': item.courseTerm === 0,
                'bg-primary text-white': item.courseTerm === 1
              }"
            >
              {{ item.courseTerm === 0 ? '體驗' : '培訓' }}
            </div>
            <h2 class="line-clamp-2 group-hover:text-dark3">
              {{ item.courseName }}
            </h2>
          </div>
        </div>
        <div>
          <p class="mb-1 truncate text-sm leading-[22px]">{{ item.brandName }}</p>
          <div class="flex">
            <span class="mr-1 font-normal leading-6 tracking-[0.5px] text-secondary">NT$</span>
            <span class="font-medium leading-[30px] text-secondary">{{
              formatCurrency(item.coursePrice)
            }}</span>
          </div>
        </div>
      </NuxtLink>
    </swiper-slide>
    <swiper-slide v-for="item in allCourseInfo" :key="item.id">
      <NuxtLink
        :to="{ name: 'index-index-course-id', params: { id: item._id } }"
        class="group flex h-full flex-col justify-between"
        :id="item._id"
      >
        <div>
          <div class="relative mx-auto mb-2">
            <div class="mx-auto aspect-square overflow-hidden rounded bg-gray2">
              <img
                :src="item.courseImage[0]"
                alt="course-img"
                class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
              />
            </div>
            <button class="absolute right-0 top-0 block p-3">
              <Icon
                name="ph:x"
                class="text-xl opacity-0 transition duration-300 hover:text-dark4 group-hover:-translate-y-1 group-hover:opacity-100"
              />
            </button>
          </div>
          <div class="flex space-x-2">
            <div
              class="mb-2 self-start whitespace-nowrap rounded-[4px] px-2 py-0.5 text-sm leading-6"
              :class="{
                'bg-secondary text-white': item.courseTerm === 0,
                'bg-primary text-white': item.courseTerm === 1
              }"
            >
              {{ item.courseTerm === 0 ? '體驗' : '培訓' }}
            </div>
            <h2 class="line-clamp-2 group-hover:text-dark3">
              {{ item.courseName }}
            </h2>
          </div>
        </div>
        <div>
          <p class="mb-1 truncate text-sm leading-[22px]">{{ item.brandName }}</p>
          <div class="flex">
            <span class="mr-1 font-normal leading-6 tracking-[0.5px] text-secondary">NT$</span>
            <span class="font-medium leading-[30px] text-secondary">{{
              formatCurrency(item.coursePrice)
            }}</span>
          </div>
        </div>
      </NuxtLink>
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
