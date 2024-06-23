<script setup lang="ts">
import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()

const keyword = ref('')

watch(
  () => courseStore.courseData.keyword,
  (newVal) => {
    keyword.value = newVal
  }
)

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    console.log(keyword.value)
    courseStore.courseData.keyword = keyword.value
    // updateKeyword(keyword.value)
    console.log(courseStore.courseData.keyword)
  }
}

function searchKeyWord() {
  courseStore.courseData.keyword = keyword.value
}
</script>

<template>
  <div class="flex justify-between bg-white py-[18px] pl-5 pr-4">
    <input
      id="search"
      class="mr-3 w-full outline-none"
      type="text"
      name="search"
      placeholder="搜尋適合您的手作體驗、培訓課程"
      v-model="keyword"
      @keyup.enter="handleKeyUp"
    />
    <button class="p-2" @click="searchKeyWord">
      <Icon name="ph:magnifying-glass" />
    </button>
  </div>
</template>
