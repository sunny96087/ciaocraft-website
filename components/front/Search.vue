<script setup lang="ts">
// 需要的 icon 再引入即可
// import { PhMagnifyingGlass } from '@phosphor-icons/vue'
</script>

<template>
  <div class="flex justify-between bg-white py-[18px] pl-5 pr-4">
    <input
      id="search"
      class="mr-3 w-full outline-none"
      type="text"
      name="search"
      placeholder="搜尋適合您的手作體驗、培訓課程"
    />
    <button class="p-2">
      <Icon name="ph:magnifying-glass" />
      <!-- <PhMagnifyingGlass :size="16" /> -->
      <!-- <img src="~/assets/images/front/Vector.png" alt="搜尋icon" class="h-8 w-8" /> -->
    </button>
  </div>
</template>
