<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const token: any = route.query.token

const breadcrumb = [
  { pageName: '首頁', link: '/', isCurrentPage: false },
  { pageName: '忘記密碼', link: '/member/forgetPwd', isCurrentPage: true }
]

const password: any = ref('')
const confirmPassword: any = ref('')

const passwordVisible = ref(false)
const confirmPasswordVisible = ref(false)

const getResetPasswordToken = () => {
  if (process.client) {
    if (token) {
      return
    }
    showToast('無權限，請重新申請密碼重設')
    router.push('/')
  } else {
    showToast('無權限，請重新申請密碼重設')
    router.push('/')
  }
}

const resetPassword = async () => {
  if (password.value === '' || confirmPassword.value === '') {
    showToast('請輸入密碼')
    return
  }
  if (password.value !== confirmPassword.value) {
    showToast('密碼不一致')
    return
  }

  try {
    showLoading()
    let postData = {
      token: route.query.token,
      password: password.value,
      confirmPassword: confirmPassword.value
    }

    const res = await authStore.resetPassword(postData)
    const result = res.data

    if (result.statusCode === 200) {
      showToast('修改成功')
      router.push('/')
    } else {
      showToastError('無權限，請重新申請密碼重設')
      router.push('/')
    }
  } catch (e) {
    showToastError('無權限，請重新申請密碼重設')
    router.push('/')
  }
  hideLoading()
}
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
  getResetPasswordToken()
})
</script>

<template>
  <div class="bg-gray1">
    <div class="mx-auto px-5 py-14 lg:max-w-screen-xl">
      <FrontBreadcrumb v-if="hydrated" class="mb-8" :breadcrumb="breadcrumb"></FrontBreadcrumb>
      <div class="space-y-8 md:max-w-[711px]">
        <h1 class="mb-3 mt-3 text-4xl">忘記密碼</h1>
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
