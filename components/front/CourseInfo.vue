<script setup lang="ts">
import { useCourseStore } from '~/stores/course'

const courseStore = useCourseStore()
</script>

<template>
  <ul
    class="justify-between lg:flex"
    v-for="(item, index) in courseStore.oneCourseData"
    :key="index"
  >
    <li class="mb-[30px] lg:mb-0 lg:w-[43%]">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[45px]">
        課程資訊
      </h4>
      <ul class="mb-3 flex items-center rounded border border-[#DFE4EA] bg-white py-2 pl-4">
        <li class="mr-3">
          <Icon name="ph:clock-user" class="text-6xl text-secondary" />
        </li>
        <li>
          <p class="text-[14px] leading-[22px] text-secondary">課程時長</p>
          <p>
            約<span class="mx-2">{{ item.courseTotalHours }}</span
            >小時
          </p>
        </li>
      </ul>
      <ul class="mb-3 flex items-center rounded border border-[#DFE4EA] bg-white py-2 pl-4">
        <li class="mr-3">
          <Icon name="ph:building-office" class="text-6xl text-secondary" />
        </li>
        <li>
          <p class="text-[14px] leading-[22px] text-secondary">教室地點</p>
          <p>{{ item.courseAddress }}</p>
        </li>
      </ul>
      <ul class="mb-3 flex items-center rounded border border-[#DFE4EA] bg-white py-2 pl-4">
        <li class="mr-3">
          <Icon name="ph:users-four" class="text-6xl text-secondary" />
        </li>
        <li>
          <p class="text-[14px] leading-[22px] text-secondary">班級人數</p>
          <p>{{ item.courseCapacity }}</p>
        </li>
      </ul>
      <ul class="mb-3 flex items-center rounded border border-[#DFE4EA] bg-white px-4 py-2">
        <li class="mr-3">
          <img
            :src="item.teacherId.photo"
            alt="授課者大頭照"
            class="h-[60px] w-[60px] rounded-full object-cover"
          />
        </li>
        <li class="flex w-full justify-between">
          <div>
            <p class="text-[14px] leading-[22px]">師資</p>
            <p>{{ item.teacherId.name }}</p>
          </div>
          <NuxtLink
            v-if="
              courseStore.oneCourseData.length > 0 &&
              courseStore.oneCourseData[0].teacherId &&
              courseStore.oneCourseData[0].teacherId._id
            "
            :to="{
              name: 'index-index-teacher-id',
              params: { id: courseStore.oneCourseData[0].teacherId._id }
            }"
          >
            <button
              class="rounded border border-primary px-6 py-2 hover:bg-primary-light hover:text-white"
            >
              了解更多
            </button>
          </NuxtLink>
        </li>
      </ul>
    </li>
    <li class="lg:w-[43%]">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[45px]">
        關於品牌
      </h4>
      <ul class="rounded border border-[#DFE4EA] bg-white p-5">
        <li class="flex">
          <ul class="mb-5 flex items-center justify-between">
            <li class="mr-4 basis-32">
              <img
                :src="item.vendorId.avatar"
                alt="品牌logo"
                class="h-[120px] w-[120px] rounded object-cover"
              />
            </li>
            <li class="w-full">
              <h5 class="mb-3 text-[18px] font-medium leading-[26px]">
                {{ item.vendorId.brandName }}
              </h5>
              <p class="mb-3">
                {{ item.vendorId.intro }}
              </p>
              <ul class="flex items-center">
                <li class="mr-2 text-[18px] font-medium leading-[26px]">
                  {{ item.vendorAvgRating }}
                </li>
                <li class="mr-2 flex">
                  <Icon name="ph:star-fill" class="text-2xl text-primary" />
                  <Icon name="ph:star-fill" class="text-2xl text-primary" />
                  <Icon name="ph:star-fill" class="text-2xl text-primary" />
                  <Icon name="ph:star-fill" class="text-2xl text-primary" />
                  <Icon name="ph:star-bold" class="text-2xl text-primary" />
                </li>
                <li>({{ item.vendorCommentsCount }})</li>
              </ul>
            </li>
          </ul>
        </li>
        <li
          class="rounded border border-primary text-center hover:bg-primary-light hover:text-white"
        >
          <NuxtLink
            v-if="
              courseStore.oneCourseData.length > 0 &&
              courseStore.oneCourseData[0].vendorId &&
              courseStore.oneCourseData[0].vendorId._id
            "
            :to="{
              name: 'index-index-vendor-id',
              params: { id: courseStore.oneCourseData[0].vendorId._id }
            }"
          >
            <button class="w-full py-2">逛逛賣場</button>
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>
