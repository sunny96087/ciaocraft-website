<script lang="ts" setup>
// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})

const router = useRouter()
const memberStore = useMemberStore()
const password = ref('')
const confirmPassword = ref('')
const passwordVisible = ref(false)
const confirmPasswordVisible = ref(false)
const errorMessage = ref('')
const hasError = ref(false)

const resetPassword = async () => {
  if (password.value === '' || confirmPassword.value === '') {
    hasError.value = true
    errorMessage.value = '請輸入密碼'
    return
  }

  if (password.value !== confirmPassword.value) {
    hasError.value = true
    errorMessage.value = '密碼不一致'
    return
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/

  if (!passwordRegex.test(password.value)) {
    hasError.value = true
    errorMessage.value = '密碼需包含英文及數字，且至少 8 碼'
    return
  }

  try {
    showLoading()
    let postData = {
      newPassword: password.value,
      confirmNewPassword: confirmPassword.value
    }
    const res = await memberStore.updatePassword(postData)
    const result = res.data
    if (result.statusCode === 200) {
      hasError.value = false
      showToast('修改成功')
      router.push('/member')
    } else {
      showToastError('修改失敗')
    }
  } catch (e: any) {
    showToastError('發生錯誤，請稍後再試')
  } finally {
    hideLoading()
  }

  hasError.value = false
  errorMessage.value = ''
}
</script>

<template>
  <div class="bg-gray1 py-5 lg:px-[100px]">
    <div class="mx-auto px-5 py-9 lg:max-w-screen-xl">
      <div class="space-y-8 md:max-w-[711px]">
        <h1 class="mb-3 mt-3 text-4xl">修改密碼</h1>
        <div class="space-y-3">
          <div class="space-y-2">
            <h2>密碼<span class="text-danger">*</span></h2>
            <div
              class="flex items-center justify-between rounded-[4px] border border-solid border-gray bg-white px-4 py-2"
            >
              <div class="flex w-full">
                <input
                  class="w-full"
                  :type="passwordVisible ? 'text' : 'password'"
                  name="password"
                  v-model="password"
                  placeholder="密碼*"
                />
              </div>
              <button
                class="flex w-4 items-center justify-center self-center"
                @click="passwordVisible = !passwordVisible"
              >
                <Icon name="ph:eye-light" />
              </button>
            </div>
          </div>
          <div class="space-y-2">
            <h2>確認新密碼<span class="text-danger">*</span></h2>
            <div
              class="flex items-center justify-between rounded-[4px] border border-solid border-gray bg-white px-4 py-2"
            >
              <div class="flex w-full">
                <input
                  class="w-full"
                  :type="confirmPasswordVisible ? 'text' : 'password'"
                  name="password"
                  v-model="confirmPassword"
                  placeholder="確再輸入新密碼"
                />
              </div>
              <button
                class="flex w-4 items-center justify-center self-center"
                @click="confirmPasswordVisible = !confirmPasswordVisible"
              >
                <Icon name="ph:eye-light" />
              </button>
            </div>
          </div>
          <div class="text-danger" v-if="hasError">
            {{ errorMessage }}
          </div>
        </div>
        <button
          class="rounded-[4px] bg-primary px-6 py-2 text-center tracking-wider text-white transition duration-300 hover:bg-primary-light"
          @click="resetPassword"
        >
          儲存
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
