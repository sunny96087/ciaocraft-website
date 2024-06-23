<script setup lang="ts">
import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()
const router = useRouter()

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

const clickToSearch = () => {
  router.push({ path: '/search', query: { keyword: keyword.value } })
  courseStore.courseData.keyword = keyword.value
}
</script>

<template>
  <div class="flex justify-between bg-white px-5 py-[18px]">
    <input
      id="search"
      class="mr-3 w-full outline-none"
      type="text"
      name="search"
      placeholder="搜尋適合您的手作體驗、培訓課程"
      v-model="keyword"
      @keyup.enter="handleKeyUp"
    />
    <button @click="clickToSearch">
      <Icon name="ph:magnifying-glass" class="text-xl" />
    </button>
  </div>
</template>
