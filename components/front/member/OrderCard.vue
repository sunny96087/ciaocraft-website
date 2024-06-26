<script setup lang="ts">
import defaultImage from '~/assets/images/front/member/default-image.jpg'
const props = defineProps<{
  order: {
    _id: string
    courseId: string
    vendorId: string
    brandName: string
    courseName: string
    courseImage: string
    courseTerm: string
    itemName: string
    count: number
    totalPrice: number
    paidStatus: number
    commentId: string
    createAt: string
  }
}>()

const order = props.order

const getOrderStatusName = (status: number) => {
  switch (status) {
    case 0:
      return '待付款'
    case 1:
      return '已付款'
    case 2:
      return '已付款'
    case 3:
      return '已完課'
    case 4:
      return '訂單取消'
    case 5:
      return '訂單取消'
    case 6:
      return '訂單取消(待退款)'
    case 7:
      return '訂單取消(已退款)'
    default:
      return '錯誤'
  }
}

const getPaidStatusTagColor: any = (status: number) => {
  switch (status) {
    case 0:
      return 'bg-primary text-white'
    case 1:
      return 'bg-success text-white'
    case 2:
      return 'bg-success text-white'
    case 3:
      return 'bg-secondary-light text-white'
    case 4:
      return 'bg-gray3 text-black'
    case 5:
      return 'bg-gray3 text-black'
    case 6:
      return 'bg-gray3 text-black'
    case 7:
      return 'bg-gray3 text-black'
    default:
      return 'bg-gray3 text-black'
  }
}
</script>

<template>
  <div
    class="items-center rounded-lg border-[1px] border-solid border-gray3 bg-white p-4 md:flex md:justify-between"
    :id="order._id"
  >
    <div class="mb-8 flex md:m-0 md:items-center">
      <NuxtLink
        :to="{ name: 'index-index-course-id', params: { id: order.courseId } }"
        class="group mr-4 mt-2 block aspect-square max-h-[150px] max-w-[150px] md:mr-6 md:mt-0"
      >
        <img
          :src="order.courseImage || defaultImage"
          alt="course-img"
          class="aspect-square w-full rounded bg-gray2 object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
        />
      </NuxtLink>
      <div class="space-y-1">
        <NuxtLink :to="{ name: 'index-index-course-id', params: { id: order.courseId } }">
          <h2 class="line-clamp-2 font-medium transition hover:text-gray">
            {{ order.courseName }}
          </h2>
        </NuxtLink>
        <NuxtLink
          :to="{ name: 'index-index-vendor-id', params: { id: order.vendorId } }"
          class="block transition duration-500 hover:opacity-50 hover:transition-opacity"
        >
          <div class="line-clamp-1 text-sm font-medium leading-[22px] text-dark4">
            {{ order.brandName }}
          </div>
        </NuxtLink>
        <div class="space-x-3 text-sm leading-[22px]">
          <span class="font-medium">項目名稱</span>
          <span> {{ order.itemName }}</span>
        </div>
        <div class="space-x-3 text-sm leading-[22px]">
          <span class="font-medium">總計</span>
          <span>NT$ {{ formatCurrency(order.totalPrice) }}</span>
        </div>
        <div class="space-x-3 text-sm leading-[22px]">
          <span class="font-medium">訂單編號 </span>
          <span class="break-all">{{ order._id }}</span>
        </div>
        <div class="pt-1">
          <span
            class="inline-block rounded-full px-2 py-1 align-text-top text-sm"
            :class="getPaidStatusTagColor(order.paidStatus)"
            >{{ getOrderStatusName(order.paidStatus) }}</span
          >
        </div>
      </div>
    </div>
    <div class="space-y-3">
      <NuxtLink
        :to="{ name: 'index-index-message', query: { vendorId: order.vendorId } }"
        class="block rounded border-[1px] border-solid border-primary bg-white py-2 text-center transition hover:border-primary hover:bg-primary hover:text-white md:px-10 md:py-2"
        >品牌聊聊</NuxtLink
      >
      <NuxtLink
        :to="{ name: 'index-index-member-order-id', params: { id: order._id } }"
        class="block rounded border-[1px] border-solid border-primary bg-white py-2 text-center transition hover:border-primary hover:bg-primary hover:text-white md:px-10 md:py-2"
        >訂單詳情</NuxtLink
      >
      <NuxtLink
        :to="{ name: 'index-index-member-comment-id', params: { id: order._id } }"
        class="block rounded border-[1px] border-solid border-primary bg-primary py-2 text-center text-white transition hover:bg-primary-light md:px-10 md:py-2"
        v-if="order.paidStatus === 3 && !order.commentId"
        >分享評價</NuxtLink
      >
    </div>
  </div>
</template>
