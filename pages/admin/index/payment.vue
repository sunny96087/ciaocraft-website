<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const paymentInfo: any = ref({})
const summaryInfo: any = ref({})

const currentStartDate = ref('') // 查詢日期範圍起始日
const currentEndDate = ref('') // 查詢日期範圍終止日
onMounted(() => {
  getPaymentData()
  getPaymentSummary()
})

// NOTE 取得所有進帳 (Back)
async function getPaymentData() {
  try {
    showLoading()

    let data = {
      // page: 1,
      // limit: 10,
      startDate: currentStartDate.value,
      endDate: currentEndDate.value
    }

    const res = await store.apiGetAdminIncome(data)
    const result = res.data
    console.log(`getPaymentData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      paymentInfo.value = result.data
      console.log(`paymentInfo = ${JSON.stringify(paymentInfo.value)}`)
    } else {
      console.log('取得進帳資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// NOTE 取得進帳總覽 (Back)
async function getPaymentSummary() {
  try {
    showLoading()

    const res = await store.apiGetAdminIncomeSummary()
    const result = res.data
    console.log(`getPaymentSummary result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      summaryInfo.value = result.data
      console.log(`summaryInfo = ${JSON.stringify(summaryInfo.value)}`)
    } else {
      console.log('取得進帳總覽失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="">
    <div class="admin-page-title">財務管理</div>

    <div class="admin-block-title">進帳總覽(NT$)</div>
    <div
      v-if="summaryInfo"
      class="admin-block grid grid-cols-2 items-center justify-center gap-x-[10px] gap-y-6 p-4 md:flex md:gap-[10px] md:px-[36px] md:py-[32px]"
    >
      <div class="status-item">
        <div class="">今日</div>
        <div class="status-item-num">{{ summaryInfo.today }}</div>
      </div>
      <div class="col-line"></div>
      <div class="status-item">
        <div class="">近7日</div>
        <div class="status-item-num">{{ summaryInfo.sevenDays }}</div>
      </div>
      <div class="col-line"></div>
      <div class="status-item">
        <div class="">近30日</div>
        <div class="status-item-num">{{ summaryInfo.thirtyDays }}</div>
      </div>
      <div class="col-line"></div>
      <div class="status-item">
        <div class="">全部</div>
        <div class="status-item-num">{{ summaryInfo.twelveMonths }}</div>
      </div>
    </div>

    <div class="admin-block-title mt-7">進帳詳情</div>

    <!-- * search -->
    <div
      class="mb-7 flex w-full flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="flex w-full flex-col gap-3 lg:flex-row">
        <!-- Date -->
        <div class="flex flex-col gap-3 sm:flex-row">
          <input type="date" class="admin-select w-full" v-model="currentStartDate" />
          <input type="date" class="admin-select w-full" v-model="currentEndDate" />
          <button class="btn-orange-outline shrink-0" @click="getPaymentData">日期查詢</button>
        </div>
      </div>

      <!-- note 匯出報表先緩緩 -->
    </div>

    <!-- * table -->
    <div class="table-block" v-if="paymentInfo.length > 0">
      <!-- header -->
      <div class="table-header min-w-[1400px] grid-cols-8">
        <div class="col-span-2">訂單編號</div>
        <div class="col-span-2">進帳時間</div>
        <div class="col-span-3">課程名稱</div>
        <div class="col-span-1">實收金額</div>
      </div>
      <!-- body -->
      <div class="table-body min-w-[1400px] grid-cols-8" v-for="(item, i) in paymentInfo">
        <div class="col-span-2">{{ item._id }}</div>
        <div class="col-span-2">{{ item.transactionTime }}</div>
        <div class="col-span-3">{{ item.courseName }}</div>
        <div class="col-span-1">{{ item.totalPrice }}</div>
      </div>
    </div>

    <!-- no data -->
    <admin-no-data v-else />
  </div>
</template>
<style scoped>
.status-item {
  @apply flex grow flex-col items-center gap-2;
}

.status-item-num {
  @apply text-[30px] font-bold md:text-[40px];
}

.col-line {
  @apply hidden h-[64px] w-[1px] bg-[#00000033] md:block;
}
</style>
