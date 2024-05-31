<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'
const router = useRouter()
const route = useRoute()

const token = route.query.token as string
const password = ref('')
const confirmPassword = ref('')

// NOTE 重設密碼
async function resetPassword() {
  if (password.value === '' || confirmPassword.value === '') {
    showToast('請輸入新密碼')
    return
  }

  if (password.value !== confirmPassword.value) {
    showToast('兩次密碼輸入不一致')
    return
  }

  try {
    showLoading()

    const res = await store.apiResetAdminVendorPassword({
      token,
      password: password.value,
      confirmPassword: confirmPassword.value
    })
    const result = res.data
    console.log(`resetPassword result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('密碼修改成功')
      router.push('/adminLogin')
    } else {
      showToast('密碼修改失敗，請聯絡平台管理員')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="m-auto flex h-screen items-center justify-center bg-orange5 p-4">
    <div
      class="flex w-full max-w-[500px] flex-col gap-6 rounded-lg bg-white bg-opacity-20 p-5 shadow"
    >
      <div class="admin-page-title">Ciao! Craft 賣家修改密碼</div>
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

      <button
        :disabled="password === '' || confirmPassword === ''"
        class="btn-orange"
        @click="resetPassword"
      >
        送出
      </button>
    </div>
  </div>
</template>
<style scoped></style>
