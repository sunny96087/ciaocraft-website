<script setup lang="ts">
// 需要的 icon 再引入即可
import {
  PhArrowsDownUp,
  PhChatCenteredDots,
  PhDotsThreeOutlineVertical,
  PhStar,
  PhThumbsUp
} from '@phosphor-icons/vue'

// 使用 ref 選取 dom 元素
import { ref } from 'vue'

// 定義 isSortOpen 為布林類型的 ref
// 使用 ref 管理排序選單的顯示狀態
const isSortOpen = ref<boolean>(false)
const isMoreOpen = ref<boolean>(false)

// 定義 toggleSort 函數，其返回類型為 void
// 切換排序選單顯示狀態
const toggleSort = (): void => {
  isSortOpen.value = !isSortOpen.value
}

const toggleMore = (): void => {
  isMoreOpen.value = !isMoreOpen.value
}
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
    <li>
      <ul class="mb-[30px] flex items-center justify-between">
        <li>
          <select name="course" id="course" class="mr-5 rounded border border-dark1 px-4 py-2">
            <!-- ()內放變數 -->
            <option value="所有評論">所有評論(61)</option>
            <option value="師生互動">師生互動(1)</option>
            <option value="教學環境">教學環境(3)</option>
            <option value="專業度">專業度(6)</option>
            <option value="其他">其他(26)</option>
          </select>
        </li>
        <li class="relative">
          <a href="#" class="flex items-center text-primary" @click="toggleSort">
            排序
            <PhArrowsDownUp :size="20" color="#EA580C" class="ml-1" />
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
            <li><a href="#" class="block py-1 hover:bg-secondary hover:text-white">評分最低</a></li>
          </ul>
        </li>
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
                <div class="relative">
                  <PhDotsThreeOutlineVertical
                    :size="24"
                    weight="fill"
                    class="hover:cursor-pointer"
                    @click="toggleMore"
                  />
                  <ul
                    :class="[
                      'sort absolute right-0 z-50 w-[120px] rounded border border-gray5 bg-white text-center',
                      { hidden: !isMoreOpen, block: isMoreOpen }
                    ]"
                  >
                    <li>
                      <a href="#" class="block py-1 hover:bg-secondary hover:text-white">檢舉</a>
                    </li>
                  </ul>
                </div>
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
            <p class="mr-2 inline-block rounded bg-orange3 px-2 py-0.5 text-[#C54C0D]">師生互動</p>
            <p class="inline-block rounded bg-orange3 px-2 py-0.5 text-[#C54C0D]">專業度</p>
          </div>
          <div class="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-10">
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="h-[100px] w-[100px] object-cover"
            />
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="h-[100px] w-[100px] object-cover"
            />
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="h-[100px] w-[100px] object-cover"
            />
            <img
              src="~/assets/images/front/userphoto.png"
              alt="評論照片"
              class="h-[100px] w-[100px] object-cover"
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
