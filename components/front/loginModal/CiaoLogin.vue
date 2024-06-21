<script setup lang="ts">
const authStore = useAuthStore()

// 響應變數
const email = ref('')
const password = ref('')
const passwordVisible = ref(false)
const alert = ref('')
const hasError = ref(false)

// modal 內容切換 emit 到父元件 LoginModal.vue
const emit = defineEmits(['changeContent'])
const chnageContent = (viewName: string): void => {
  emit('changeContent', viewName)
}

// 登入
async function login() {
  if (!email.value || !password.value) {
    alert.value = '請輸入帳號密碼'
    hasError.value = true
    return
  } else {
    showLoading()
    const postData = {
      account: email.value,
      password: password.value
    }

    await authStore
      .login(postData)
      .then((res: any) => {
        hideLoading()
        const result = res.data
        if (result.statusCode === 200) {
          authStore.setMember(result.user)
          showToast('登入成功')
          // emit('changeContent', 'close')
          window.location.reload()
        }
      })
      .catch((err) => {
        hideLoading()
        alert.value = err.response.data.message
        hasError.value = true
      })
  }
}
</script>

<template>
  <div class="mx-auto flex flex-col items-center space-y-8 md:px-[60px]">
    <span class="self-center text-2xl font-medium">用 會員帳號 登入</span>
    <span class="self-center" :class="{ 'text-danger': hasError }" v-if="hasError">{{
      alert
    }}</span>
    <div class="w-full space-y-3">
      <div
        class="flex items-center justify-between rounded-[4px] border border-solid border-gray px-4 py-2 text-sm"
      >
        <Icon name="ph:user-light" class="mr-2 flex w-4 items-center justify-center self-center" />
        <input class="w-full" type="email" name="email" v-model="email" placeholder="電子信箱*" />
      </div>
      <div
        class="flex items-center justify-between rounded-[4px] border border-solid border-gray px-4 py-2 text-sm"
      >
        <div class="flex w-full">
          <Icon
            name="carbon:password"
            class="mr-2 flex w-4 items-center justify-center self-center"
          />
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
    <button
      class="my-6 flex w-full items-center justify-center rounded-[4px] bg-primary py-2 text-center text-white transition hover:bg-primary-light hover:text-white"
      @click="login()"
    >
      登入
    </button>
    <div class="m-2 flex items-center">
      <button
        class="inline-block text-secondary transition hover:text-secondary-light"
        @click="chnageContent('forgetPwd')"
      >
        忘記密碼
      </button>
      <span class="inline-block px-2">|</span>
      <button
        class="inline-block text-primary transition hover:text-primary-light"
        @click="chnageContent('register')"
      >
        註冊會員
      </button>
    </div>
  </div>
</template>

<style scoped></style>
