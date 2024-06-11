<script setup lang="ts">
// 需要的 icon 再引入即可
</script>

<template>
  <ul class="justify-between lg:flex">
    <li class="mb-[30px] lg:mb-0 lg:w-[43%]">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[45px]">
        課程資訊
      </h4>
      <ul class="mb-3 flex items-center rounded border border-[#DFE4EA] bg-white py-2 pl-4">
        <li class="mr-3">
          <Icon name="ph:clock-user" class="text-6xl text-secondary" />
          <!-- <PhClockUser :size="60" color="#255c99" /> -->
        </li>
        <li>
          <p class="text-[14px] leading-[22px] text-secondary">課程時長</p>
          <p>約<span class="mx-2">3</span>小時</p>
        </li>
      </ul>
      <ul class="mb-3 flex items-center rounded border border-[#DFE4EA] bg-white py-2 pl-4">
        <li class="mr-3">
          <Icon name="ph:building-office" class="text-6xl text-secondary" />
          <!-- <PhBuildingOffice :size="60" color="#255c99" /> -->
        </li>
        <li>
          <p class="text-[14px] leading-[22px] text-secondary">教室地點</p>
          <p>台北市XX區XX路3段112-3號2樓</p>
        </li>
      </ul>
      <ul class="mb-3 flex items-center rounded border border-[#DFE4EA] bg-white py-2 pl-4">
        <li class="mr-3">
          <Icon name="ph:users-four" class="text-6xl text-secondary" />
          <!-- <PhUsersFour :size="60" color="#255c99" /> -->
        </li>
        <li>
          <p class="text-[14px] leading-[22px] text-secondary">班級人數</p>
          <p>8</p>
        </li>
      </ul>
      <ul class="mb-3 flex items-center rounded border border-[#DFE4EA] bg-white px-4 py-2">
        <li class="mr-3">
          <img
            src="~/assets/images/front/userphoto.png"
            alt="授課者大頭照"
            class="h-[60px] w-[60px] rounded-full object-cover"
          />
        </li>
        <li class="flex w-full justify-between">
          <div>
            <p class="text-[14px] leading-[22px]">師資</p>
            <p>Joan Hsu</p>
          </div>
          <button
            class="rounded border border-primary px-6 py-2 hover:bg-primary-light hover:text-white"
          >
            了解更多
          </button>
        </li>
      </ul>
    </li>
    <li class="lg:w-[43%]">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[45px]">
        關於品牌
      </h4>
      <ul class="rounded border border-[#DFE4EA] bg-white p-5">
        <li class="flex">
          <ul class="flex items-center justify-between">
            <li class="mr-4 basis-32">
              <img
                src="~/assets/images/front/userphoto.png"
                alt="品牌logo"
                class="h-[120px] w-[120px] rounded object-cover"
              />
            </li>
            <li class="w-full">
              <h5 class="mb-3 text-[18px] font-medium leading-[26px]">品牌名稱</h5>
              <p class="mb-3">
                品牌描述品牌描述品牌描述品牌描述品牌描述品牌描述品牌描述品牌描述牌描述品牌描述牌描述品牌描述牌描述品牌描述牌描述品牌描述牌描述品牌描述牌描述品牌描述牌牌描述品牌描述
              </p>
              <ul class="mb-5 flex items-center">
                <li class="mr-2 text-[18px] font-medium leading-[26px]">4.0</li>
                <li class="mr-2 flex">
                  <Icon name="ph:star-fill" class="text-2xl text-primary" />
                  <Icon name="ph:star-fill" class="text-2xl text-primary" />
                  <Icon name="ph:star-fill" class="text-2xl text-primary" />
                  <Icon name="ph:star-fill" class="text-2xl text-primary" />
                  <Icon name="ph:star-bold" class="text-2xl text-primary" />
                  <!-- <PhStar :size="24" color="#ea580c" weight="fill" />
                  <PhStar :size="24" color="#ea580c" weight="fill" />
                  <PhStar :size="24" color="#ea580c" weight="fill" />
                  <PhStar :size="24" color="#ea580c" weight="fill" />
                  <PhStar :size="24" color="#ea580c" /> -->
                </li>
                <li>(61)</li>
              </ul>
            </li>
          </ul>
        </li>
        <li
          class="rounded border border-primary text-center hover:bg-primary-light hover:text-white"
        >
          <button class="w-full py-2">逛逛賣場</button>
        </li>
      </ul>
    </li>
  </ul>
</template>
