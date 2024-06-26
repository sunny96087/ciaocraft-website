<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
import { hideLoading, showLoading, showToast } from '~/stores/eventBus'
const store = APIStore()
const courseStore = useCourseStore()
const authStore = useAuthStore()
const memberStore = useMemberStore()
const router = useRouter()
const route = useRoute()
const vid = route.params.id

const breadcrumb = [
  { pageName: '首頁', link: '/', isCurrentPage: false },
  { pageName: '搜尋', link: '/search', isCurrentPage: false },
  { pageName: '品牌介紹', link: `/vendor/${vid}`, isCurrentPage: true }
]

// 定義 vendorId 為響應式參考
const vendorId = ref()
const vendorInfo: any = ref({})

const courseTerm = ref('') // 課程時長類型, 0: 單堂體驗 1:培訓課程
const courseType = ref('') // 課程類型, "工藝手作", "烹飪烘焙", "藝術人文", "生活品味"
const sortBy = ref('newest') // 排序類型, "最近時間 newest", "熱門課程 mostPopular", "評分最高 highestRate"

// 定義 isSortOpen 為布林類型的 ref
// 使用 ref 管理排序選單的顯示狀態
const isSortOpen = ref<boolean>(false)

// 定義 toggleSort 函數，其返回類型為 void
// 切換排序選單顯示狀態
const toggleSort = (): void => {
  isSortOpen.value = !isSortOpen.value
}

// NOTE swiper
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
const modules = [Navigation]

const hydrated = ref(false)
onMounted(async () => {
  // 從網址取得參數
  vendorId.value = route.params.id
  hydrated.value = true
  getVendorData()
  fetchMemberCollection()
})

