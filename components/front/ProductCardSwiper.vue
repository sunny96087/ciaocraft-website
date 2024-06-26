<script setup lang="ts">
import defaultImage from '~/assets/images/front/member/default-image.jpg'
// Import Swiper Vue.js components
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
const modules = [Navigation]

// 串接 API
const courseStore = useCourseStore()
const memberStore = useMemberStore()
const authStore = useAuthStore()

const experienceCourses: any = ref({})
const trainingCourses: any = ref({})
const allCourseInfo: any = ref({})

const isCardLoading = ref(false)

// const isLogin = ref<boolean>()

// 定義接收的 props
const props = defineProps({
  courseTerm: String
})

let data: any = {
  courseTerm: props.courseTerm,
  pageSize: 10
}

async function getCourse() {
  isCardLoading.value = true
  try {
    let query = ''
    let res = null
    if (props.courseTerm === '0' || props.courseTerm === '1') {
      query += `courseTerm=${data.courseTerm}&pageSize=${data.pageSize}`
      // res = await courseStore.apiGetOneCourse(data)
      res = await courseStore.apiGetCourses({ query })
    } else {
      query += `pageSize=${data.pageSize}`
      // res = await courseStore.apiGetAllCourse()
      res = await courseStore.apiGetCourses({ query })
    }
    const result = res.data
    request(result)
  } catch (e) {
    showToast('發生錯誤，請聯繫客服人員')
  }
  isCardLoading.value = false
}

function request(result: { statusCode: number; data: any }) {
  if (result.statusCode === 200) {
    if (props.courseTerm === '0') {
      experienceCourses.value = result.data
    } else if (props.courseTerm === '1') {
      trainingCourses.value = result.data
    } else {
      allCourseInfo.value = result.data
    }
  } else {
    showToast('發生錯誤，請聯繫客服人員')
    console.log('取得課程資料失敗')
  }
}

// 監控收藏資料
const memberCollection = ref(memberStore.collections)
watch(
  () => memberStore.collections,
  (newCollections) => {
    memberCollection.value = newCollections
  },
  { immediate: true }
)

// 取得收藏資料
const fetchMemberCollection = async () => {
  try {
    const res = await memberStore.getMemberCollection()
    const result = res.data
    memberStore.collections = result.data
    memberCollection.value = memberStore.collections
  } catch (err) {
    showToast('發生錯誤，請聯繫客服人員')
  }
}

const isCollected = (id: string): boolean => {
  const isCollected = memberCollection.value.some((item: any) => item.courseId === id)
  return isCollected
}

// 加入收藏
const addCollection = async (courseId: string) => {
  if (!authStore.isLogin) {
    authStore.openLoginModal()
    return
  }

  showToast('收藏課程')
  try {
    if (authStore.isLogin) {
      let postData = {
        courseId: courseId
      }
      const res: any = await memberStore.addCollection(postData)
      const result = res.data
      if (result.statusCode === 200) {
        memberStore.collections.push(result.data)
      } else {
        showToast('收藏失敗，請聯繫客服人員')
      }
    }
  } catch (e) {
    showToast('收藏失敗，請聯繫客服人員')
  }
}

// 刪除收藏
const removeCollection = async (courseId: string) => {
  showToast('取消收藏')
  try {
    let postData = {
      courseId: courseId
    }
    const res = await memberStore.removeCollection(postData)
    const result = res.data
    if (result.statusCode === 200) {
      memberStore.collections = memberStore.collections.filter(
        (item: any) => item.courseId !== courseId
      )
    } else {
      showToast('取消收藏失敗，請聯繫客服人員')
    }
  } catch (e) {
    showToast('取消收藏失敗，請聯繫客服人員')
  }
}

onMounted(async () => {
  try {
    getCourse()
    authStore.checkLogin()
    if (authStore.isLogin) {
      fetchMemberCollection()
    }
  } catch (err) {
    showToast('發生錯誤，請聯繫客服人員')
  }
})
</script>

