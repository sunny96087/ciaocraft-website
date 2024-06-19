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

//
import { useCourseStore } from '~/stores/course'
import { showLoading } from '~/stores/eventBus'
const courseStore = useCourseStore()

// 變數定義
const currentOrder = ref('') // ORDER_DESC
const currentCreatedAt = ref('') // CREATED_AT_ASC
const currentKeyword = ref('') // 搜尋關鍵字, 查詢姓名欄位
const currentCourseTerm = ref('-1') // 課程時長類型, 0: 單堂

onMounted(() => {
  getCourseData()
})

// 取得所有課程
async function getCourseData() {
  try {
    showLoading()

    let data = {
      // page: 1,
      // limit: 10,
      order: currentOrder.value,
      createdAt: currentCreatedAt.value,
      keyword: currentKeyword.value,
      courseTerm: currentCourseTerm.value === '-1' ? '' : Number(currentCourseTerm.value)
    }
    // const res = await courseStore.getArtOfCourse()
    // const result = res.data
    // console.log(result)
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
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
    <!-- 搜尋結果有效(搜尋筆數) -->
    <div class="mb-[30px] text-xl font-medium leading-[30px]">
      <span class="mr-1">有</span>
      <span class="mr-1">333</span>
      <span class="mr-1">筆“</span>
      <span class="mr-1">關鍵字</span>
      <span>”結果</span>
    </div>
    <!-- 搜尋結果無效(搜尋筆數) -->
    <!-- <div class="mb-[30px] text-xl font-medium leading-[30px] hidden">
      <span class="mr-1">有</span>
      <span class="mr-1">0</span>
      <span>筆結果</span>
    </div> -->
    <!-- 搜尋結果有效(類別選單) -->
    <div class="mb-5 flex items-center justify-between">
      <div>
        <select name="course" id="course" class="mr-5 rounded border border-dark1 px-4 py-2">
          <option value="單堂體驗">單堂體驗</option>
        </select>
        <select name="courseType" id="courseType" class="rounded border border-dark1 px-4 py-2">
          <option value="工藝手作">工藝手作</option>
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
              @click="toggleSort"
            >
              最近時間
            </button>
          </li>
          <li>
            <button
              class="d-block w-full py-1 hover:bg-secondary hover:text-white"
              @click="toggleSort"
            >
              熱門課程
            </button>
          </li>
          <li>
            <button
              class="d-block w-full py-1 hover:bg-secondary hover:text-white"
              @click="toggleSort"
            >
              評分最高
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜尋結果無效(秀出搜尋關鍵字) -->
    <!-- <p class="mb-24 text-[40px] font-medium leading-[54px] hidden">搜尋關鍵字</p> -->
    <!-- 搜尋結果有效(內容) -->
    <div class="mx-[30px] mb-5">
      <front-product-card />
    </div>
    <div class="flex justify-center">
      <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
        載入更多
      </button>
    </div>
    <!-- 搜尋結果無效(內容) -->
    <!-- <div class="mb-24 flex items-center justify-center hidden">
      <img src="~/assets/images/nodata.png" alt="找不到所搜尋的資料" class="mx-auto block" />
    </div> -->
  </div>
</template>

<style scoped>
.sort {
  box-shadow: 0px 10px 15px 0px #050d1d2e;
}
</style>
