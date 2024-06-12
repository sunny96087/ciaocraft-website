<script lang="ts" setup>
// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})

const order = {
  _id: '20240430001C',
  courseId: '20240430001C',
  brandName: '品牌名稱',
  courseName: '課程名稱課程名稱課程名稱課程名稱',
  coureTime: '2024-11-11T16:00:00.000Z',
  courseImage: 'https://img.noob.tw/2018/09/js.png',
  coursePrice: 6000,
  count: 1,
  totalPrice: 6000,
  paidStatus: 3,
  representativeName: '負責人名稱',
  location: '教室地點',
  // commentId: '6650bce2ac0aafbd660e472a',
  commentId: '',
  createAt: '2024-05-24T16:14:26.612+00:00',
  bankName: '台新',
  bankAccountName: '品牌11',
  bankAccount: '123333344555',
  bankCode: '812',
  bankBranch: '台北分行'
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
      return '錯誤'
  }
}

// 依照付款狀態顯示標籤顏色
const getPaidStatusTagColor: any = (status: number) => {
  switch (status) {
    case 0:
      return 'bg-primary'
    case 1:
      return 'bg-success'
    case 2:
      return 'bg-success'
    case 3:
      return 'bg-secondary-light'
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
      return '繳費已完成'
    case 5:
      return '未付款(已過期)'
    case 6:
      return '訂單取消(待退款)'
    case 7:
      return '費用已退款'
    default:
      return '訂單出現錯誤，請聯繫客服人員'
  }
}
</script>

