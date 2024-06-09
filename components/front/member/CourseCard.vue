<script setup lang="ts">
import { PhStar, PhX } from '@phosphor-icons/vue'

const props = defineProps<{
  collection: {
    _id: string
    courseId: string
    createdAt: string
    brandName: string
    courseName: string
    courseTerm: number
    courseType: string[]
    courseImage: string[]
    courseStatus: number
    coursePrice: number
  }
}>()

const collection = props.collection

// 刪除
const removeCollection = (collectionId: string) => {
  console.log('removeCollection' + collectionId)
}
</script>
<template>
  <NuxtLink
    :to="{ name: 'index-index-course-id', params: { id: collection.courseId } }"
    class="group flex h-full flex-col justify-between"
    :id="collection._id"
  >
    <div>
      <div class="relative mx-auto mb-2">
        <div class="mx-auto aspect-square overflow-hidden rounded bg-gray2">
          <img
            :src="collection.courseImage[0]"
            alt="course-img"
            class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
          />
        </div>
        <button
          class="absolute right-0 top-0 p-2"
          @click.stop.prevent="removeCollection(collection._id)"
        >
          <PhX
            :size="24"
            color="#78716c"
            class="pointer-events-auto opacity-0 transition duration-500 hover:-translate-y-1 group-hover:opacity-100"
          />
        </button>
      </div>
      <div class="flex space-x-2">
        <div
          class="mb-2 self-start whitespace-nowrap rounded-[4px] bg-blue4 px-2 py-0.5 text-sm leading-6 text-secondary"
          :class="{ 'bg-primary text-white': collection.courseTerm === 0 }"
        >
          {{ collection.courseTerm === 1 ? '體驗' : '培訓' }}
        </div>
        <h2 class="line-clamp-2">
          {{ collection.courseName }}
        </h2>
      </div>
    </div>
    <div>
      <p class="mb-1 truncate text-sm leading-[22px]">{{ collection.brandName }}</p>
      <div class="flex">
        <span class="mr-1 font-normal leading-6 tracking-[0.5px] text-secondary">NT$</span>
        <span class="font-medium leading-[30px] text-secondary">{{ collection.coursePrice }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
