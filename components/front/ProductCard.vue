<script setup lang="ts">
// 這個註解是我寫的嗎???(困惑)(非必要可刪)

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
</script>

<!-- 切版缺：卡片點擊時星星變色並留停 -->
<template>
  <ul class="flex grid grid-cols-2 gap-[30px] md:grid-cols-3 lg:grid-cols-5">
    <li>
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
            <p>課程名稱課程名稱</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </li>
    <li>
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </li>
    <li>
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </li>
    <li>
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </li>
    <li>
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </li>
    <li>
      <a href="#" class="relative">
        <img
          src="~/assets/images/front/Card_Img.png"
          alt="課程圖片"
          class="course mb-2 w-full rounded"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div>
          <div class="mb-2 flex items-start">
            <p class="mr-[8px] rounded bg-blue4 px-2 py-0.5 text-secondary">體驗</p>
            <p>課程名稱課程名</p>
          </div>
          <p class="mb-1 text-sm leading-[22px]">品牌名稱</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">9,999</span>
          </p>
        </div>
      </a>
    </li>
  </ul>
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
</style>
