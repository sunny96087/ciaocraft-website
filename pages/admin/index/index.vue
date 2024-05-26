<!-- index 儀表板 -->
<script setup lang="ts"></script>
<template>
  <div class="grid grid-cols-4 gap-x-[30px]">
    <div class="col-span-3">
      <div class="admin-block-title">今日銷售狀況</div>
      <div class="admin-block flex items-center justify-center gap-[10px] px-[36px] py-[32px]">
        <div class="status-item">
          <div class="status-item-num">6,600</div>
          <div class="">訂單收入（NT$）</div>
        </div>
        <div class="col-line"></div>
        <div class="status-item">
          <div class="status-item-num">10</div>
          <div class="">訂單數量</div>
        </div>
        <div class="col-line"></div>
        <div class="status-item">
          <div class="status-item-num">40</div>
          <div class="">訪問人數</div>
        </div>
        <div class="col-line"></div>
        <div class="status-item">
          <div class="status-item-num">3</div>
          <div class="">開課中課程</div>
        </div>
        <div class="col-line"></div>
        <div class="status-item">
          <div class="status-item-num">2</div>
          <div class="">已完售課程</div>
        </div>
      </div>

      <div class="admin-block-title mt-6">營收統計</div>
      <div class="admin-block flex flex-col px-6 py-4">
        <!-- 切換日期 按鈕 -->
        <div class="flex w-full justify-end">
          <div class="flex overflow-hidden rounded-[4px] border border-[#5E5E5E] text-[14px]">
            <div class="w-[68px] cursor-pointer bg-[#5E5E5E] py-1 text-center text-white">
              近7日
            </div>
            <div class="w-[68px] cursor-pointer py-1 text-center text-[#5E5E5E]">近30日</div>
          </div>
        </div>

        <!-- 營收數據 -->
        <div class="mt-4 grid grid-cols-3 rounded-[8px] bg-[#FFF9F6] px-[36px] py-[32px]">
          <div class="payment-item">
            <div class="payment-item-num">144,000</div>
            <div class="">近7日訂單收入(NT$)</div>
          </div>

          <div class="payment-item">
            <div class="payment-item-num">40</div>
            <div class="">近7日訂單數量</div>
          </div>

          <div class="payment-item">
            <div class="payment-item-num">208</div>
            <div class="">近7日訪問用戶數</div>
          </div>
        </div>
        <!-- 營收圖表 -->
        <div class="mt-4">圖表待處理</div>
      </div>
    </div>

    <div class="col-span-1">
      <div class="admin-block-title">待辦事項</div>

      <div class="admin-block flex flex-col items-start gap-[10px] px-[48px] py-[32px]">
        <div class="flex items-center gap-5">
          <div class="payment-no">1</div>
          <div class="">待退訂訂單</div>
        </div>

        <div class="flex items-center gap-5">
          <div class="payment-no">4</div>
          <div class="">待付款訂單</div>
        </div>

        <div class="flex items-center gap-5">
          <div class="payment-no">4</div>
          <div class="">款項待審核</div>
        </div>
      </div>

      <div class="admin-block-title mt-6">銷售佔比</div>

      <div class="admin-block flex flex-col px-[48px] py-[32px]">圖表待處理</div>
    </div>
  </div>
</template>
<style scoped>
.status-item {
  @apply flex grow flex-col items-center gap-2;
}

.status-item-num {
  @apply text-[40px] font-bold;
}

.col-line {
  @apply h-[64px] w-[1px] bg-[#00000033];
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
</style>
