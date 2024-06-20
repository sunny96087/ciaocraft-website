<script setup lang="ts">
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
          class="absolute right-0 top-0 block p-3"
          @click.stop.prevent="removeCollection(collection._id)"
        >
          <Icon
            name="ph:x"
            class="text-xl opacity-0 transition duration-300 hover:text-dark4 group-hover:-translate-y-1 group-hover:opacity-100"
          />
        </button>
      </div>
      <div class="flex space-x-2">
        <div
          class="mb-2 self-start whitespace-nowrap rounded-[4px] px-2 py-0.5 text-sm leading-6"
          :class="{
            'bg-secondary text-white': collection.courseTerm === 0,
            'bg-primary text-white': collection.courseTerm === 1
          }"
        >
          {{ collection.courseTerm === 0 ? '體驗' : '培訓' }}
        </div>
        <h2 class="line-clamp-2 group-hover:text-dark3">
          {{ collection.courseName }}
        </h2>
      </div>
    </div>
    <div>
      <p class="mb-1 truncate text-sm leading-[22px]">{{ collection.brandName }}</p>
      <div class="flex">
        <span class="mr-1 font-normal leading-6 tracking-[0.5px] text-secondary">NT$</span>
        <span class="font-medium leading-[30px] text-secondary">{{
          formatCurrency(collection.coursePrice)
        }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
