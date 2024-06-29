<script setup lang="ts">
import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()
</script>

<template>
  <ul v-for="(item, index) in courseStore.oneCourseData" :key="index">
    <li class="mb-[30px]">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
        適合對象
      </h4>
      <p>
        {{ item.courseSuitableFor }}
      </p>
    </li>
    <li class="mb-[30px]">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
        你可以學到
      </h4>
      <p>
        {{ item.courseSkillsLearned }}
      </p>
    </li>
    <li class="mb-[30px]">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
        課程內容
      </h4>
      <p class="mb-5">
        {{ item.courseContent }}
      </p>
      <!-- <div class="flex justify-center">
        <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
          展開內容
        </button>
      </div> -->
    </li>
    <li>
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
        注意事項
      </h4>
      <p>
        {{ item.courseNotice }}
      </p>
    </li>
  </ul>
</template>
