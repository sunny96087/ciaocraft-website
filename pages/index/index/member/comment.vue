<script lang="ts" setup></script>
<template>
  <div class="bg-gray1 p-5 lg:px-[100px]">
    <div class="mx-auto py-6 lg:max-w-screen-xl">
      <div class="max-w-[817px]">
        <h2 class="mb-3 mt-3 text-4xl font-medium lg:text-3xl">課後心得分享</h2>
        <p class="mb-8">
          恭喜你完成課程，試著將完課的體驗心得分享給其他也有興趣的朋友們，也可累積點數享優惠喔!
        </p>
        <div
          class="mb-8 flex items-center space-x-6 rounded border-[1px] border-solid border-gray3 bg-white p-3"
        >
          <div class="group aspect-square max-w-32 overflow-hidden rounded bg-gray2">
            <NuxtLink to="">
              <img
                alt="course-img"
                src="https://dummyimage.com/300x300/000/fff"
                class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
              />
            </NuxtLink>
          </div>
          <div class="space-y-2">
            <NuxtLink to="" class="block">
              <h3 class="line-clamp-1 text-lg font-medium">
                課程名稱課程名稱課程名稱課程名稱課程名稱課程名稱
              </h3>
            </NuxtLink>
            <NuxtLink to="" class="block">
              <div class="text-sm leading-[22px]">品牌名稱</div>
            </NuxtLink>
          </div>
        </div>
        <div class="mb-5">
          <label for="rating" class="mb-2">為整個課程體驗打個分數 </label>
          <div class="flex items-center space-x-1 py-3 text-4xl">
            <Icon name="ph:star-fill" class="text-primary" />
            <Icon name="ph:star-fill" class="text-primary" />
            <Icon name="ph:star-fill" class="text-primary" />
            <Icon name="ph:star-fill" class="text-primary" />
            <Icon name="ph:star" class="text-primary" />
          </div>
        </div>
        <div class="mb-5">
          <label for="rating" class="mb-2">分享類型(可多選)* </label>
          <div class="flex space-x-5">
            <div class="flex items-center">
              <input type="checkbox" id="craft" name="craft" value="craft" checked />
              <label for="craft">工藝手作</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="cooking" name="cooking" value="cooking" />
              <label for="cooking">烹飪烘烤</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="art" name="art" value="art" />
              <label for="art">藝術人文</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="lifestyle" name="lifestyle" value="lifestyle" />
              <label for="lifestyle">生活品味</label>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <label for="rating" class="">心得分享* </label>
          <p>您分享的評論將會以匿名方式顯示。</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="w-full rounded-[4px] border-[1px] border-solid border-text-primary p-5"
            placeholder="請填寫不超過500字"
          ></textarea>
        </div>
        <div class="mb-8 space-y-2">
          <label for="rating" class="">心得分享* </label>
          <p class="text-sm leading-[22px]">
            照片勿後製上 logo、文字；請勿過度使用濾鏡、合成圖片或讓商品失焦。請提供解析度 72dpi
            以上的 JPG 或 PNG 圖檔，不符合規格的圖檔將無法上傳。 <br />
            (最多五張)
          </p>
          <div class="flex flex-wrap gap-2">
            <div class="block aspect-square max-w-24 overflow-hidden rounded bg-gray2 md:max-w-24">
              <img
                alt="course-img"
                class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
              />
            </div>
            <div class="block aspect-square max-w-24 overflow-hidden rounded bg-gray2 md:max-w-24">
              <img
                alt="course-img"
                class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
              />
            </div>
            <div class="block aspect-square max-w-24 overflow-hidden rounded bg-gray2 md:max-w-24">
              <img
                alt="course-img"
                class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
              />
            </div>
            <div class="block aspect-square max-w-24 overflow-hidden rounded bg-gray2 md:max-w-24">
              <img
                alt="course-img"
                class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
              />
            </div>
            <div class="block aspect-square max-w-24 overflow-hidden rounded bg-gray2 md:max-w-24">
              <img
                alt="course-img"
                class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
              />
            </div>
          </div>
          <button
            class="block rounded border-[1px] border-solid border-primary bg-white px-6 py-2 text-center transition hover:border-primary hover:bg-primary hover:text-white"
          >
            上傳照片
          </button>
        </div>
        <button
          class="flex items-center justify-center rounded border-[1px] border-solid border-primary bg-primary px-6 py-2 text-center text-white transition hover:border-primary hover:bg-primary-light"
        >
          <Icon name="ph:paper-plane-right" class="mr-2 text-white" />
          送出
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* 隱藏原本的 checkbox */
input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  min-width: 20px;
  min-height: 20px;
  border: 1px solid var(--color-secondary);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-right: 8px; /* 增加與文字的間距 */
}

/* 模擬未選中的狀態 */
input[type='checkbox']::before {
  content: '';
  display: block;
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  transform: translate(-50%, -50%);
}

/* 模擬選中的狀態 */
input[type='checkbox']:checked::before {
  background: var(--color-secondary);
}

label {
  display: flex;
  align-items: center; /* 垂直居中 */
}
</style>
