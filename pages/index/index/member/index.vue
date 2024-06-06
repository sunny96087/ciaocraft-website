<script setup lang="ts">
const activeButton = ref('orders')
const setActiveButton = (button: string) => {
  activeButton.value = button
}
</script>
<template>
  <div class="bg-gray1 p-5 lg:px-[100px]">
    <div class="mx-auto py-14 lg:max-w-screen-xl">
      <div class="mb-14 flex space-x-8">
        <!-- 大頭貼 -->
        <div class="w-1/3 max-w-[180px]">
          <img
            src="/assets/images/front/userphoto.png"
            alt="ciao-craft-logo"
            class="w-full rounded-full object-cover"
          />
        </div>
        <div class="md:flex md:w-full md:items-center md:justify-between">
          <!-- 個人資料 -->
          <div class="mb-6 space-y-3 md:mb-0">
            <span class="block text-sm">Hello!</span>
            <div>
              <span class="block text-xl md:text-base">User Name</span>
              <span class="block text-sm">user@mail.com</span>
            </div>
            <button
              class="rounded-[4px] border-[1px] border-solid bg-primary px-6 py-2 text-center text-white"
            >
              會員資料
            </button>
          </div>
          <!-- 數字計算 -->
          <div class="flex space-x-4 md:space-x-8">
            <div class="flex flex-col items-center">
              <div class="mb-1 text-xs md:text-sm">課程累積</div>
              <div class="text-2xl md:text-4xl">30</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="mb-1 text-xs md:text-sm">我的收藏</div>
              <div class="text-2xl md:text-4xl">8</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="mb-1 text-xs md:text-sm">累積點數</div>
              <div class="text-2xl md:text-4xl">667</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 動態內容 -->
      <div class="mb-8 w-full border-b-[1px] border-solid border-[#E5E7EB]">
        <button
          class="rounded-t-lg px-5 py-2 text-xl"
          :class="{ 'bg-secondary text-white': activeButton === 'orders' }"
          @click="setActiveButton('orders')"
        >
          <Icon name="ph:receipt" class="mr-1 pb-1 text-2xl" />
          訂單紀錄
        </button>
        <button
          class="rounded-t-lg px-5 py-2 text-xl"
          :class="{ 'bg-secondary text-white': activeButton === 'collections' }"
          @click="setActiveButton('collections')"
        >
          <Icon name="ph:star" class="mr-1 text-xl" />
          我的收藏
        </button>
      </div>
      <!-- No Data -->
      <div class="">
        <div class="mx-auto max-w-[600px] p-8 md:p-14">
          <img
            src="/assets/images/nodata.png"
            alt="ciao-craft-logo"
            class="w-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