// 取得廠商資料
async function getVendorData() {
  try {
    showLoading()

    let data = {
      vendorId: vendorId.value,
      courseTerm: courseTerm.value ? Number(courseTerm.value) : '',
      courseType: courseType.value ? courseType.value : '',
      sortBy: sortBy.value
    }

    const res = await store.apiGetVendor(data)
    const result = res.data
    // console.log(`getVendorData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      vendorInfo.value = result.data
      console.log(vendorInfo.value)
      // console.log(`vendorInfo = ${JSON.stringify(vendorInfo.value)}`)
    } else {
      console.log('取得廠商資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 使用 computed 來計算四捨五入後的評分
const roundedRating = computed(() => {
  return Math.round(vendorInfo.value.averageRating || 0)
})

watch([courseTerm, courseType, sortBy], () => {
  getVendorData()
})

// 修改排序
function changeSort(sort: string) {
  sortBy.value = sort
  isSortOpen.value = false
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

const fetchMemberCollection = async () => {
  try {
    const res = await memberStore.getMemberCollection()
    const result = res.data
    memberStore.collections = result.data
    memberCollection.value = memberStore.collections
  } catch (err) {
    // showToast('發生錯誤，請聯繫客服人員', 'error')
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
        showToast('收藏失敗，請聯繫客服人員', 'error')
      }
    }
  } catch (e) {
    showToast('收藏失敗，請聯繫客服人員', 'error')
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
      showToast('取消收藏失敗，請聯繫客服人員', 'error')
    }
  } catch (e) {
    showToast('取消收藏失敗，請聯繫客服人員', 'error')
  }
}

// 品牌聊聊必須登入才行操作
// 登入/註冊 modal 控制
const openLoginModal = (): void => {
  if (!authStore.isLogin) {
    authStore.openLoginModal()
    return
  } else {
    router.push({
      name: 'index-index-message',
      query: { vendorId: vendorInfo.value.vendor?._id }
    })
  }
}
</script>

<template>
  <div class="bg-gray1 py-14 lg:px-[100px]">
    <div class="mx-auto px-5 lg:max-w-screen-xl">
      <FrontBreadcrumb v-if="hydrated" class="mb-8" :breadcrumb="breadcrumb"></FrontBreadcrumb>
      <div v-if="vendorInfo">
        <section>
          <!-- <front-vender-title /> -->
          <div class="h-[180px] w-full overflow-hidden rounded-xl sm:h-[240px] lg:h-[300px]">
            <img :src="vendorInfo.vendor?.bannerImage" alt="品牌賣場橫幅圖片" class="pic-auto" />
          </div>
          <section class="mb-[30px] mt-14 lg:mb-[50px]">
            <ul class="md:flex">
              <li class="mb-[30px] flex justify-center md:mb-0 md:mr-5 md:flex-none">
                <div class="h-[180px] w-[180px] overflow-hidden rounded lg:h-[287px] lg:w-[287px]">
                  <img :src="vendorInfo.vendor?.avatar" alt="品牌logo" class="pic-auto" />
                </div>
              </li>
              <li class="md:grow">
                <ul>
                  <li
                    class="mb-[30px] text-4xl font-medium leading-[54px] lg:text-[40px] lg:leading-[48px]"
                  >
                    {{ vendorInfo.vendor?.brandName }}
                  </li>
                  <li class="mb-5">
                    <ul class="flex items-center">
                      <li class="mr-2 text-[18px] font-medium leading-[26px]">
                        {{ Math.round(vendorInfo.averageRating) }}
                      </li>
                      <li class="mr-2 flex">
                        <Icon
                          v-for="star in roundedRating"
                          :key="star"
                          name="ph:star-fill"
                          class="text-2xl text-primary"
                        />
                        <Icon
                          v-if="5 - roundedRating > 0"
                          v-for="star in 5 - roundedRating"
                          :key="`empty-${star}`"
                          name="ph:star-bold"
                          class="text-2xl text-primary"
                        />
                      </li>
                      <li>({{ vendorInfo.commentCount }})</li>
                    </ul>
                  </li>
                  <li class="mb-5 flex items-start justify-between">
                    <div class="flex">
                      <div class="mr-5 text-center text-sm leading-[22px]">
                        課程
                        <p
                          class="text-4xl font-medium leading-[54px] lg:text-3xl lg:leading-[38px]"
                        >
                          {{ vendorInfo.courses?.length }}
                        </p>
                      </div>
                      <div class="text-center text-sm leading-[22px]">
                        學員累積
                        <p
                          class="text-4xl font-medium leading-[54px] lg:text-3xl lg:leading-[38px]"
                        >
                          {{ vendorInfo.totalStudentCount }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="flex items-center justify-center rounded border border-primary hover:bg-primary-light hover:text-white"
                    >
                      <nuxt-link
                        class="cursor-pointer px-[93px] py-2 text-lg leading-[26px]"
                        @click="openLoginModal"
                      >
                        <Icon name="ph:chats" class="mr-2 text-base" />
                        品牌聊聊
                      </nuxt-link>
                    </div>
                  </li>
                  <li class="mb-5 flex items-center justify-end">
                    <a
                      v-if="vendorInfo.vendor?.socialMedias[0]?.url"
                      :href="vendorInfo.vendor.socialMedias[0].url"
                      target="_blank"
                    >
                      <Icon name="ph:facebook-logo-fill" class="mr-3 text-[40px]" />
                    </a>
                    <a
                      v-if="vendorInfo.vendor?.socialMedias[1]?.url"
                      :href="vendorInfo.vendor.socialMedias[1].url"
                      target="_blank"
                    >
                      <Icon name="ph:instagram-logo-fill" class="mr-3 text-[40px]" />
                    </a>
                    <a
                      v-if="vendorInfo.vendor?.socialMedias[2]?.url"
                      :href="vendorInfo.vendor.socialMedias[2].url"
                      target="_blank"
                    >
                      <Icon name="ph:house-fill" class="text-[40px]" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </section>

        <article class="mb-[30px]">
          <!-- <front-vender-detail /> -->
          <div>
            <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
              品牌介紹
            </h4>
            <p>
              {{ vendorInfo.vendor?.intro }}
            </p>
          </div>
        </article>

        <section class="mb-[37px]">
          <!-- <front-coash-card-swiper /> -->
          <client-only>
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
              <swiper-slide v-for="item in vendorInfo.teachers" class="" :key="item._id">
                <div class="rounded-lg border border-gray3 bg-white p-4">
                  <div class="">
                    <div
                      class="d-block mx-auto mb-3 h-[120px] w-[120px] overflow-hidden rounded-full"
                    >
                      <img v-if="item.photo" :src="item.photo" alt="課程圖片" class="pic-auto" />
                      <Icon v-else name="ph:user-circle" class="h-[120px] w-[120px]" />
                    </div>
                    <p class="mb-2 text-center text-xl font-medium leading-[30px]">
                      {{ item.name }}
                    </p>
                    <p class="mb-4 h-[48px] max-h-[48px] overflow-hidden">
                      {{ item.intro }}
                    </p>
                    <nuxt-link
                      :to="`/teacher/${item._id}`"
                      class="mt-auto flex w-full items-center justify-center rounded bg-primary py-2 text-white hover:bg-primary-light"
                    >
                      了解更多
                    </nuxt-link>
                  </div>
                </div>
              </swiper-slide>
              <!-- <swiper-slide>
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
          </swiper-slide> -->
            </swiper>
          </client-only>
        </section>

        <div>
          <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
            課程
          </h4>
          <div class="mb-5 flex items-center justify-between">
            <div>
              <select
                v-model="courseTerm"
                name="course"
                id="course"
                class="mr-5 rounded border border-dark1 px-4 py-2"
              >
                <option value="">所有時長</option>
                <option value="0">單堂體驗</option>
                <option value="1">培訓課程</option>
              </select>
              <select
                v-model="courseType"
                name="courseType"
                id="courseType"
                class="rounded border border-dark1 px-4 py-2"
              >
                <option value="">所有類型</option>
                <option value="工藝手作">工藝手作</option>
                <option value="烹飪烘焙">烹飪烘焙</option>
                <option value="藝術人文">藝術人文</option>
                <option value="生活品味">生活品味</option>
              </select>
            </div>
            <div class="relative">
              <button class="flex items-center" @click="toggleSort">
                <p class="mr-0.5 text-primary">排序</p>
                <Icon name="ph:arrows-down-up" class="text-xl text-primary" />
              </button>
              <ul
                :class="[
                  'sort absolute right-0 z-50 w-[120px] rounded border border-gray5 bg-white text-center',
                  { hidden: !isSortOpen, block: isSortOpen }
                ]"
              >
                <li>
                  <button
                    class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                    @click="changeSort('newest')"
                  >
                    最近時間
                  </button>
                </li>
                <li>
                  <button
                    class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                    @click="changeSort('mostPopular')"
                  >
                    熱門課程
                  </button>
                </li>
                <li>
                  <button
                    class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                    @click="changeSort('highestRate')"
                  >
                    評分最高
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- * courses -->
          <div
            class="mx-5 grid grid-cols-2 items-stretch gap-[30px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            <nuxt-link
              v-for="item in vendorInfo.courses"
              :key="item._id"
              :to="`/course/${item._id}`"
              class="group relative flex flex-col"
            >
              <div
                class="course mb-2 flex aspect-square items-center justify-center overflow-hidden rounded"
              >
                <img
                  v-if="item.courseImage.length > 0"
                  :src="item.courseImage[0]"
                  alt="課程圖片"
                  class="pic-auto"
                />
                <transition name="star">
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
                <!-- <div
                  v-else
                  class="flex h-full w-full items-center justify-center bg-gray3 text-gray"
                >
                  圖片還在準備中
                </div> -->
              </div>
              <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
              <div class="flex grow flex-col">
                <div class="mb-2 flex grow items-start">
                  <p
                    v-if="item.courseTerm === 0"
                    class="mr-[8px] shrink-0 rounded bg-blue4 px-2 py-0.5 text-secondary"
                  >
                    體驗
                  </p>
                  <p
                    v-else
                    class="mr-[8px] shrink-0 rounded bg-primary-light px-2 py-0.5 text-white"
                  >
                    培訓
                  </p>
                  <p>{{ item.courseName }}</p>
                </div>
                <p class="mb-1 text-sm leading-[22px]">{{ vendorInfo.vendor?.brandName }}</p>
                <p class="text-secondary">
                  NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">{{
                    item.coursePrice
                  }}</span>
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>

        <!-- <div class="flex justify-center pb-[66px]">
          <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
            載入更多
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
1

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

/* courses */
li:hover .course {
  background: #000000;
  opacity: 0.5;
}

li:hover .course-star {
  display: block;
  background-image: url('~/assets/images/front/Button(star).png');
}

li:hover .course-star:hover {
  background-image: url('~/assets/images/front/Button(star_hover).png');
  background-size: contain;
}

/* 切缺：點擊星星收藏後要停留在卡片上>>測不出來，當時寫的樣式 */
/* li .course:active + .course-star:hover {
    display: block;
    background-image: url('~/assets/images/front/Button(star_hover).png');
    width: 32px;
    height: 32px;
  } */
</style>
