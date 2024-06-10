<script setup lang="ts">
// 需要的 icon 再引入即可
import { PhCalendarDots, PhChats, PhMapPinLine, PhStar } from '@phosphor-icons/vue'
</script>

<template>
  <div class="lg:w-[45%]">
    <p class="mb-3 inline-block rounded bg-[#2B71BF] px-2 py-0.5 text-secondary text-white">
      單堂體驗
    </p>
    <h3 class="mb-5 text-[40px] font-medium leading-[48px]">課程標題</h3>
    <ul class="mb-[22px] flex items-center">
      <li class="mr-2 text-[18px] font-medium leading-[26px]">4.0</li>
      <li class="mr-2 flex">
        <PhStar :size="24" color="#ea580c" weight="fill" />
        <PhStar :size="24" color="#ea580c" weight="fill" />
        <PhStar :size="24" color="#ea580c" weight="fill" />
        <PhStar :size="24" color="#ea580c" weight="fill" />
        <PhStar :size="24" color="#ea580c" />
      </li>
      <li>(61)</li>
    </ul>
    <p class="mb-5 text-secondary">NT$<span class="ml-2 font-medium leading-[30px]">9,999</span></p>
    <ul class="mb-5 flex">
      <li>
        <!-- <img src="~/assets/images/front/location.png" alt="地標icon" class="mr-2" /> -->
        <PhMapPinLine :size="24" class="mr-2" />
      </li>
      <li>台北市</li>
    </ul>
    <p class="mb-2">課程簡述</p>
    <p class="mb-[30px]">
      開司息看里念把，化雄水弓吉草帽羽沒聲老刀耳化河三，新朋進壯耳遠三燈巴南現，西跑我寸浪動夕耳怕幸童才女，火買幫可少枝英唱欠占歌示，借少半几沒：法讀黑西且消貓、但香貝借足停申止歌。
      寺六至亭同抄、告午白。色朵還十黑歌几，誰室蛋扒肉唱鳥好南或冬節開會回具安因活貝，什哪條樹比真和收彩只公。
    </p>
    <div class="mb-3 rounded bg-primary hover:bg-primary-light">
      <button class="mx-auto flex items-center text-lg leading-[3rem] text-white">
        <PhCalendarDots :size="20" class="mr-2" />
        預約課程
      </button>
    </div>
    <div class="mb-3 rounded bg-secondary hover:bg-[#2B71BF]">
      <button class="mx-auto flex items-center text-lg leading-[3rem] text-white">
        <PhStar :size="20" class="mr-2" />
        收藏課程
      </button>
    </div>
    <div class="rounded border border-primary hover:bg-primary-light hover:text-white">
      <button class="mx-auto flex items-center text-lg leading-[3rem]">
        <PhChats :size="20" class="mr-2" />
        品牌聊聊
      </button>
    </div>
  </div>
</template>
