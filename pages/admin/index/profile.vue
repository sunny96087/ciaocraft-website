<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const vendorInfo: any = ref({})
const modalEditPassword = ref(false)

const currentPassword = ref('')
const password = ref('')
const confirmPassword = ref('')

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
  if (vendorInfo.value.representative === '') {
    showToast('請輸入品牌負責人')
    return
  }
  if (vendorInfo.value.mobile === '') {
    showToast('請輸入手機號碼')
    return
  }

  try {
    showLoading()
    let data = {
      representative: vendorInfo.value.representative,
      mobile: vendorInfo.value.mobile
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

// 修改密碼
function openEditPasswordModal() {
  modalEditPassword.value = true
}

// 取消修改密碼
function cancelEditPassword() {
  modalEditPassword.value = false

  currentPassword.value = ''
  password.value = ''
  confirmPassword.value = ''
}

// 修改密碼 (Back)
async function editPassword() {
  if (currentPassword.value === '') {
    showToast('請輸入舊密碼')
    return
  }
  if (password.value === '') {
    showToast('請輸入新密碼')
    return
  }
  if (confirmPassword.value === '') {
    showToast('請確認新密碼')
    return
  }
  if (password.value !== confirmPassword.value) {
    showToast('新密碼與確認新密碼不一致')
    return
  }

  try {
    showLoading()
    let data = {
      currentPassword: currentPassword.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }
    const res = await store.apiUpdateAdminVendorPassword(data)
    const result = res.data
    console.log(`editPassword result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('修改密碼成功')
      cancelEditPassword()
    } else {
      console.log('修改密碼失敗')
      showToast('修改密碼失敗')
    }
  } catch (e: any) {
    console.log(e)
    showToast(e.response.data.message)
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="" v-if="vendorInfo">
    <div class="admin-page-title">個人設定</div>

    <div class="admin-page-block flex flex-col gap-6">
      <!-- >> component: row-input -->
      <div class="row-input">
        <div class="row-input-title">品牌負責人</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="text"
            placeholder="請輸入姓名"
            v-model="vendorInfo.representative"
            :class="{ 'admin-input-error': vendorInfo.representative === '' }"
          />
          <div v-if="vendorInfo.representative === ''" class="admin-input-error-note">
            此欄位不能留空
          </div>
        </div>
      </div>

      <div class="row-input">
        <div class="row-input-title">手機號碼</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="tel"
            placeholder="請輸入手機號碼"
            v-model="vendorInfo.mobile"
            :class="{ 'admin-input-error': vendorInfo.mobile === '' }"
          />
          <div v-if="vendorInfo.mobile === ''" class="admin-input-error-note">此欄位不能留空</div>
        </div>
      </div>

      <!-- >> component: row-input disabled -->
      <div class="row-input">
        <div class="row-input-title">電子信箱</div>
        <input
          class="admin-input admin-input-disabled"
          disabled
          readonly
          type="text"
          v-model="vendorInfo.account"
        />
      </div>

      <div class="row-input">
        <div class="row-input-title">密碼</div>
        <button class="btn-orange-outline" @click="openEditPasswordModal">修改密碼</button>
      </div>
    </div>

    <!-- btn -->
    <div class="mt-[28px] flex gap-3">
      <!-- <button class="btn-orange-outline" @click="cancelEdit">取消</button> -->
      <button class="btn-orange" @click="editVendorData">儲存</button>
    </div>

    <!-- >> component: modal -->
    <div v-if="modalEditPassword" class="modal-bg">
      <div class="modal-box">
        <div class="modal-top">
          <div class="modal-title">修改密碼</div>
          <button class="modal-cancle" @click="cancelEditPassword">
            <Icon name="material-symbols:close-rounded" size="24"></Icon>
          </button>
        </div>

        <!-- ? modal-body -->
        <div class="flex flex-col gap-6">
          <div class="row-input">
            <div class="row-input-title">舊密碼</div>
            <div class="w-full">
              <input
                class="admin-input"
                type="password"
                placeholder="請輸入舊密碼"
                v-model="currentPassword"
                :class="{ 'admin-input-error': currentPassword === '' }"
              />
              <div v-if="currentPassword === ''" class="admin-input-error-note">此欄位不能留空</div>
            </div>
          </div>

          <div class="row-input">
            <div class="row-input-title">新密碼</div>
            <div class="w-full">
              <input
                class="admin-input"
                type="password"
                placeholder="請輸入新密碼（至少8字元且中英混用）"
                v-model="password"
                :class="{ 'admin-input-error': password === '' }"
              />
              <div v-if="password === ''" class="admin-input-error-note">此欄位不能留空</div>
            </div>
          </div>

          <div class="row-input">
            <div class="row-input-title">確認新密碼</div>
            <div class="w-full">
              <input
                class="admin-input"
                type="password"
                placeholder="請確認新密碼（至少8字元且中英混用）"
                v-model="confirmPassword"
                :class="{ 'admin-input-error': confirmPassword === '' }"
              />
              <div v-if="confirmPassword === ''" class="admin-input-error-note">此欄位不能留空</div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-orange" @click="editPassword">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
