<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const vendorInfo: any = ref({
  bankName: '',
  bankCode: '',
  bankBranch: '',
  bankAccountName: '',
  bankAccount: ''
})

onMounted(() => {
  getVendorData()
})

// 取得登入賣家資料 (Back)
async function getVendorData() {
  try {
    showLoading()
    const res = await store.apiGetAdminVendor()
    const result = res.data
    console.log(`getVendorData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      vendorInfo.value = result.data
      console.log(`vendorInfo = ${JSON.stringify(vendorInfo.value)}`)
    } else {
      console.log('取得使用者資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 編輯賣家資料 (Back)
async function editVendorData() {
  // if (vendorInfo.value.brandName === '') {
  //   showToast('請輸入品牌名稱')
  //   return
  // }
  // if (vendorInfo.value.intro === '') {
  //   showToast('請輸入品牌介紹')
  //   return
  // }

  try {
    showLoading()
    let data = {
      bankName: vendorInfo.value.bankName,
      bankCode: vendorInfo.value.bankCode,
      bankBranch: vendorInfo.value.bankBranch,
      bankAccountName: vendorInfo.value.bankAccountName,
      bankAccount: vendorInfo.value.bankAccount
    }
    const res = await store.apiUpdateAdminVendor(data)
    const result = res.data
    console.log(`editVendorData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('修改成功')
      getVendorData()
    } else {
      console.log('修改失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 取消編輯
function cancelEdit() {
  getVendorData()
}
</script>
<template>
  <div class="">
    <div class="admin-page-title">銀行帳號管理</div>

    <div class="admin-page-block flex flex-col gap-6">
      <!-- >> component: row-input -->
      <div class="row-input">
        <div class="row-input-title">銀行名稱</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="text"
            placeholder="請輸入銀行名稱"
            v-model="vendorInfo.bankName"
            :class="{ 'admin-input-error': vendorInfo.bankName === '' }"
          />
          <div v-if="vendorInfo.bankName === ''" class="admin-input-error-note">此欄位不能留空</div>
        </div>
      </div>

      <div class="row-input">
        <div class="row-input-title">銀行代碼</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="text"
            placeholder="請輸入銀行代碼"
            v-model="vendorInfo.bankCode"
            :class="{ 'admin-input-error': vendorInfo.bankCode === '' }"
          />
          <div v-if="vendorInfo.bankCode === ''" class="admin-input-error-note">此欄位不能留空</div>
        </div>
      </div>

      <div class="row-input">
        <div class="row-input-title">分行名稱</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="text"
            placeholder="請輸入分行名稱"
            v-model="vendorInfo.bankBranch"
            :class="{ 'admin-input-error': vendorInfo.bankBranch === '' }"
          />
          <div v-if="vendorInfo.bankBranch === ''" class="admin-input-error-note">
            此欄位不能留空
          </div>
        </div>
      </div>

      <div class="row-input">
        <div class="row-input-title">銀行戶名</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="text"
            placeholder="請輸入銀行戶名"
            v-model="vendorInfo.bankAccountName"
            :class="{ 'admin-input-error': vendorInfo.bankAccountName === '' }"
          />
          <div v-if="vendorInfo.bankAccountName === ''" class="admin-input-error-note">
            此欄位不能留空
          </div>
        </div>
      </div>

      <div class="row-input">
        <div class="row-input-title">銀行帳號</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="text"
            placeholder="請輸入銀行帳號"
            v-model="vendorInfo.bankAccount"
            :class="{ 'admin-input-error': vendorInfo.bankAccount === '' }"
          />
          <div v-if="vendorInfo.bankAccount === ''" class="admin-input-error-note">
            此欄位不能留空
          </div>
        </div>
      </div>
    </div>

    <!-- * btn -->
    <div class="mt-[28px] flex gap-3">
      <!-- <button class="btn-orange-outline" @click="cancelEdit">取消</button> -->
      <button class="btn-orange" @click="editVendorData">儲存</button>
    </div>
  </div>
</template>
<style scoped>
.media-row {
  @apply flex items-center gap-[10px];
}

.tooltip {
  @apply absolute -right-[118px] bottom-[16px];
  background: url('~/assets/images/admin/tooltip-bg.svg') no-repeat center center;
  background-size: cover;
  background-size: 100% 100%;
  z-index: 10;
}
</style>
