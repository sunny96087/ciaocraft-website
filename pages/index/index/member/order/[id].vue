<script lang="ts" setup>
// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})

import defaultImage from '~/assets/images/front/member/default-image.jpg'

const orderStore = useOrderStore()
const route = useRoute()
const orderId: any = route.params.id
const today = new Date().toString()

const breadcrumb = [
  { pageName: '首頁', link: '/', isCurrentPage: false },
  { pageName: '會員管理', link: '/member', isCurrentPage: false },
  { pageName: '訂單詳情', link: `/member/order/${orderId}`, isCurrentPage: true }
]

const order = ref({
  _id: '[訂單編號]',
  courseId: '[課程編號]',
  brandName: '[品牌名稱]',
  courseName: '[課程名稱]',
  courseItemName: '[課程項目]',
  coureTime: '[課程時間]',
  price: 0,
  count: 0,
  totalPrice: 0,
  paidStatus: 8,
  courseLocation: '[上課地點]',
  commentId: '',
  createdAt: today
})

const course = ref({
  _id: '[id]',
  courseAddress: '[課程地址]',
  courseImage: ''
})

const vendor = ref({
  _id: '[id]',
  representative: '[負責人]',
  bankName: '[銀行名稱]',
  bankAccountName: '[帳號名稱]',
  bankAccount: '[帳號]',
  bankCode: '[銀行代碼]',
  bankBranch: '[分行]'
})

const comment = ref({
  _id: '[評論id]',
  content: '[評論內容]',
  rating: 0,
  createdAt: '',
  images: [],
  tags: [],
  likes: []
})

const rating: any = ref(0)
const fetchOrder = async (orderId: string) => {
  showLoading()
  try {
    const res = await orderStore.getMemberOrderByOrderId(orderId)
    const result = res.data
    order.value = result.data
    vendor.value = result.data.vendorId
    course.value = result.data.courseId
    course.value.courseImage = result.data.courseId.courseImage[0]
    comment.value = result.data.commentId ? result.data.commentId : {}
    rating.value = result.data.commentId ? result.data.commentId.rating : 0
  } catch (err) {
    showToast('訂單資料載入失敗，請重新整理頁面')
  }
  hideLoading()
}

// 依照付款狀態 付款方式文字內容
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
      return '訂單狀態'
  }
}

// 依照付款狀態顯示標籤顏色
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

// 依照付款狀態顯示按鈕文字
const getBtnTextByPaidStatus = (status: number) => {
  switch (status) {
    case 0:
      return '繳費完成，通知品牌'
    case 1:
      return '繳費完成，待確認'
    case 2:
      return '繳費已完成'
    case 3:
      return '繳費已完成'
    case 4:
      return '已取消'
    case 5:
      return '未付款(已過期)'
    case 6:
      return '訂單取消(待退款)'
    case 7:
      return '訂單取消(已退款)'
    default:
      return '訂單狀態'
  }
}

// 顯示取消按鈕
const canCancel = computed(() => {
  return [0, 1, 2].includes(order.value.paidStatus)
})

// 顯示圖片瀏覽
const isImageClick = ref(false)
const selectedImage = ref('')
const viewImage = (imageUrl: string) => {
  isImageClick.value = true
  selectedImage.value = imageUrl
}

// 點擊背景關閉瀏覽圖片
const clickMaskToCloseViewImage = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    isImageClick.value = false
  }
}

const showConfirmModal = ref(false)
const hasError = ref(false)
const alert = ref('')
const lastFiveDigits = ref('')

