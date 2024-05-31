<!-- index 儀表板 -->
<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const overviewInfo: any = ref({})

const dateMode = ref('7days')

onMounted(() => {
  getOverviewData()
})

// 取得儀表板資料 (Back)
async function getOverviewData() {
  try {
    showLoading()

    const res = await store.apiGetAdminOverview()
    const result = res.data
    console.log(`getOverviewData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      overviewInfo.value = result.data
      console.log(`overviewInfo = ${JSON.stringify(overviewInfo.value)}`)
    } else {
      console.log('取得儀表板資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="w-full gap-[30px] lg:grid lg:grid-cols-4" v-if="overviewInfo">
    <div class="w-full lg:col-span-3">
      <div class="admin-block-title">今日銷售狀況</div>
      <div
        class="admin-block flex flex-col flex-wrap justify-center gap-[10px] px-[36px] py-[32px] lg:flex-row lg:items-center"
      >
        <div class="status-item">
          <div class="status-item-num">{{ overviewInfo.todayIncome }}</div>
          <div class="">訂單收入（NT$）</div>
        </div>
        <div class="col-line"></div>
        <div class="status-item">
          <div class="status-item-num">{{ overviewInfo.todayOrderCount }}</div>
          <div class="">訂單數量</div>
        </div>
        <div class="col-line"></div>
        <div class="status-item">
          <div class="status-item-num">0</div>
          <div class="">訪問人數</div>
        </div>
        <div class="col-line"></div>
        <div class="status-item">
          <div class="status-item-num">{{ overviewInfo.todaySaleCourseCount }}</div>
          <div class="">開課中課程</div>
        </div>
        <div class="col-line"></div>
        <div class="status-item">
          <div class="status-item-num">{{ overviewInfo.todaySoldCourseCount }}</div>
          <div class="">已完售課程</div>
        </div>
      </div>

      <div class="admin-block-title mt-6">營收統計</div>
      <div class="admin-block flex flex-col px-6 py-4">
        <!-- 切換日期 按鈕 -->
        <div class="flex w-full justify-end">
          <div class="flex overflow-hidden rounded-[4px] border border-[#5E5E5E] text-[14px]">
            <div
              class="btn-date"
              @click="dateMode = '7days'"
              :class="{ 'btn-date-active': dateMode === '7days' }"
            >
              近7日
            </div>
            <div
              class="btn-date"
              @click="dateMode = '30days'"
              :class="{ 'btn-date-active': dateMode === '30days' }"
            >
              近30日
            </div>
          </div>
        </div>

        <div v-if="dateMode === '7days'">
          <!-- 營收數據 -->
          <div class="mt-4 grid rounded-[8px] bg-[#FFF9F6] px-[36px] py-[32px] lg:grid-cols-3">
            <div class="payment-item">
              <div class="payment-item-num">{{ overviewInfo.totalIncomeLast7Days }}</div>
              <div class="">近7日訂單收入(NT$)</div>
            </div>

            <div class="payment-item">
              <div class="payment-item-num">{{ overviewInfo.orderCountLast7Days }}</div>
              <div class="">近7日訂單數量</div>
            </div>

            <div class="payment-item">
              <div class="payment-item-num">0</div>
              <div class="">近7日訪問用戶數</div>
            </div>
          </div>
          <!-- 營收圖表 -->
          <div class="mt-4">圖表待處理</div>
          <div class="mt-4">
            <pre>{{ overviewInfo.salesDataLast7Days }}</pre>
          </div>
        </div>

        <div v-else>
          <!-- 營收數據 -->
          <div class="mt-4 grid rounded-[8px] bg-[#FFF9F6] px-[36px] py-[32px] lg:grid-cols-3">
            <div class="payment-item">
              <div class="payment-item-num">{{ overviewInfo.totalIncomeLast30Days }}</div>
              <div class="">近30日訂單收入(NT$)</div>
            </div>

            <div class="payment-item">
              <div class="payment-item-num">{{ overviewInfo.orderCountLast30Days }}</div>
              <div class="">近30日訂單數量</div>
            </div>

            <div class="payment-item">
              <div class="payment-item-num">0</div>
              <div class="">近30日訪問用戶數</div>
            </div>
          </div>
          <!-- 營收圖表 -->
          <div class="mt-4">圖表待處理</div>
          <div class="mt-4">
            <pre>{{ overviewInfo.salesDataLast30Days }}</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full lg:col-span-1">
      <div class="admin-block-title">待辦事項</div>

      <div
        v-if="overviewInfo.orderStatusCounts"
        class="admin-block flex flex-col items-start gap-[10px] px-[48px] py-[32px]"
      >
        <div class="flex items-center gap-5">
          <div class="payment-no">{{ overviewInfo?.orderStatusCounts[0].status6 }}</div>
          <div class="">待退訂訂單</div>
        </div>

        <div class="flex items-center gap-5">
          <div class="payment-no">{{ overviewInfo?.orderStatusCounts[0].status0 }}</div>
          <div class="">待付款訂單</div>
        </div>

        <div class="flex items-center gap-5">
          <div class="payment-no">{{ overviewInfo?.orderStatusCounts[0].status1 }}</div>
          <div class="">款項待審核</div>
        </div>
      </div>

      <div class="admin-block-title mt-6">銷售佔比</div>

      <div v-if="dateMode === '7days'" class="admin-block flex flex-col px-[48px] py-[32px]">
        圖表待處理
        <pre>{{ overviewInfo.salesSummaryLast7Days }}</pre>
      </div>
      <div v-else class="admin-block flex flex-col px-[48px] py-[32px]">
        圖表待處理
        <pre>{{ overviewInfo.salesSummaryLast30Days }}</pre>
      </div>
    </div>
  </div>
</template>
<style scoped>
.status-item {
  @apply flex grow flex-col items-center gap-2;
}

.status-item-num {
  @apply text-[30px] font-bold lg:text-[40px];
}

.col-line {
  @apply hidden h-[64px] w-[1px] bg-[#00000033] lg:block;
}

/*  */
.payment-item {
  @apply flex flex-col items-start gap-2;
}

.payment-item-num {
  @apply text-[40px] font-semibold;
}

.payment-no {
  @apply w-[23px] text-center text-[40px] font-semibold;
  font-family: 'Noto Sans TC';
}

/* date mode */
.btn-date {
  @apply w-[68px] cursor-pointer  bg-white py-1 text-center text-[#5E5E5E];
}

.btn-date-active {
  @apply w-[68px] cursor-pointer bg-[#5E5E5E] py-1 text-center text-white;
}
</style>
