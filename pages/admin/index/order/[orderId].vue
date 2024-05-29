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

// * 取得單一訂單 (Back)
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
</script>
<template>
  <div class="" v-if="order">
    <!-- >> component: 麵包屑 Breadcrumbs -->
    <div class="admin-breadcrumbs">
      <nuxt-link to="/admin/teacher">訂單列表</nuxt-link>
      <Icon name="material-symbols-light:arrow-forward-ios-rounded" size="16" class=""></Icon>
      <span class="text-dark1">訂單詳情</span>
    </div>

    <!-- * title -->
    <div class="admin-page-title">訂單詳情</div>

    <!-- * btn -->
    <div class="mb-7 flex justify-end">
      <button class="btn-orange btn-orange-icon">
        <Icon size="24" name="ph:chat-centered-dots-light" />訊息中心
      </button>
    </div>

    <!-- >> Info -->

    <!-- * 訂單記錄 -->
    <section>
      <div class="block-title">訂單記錄</div>

      {{ order.paymentType }}
      <div class="w-full max-w-[822px]">
        <!-- 訂單狀態：0: 待付款, 1: 已付款, 2: 已確認收到款, 3:已完課, 4:訂單取消(已過期), 5:訂單取消(不需退款), 6:訂單取消(待退款), 7:訂單取消(已退款) -->
        <!-- note 0: 待付款 v-if='order.paymentType === 0' -->
        <div class="w-full">
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
            <div class="text-fill">提交訂單</div>
            <div class="text-fill">待付款</div>
            <div class="text-disable">已付款</div>
            <div class="text-disable">已確認</div>
            <div class="text-disable">訂單完成</div>
          </div>
        </div>

        <!-- note 1: 已付款 v-else-if='order.paymentType === 1' -->
        <div class="w-full">
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
            <div class="text-fill">提交訂單</div>
            <div class="text-fill flex flex-col items-center gap-1">
              已付款
              <div class="text-gray5">{{ order.paidTime }}</div>
            </div>
            <div class="text-disable">已審核付款</div>
            <div class="text-disable">已確認</div>
            <div class="text-disable">訂單完成</div>
          </div>
        </div>
      </div>
    </section>

    <!-- * 用戶資訊 -->
    <section class="mt-5">
      <div class="block-title">用戶資訊</div>
      <div class="admin-block p-8 text-dark2">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="">姓名：{{ order.memberId?.name }}</div>
          <div class="">支付方式：{{ order?.paymentType === 1 ? 'ATM 轉帳' : '金流' }}</div>
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
          <div class="">提交時間：{{ order?.createdAt }}</div>
        </div>
      </div>
    </section>
  </div>

  <pre>
    {{ order }}
  </pre>
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
  @apply flex h-[50px] w-[50px] items-center justify-center rounded-full text-[20px] font-medium;
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
</style>