<template>
  <div class="bg-gray1 p-5 lg:px-[100px]">
    <div class="mx-auto py-6 lg:max-w-screen-xl">
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
              <span>{{ order.createAt }}</span>
            </div>
          </div>
          <div>
            <div class="mb-1">
              <span>付款金額: </span>
              <span>NT$ {{ order.totalPrice }}</span>
            </div>
            <div class="mb-1">
              <span>付款方式: </span>
              <span>銀行轉帳({{ getOrderStatusName(order.paidStatus) }})</span>
            </div>
          </div>
          <span
            class="mt-2 inline-block self-start rounded-full px-2 py-1 text-center text-sm text-white md:mt-0"
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
              <NuxtLink :to="{ name: 'index-index-course-id', params: { id: order.courseId } }">
                <img
                  :src="order.courseImage"
                  alt="course-img"
                  class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
                />
              </NuxtLink>
            </div>
            <div class="flex-1 space-y-5">
              <div>
                <NuxtLink :to="{ name: 'index-index-course-id', params: { id: order.courseId } }">
                  <h2
                    class="mb-2 line-clamp-1 text-lg font-medium leading-6 transition hover:text-gray"
                  >
                    {{ order.courseName }}
                  </h2>
                </NuxtLink>
                <div class="mb-2 text-sm">{{ order.brandName }}</div>
                <div class="mb-2 text-sm">NT$ {{ order.coursePrice }} x {{ order.count }}</div>
                <hr class="mb-2 mt-5 w-full" />
                <div class="flex items-center justify-between leading-6">
                  總金額:
                  <span class="inline-block font-medium leading-6">NT$ {{ order.totalPrice }}</span>
                </div>
              </div>
              <div class="space-y-1 text-sm">
                <div>
                  <span>聯絡人: </span>
                  <span>{{ order.representativeName }}</span>
                </div>
                <div>
                  <span>報名人數: </span>
                  <span>{{ order.count }}</span>
                </div>
                <div>
                  <span>報名日期場次: </span>
                  <span>{{ order.coureTime }}</span>
                </div>
                <div>
                  <span>教室地點: </span>
                  <span>{{ order.location }}</span>
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
                    <span>{{ order.bankName }}({{ order.bankCode }})</span>
                  </div>
                  <div>
                    <span>帳戶名稱: </span>
                    <span>{{ order.bankAccountName }}</span>
                  </div>
                  <div>
                    <span>帳戶號碼: </span>
                    <span>{{ order.bankAccount }}</span>
                  </div>
                </div>
                <button
                  to=""
                  class="block w-full rounded py-2 text-center tracking-[0.5px] transition hover:bg-primary-light"
                  :class="{
                    'bg-primary text-white ': order.paidStatus === 0,
                    'bg-gray3 text-gray': order.paidStatus !== 0
                  }"
                >
                  {{ getBtnTextByPaidStatus(order.paidStatus) }}
                </button>
                <button
                  class="block rounded border-[1px] border-solid border-primary bg-white px-6 py-2 text-center transition hover:border-primary hover:bg-primary hover:text-white"
                >
                  取消預約
                </button>

                <div v-if="order.paidStatus === 3" class="space-y-5">
                  <div>
                    <h2 class="mb-3 text-lg font-medium leading-6">課後分享</h2>
                    <hr />
                  </div>
                  <p class="tracking-[0.5px]">
                    恭喜你完成課程，試著將完課的體驗心得分享給其他也有興趣的朋友們，也可累積點數享優惠喔!
                  </p>
                  <NuxtLink
                    :to="{ path: '/member/comment', query: { orderId: order._id } }"
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
                          <Icon name="ph:star-fill" class="text-2xl text-primary" />
                          <Icon name="ph:star-fill" class="text-2xl text-primary" />
                          <Icon name="ph:star-fill" class="text-2xl text-primary" />
                          <Icon name="ph:star-fill" class="text-2xl text-primary" />
                          <Icon name="ph:star" class="text-2xl text-primary" />
                        </div>
                        <div class="">2024-05-01 11:00:00</div>
                      </div>
                      <p>
                        抱壯已定左進快童快出；上幫親士結肉耍、坡只蝶刀蝴樹書寫京物方道新、媽更記視造北大升背斗封：羽第古瓜乍封姊英几原今；再雞升買美扒金冒要要貝第的安開羽叫了京什。喜身央錯，司現示陽玩麼比鳥內：向卜冒香。
                      </p>
                      <div class="">
                        <span
                          class="mr-2 inline-block self-start rounded bg-orange3 px-2 py-[2px] leading-6 text-primary-dark"
                        >
                          師生互動
                        </span>

                        <span
                          class="mr-2 inline-block self-start rounded bg-orange3 px-2 py-[2px] leading-6 text-primary-dark"
                        >
                          教學環境
                        </span>
                        <span
                          class="mr-2 inline-block self-start rounded bg-orange3 px-2 py-[2px] leading-6 text-primary-dark"
                        >
                          專業度
                        </span>
                      </div>
                      <div class="flex flex-wrap gap-2">
                        <div
                          class="block aspect-square max-w-20 overflow-hidden rounded bg-gray2 md:max-w-24"
                        >
                          <img
                            :src="order.courseImage"
                            alt="course-img"
                            class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
                          />
                        </div>
                        <div
                          class="block aspect-square max-w-20 overflow-hidden rounded bg-gray2 md:max-w-24"
                        >
                          <img
                            :src="order.courseImage"
                            alt="course-img"
                            class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
                          />
                        </div>
                        <div
                          class="block aspect-square max-w-20 overflow-hidden rounded bg-gray2 md:max-w-24"
                        >
                          <img
                            :src="order.courseImage"
                            alt="course-img"
                            class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
                          />
                        </div>
                        <div
                          class="block aspect-square max-w-20 overflow-hidden rounded bg-gray2 md:max-w-24"
                        >
                          <img
                            :src="order.courseImage"
                            alt="course-img"
                            class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
                          />
                        </div>
                        <div
                          class="block aspect-square max-w-20 overflow-hidden rounded bg-gray2 md:max-w-24"
                        >
                          <img
                            :src="order.courseImage"
                            alt="course-img"
                            class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <Icon name="ph:thumbs-up" class="text-dark mr-1 text-2xl" /> 有幫助(12)
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
</template>

<style></style>
