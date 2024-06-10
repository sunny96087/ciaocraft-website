<script setup lang="ts">
// 需要的 icon 再引入即可
import { PhCaretRight } from '@phosphor-icons/vue'
</script>

<template>
  <div class="mx-[20px] mt-14 lg:mx-[100px]">
    <nav class="mb-5 flex items-center">
      <a href="#" class="py-[3px]">
        <span class="mr-2.5">所有課程</span>
      </a>
      <PhCaretRight :size="24" class="mr-2.5" />
      <a href="#" class="py-[3px]">
        <span class="mr-2.5 py-[3px]">體驗課程</span>
      </a>
      <PhCaretRight :size="24" class="mr-2.5" />
      <!-- 切缺：所在位置字體末端黑色 -->
      <a href="#" class="py-[3px]">
        <span class="py-[3px]">課程名稱</span>
      </a>
    </nav>
    <section class="mb-[60px] justify-between lg:mb-[30px] lg:flex">
      <front-photo-carousel class="mb-[60px] lg:mb-0" />
      <front-course-title />
    </section>
    <section>
      <front-course-info />
    </section>
  </div>
  <article></article>
</template>
