<script setup lang="ts">
const emit = defineEmits(['changeContent'])
const toHome = (viewName: string) => {
  emit('changeContent', viewName)
}
const toProfileContent = (viewName: string) => {
  emit('changeContent', viewName)
}
</script>
<template>
  <div class="mg:px-15 mx-auto flex flex-col space-y-8">
    <div class="mx-auto">
      <img
        src="/assets/images/front/Open Doodles Sprinting.png"
        alt="open-doodles-float"
        class="h-full w-full object-cover"
      />
    </div>
    <span class="self-center">恭喜你成為巧手玩藝的會員!</span>
    <div class="flex w-full items-center justify-center">
      <div class="h-[1px] w-[147px] bg-black"></div>
      <span class="w-1/4 px-3 text-center">現在你想要</span>
      <div class="h-[1px] w-[147px] bg-black"></div>
    </div>
    <div class="mt-6 flex flex-col items-center space-y-3">
      <button
        type="button"
        class="font- w-[300px] rounded-[4px] border-[1px] border-solid border-primary bg-primary py-2 text-white"
        @click="toProfileContent('profile')"
      >
        填寫基本資料，推薦適合課程
      </button>
      <button
        type="button"
        class="w-[300px] rounded-[4px] border-[1px] border-solid border-primary py-2"
        @click="toHome('close')"
      >
        逛逛賣場
      </button>
    </div>
  </div>
</template>
