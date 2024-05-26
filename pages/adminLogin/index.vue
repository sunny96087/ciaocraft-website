<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const tab = ref(0)

const forgetEmail = ref('')
const checkEmailError = ref(false)
const checkEmailErrorMessage = ref('')

const checkForgetEmail = async () => {
  if (forgetEmail.value && forgetEmail.value !== '') {
    // 這裡進行你的檢查邏輯，例如顯示一個錯誤訊息

    try {
      showLoading()

      let data = {
        forgetEmail: forgetEmail.value
      }
      console.log(data)

      const res: any = await store.apiCheckVenderEmail(data)
      const result = res.data
      console.log(`editEvent result = ${JSON.stringify(result)}`)

      if (result.statusCode === 200) {
        checkEmailError.value = false
      } else {
        checkEmailError.value = true
      }
    } catch (e) {
      console.log(e)
      checkEmailErrorMessage.value = '帳號不存在，請輸入正確的 Email！'
      checkEmailError.value = true
    } finally {
      hideLoading()
    }
  } else {
    checkEmailErrorMessage.value = 'email 不得為空'
    checkEmailError.value = true
  }

  if (forgetEmail.value && forgetEmail.value !== '') {
    // 驗證格式是否為信箱格式
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (emailRegex.test(forgetEmail.value)) {
      console.log('email 格式正確')
    } else {
      checkEmailErrorMessage.value = 'email 格式不正確'
      checkEmailError.value = true
    }
  }
}

const sendForgetEmail = async () => {
  showToast('該功能製作中 ><')
  // try {
  //   showLoading()

  //   let data = {
  //     forgetEmail: forgetEmail.value
  //   }
  //   console.log(data)

  //   const res: any = await store.apiForgetPassword(data)
  //   const result = res.data
  //   console.log(`editEvent result = ${JSON.stringify(result)}`)

  //   if (result.statusCode === 200) {
  //     showToast('已寄出密碼重設信，請至信箱查看')
  //     tab.value = 0
  //   } else {
  //     showToast('發生錯誤，請稍後再試')
  //   }
  // } catch (e) {
  //   console.log(e)
  //   showToast('發生錯誤，請稍後再試')
  // } finally {
  //   hideLoading()
  // }
}
</script>
<template>
  <div
    class="min-h-screen bg-[#F9FAFB] px-5 lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-[80px] lg:px-[80px] xl:gap-[140px] xl:px-[140px]"
  >
    <!-- * 歡迎文字 -->
    <div class="flex w-full flex-col items-center gap-5 p-8 lg:items-start lg:gap-10 lg:p-0">
      <div class="w-[80%] max-w-[560px] lg:w-full">
        <img src="~/assets/images/admin/logo.svg" alt="logo" class="pic-auto" />
      </div>
      <div class="text-[20px] lg:text-[24px]">Enjoy Your Learning !</div>
    </div>

    <!-- * 登入框 -->
    <div class="login-block">
      <!-- ? 登入 tab === 0 -->
      <div v-if="tab === 0" class="">
        <div class="text-[24px] font-bold">用 賣家帳號 登入</div>
        <div class="login-block-input mt-8 lg:mt-10">
          <Icon size="20" name="bi:envelope" />
          <input type="text" placeholder="電子信箱" />
        </div>
        <div class="login-block-input mt-5">
          <Icon size="20" name="fluent:key-24-regular" />
          <input type="password" placeholder="密碼" />
        </div>
        <button class="mt-8 w-full rounded-[4px] bg-black py-2 text-white lg:mt-10">登入</button>
        <div class="mt-10 flex justify-center gap-5 lg:mt-[60px] lg:justify-end">
          <div class="cursor-pointer" @click="tab = 1">忘記密碼</div>
          <span>|</span>
          <nuxt-link to="/">成為賣家</nuxt-link>
        </div>
      </div>
      <!-- ? 忘記密碼 tab === 1 -->
      <div v-if="tab === 1" class="">
        <div class="text-[24px] font-bold">忘記密碼</div>
        <div class="mt-4">請輸入賣家所使用的電子信箱</div>

        <div class="mb-2 mt-4 text-left text-red-500 lg:mb-0" v-if="checkEmailError">
          {{ checkEmailErrorMessage }}
        </div>

        <div class="login-block-input mt-2 lg:mt-4">
          <Icon size="20" name="bi:envelope" />
          <input
            v-model="forgetEmail"
            @blur="checkForgetEmail"
            type="text"
            placeholder="電子信箱"
          />
        </div>

        <button
          v-if="!checkEmailError && forgetEmail !== ''"
          @click="sendForgetEmail"
          class="btn-black"
        >
          送出
        </button>
        <button v-else class="btn-disabled">送出</button>

        <div class="mt-10 flex justify-center gap-5 lg:mt-[60px] lg:justify-end">
          <div class="cursor-pointer" @click="tab = 0">回上一頁</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-block {
  @apply mx-auto w-full max-w-[560px] rounded-[20px] bg-white p-8 lg:px-14 lg:py-[80px] xl:px-20 xl:py-[125px];
  box-shadow: 0px 5px 10px 0px #0000001a;
}

.login-block-input {
  @apply flex items-center gap-2 rounded-[4px] border border-black py-[9px] pl-5 pr-[16px];
}
.login-block-input input {
  @apply w-full;
}
</style>
