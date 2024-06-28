<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const router = useRouter()
const route = useRoute()

const orderId = route.params.orderId

const order: any = ref({})

onMounted(() => {
  getOrderData()
})

// NOTE 取得單一訂單 (Back)
async function getOrderData() {
  try {
    showLoading()
    let data = {
      orderId: orderId
    }

    const res = await store.apiGetAdminOrder(data)
    const result = res.data
    console.log(`getOrderData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      order.value = result.data
      console.log(`order = ${JSON.stringify(order.value)}`)
    } else {
      console.log('取得訂單資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// NOTE 確認款項 (Back)
async function confirmPayment() {
  // 再次確認
  const confirmed = await openDialog(
    '審核付款',
    '請確認您已經收到此筆訂單的款項，確認後不可撤銷。您確定要執行此操作嗎？'
  )
  if (!confirmed) {
    return
  }

  try {
    showLoading()
    let data = {
      orderId: orderId,
      paidStatus: 2
    }

    const res = await store.apiUpdateAdminOrder(data)
    const result = res.data
    console.log(`confirmPayment result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('確認款項成功')
      getOrderData()
    } else {
      showToast('確認款項失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 訂單狀態：0: 待付款, 1: 已付款, 2: 已確認收到款, 3:已完課, 4:訂單取消(已過期), 5:訂單取消(不需退款), 6:訂單取消(待退款), 7:訂單取消(已退款)

// NOTE 取消訂單 (Back)
async function cancelOrder() {
  // 再次確認
  const dialogresult = await openDialog(
    '取消訂單',
    '請確認您要取消此筆訂單，取消後不可撤銷。您確定要執行此操作嗎？',
    '取消原因'
  )
  if (!dialogresult.confirmed) {
    return
  }

  try {
    showLoading()
    let data = {
      orderId: orderId,
      paidStatus: order.value.paidStatus === 0 ? 5 : 6,
      cancelReason: dialogresult.userInput
    }

    const res = await store.apiUpdateAdminOrder(data)
    const result = res.data
    console.log(`cancelOrder result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('取消訂單成功')
      getOrderData()
    } else {
      showToast('取消訂單失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// NOTE 完成退款 (Back)
async function confirmCancelPaymeny() {
  // 再次確認
  const confirmed = await openDialog(
    '完成退款',
    '請確認您已經完成此筆訂單的退款，確認後不可撤銷。您確定要執行此操作嗎？'
  )
  if (!confirmed.confirmed) {
    return
  }

  try {
    showLoading()
    let data = {
      orderId: orderId,
      paidStatus: 7
    }

    const res = await store.apiUpdateAdminOrder(data)
    const result = res.data
    console.log(`confirmCancelPaymeny result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('確認退款成功')
      getOrderData()
    } else {
      showToast('確認退款失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="" v-if="order">
    <!-- >> component: 麵包屑 Breadcrumbs -->
    <div class="admin-breadcrumbs">
      <nuxt-link to="/admin/order">訂單列表</nuxt-link>
      <Icon name="material-symbols-light:arrow-forward-ios-rounded" size="16" class=""></Icon>
      <span class="text-dark1">訂單詳情</span>
    </div>

    <!-- * title -->
    <div class="admin-page-title">訂單詳情</div>

    <!-- * btn -->
    <div v-if="order.memberId && order.memberId.status === 1" class="mb-7 flex justify-end">
      <nuxt-link
        :to="{ path: '/admin/message', query: { memberId: order.memberId?._id } }"
        class="btn-orange btn-orange-icon"
      >
        <Icon size="24" name="ph:chat-centered-dots-light" />訊息中心
      </nuxt-link>
    </div>

    <!-- >> Info -->

    <!-- * 訂單記錄 -->
    <section>
      <div class="block-title">訂單記錄</div>

      <!-- {{ order.paidStatus }} -->
      <div class="w-full max-w-[822px]">
        <!-- 訂單狀態：0: 待付款, 1: 已付款, 2: 已確認收到款, 3:已完課, 4:訂單取消(已過期), 5:訂單取消(不需退款), 6:訂單取消(待退款), 7:訂單取消(已退款) -->
        <!-- note 0: 待付款 v-if='order.paidStatus === 0' -->
        <div v-if="order.paidStatus === 0" class="w-full">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-outline">1</div>
            <div class="line"></div>
            <div class="type type-disable">2</div>
            <div class="line"></div>
            <div class="type type-disable">3</div>
            <div class="line"></div>
            <div class="type type-disable">4</div>
            <div class="line"></div>
            <div class="type type-disable">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">待付款</div>
            <div class="text-disable">已付款</div>
            <div class="text-disable">已確認</div>
            <div class="text-disable">訂單完成</div>
            <div class="text-disable">填寫評論</div>
          </div>
        </div>

        <!-- note 1: 已付款 v-else-if='order.paidStatus === 1' -->
        <div class="w-full" v-else-if="order.paidStatus === 1">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-fill">1</div>
            <div class="line line-fill"></div>
            <div class="type type-outline">2</div>
            <div class="line"></div>
            <div class="type type-disable">3</div>
            <div class="line"></div>
            <div class="type type-disable">4</div>
            <div class="line"></div>
            <div class="type type-disable">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">待付款</div>
            <div class="text-fill text-with-date">
              已付款
              <div class="text-gray5">{{ convertUtcToLocaleDatetime(order.paidTime) }}</div>
            </div>
            <div class="text-disable">已確認</div>
            <div class="text-disable">訂單完成</div>
            <div class="text-disable">填寫評論</div>
          </div>
        </div>

        <!-- note 2: 已確認 v-else-if='order.paidStatus === 2' -->
        <div class="w-full" v-else-if="order.paidStatus === 2">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-fill">1</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">2</div>
            <div class="line line-fill"></div>
            <div class="type type-outline">3</div>
            <div class="line"></div>
            <div class="type type-disable">4</div>
            <div class="line"></div>
            <div class="type type-disable">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">待付款</div>
            <div class="text-fill">已付款</div>
            <div class="text-fill text-with-date">
              已確認
              <div class="text-gray5">{{ convertUtcToLocaleDatetime(order.confirmTime) }}</div>
            </div>
            <div class="text-disable">訂單完成</div>
            <div class="text-disable">填寫評論</div>
          </div>
        </div>

        <!-- note 3: 已完課(訂單完成) v-else-if='order.paidStatus === 3 && 有評論' -->
        <div class="w-full" v-else-if="order.paidStatus === 3 && order.commentId">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-fill">1</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">2</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">3</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">4</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">待付款</div>
            <div class="text-fill">已付款</div>
            <div class="text-fill">已確認</div>
            <div class="text-fill">訂單完成</div>
            <div class="text-fill text-with-date">
              填寫評論
              <div class="text-gray5">
                {{ convertUtcToLocaleDatetime(order.commentId?.createdAt) }}
              </div>
            </div>
          </div>
        </div>

        <!-- note 3: 已完課(訂單完成) v-else-if='order.paidStatus === 3' -->
        <div class="w-full" v-else-if="order.paidStatus === 3">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-fill">1</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">2</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">3</div>
            <div class="line line-fill"></div>
            <div class="type type-outline">4</div>
            <div class="line"></div>
            <div class="type type-disable">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">待付款</div>
            <div class="text-fill">已付款</div>
            <div class="text-fill">已確認</div>
            <div class="text-fill">訂單完成</div>
            <div class="text-disable">填寫評論</div>
          </div>
        </div>

        <!-- ------ 下面是處理取消步驟 ------ -->

        <!-- note 4:訂單取消(已過期) v-else-if='order.paidStatus === 4' -->
        <div class="w-full" v-else-if="order.paidStatus === 4">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-fill">1</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">2</div>
            <div class="line"></div>
            <div class="type type-disable">3</div>
            <div class="line"></div>
            <div class="type type-disable">4</div>
            <div class="line"></div>
            <div class="type type-disable">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">待付款</div>
            <div class="text-fill text-with-date">
              已取消
              <div class="text-gray5" v-if="order.cancelTime">
                未在{{ convertUtcToLocaleDatetime(order.cancelTime) }}前完成轉帳
              </div>
            </div>
            <div class="text-disable">已確認</div>
            <div class="text-disable">訂單完成</div>
            <div class="text-disable">填寫評論</div>
          </div>
        </div>

        <!-- note 5:訂單取消(不需退款) v-else-if='order.paidStatus === 5' -->
        <div class="w-full" v-else-if="order.paidStatus === 5">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-fill">1</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">2</div>
            <div class="line"></div>
            <div class="type type-disable">3</div>
            <div class="line"></div>
            <div class="type type-disable">4</div>
            <div class="line"></div>
            <div class="type type-disable">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">待付款</div>
            <div class="text-fill text-with-date">
              已取消
              <div class="text-gray5" v-if="order.cancelTime">
                {{ convertUtcToLocaleDatetime(order.cancelTime) }}
              </div>
              <div class="text-gray5" v-if="order.cancelReason">
                {{ order.cancelReason }}
              </div>
            </div>
            <div class="text-disable">已確認</div>
            <div class="text-disable">訂單完成</div>
            <div class="text-disable">填寫評論</div>
          </div>
        </div>

        <!-- note 6:訂單取消(待退款) v-else-if='order.paidStatus === 6' -->
        <div class="w-full" v-else-if="order.paidStatus === 6">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-fill">1</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">2</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">3</div>
            <div class="line line-fill"></div>
            <div class="type type-outline">4</div>
            <div class="line"></div>
            <div class="type type-disable">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">已付款</div>
            <div class="text-fill">已確認</div>
            <div class="text-fill">取消訂單</div>
            <div class="text-fill">退款處理</div>
            <div class="text-disable">完成退款</div>
          </div>
        </div>

        <!-- note 7:訂單取消(已退款) v-else-if='order.paidStatus === 7' -->
        <div class="w-full" v-else-if="order.paidStatus === 7">
          <!-- ? 狀態線 -->
          <div class="type-row">
            <div class="type type-fill">1</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">2</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">3</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">4</div>
            <div class="line line-fill"></div>
            <div class="type type-fill">5</div>
          </div>
          <!-- ? 狀態文字 -->
          <div class="text-row">
            <div class="text-fill">已付款</div>
            <div class="text-fill">已確認</div>
            <div class="text-fill">取消訂單</div>
            <div class="text-fill">退款處理</div>
            <div class="text-fill text-with-date">
              完成退款
              <div class="text-gray5">{{ convertUtcToLocaleDatetime(order.refundTime) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ? 確認款項 v-if="order.paidStatus === 1" -->
      <button class="btn-orange mt-7" @click="confirmPayment" v-if="order.paidStatus === 1">
        確認款項
      </button>

      <!-- ? 完成退款 v-if="order.paidStatus === 6" -->
      <button class="btn-orange mt-7" @click="confirmCancelPaymeny" v-if="order.paidStatus === 6">
        完成退款
      </button>
    </section>

    <!-- * 用戶資訊 -->
    <section class="mt-10">
      <div class="block-title">用戶資訊</div>
      <div class="admin-block p-8 text-dark2">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="">姓名：{{ order.memberId?.name }}</div>
          <div class="">支付方式：{{ order?.paymentType === 1 ? '銀行轉帳' : '金流' }}</div>
          <div class="">聯絡電話：{{ order.memberId?.phone }}</div>
          <div class="">課程金額：{{ order?.price }}</div>
          <div class="">E-mail：{{ order.memberId?.account }}</div>
        </div>
        <div class="mt-4">用戶備註：{{ order.note }}</div>
      </div>
    </section>

    <!-- * 訂單內容 -->
    <section class="mt-5">
      <div class="block-title">訂單內容</div>

      <div class="admin-block p-8 text-dark2">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="">訂單編號：{{ order?._id }}</div>
          <div class="">數量：{{ order?.count }}</div>
          <div class="">課程名稱：{{ order?.courseName }}</div>
          <div class="">訂單金額：{{ order?.totalPrice }}</div>
          <div class="">提交時間：{{ convertUtcToLocaleDatetime(order?.createdAt) }}</div>
        </div>
      </div>
    </section>

    <!-- * 付款資訊 -->
    <section class="mt-5" v-if="order.paidStatus > 0 && order.paidStatus !== 5">
      <div class="block-title">付款資訊</div>

      <div class="admin-block p-8 text-dark2">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="">支付方式：{{ order?.paymentType === 1 ? '銀行轉帳' : '金流' }}</div>
          <div class="">訂單金額：{{ order?.totalPrice }}</div>
          <!-- <div class="">銀行名稱：{{ order?.courseName }}</div> -->
          <div class="">實付金額：{{ order?.totalPrice }}</div>
          <div class="">帳號末五碼：{{ order?.lastFiveDigits }}</div>
        </div>

        <!-- ? 確認款項 v-if="order.paidStatus === 1" -->
        <button class="btn-orange mt-4" @click="confirmPayment" v-if="order.paidStatus === 1">
          確認款項
        </button>

        <!-- ? 已確認款項 -->
        <button class="btn-disabled-outline mt-4" v-if="order.paidStatus === 2">已確認款項</button>
      </div>
    </section>

    <!-- * 學員評論 3: 已完課(訂單完成) v-if='order.paidStatus === 3 && 有評論' -->
    <section class="mt-5" v-if="order.paidStatus === 3 && order.commentId">
      <div class="block-title">學員評論</div>

      <div class="admin-block p-8 text-dark2">
        <div class="grid gap-4">
          <div class="">評論編號：{{ order.commentId?._id }}</div>
          <div class="">評論內容：{{ order.commentId?.content }}</div>
        </div>
      </div>
    </section>

    <!-- * 取消訂單 btn -->
    <div
      class="mt-7 flex justify-end"
      v-if="order.paidStatus === 0 || order.paidStatus === 1 || order.paidStatus === 2"
    >
      <button class="btn-orange-outline" @click="cancelOrder">取消訂單</button>
    </div>
  </div>

  <!-- <pre>
    {{ order }}
  </pre> -->
</template>
<style scoped>
.block-title {
  @apply mb-5 text-[14px] font-medium;
}

.type-row {
  @apply flex items-center px-4;
}

.text-row {
  @apply mt-[10px] flex items-start justify-between;
}

.type {
  @apply flex h-[50px] min-h-[50px] w-[50px] min-w-[50px] items-center justify-center rounded-full text-[20px] font-medium;
}

.type-fill {
  @apply bg-primary text-white;
}

.type-outline {
  @apply border-2 border-primary bg-white  text-primary;
}

.type-disable {
  @apply border border-gray5 bg-white text-gray3;
}

.line {
  @apply h-[2px] w-[146px] bg-[#DFE4EA];
}

.line-fill {
  @apply bg-primary;
}

.text-fill {
  @apply w-[80px] text-center font-medium text-[#111928];
}

.text-disable {
  @apply w-[80px] text-center font-medium text-[#AAAAAA];
}

.text-with-date {
  @apply flex flex-col items-center gap-1;
}
</style>
