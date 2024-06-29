<script setup lang="ts">
// 使用 ref 選取 dom 元素f
import { ref } from 'vue'

// 定義 isSortOpen 為布林類型的 ref
// 使用 ref 管理排序選單的顯示狀態
const isSortOpen = ref<boolean>(false)
// const isMoreOpen = ref<boolean>(false)

// 定義 toggleSort 函數，其返回類型為 void
// 切換排序選單顯示狀態
const toggleSort = (): void => {
  isSortOpen.value = !isSortOpen.value
}

// const toggleMore = (): void => {
//   isMoreOpen.value = !isMoreOpen.value
// }

// 檢舉 modal 控制
// const isReportModalOpen = ref<boolean>(false)
// const openReportModal = (): void => {
//   isReportModalOpen.value = !isReportModalOpen.value
//   // 關閉檢舉選單
//   isMoreOpen.value = false
// }

// 放大評論照片 modal 控制
const isPhotoModalOpen = ref<boolean>(false)
const selectedImageUrl = ref<string>('')
const openPhotoModal = (imageUrl: string): void => {
  selectedImageUrl.value = imageUrl
  isPhotoModalOpen.value = !isPhotoModalOpen.value
}

import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()
const route = useRoute()

// 單一課程評論
const courseId = ref()
const courseInfo: any = ref({})

onMounted(async () => {
  // 從網址取得參數
  courseId.value = route.params.id
  console.log(courseId)
  getOneCourseComments()
})

let filterComments: any = ref([])
// 取得單一課程所有評論
async function getOneCourseComments() {
  try {
    showLoading()

    let data = {
      courseId: courseId.value
    }
    const res = await courseStore.apiGetOneCourseComments(data)
    const result = res.data
    console.log(result)

    request(result)
  } catch (e) {
    showToast('發生錯誤，請聯繫客服人員', 'error')
    console.log(e)
  } finally {
    hideLoading()
  }
}

function request(result: { statusCode: number; data: any }) {
  if (result.statusCode === 200) {
    // courseInfo.value = result.data
    // 陣列物件內增加計算天數
    courseInfo.value = result.data.map((comment: any) => {
      return {
        ...comment,
        daysSince: calculateDaysSince(comment.createdAt)
      }
    })
    console.log('Updated courseInfo:', courseInfo.value)
    // console.log(`courseInfo = ${JSON.stringify(courseInfo.value)}`)
    console.log(courseInfo.value)
    // 排序用
    filterComments.value = courseInfo.value
  } else {
    showToast('發生錯誤，請聯繫客服人員', 'error')
    console.log('取得單一課程所有評論失敗')
  }
}