// 確認付款
const updateLastFiveDigit = async () => {
  try {
    if (lastFiveDigits.value === '') {
      hasError.value = true
      alert.value = '請輸入銀行代碼和帳戶後5碼'
      return
    }

    // 檢查是否只包含數字
    const digitRegex = /^[0-9]+$/
    if (!digitRegex.test(lastFiveDigits.value)) {
      hasError.value = true
      alert.value = '請輸入帳戶後5碼（僅限數字）'
      return
    }

    if (lastFiveDigits.value.length !== 5) {
      hasError.value = true
      alert.value = '請輸入帳戶後5碼'
      return
    }

    showLoading()
    let postData = {
      lastFiveDigits: lastFiveDigits.value
    }
    const res = await orderStore.updateLastFiveDigit(orderId, postData)
    const result = res.data
    if (result.statusCode === 200) {
      showToast('訂單更新成功')
      showConfirmModal.value = false
      fetchOrder(orderId)
    } else {
      showConfirmModal.value = false
      showToast('訂單更新失敗，請聯繫客服人員')
    }
  } catch (err) {
    showConfirmModal.value = false
    showToast('訂單更新失敗，請聯繫客服人員')
  }
  hideLoading()
}

// 取消預約
const showCancelModal = ref(false)

// 點擊背景關閉 modal
const clickMaskToCloseModal = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    showConfirmModal.value = false
  }
}

const hydrated = ref(false)
onMounted(() => {
  fetchOrder(orderId)
  hydrated.value = true
})
</script>

