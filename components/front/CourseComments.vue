<script setup lang="ts">
// 需要的 icon 再引入即可
import {
  PhChatCenteredDots,
  PhDotsThreeOutlineVertical,
  PhStar,
  PhThumbsUp
} from '@phosphor-icons/vue'
</script>

<template>
  <ul class="mb-[30px]">
    <li class="mb-5 flex items-center border-b border-dark1 pb-3">
      <h4 class="mr-5 text-[30px] font-medium leading-[38px]">學員評價</h4>
      <ul class="flex items-center">
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
    </li>
    <li class="mb-3 rounded-lg border border-[#DFE4EA] p-5">
      <ul>
        <li>
          <div class="mb-3">
            <ul class="flex items-center justify-between">
              <li class="flex items-center">
                <PhChatCenteredDots :size="40" color="#255c99" class="mr-3" />
                <p>U****************E</p>
              </li>
              <li class="flex items-center">
                <PhThumbsUp :size="32" class="mr-1 hover:cursor-pointer" />
                <p class="mr-3">有幫助(<span>12</span>)</p>
                <PhDotsThreeOutlineVertical :size="24" weight="fill" class="hover:cursor-pointer" />
              </li>
            </ul>
          </div>
          <div class="mb-3">
            <ul class="flex items-center">
              <li class="mr-5 flex">
                <PhStar :size="24" color="#ea580c" weight="fill" />
                <PhStar :size="24" color="#ea580c" weight="fill" />
                <PhStar :size="24" color="#ea580c" weight="fill" />
                <PhStar :size="24" color="#ea580c" weight="fill" />
                <PhStar :size="24" color="#ea580c" />
              </li>
              <li>1 天前</li>
            </ul>
          </div>
          <div class="mb-5">
            抱壯已定左進快童快出；上幫親士結肉耍、坡只蝶刀蝴樹書寫京物方道新、媽更記視造北大升背斗封：羽第古瓜乍封姊英几原今；再雞升買美扒金冒要要貝第的安開羽叫了京什。喜身央錯，司現示陽玩麼比鳥內：向卜冒香。
          </div>
          <div class="mb-5">
            <p class="mr-2 inline-block rounded bg-orange3 px-2 py-0.5 text-[#C54C0D] text-white">
              師生互動
            </p>
            <p class="inline-block rounded bg-orange3 px-2 py-0.5 text-[#C54C0D] text-white">
              專業度
            </p>
          </div>
          <div class="flex">
            <!-- 最後一張圖片不用mr -->
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="mr-3 h-[100px] w-[100px] object-cover"
            />
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="mr-3 h-[100px] w-[100px] object-cover"
            />
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="mr-3 h-[100px] w-[100px] object-cover"
            />
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="mr-3 h-[100px] w-[100px] object-cover"
            />
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="h-[100px] w-[100px] object-cover"
            />
          </div>
        </li>
      </ul>
    </li>
    <!-- 最後一張卡片改mb-20px -->
    <li class="flex justify-center">
      <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
        查看所有評價
      </button>
    </li>
  </ul>
</template>
