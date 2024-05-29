<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const orderInfo: any = ref({})

const currentCreatedAt = ref('') // 創建日期的排序方式，日期新到舊(預設)、舊到新: CREATED_AT_ASC
const currentKeyword = ref('') // 搜尋關鍵字, 查詢 訂單編號 || 會員姓名 欄位
const currentPaidStatus = ref('-1') // 訂單狀態：0:待付款, 1: 已付款, 2: 已確認收到款, 3:已完課, 4:訂單取消(已過期), 5:訂單取消(不需退款), 6:訂單取消(待退款), 7:訂單取消(已退款)
const currentStartDate = ref('') // 查詢日期範圍起始日
const currentEndDate = ref('') // 查詢日期範圍終止日

onMounted(() => {
  getOrderData()
})

watch(currentPaidStatus, () => {
  getOrderData()
})

// 取得所有訂單 (Back)
async function getOrderData() {
  try {
    showLoading()

    let data = {
      // page: 1,
      // limit: 10,
      createdAt: currentCreatedAt.value,
      keyword: currentKeyword.value,
      paidStatus: currentPaidStatus.value === '-1' ? '' : Number(currentPaidStatus.value),
      startDate: currentStartDate.value,
      endDate: currentEndDate.value
    }

    const res = await store.apiGetAdminOrders(data)
    const result = res.data
    console.log(`getOrderData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      orderInfo.value = result.data
      console.log(`orderInfo = ${JSON.stringify(orderInfo.value)}`)
    } else {
      console.log('取得訂單資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

function toggleCreatedAt() {
  currentCreatedAt.value = currentCreatedAt.value === '' ? 'CREATED_AT_ASC' : ''

  getOrderData()
}

function togglePaidStatus(status: string) {
  getOrderData()
}

// NOTE 轉換訂單狀態
const statusMap: { [key: number]: string } = {
  0: '待付款',
  1: '已付款',
  2: '已收款',
  3: '已完課',
  4: '不成立',
  5: '不成立',
  6: '待退款',
  7: '已退款'
}

const convertStatus = (status: any) => statusMap[status]
</script>
<template>
  <div v-if="orderInfo" class="h-full w-full overflow-hidden">
    <div class="admin-page-title">訂單管理</div>
    <!-- ? 匯出表格 先緩緩 -->

    <!-- * tab -->
    <div class="admin-tab">
      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentPaidStatus === '-1' }"
        @click="currentPaidStatus = '-1'"
      >
        全部
      </div>

      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentPaidStatus === '0' }"
        @click="currentPaidStatus = '0'"
      >
        待付款
      </div>

      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentPaidStatus === '1' }"
        @click="currentPaidStatus = '1'"
      >
        待確認
      </div>

      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentPaidStatus === '3' }"
        @click="currentPaidStatus = '3'"
      >
        已完課
      </div>

      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentPaidStatus === '4' }"
        @click="currentPaidStatus = '4'"
      >
        不成立
      </div>

      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentPaidStatus === '6' }"
        @click="currentPaidStatus = '6'"
      >
        待退款
      </div>

      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentPaidStatus === '7' }"
        @click="currentPaidStatus = '7'"
      >
        已退款
      </div>

      <div class="line-b"></div>
    </div>

    <!-- * search -->
    <div
      class="mb-7 flex w-full flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="flex w-full flex-col gap-3 lg:flex-row">
        <!-- Date -->
        <div class="flex gap-3">
          <input type="date" class="admin-select w-full" v-model="currentStartDate" />
          <input type="date" class="admin-select w-full" v-model="currentEndDate" />
          <button class="btn-orange-outline shrink-0" @click="getOrderData">日期查詢</button>
        </div>
        <!-- keyeord -->
        <div class="admin-select flex w-[360px] max-w-[360px] shrink-0">
          <input type="text" class="w-full" v-model="currentKeyword" placeholder="訂單號/用戶" />
          <button class="" @click="getOrderData">
            <Icon name="fluent:search-48-filled" size="24" class="text-dark3"></Icon>
          </button>
        </div>
      </div>
    </div>

    <!-- * table -->
    <div class="table-block" v-if="orderInfo.length > 0">
      <!-- header -->
      <div class="table-header min-w-[1400px] grid-cols-10">
        <div class="col-span-2">訂單編號</div>
        <div class="col-span-1">購買用戶</div>
        <div class="col-span-3">課程名稱</div>
        <div class="col-span-1">訂單金額</div>
        <div class="table-th-icon col-span-2" @click="toggleCreatedAt">
          建立時間<Icon name="fluent:arrow-sort-20-filled" size="20"></Icon>
        </div>
        <div class="col-span-1">訂單狀態</div>
      </div>
      <!-- body -->
      <div class="table-body min-w-[1400px] grid-cols-10" v-for="(item, i) in orderInfo">
        <nuxt-link :to="`/admin/order/${item._id}`" class="col-span-2">{{ item._id }}</nuxt-link>
        <div class="col-span-1">{{ item.memberId.name }}</div>
        <div class="col-span-3">{{ item.courseItemName }}</div>
        <div class="col-span-1">{{ item.totalPrice }}</div>
        <div class="col-span-2">{{ item.createdAt }}</div>
        <div class="col-span-1">{{ convertStatus(item.paidStatus) }}</div>
      </div>
    </div>

    <!-- no data -->
    <admin-no-data v-else />
  </div>
</template>
<style scoped>
.admin-tab {
  @apply relative mb-7 flex gap-8;
}
.admin-tab-item {
  @apply z-10 cursor-pointer border-b-2 border-[#C7C6C6] pb-5 text-gray;
}

.admin-tab-item-active {
  @apply border-dark1 text-text-primary;
}

.line-b {
  @apply absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7C6C6];
}
</style>
