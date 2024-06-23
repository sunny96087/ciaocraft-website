<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/navigation'

// import required modules
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
  courseTerm: '',
  courseType: props.courseType,
  pageSize: 6
}

async function getCourse() {
  try {
    let res
    if (props.courseType === '藝術人文' || props.courseType === '工藝手作') {
      res = await courseStore.apiGetTypeCourse(data)
    } else {
      res = await courseStore.apiGetAllCourse()
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
    <swiper-slide v-for="item in artCourseInfo" :key="item.id" class="flex min-h-[300px] flex-col">
      <a href="#" class="relative block flex h-full flex-col">
        <img
          :src="item.courseImage[0]"
          alt="課程圖片"
          class="course mb-2 h-[220px] w-full rounded object-cover"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div class="flex flex-col">
          <div class="mb-2 flex h-[75px] items-start">
            <p class="mr-[8px] w-1/3 rounded bg-blue4 px-2 py-0.5 text-center text-secondary">
              體驗
            </p>
            <p class="w-full">{{ item.courseName }}</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">{{ item.brandName }}</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">{{
              formattedPrice(item.coursePrice)
            }}</span>
          </p>
        </div>
      </a>
    </swiper-slide>
    <swiper-slide v-for="item in handCourseInfo" :key="item.id" class="flex min-h-[300px] flex-col">
      <a href="#" class="relative block flex h-full flex-col">
        <img
          :src="item.courseImage[0]"
          alt="課程圖片"
          class="course mb-2 h-[220px] w-full rounded object-cover"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div class="flex flex-col">
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] w-1/3 rounded bg-blue4 px-2 py-0.5 text-center text-secondary">
              體驗
            </p>
            <p class="w-full">{{ item.courseName }}</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">{{ item.brandName }}</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">{{
              formattedPrice(item.coursePrice)
            }}</span>
          </p>
        </div>
      </a>
    </swiper-slide>
    <swiper-slide v-for="item in allCourseInfo" :key="item.id" class="flex min-h-[300px] flex-col">
      <a href="#" class="relative block flex h-full flex-col">
        <img
          :src="item.courseImage[0]"
          alt="課程圖片"
          class="course mb-2 h-[220px] w-full rounded object-cover"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div class="flex flex-col">
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] w-1/3 rounded bg-blue4 px-2 py-0.5 text-center text-secondary">
              體驗
            </p>
            <p class="w-full">{{ item.courseName }}</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">{{ item.brandName }}</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">{{
              formattedPrice(item.coursePrice)
            }}</span>
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

/* 切缺：點擊星星收藏後要停留在卡片上>>測不出來，當時寫的樣式 */
/* .productCardSwiper :deep(.swiper-slide) .course:active + .course-star:hover {
  display: block;
  background-image: url('~/assets/images/front/Button(star_hover).png');
  width: 32px;
  height: 32px;
} */
</style>
