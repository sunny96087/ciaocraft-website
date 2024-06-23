<script setup lang="ts">
const router = useRouter()
const keyword = ref('')

// 使用 courseStore
import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()

onMounted(() => {
  courseStore.resetCourseData()
})

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    courseStore.courseData.keyword = keyword.value
    router.push({ path: '/search', query: { keyword: keyword.value } })
  }
}

const clickToSearchKeyword = () => {
  courseStore.courseData.keyword = keyword.value
  router.push({ path: '/search', query: { keyword: keyword.value } })
}

const clickToSearch = (courseTerm: string, courseType: string) => {
  courseStore.courseData.courseTerm = courseTerm
  courseStore.courseData.courseType = courseType
  router.push({ path: '/search', query: { courseTerm: courseTerm, courseType: courseType } })
}
</script>

<template>
  <div class="bg-gray1">
    <div class="mb-[30px] pt-5">
      <front-banner />
    </div>
    <div class="mx-auto mb-8 max-w-[740px] space-y-8 px-5">
      <div class="mx-[10px] flex overflow-hidden rounded-full border border-gray bg-white p-5">
        <input
          id="search"
          class="mr-3 w-full outline-none"
          type="text"
          name="search"
          placeholder="搜尋適合您的手作體驗、培訓課程"
          v-model="keyword"
          @keyup.enter="handleKeyUp"
        />
        <button @click="clickToSearchKeyword">
          <Icon name="ph:magnifying-glass" class="text-xl" />
        </button>
      </div>
      <div class="overflow-hidden rounded-xl border border-white filter">
        <front-filter />
      </div>
    </div>
    <div class="mx-auto p-5 py-[10px] lg:max-w-screen-xl">
      <div class="py-9">
        <div class="mb-[30px] flex items-end">
          <h2 class="mr-5 text-3xl font-medium leading-[38px]">單堂體驗課</h2>
          <button href="#" class="flex items-center" @click="clickToSearch('0', '全部')">
            <p class="mr-1 text-primary">更多</p>
            <Icon name="ph:caret-right" class="text-xl text-primary" />
          </button>
        </div>
        <div class="px-8">
          <front-product-card-swiper courseTerm="0" />
        </div>
      </div>
      <div class="py-9">
        <div class="mb-[30px] flex items-end">
          <h2 class="mr-5 text-3xl font-medium leading-[38px]">專業培訓課</h2>
          <button href="#" class="flex items-center" @click="clickToSearch('1', '全部')">
            <p class="mr-1 text-primary">更多</p>
            <Icon name="ph:caret-right" class="text-xl text-primary" />
          </button>
        </div>
        <div class="px-8">
          <front-product-card-swiper courseTerm="1" />
        </div>
      </div>
      <div class="py-9">
        <div class="mb-[30px] flex items-end">
          <h2 class="mr-5 text-3xl font-medium leading-[38px]">你可能適合</h2>
          <button href="#" class="flex items-center" @click="clickToSearch('全部', '全部')">
            <p class="mr-1 text-primary">更多</p>
            <Icon name="ph:caret-right" class="text-xl text-primary" />
          </button>
        </div>
        <div class="px-8">
          <front-product-card-swiper />
        </div>
      </div>
      <div class="mb-8 text-dark1">
        <front-about />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter {
  box-shadow: 0px 10px 15px 0px #050d1d2e;
}
</style>
