<script setup lang="ts">
// // 使用 ref 選取 dom 元素
// import { ref } from 'vue'

// // 定義 isStarShow 為布林類型的 ref
// // 使用 ref 管理漢堡選單的顯示狀態
// const isStarShow = ref<boolean>(false)

// // 定義 toggleStar 函數，其返回類型為 void
// // 切換漢堡選單顯示狀態
// const toggleStar = (): void => {
//   isStarShow.value = !isStarShow.value
// }

// 串接 API
import defaultImage from '~/assets/images/front/member/default-image.jpg'
import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()
const memberStore = useMemberStore()
const authStore = useAuthStore()
const courseInfo: any = ref({})
const isCardLoading = ref(false)

// 載入時取得 courseStore
onMounted(() => {
  const { courseTerm, courseType, keyword, sortBy, pageSize } = courseStore.courseData
  getCourse(courseTerm, courseType, keyword, sortBy, pageSize)
  if (authStore.isLogin) {
    fetchMemberCollection()
  }
})

// 監控 courseStore。有異動就調用函式 getCourse
watchEffect(() => {
  const { courseTerm, courseType, keyword, sortBy, pageSize } = courseStore.courseData

  // 調用函式 getCourse
  getCourse(courseTerm, courseType, keyword, sortBy, pageSize)
})

async function getCourse(
  courseTerm: string,
  courseType: string,
  keyword: string,
  sortBy: string,
  pageSize: number
) {
  isCardLoading.value = true
  try {
    let query = ''
    let countCourseQuery = ''
    let res = null
    let countRes = null
    // 根據下拉選單決定 api url
    if (courseTerm !== '全部') {
      query += `courseTerm=${courseTerm}&`
      countCourseQuery += `courseTerm=${courseTerm}&`
    }
    if (courseType !== '全部') {
      query += `courseType=${courseType}&`
      countCourseQuery += `courseType=${courseType}&`
    }
    query += `sortBy=${sortBy}&pageSize=${pageSize}&keyword=${keyword}`
    countCourseQuery += `sortBy=${sortBy}&keyword=${keyword}`

    res = await courseStore.apiGetCourses({ query })
    countRes = await courseStore.apiGetCourses({ countCourseQuery })

    const result = res.data
    const countresult = countRes.data
    courseStore.courseData.searchResultCount = countresult.data.length

    request(result)
  } catch (e) {
    showToast('發生錯誤，請聯繫客服人員', 'error')
    console.log(e)
  }
  isCardLoading.value = false
}

function request(result: { statusCode: number; data: any }) {
  if (result.statusCode === 200) {
    courseInfo.value = result.data
    // console.log(`courseInfo = ${JSON.stringify(courseInfo.value)}`)
  } else {
    showToast('發生錯誤，請聯繫客服人員', 'error')
  }
}

// 格式化價格的計算屬性
const formattedPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 取得收藏資料
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
    showToast('發生錯誤，請聯繫客服人員', 'error')
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
</script>

<template>
  <ul
    class="grid grid-cols-2 gap-[30px] md:grid-cols-3 lg:grid-cols-5"
    v-if="!isCardLoading || courseInfo.length > 0"
  >
    <li v-for="item in courseInfo" class="flex min-h-[300px] flex-col">
      <NuxtLink
        :to="{ name: 'index-index-course-id', params: { id: item._id } }"
        class="group relative flex flex-col"
        :id="item._id"
      >
        <img
          :src="item.courseImage[0] || defaultImage"
          alt="課程圖片"
          class="course mb-2 block aspect-square h-full w-full rounded object-cover"
          loading="lazy"
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
        <div class="flex flex-col">
          <div class="mb-2 flex max-h-[90px] items-start lg:max-h-[95px]">
            <p
              class="mb-2 mr-2 self-start whitespace-nowrap rounded-[4px] px-2 py-0.5 text-sm leading-6"
              :class="{
                'bg-blue4 text-secondary': item.courseTerm === 0,
                'bg-primary text-white': item.courseTerm !== 0
              }"
            >
              {{ item.courseTerm === 0 ? '體驗' : '培訓' }}
            </p>
            <p class="line-clamp-2">{{ item.courseName }}</p>
          </div>
          <p class="mb-1 w-full text-sm leading-[22px]">{{ item.brandName }}</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">{{
              formattedPrice(item.coursePrice)
            }}</span>
          </p>
        </div>
      </NuxtLink>
    </li>
  </ul>
  <!-- 課程元件 Skeleton loader -->
  <div
    class="grid animate-pulse grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5"
    v-if="isCardLoading && !courseInfo.length"
  >
    <div v-for="n in 5" :key="n">
      <div class="space-y-2">
        <div class="aspect-square">
          <div class="h-full w-full rounded-lg bg-gray3"></div>
        </div>
        <div class="flex space-x-2">
          <div
            class="self-start whitespace-nowrap rounded-[4px] bg-gray3 px-2 py-0.5 text-transparent"
          >
            體驗
          </div>
          <div
            class="line-clamp-2 w-full text-wrap rounded-[4px] bg-gray3 px-2 py-0.5 text-transparent"
          >
            課程名稱 placeholder
          </div>
        </div>
        <div class="flex flex-col space-y-2">
          <div class="line-clamp-2 self-start text-wrap rounded-[4px] bg-gray3 text-transparent">
            品牌名稱 placeholder
          </div>
          <div class="self-start rounded-[4px] bg-gray3 text-transparent">NT$ 0,000</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

/* 定义动画效果 */
@keyframes starIn {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes starOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* 应用于过渡的类 */
.star-enter-active,
.star-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

.star-enter {
  animation-name: starIn;
}

.star-leave-to {
  animation-name: starOut;
}
</style>