// 計算每筆評論的距今天數
const calculateDaysSince = (createdAt: any) => {
  const today = new Date()
  const createdDate = new Date(createdAt)
  const diffTime = Math.abs(today.getTime() - createdDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const authStore = useAuthStore()
const likeCommentInfo: any = ref({})
// 新增課程評論按讚/取消讚
const addLikeComment = async (itemId: string) => {
  if (!authStore.isLogin) {
    authStore.openLoginModal()
    return
  }

  try {
    if (authStore.isLogin) {
      let likeCommentData = {
        // commentId: courseInfo.id
        commentId: itemId
      }
      const res = await courseStore.apiPostLikeComment(likeCommentData)
      const result = res.data

      if (result.statusCode === 200) {
        likeCommentInfo.value = result.data
        // console.log(`likeCommentInfo = ${JSON.stringify(likeCommentInfo.value)}`)
        showToast('評論按讚/取消讚成功')
        getOneCourseComments()
      } else {
        console.log('評論按讚/取消讚失敗')
      }
    }
  } catch (e) {
    console.log(e)
    showToast('評論按讚/取消讚失敗，請聯繫客服人員', 'error')
  }
}

// 處理排序
const handleSort = (orderName: string) => {
  if (orderName === 'newest') {
    filterComments.value = filterComments.value.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    isSortOpen.value = false
  } else if (orderName === 'hot') {
    filterComments.value = filterComments.value.sort((a: any, b: any) => {
      return (b.likes ? b.likes.length : 0) - (a.likes ? a.likes.length : 0)
    })
    isSortOpen.value = false
  } else if (orderName === 'highScore') {
    filterComments.value = filterComments.value.sort((a: any, b: any) => {
      return b.rating - a.rating
    })
    isSortOpen.value = false
  } else if (orderName === 'lowScore') {
    filterComments.value = filterComments.value.sort((a: any, b: any) => {
      return a.rating - b.rating
    })
    isSortOpen.value = false
  }
}

// 監控：當搜尋結果筆數>3筆數，就顯示"載入更多"
const isShowloadMore = computed(() => {
  return courseInfo.value.length > 2
})
</script>

<template>
  <ul class="mb-5">
    <li class="mb-5 flex items-center border-b border-dark1 pb-3">
      <h4 class="mr-5 text-[30px] font-medium leading-[38px]">學員評價</h4>
      <ul class="flex items-center">
        <li class="mr-2 text-[18px] font-medium leading-[26px]">
          {{ courseStore.oneCourseData[0].courseAvgRating }}
        </li>
        <li class="mr-2 flex">
          <Icon name="ph:star-fill" class="text-2xl text-primary" />
          <Icon name="ph:star-fill" class="text-2xl text-primary" />
          <Icon name="ph:star-fill" class="text-2xl text-primary" />
          <Icon name="ph:star-fill" class="text-2xl text-primary" />
          <Icon name="ph:star-bold" class="text-2xl text-primary" />
        </li>
        <li>({{ courseStore.oneCourseData[0].courseCommentsCount }})</li>
      </ul>
    </li>
    <li>
      <ul class="mb-[30px] flex items-center justify-between">
        <li>
          <select name="course" id="course" class="mr-5 rounded border border-dark1 px-4 py-2">
            <!-- ()內放變數 -->
            <option value="所有評論">所有評論(61)</option>
            <option value="師生互動">師生互動(1)</option>
            <option value="教學環境">教學環境(3)</option>
            <option value="專業度">專業度(6)</option>
            <option value="其他">其他(26)</option>
          </select>
        </li>
        <li class="relative">
          <button class="flex items-center text-primary" @click="toggleSort">
            排序
            <Icon name="ph:arrows-down-up" class="ml-1 text-xl text-primary" />
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
                @click="handleSort('newest')"
              >
                最近時間
              </button>
            </li>
            <li>
              <button
                class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                @click="handleSort('hot')"
              >
                熱門評論
              </button>
            </li>
            <li>
              <button
                class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                @click="handleSort('highScore')"
              >
                最高評分
              </button>
            </li>
            <li>
              <button
                class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                @click="handleSort('lowScore')"
              >
                最低評分
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <ul>
        <li
          class="mb-3 rounded-lg border border-[#DFE4EA] bg-white p-5"
          v-for="(item, index) in courseInfo"
          :key="item.id"
        >
          <ul>
            <li>
              <div class="mb-3">
                <ul class="flex items-center justify-between">
                  <li class="flex items-center">
                    <Icon name="ph:chat-centered-dots" class="mr-3 text-[40px] text-secondary" />
                    <p>{{ item.id }}</p>
                  </li>
                  <li>
                    <button class="flex items-center" @click="addLikeComment(item.id)">
                      <Icon name="ph:thumbs-up" class="mr-1 text-[32px] hover:cursor-pointer" />
                      <p class="mr-3">
                        有幫助(<span>{{ item.likes.length }}</span
                        >)
                      </p>
                    </button>
                    <!-- <div class="relative">
                      <Icon
                        name="ph:dots-three-outline-vertical-fill"
                        class="text-2xl hover:cursor-pointer"
                        @click="toggleMore"
                      />
                      <ul
                        :class="[
                          'sort absolute right-0 z-50 w-[120px] rounded border border-gray5 bg-white text-center',
                          { hidden: !isMoreOpen, block: isMoreOpen }
                        ]"
                      >
                        <li>
                          <button
                            class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                            @click="openReportModal"
                          >
                            檢舉
                          </button>
                        </li>
                      </ul>
                    </div> -->
                  </li>
                </ul>
              </div>
              <div class="mb-3">
                <ul class="flex items-center">
                  <li class="mr-5 flex">
                    <Icon name="ph:star-fill" class="text-2xl text-primary" />
                    <Icon name="ph:star-fill" class="text-2xl text-primary" />
                    <Icon name="ph:star-fill" class="text-2xl text-primary" />
                    <Icon name="ph:star-fill" class="text-2xl text-primary" />
                    <Icon name="ph:star-bold" class="text-2xl text-primary" />
                  </li>
                  <li>{{ item.daysSince }} 天前</li>
                </ul>
              </div>
              <div class="mb-5">
                {{ item.content }}
              </div>
              <div class="flex">
                <div class="mb-5" v-for="tags in item.tags" :key="tags">
                  <p
                    class="mr-2 inline-block w-[80px] rounded bg-orange3 px-2 py-0.5 text-center text-[#C54C0D]"
                  >
                    {{ tags }}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-10">
                <img
                  v-for="img in item.images"
                  :src="img"
                  alt="評論照片"
                  class="h-[100px] w-[100px] object-cover hover:cursor-pointer"
                  @click="openPhotoModal(img)"
                />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <div class="flex justify-center" v-if="isShowloadMore">
    <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
      查看所有評價
    </button>
  </div>

  <!-- 檢舉彈窗 -->
  <!-- <transition name="modal">
    <front-course-comment-report v-if="isReportModalOpen" @close="isReportModalOpen = false" />
  </transition> -->

  <!-- 放大評論照片視窗 -->
  <transition name="modal">
    <front-course-comment-photo
      v-if="isPhotoModalOpen"
      :image-url="selectedImageUrl"
      @close="isPhotoModalOpen = false"
    />
  </transition>
</template>

<style scoped></style>
