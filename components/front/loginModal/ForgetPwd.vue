<script setup lang="ts">
const authStore = useAuthStore()

const email = ref('')
const hasError = ref(false)
const alert = ref('')

// modal 內容切換
const emit = defineEmits(['changeContent'])

const sendForgetPwdEmail = async () => {
  console.log('sendForgetPwdEmail')
  if (email.value === '') {
    hasError.value = true
    alert.value = '電子信箱為必填'
    return
  } else {
    showLoading()
    const data = { account: email.value }
    authStore
      .sendForgetPasswordEmail(data)
      .then((res) => {
        hideLoading()
        emit('changeContent', 'forgetPwdSuccess')
      })
      .catch((err) => {
        hideLoading()
        hasError.value = true
        alert.value = err.response.data.message
      })
  }
}
</script>

<template>
  <div class="space-y-8 md:px-[60px]">
    <div class="space-y-4">
      <span class="block text-center text-2xl font-medium">忘記密碼</span>
      <span class="block text-center">請輸入會員所使用的電子信箱</span>
      <span class="block text-center" :class="{ 'text-danger': hasError }" v-if="hasError">{{
        alert
      }}</span>
    </div>
    <div
      class="flex w-full items-center justify-between rounded-[4px] border border-solid border-gray px-4 py-2 text-sm"
    >
      <Icon name="ph:user-light" class="mr-2 flex w-4 items-center justify-center self-center" />
      <input class="w-full" type="email" name="email" v-model="email" placeholder="電子信箱*" />
    </div>
    <button
      class="box my-6 flex w-full items-center justify-center rounded-[4px] bg-primary py-2 text-center text-white transition duration-300 hover:bg-primary-light"
      @click="sendForgetPwdEmail()"
    >
      送出
    </button>
  </div>
</template>
