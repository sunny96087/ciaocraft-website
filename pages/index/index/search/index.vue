<script setup lang="ts">
// 使用 ref 選取 dom 元素
import { ref } from 'vue'

// 定義 isSortOpen 為布林類型的 ref
// 使用 ref 管理排序選單的顯示狀態
const isSortOpen = ref<boolean>(false)

// 定義 toggleSort 函數，其返回類型為 void
// 切換排序選單顯示狀態
const toggleSort = (): void => {
  isSortOpen.value = !isSortOpen.value
}

import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()

const courseTerm = ref('全部')
const courseType = ref('全部')
const isNoResult = ref<boolean>(false)

// 把下拉選單預設值寫入 courseStore
onMounted(() => {
  courseStore.courseData.courseTerm = courseTerm.value
  courseStore.courseData.courseType = courseType.value
  console.log(courseStore.courseData)
})

// 改變下拉選單就把值更新到 courseStore
function selectedCourseTerm() {
  courseStore.resetPageSize()
  console.log(courseStore.courseData.pageSize)
  courseStore.courseData.courseTerm = courseTerm.value
}

function selectedCourseType() {
  courseStore.resetPageSize()
  console.log(courseStore.courseData.pageSize)
  courseStore.courseData.courseType = courseType.value
}

// 點選指定排序方式後 call api
const handleSort = (sortType: string): void => {
  // 根據不同的排序類型調用對應的 API
  console.log(`Sorting by: ${sortType}`)
  toggleSort()

  switch (sortType) {
    case 'newest':
      courseStore.courseData.sortBy = 'newest'
      console.log('Call API for 最近時間')
      break
    case 'mostPopular':
      courseStore.courseData.sortBy = 'mostPopular'
      console.log('Call API for 熱門課程')
      break
    case 'highestRate':
      courseStore.courseData.sortBy = 'highestRate'
      console.log('Call API for 評分最高')
      break
  }
}

// 監控：當 api 回傳的總筆數變動，就重新渲染頁面筆數值
const searchResults = computed(() => courseStore.courseData.searchResultCount)

// 監控：當搜尋結果筆數>當前 api 設定的筆數，就顯示"載入更多"
const isShowloadMore = computed(() => {
  return courseStore.courseData.searchResultCount > courseStore.courseData.pageSize
})

// 監控：當查無搜尋結果，就顯示"..0筆..."
watch(searchResults, (newVal) => {
  isNoResult.value = newVal === 0
  console.log(isNoResult.value)
})

// 每點擊"載入更多"就增加 20 (筆)
function loadMore() {
  courseStore.courseData.pageSize += 20
  console.log(`New pageSize: ${courseStore.courseData.pageSize}`)
  console.log(isShowloadMore.value)
}

// 監控：當 courseStore keyword 變動，就重新渲染搜尋的關鍵字
const keyword = computed(() => courseStore.courseData.keyword)

// 重新搜尋。所有參數恢復預設(含 courseStore)
function resetFilter() {
  isNoResult.value = false
  // courseStore.courseData.keyword = ''
  courseStore.resetCourseData()
  courseTerm.value = '全部'
  courseType.value = '全部'
  console.log('重新')
}
</script>

<template>
  <div class="pt-14">
    <div
      class="mx-5 mb-[30px] overflow-hidden rounded-[40px] border border-gray md:mx-[84px] lg:mx-[360px]"
    >
      <front-search />
    </div>
  </div>
  <div class="mx-[20px] pb-9 lg:mx-[100px]">
    <!-- 有搜尋結果(顯示筆數) -->
    <div class="mb-[30px] text-xl font-medium leading-[30px]">
      <span class="mr-1">有</span>
      <span class="mr-1">{{ searchResults }}</span>
      <span class="mr-1">筆</span>
      <span class="mr-1" v-if="!isNoResult">搜尋：{{ keyword }}</span>
      <span class="mr-1" v-if="!isNoResult"
        >“{{ courseTerm === '0' ? '單堂體驗' : courseTerm === '全部' ? '全部' : '專業培訓' }} 且
        {{ courseType }}”</span
      >
      <span>結果</span>
    </div>
    <!-- 有搜尋結果(顯示下拉篩選區塊) -->
    <div class="mb-5 flex items-center justify-between" v-if="!isNoResult">
      <div>
        <select
          name="course"
          id="course"
          class="mr-5 rounded border border-dark1 px-4 py-2"
          v-model="courseTerm"
          @change="selectedCourseTerm"
        >
          <option value="全部">全部</option>
          <option value="0">單堂體驗</option>
          <option value="1">專業培訓</option>
        </select>
        <select
          name="courseType"
          id="courseType"
          class="rounded border border-dark1 px-4 py-2"
          v-model="courseType"
          @change="selectedCourseType"
        >
          <option value="全部">全部</option>
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
              @click="handleSort('newest')"
            >
              最近時間
            </button>
          </li>
          <li>
            <button
              class="d-block w-full py-1 hover:bg-secondary hover:text-white"
              @click="handleSort('mostPopular')"
            >
              熱門課程
            </button>
          </li>
          <li>
            <button
              class="d-block w-full py-1 hover:bg-secondary hover:text-white"
              @click="handleSort('highestRate')"
            >
              評分最高
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- 無搜尋結果(顯示筆數搜尋關鍵字) -->
    <div v-if="isNoResult" class="mb-24 flex justify-between">
      <p class="text-[40px] font-medium leading-[54px]">搜尋：{{ keyword }}</p>
      <button
        class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light"
        @click="resetFilter"
      >
        重新搜尋
      </button>
    </div>
    <!-- 有搜尋結果(顯示卡片內容) -->
    <div v-if="!isNoResult">
      <div class="mx-[30px] mb-5">
        <front-product-card />
      </div>
      <div class="flex justify-center" v-if="isShowloadMore">
        <button
          class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light"
          @click="loadMore"
        >
          載入更多
        </button>
      </div>
    </div>
    <!-- 無搜尋結果(顯示內容) -->
    <div class="mb-24 flex items-center justify-center" v-if="isNoResult">
      <img src="~/assets/images/nodata.png" alt="找不到所搜尋的資料" class="mx-auto block" />
    </div>
  </div>
</template>

<style scoped>
.sort {
  box-shadow: 0px 10px 15px 0px #050d1d2e;
}
</style>