<template>
  <div class="bg-gray1 py-5 lg:px-[100px]">
    <div class="mx-auto px-5 py-9 lg:max-w-screen-xl">
      <FrontBreadcrumb v-if="hydrated" class="mb-8" :breadcrumb="breadcrumb"></FrontBreadcrumb>
      <div class="max-w-[817px]">
        <h1 class="mb-8 mt-3 text-4xl font-medium lg:text-3xl">訂單詳情</h1>
        <div class="mb-3 justify-between md:flex">
          <div>
            <div class="mb-1">
              <span>訂單編號: </span>
              <span>{{ order._id }}</span>
            </div>
            <div class="mb-1">
              <span>訂單成立: </span>
              <span>{{ convertUtcToLocaleDatetime(order.createdAt) }}</span>
            </div>
          </div>
          <div>
            <div class="mb-1">
              <span>付款金額: </span>
              <span>NT$ {{ formatCurrency(order.totalPrice) }}</span>
            </div>
            <div class="mb-1">
              <span>付款方式: </span>
              <span>銀行轉帳({{ getOrderStatusName(order.paidStatus) }})</span>
            </div>
          </div>
          <span
            class="mt-2 inline-block self-start rounded-full px-2 py-1 text-center text-sm md:mt-0"
            :class="getPaidStatusTagColor(order.paidStatus)"
            >{{ getOrderStatusName(order.paidStatus) }}</span
          >
        </div>
        <div class="mb-3 flex items-center space-x-1 self-start rounded bg-gray3 p-2">
          <div class="text-nowrap rounded bg-danger px-2 py-1 text-center text-sm text-white">
            注意
          </div>
          <p class="text-sm">預約3天內完成付款即完成報名課程，若超過時間將視為「訂單取消」。</p>
        </div>
        <hr class="mb-5" />
        <div class="">
          <div class="md:flex">
            <div
              class="group mb-3 mr-5 aspect-square max-w-28 self-start overflow-hidden rounded bg-gray2"
            >
              <NuxtLink :to="{ name: 'index-index-course-id', params: { id: course._id } }">
                <img
                  :src="course.courseImage || defaultImage"
                  alt="course-img"
                  class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
                />
              </NuxtLink>
            </div>
            <div class="flex-1 space-y-5">
              <div>
                <NuxtLink :to="{ name: 'index-index-course-id', params: { id: course._id } }">
                  <h2
                    class="mb-2 line-clamp-1 text-lg font-medium leading-6 transition hover:text-gray"
                  >
                    {{ order.courseName }}
                  </h2>
                </NuxtLink>
                <div class="mb-2 text-sm">{{ order.brandName }}</div>
                <div class="mb-2 text-sm">
                  NT$ {{ formatCurrency(order.price) }} x {{ order.count }}
                </div>
                <hr class="mb-2 mt-5 w-full" />
                <div class="flex items-center justify-between leading-6">
                  總金額:
                  <span class="inline-block font-medium leading-6"
                    >NT$ {{ formatCurrency(order.totalPrice) }}</span
                  >
                </div>
              </div>
              <div class="space-y-1 text-sm">
                <div>
                  <span>聯絡人: </span>
                  <span>{{ vendor.representative }}</span>
                </div>
                <div>
                  <span>報名人數: </span>
                  <span>{{ order.count }}</span>
                </div>
                <div>
                  <span>報名日期場次: </span>
                  <span>{{ order.courseItemName }}</span>
                </div>
                <div>
                  <span>教室地點: </span>
                  <span>{{ order.courseLocation }}</span>
                </div>
              </div>
              <div class="space-y-5">
                <div>
                  <h2 class="mb-3 text-lg font-medium leading-6">繳費方式</h2>
                  <hr />
                </div>
                <p class="tracking-[0.5px]">
                  課程費用請在訂單成立三天內完成銀行轉帳，完成轉帳後，請通知品牌，將告知轉帳銀行代碼和帳戶後5碼，方便查詢。
                </p>
                <div class="space-y-1 font-medium">
                  <div>
                    <span>銀行: </span>
                    <span>{{ vendor.bankName }}({{ vendor.bankCode }})</span>
                  </div>
                  <div>
                    <span>帳戶名稱: </span>
                    <span>{{ vendor.bankAccountName }}</span>
                  </div>
                  <div>
                    <span>帳戶號碼: </span>
                    <span>{{ vendor.bankAccount }}</span>
                  </div>
                </div>
                <button
                  class="block w-full rounded py-2 text-center tracking-[0.5px] transition"
                  :class="{
                    'bg-primary text-white ': order.paidStatus === 0,
                    'bg-gray3 text-gray': order.paidStatus !== 0,
                    'hover:bg-primary-light': order.paidStatus === 0
                  }"
                  :disabled="order.paidStatus !== 0"
                  @click="showConfirmModal = true"
                >
                  {{ getBtnTextByPaidStatus(order.paidStatus) }}
                </button>
                <button
                  class="block rounded border-[1px] border-solid border-primary bg-white px-6 py-2 text-center transition hover:border-primary hover:bg-primary hover:text-white"
                  v-if="canCancel"
                  @click="showCancelModal = true"
                >
                  取消預約
                </button>

                <!-- 課程評論 -->
                <div v-if="order.paidStatus === 3" class="space-y-5">
                  <div>
                    <h2 class="mb-3 text-lg font-medium leading-6">課後分享</h2>
                    <hr />
                  </div>
                  <p class="tracking-[0.5px]">
                    恭喜你完成課程，試著將完課的體驗心得分享給其他也有興趣的朋友們，也可累積點數享優惠喔!
                  </p>
                  <NuxtLink
                    :to="{ name: 'index-index-member-comment-id', params: { id: order._id } }"
                    v-if="order.paidStatus === 3 && !order.commentId"
                    class="block w-full rounded bg-primary py-2 text-center tracking-[0.5px] text-white transition hover:bg-primary-light"
                  >
                    分享評價
                  </NuxtLink>
                  <div class="space-y-2" v-if="order.paidStatus === 3 && order.commentId">
                    <h3>心得分享</h3>
                    <p class="text-sm font-medium">您分享的評論將會以匿名方式顯示。</p>
                    <div
                      class="space-y-8 rounded border-[1px] border-solid border-black bg-white p-5"
                    >
                      <div class="items-center md:flex">
                        <div class="mb-2 space-x-1 md:mb-0 md:mr-5">
                          <Icon
                            v-for="index in 5"
                            :key="index"
                            :name="index <= rating ? 'ph:star-fill' : 'ph:star'"
                            class="text-2xl text-primary"
                          />
                        </div>
                        <div class="">{{ convertUtcToLocaleDatetime(comment.createdAt) }}</div>
                      </div>
                      <p>
                        {{ comment.content }}
                      </p>
                      <div class="">
                        <span
                          v-for="tag in comment.tags"
                          class="mr-2 inline-block self-start rounded bg-orange3 px-2 py-[2px] leading-6 text-primary-dark"
                        >
                          {{ tag }}
                        </span>
                      </div>
                      <div class="flex flex-wrap gap-2">
                        <div
                          v-for="(imageUrl, index) in comment.images"
                          :key="index"
                          class="block aspect-square max-w-20 overflow-hidden rounded bg-gray2 md:max-w-24"
                          @click="viewImage(imageUrl)"
                        >
                          <img
                            :src="imageUrl"
                            alt="course-img"
                            class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <Icon name="ph:thumbs-up" class="text-dark mr-1 text-2xl" /> 有幫助({{
                        comment.likes.length
                      }})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-bg" v-if="isImageClick" @click="clickMaskToCloseViewImage">
    <img :src="selectedImage" alt="" />
  </div>

  <!-- 繳費完成通知 Modal -->
  <transition name="modal">
    <div class="modal-bg z-40" v-if="showConfirmModal" @click.stop="clickMaskToCloseModal">
      <div
        class="z-50 mx-auto w-full max-w-[560px] flex-col items-center justify-center rounded-lg bg-white p-5"
      >
        <div class="mx-auto mb-[30px] w-[160px]">
          <img
            src="/assets/images/front/Logo_Img.png"
            alt="ciao-craft-logo"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="modal-content">
          <div class="space-y-8 md:px-[60px]">
            <div class="space-y-4">
              <span class="block text-center text-2xl font-medium">繳費完成通知</span>
              <span class="block text-center">請輸入繳費帳戶後5碼，方便品牌查詢</span>
              <span
                class="block text-center"
                :class="{ 'text-danger': hasError }"
                v-if="hasError"
                >{{ alert }}</span
              >
            </div>
            <div
              class="flex w-full items-center justify-between rounded-[4px] border border-solid border-gray px-4 py-2 text-sm"
            >
              <input
                class="w-full"
                type="text"
                name="lastFiveDigits"
                v-model="lastFiveDigits"
                placeholder="請輸入帳戶後5碼 ex. 12345"
              />
            </div>
            <button
              class="box my-6 flex w-full items-center justify-center rounded-[4px] bg-primary py-2 text-center text-white transition duration-300 hover:bg-primary-light"
              @click="updateLastFiveDigit"
            >
              送出
            </button>
          </div>
        </div>
        <div class="mt-[30px]">
          <div class="flex justify-center">
            <button
              class="inline-block text-primary transition hover:text-primary-light"
              @click="showConfirmModal = false"
            >
              回上一頁
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <!-- 取消預約 Modal -->
  <div class="modal-bg z-40" v-if="showCancelModal">
    <div
      class="z-50 mx-auto w-full max-w-[560px] flex-col items-center justify-center rounded-lg bg-white p-5"
    >
      <div class="modal-content">
        <div class="space-y-8 md:px-[60px]">
          <div class="space-y-4">
            <span class="block text-center text-2xl font-medium">是否取消預約？</span>
            <span class="block text-center">請與品牌告知取消原因，若已付款請申請退款。</span>
          </div>
          <div class="flex w-full space-x-2">
            <button
              class="w-1/2 rounded-[4px] border-[1px] border-solid border-primary py-2 text-center text-primary transition duration-300 hover:bg-primary hover:text-white"
              @click="showCancelModal = false"
            >
              返回
            </button>
            <NuxtLink
              :to="{ name: 'index-index-message', query: { vendorId: vendor._id } }"
              class="w-1/2 rounded-[4px] border-[1px] border-solid bg-primary py-2 text-center text-white transition duration-300 hover:bg-primary-light hover:text-white"
            >
              品牌聊聊
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
