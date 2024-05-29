<script setup lang="ts">
// 使用 ref 選取 dom 元素
import { ref } from 'vue'

// 定義 isSortOpen 為布林類型的 ref
// 使用 ref 管理漢堡選單的顯示狀態
const isSortOpen = ref<boolean>(false)

// 定義 toggleSort 函數，其返回類型為 void
// 切換漢堡選單顯示狀態
const toggleSort = (): void => {
  isSortOpen.value = !isSortOpen.value
}
</script>

<template>
  <div class="mx-5 mb-[30px] mt-14 rounded-[40px] border border-gray md:mx-[84px] lg:mx-[360px]">
    <front-search />
  </div>
  <div class="mx-[20px] lg:mx-[100px]">
    <div class="mb-[30px] text-xl font-medium leading-[30px]">
      <span class="mr-1">有</span>
      <span class="mr-1">333</span>
      <span class="mr-1">筆“</span>
      <span class="mr-1">關鍵字</span>
      <span>”結果</span>
    </div>
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
        <a href="#" class="flex items-center" @click="toggleSort">
          <p class="mr-0.5 text-primary">排序</p>
          <img src="~/assets/images/front/sort.png" alt="排序icon" />
        </a>
        <ul
          :class="[
            'sort absolute right-0 z-50 w-[120px] rounded border border-gray5 bg-white text-center',
            { hidden: !isSortOpen, block: isSortOpen }
          ]"
        >
          <li><a href="#" class="block py-1 hover:bg-secondary hover:text-white">最近時間</a></li>
          <li><a href="#" class="block py-1 hover:bg-secondary hover:text-white">熱門課程</a></li>
          <li><a href="#" class="block py-1 hover:bg-secondary hover:text-white">評分最高</a></li>
        </ul>
      </div>
    </div>
    <div class="mx-[30px] mb-5">
      <front-product-card />
    </div>
    <div class="mb-9 flex justify-center">
      <a href="#" class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light"
        >載入更多</a
      >
    </div>
  </div>
</template>

<style scoped>
.sort {
  box-shadow: 0px 10px 15px 0px #050d1d2e;
}
</style>