<template>
  <swiper
    :navigation="true"
    :space-between="30"
    :breakpoints="{
      '375': {
        slidesPerView: 2
      },
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
    v-if="!isCardLoading"
  >
    <swiper-slide v-for="item in experienceCourses" :key="item.id">
      <NuxtLink
        :to="{ name: 'index-index-course-id', params: { id: item._id } }"
        class="group flex h-full flex-col justify-between"
        :id="item._id"
      >
        <div>
          <div class="relative mx-auto mb-2">
            <div class="mx-auto aspect-square overflow-hidden rounded bg-gray2">
              <img
                :src="item.courseImage[0] || defaultImage"
                alt="course-img"
                class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
                loading="lazy"
              />
            </div>
            <transition name="fade">
              <button
                class="absolute right-0 top-0 block p-3"
                @click.stop.prevent="addCollection(item._id)"
                v-if="isCollected(item._id) == false"
              >
                <Icon
                  name="ph:star"
                  class="text-xl text-primary opacity-0 transition duration-300 hover:text-primary-light group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </button>
              <button
                class="absolute right-0 top-0 block p-3"
                @click.stop.prevent="removeCollection(item._id)"
                v-else
              >
                <Icon
                  name="ph:star-fill"
                  class="text-xl text-primary transition duration-300 hover:text-primary-light group-hover:-translate-y-1"
                />
              </button>
            </transition>
          </div>
          <div class="flex space-x-2">
            <div
              class="mb-2 self-start whitespace-nowrap rounded-[4px] px-2 py-0.5 text-sm leading-6"
              :class="{
                'bg-blue4 text-secondary': item.courseTerm === 0,
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
          <div class="flex items-center">
            <span class="mr-1 font-normal leading-6 tracking-[0.5px] text-secondary">NT$</span>
            <span class="font-medium leading-[30px] text-secondary">{{
              formatCurrency(item.coursePrice)
            }}</span>
          </div>
        </div>
      </NuxtLink>
    </swiper-slide>

    <swiper-slide v-for="item in trainingCourses" :key="item.id">
      <NuxtLink
        :to="{ name: 'index-index-course-id', params: { id: item._id } }"
        class="group flex h-full flex-col justify-between"
        :id="item._id"
      >
        <div>
          <div class="relative mx-auto mb-2">
            <div class="mx-auto aspect-square overflow-hidden rounded bg-gray2">
              <img
                :src="item.courseImage[0] || defaultImage"
                alt="course-img"
                class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
                loading="lazy"
              />
            </div>
            <transition name="fade">
              <button
                class="absolute right-0 top-0 block p-3"
                @click.stop.prevent="addCollection(item._id)"
                v-if="isCollected(item._id) == false"
              >
                <Icon
                  name="ph:star"
                  class="text-xl text-primary opacity-0 transition duration-300 hover:text-primary-light group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </button>
              <button
                class="absolute right-0 top-0 block p-3"
                @click.stop.prevent="removeCollection(item._id)"
                v-else
              >
                <Icon
                  name="ph:star-fill"
                  class="text-xl text-primary transition duration-300 hover:text-primary-light group-hover:-translate-y-1"
                />
              </button>
            </transition>
          </div>
          <div class="flex space-x-2">
            <div
              class="mb-2 self-start whitespace-nowrap rounded-[4px] px-2 py-0.5 text-sm leading-6"
              :class="{
                'bg-blue4 text-secondary': item.courseTerm === 0,
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
          <div class="flex items-center">
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
        v-if="!isCardLoading"
      >
        <div>
          <div class="relative mx-auto mb-2">
            <div class="mx-auto aspect-square overflow-hidden rounded bg-gray2">
              <img
                :src="item.courseImage[0] || defaultImage"
                alt="course-img"
                class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
                loading="lazy"
              />
            </div>
            <transition name="fade">
              <button
                class="absolute right-0 top-0 block p-3"
                @click.stop.prevent="addCollection(item._id)"
                v-if="isCollected(item._id) == false"
              >
                <Icon
                  name="ph:star"
                  class="text-xl text-primary opacity-0 transition duration-300 hover:text-primary-light group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </button>
              <button
                class="absolute right-0 top-0 block p-3"
                @click.stop.prevent="removeCollection(item._id)"
                v-else
              >
                <Icon
                  name="ph:star-fill"
                  class="text-xl text-primary transition duration-300 hover:text-primary-light group-hover:-translate-y-1"
                />
              </button>
            </transition>
          </div>
          <div class="flex space-x-2">
            <div
              class="mb-2 self-start whitespace-nowrap rounded-[4px] px-2 py-0.5 text-sm leading-6"
              :class="{
                'bg-blue4 text-secondary': item.courseTerm === 0,
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
          <div class="flex items-center">
            <span class="mr-1 font-normal leading-6 tracking-[0.5px] text-secondary">NT$</span>
            <span class="font-medium leading-[30px] text-secondary">{{
              formatCurrency(item.coursePrice)
            }}</span>
          </div>
        </div>
      </NuxtLink>
    </swiper-slide>
  </swiper>

  <!-- 收藏元件 Skeleton loader -->
  <swiper
    :navigation="true"
    :space-between="30"
    :breakpoints="{
      '375': {
        slidesPerView: 2
      },
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
    v-if="isCardLoading"
  >
    <swiper-slide v-for="n in 5" :key="n">
      <div class="flex h-full flex-col justify-between">
        <div>
          <div class="mx-auto mb-2">
            <div class="mx-auto aspect-square overflow-hidden rounded bg-gray2">
              <div class="h-full w-full rounded object-cover"></div>
            </div>
          </div>
          <div class="mb-2 flex space-x-2">
            <div
              class="mb-2 self-start whitespace-nowrap rounded-[4px] bg-gray2 px-2 py-0.5 text-sm leading-6 text-transparent"
            >
              體驗
            </div>
            <div class="line-clamp-2 bg-gray2 text-transparent">課程名稱 placeholder</div>
          </div>
        </div>
        <div>
          <span class="mb-1 block bg-gray2 text-transparent">品牌名稱 placeholder</span>
          <div class="flex items-center">
            <div class="mr-1 bg-gray2 text-transparent">NT$</div>
            <div class="bg-gray2 text-transparent">$1,000</div>
          </div>
        </div>
      </div>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
