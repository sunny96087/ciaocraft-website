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
</script>

<template>
  <div class="mx-[20px] pt-14 lg:mx-[100px]">
    <section>
      <front-vender-title />
    </section>
    <article class="mb-[30px]">
      <front-vender-detail />
    </article>
    <section class="mb-[37px]">
      <front-coash-card-swiper />
    </section>
    <div class="mb-5">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">課程</h4>
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
          <!-- <a href="#" class="flex items-center" @click="toggleSort">
            <p class="mr-0.5 text-primary">排序</p>
            <Icon name="ph:arrows-down-up" class="text-xl text-primary" />
          </a> -->
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
              <!-- <a href="#" class="block py-1 hover:bg-secondary hover:text-white" @click="toggleSort"
                >最近時間</a
              > -->
            </li>
            <li>
              <button
                class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                @click="toggleSort"
              >
                熱門課程
              </button>
              <!-- <a href="#" class="block py-1 hover:bg-secondary hover:text-white" @click="toggleSort"
                >熱門課程</a
              > -->
            </li>
            <li>
              <button
                class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                @click="toggleSort"
              >
                評分最高
              </button>
              <!-- <a href="#" class="block py-1 hover:bg-secondary hover:text-white" @click="toggleSort"
                >評分最高</a
              > -->
            </li>
          </ul>
        </div>
      </div>
      <front-product-card />
    </div>
    <div class="flex justify-center pb-[66px]">
      <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
        載入更多
      </button>
    </div>
  </div>
</template>
