<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '~/stores/authStore'

// const baseUrl = 'http://127.0.0.1:3666'
const baseUrl = 'https://ciaocraft-api.onrender.com'

const authStore = useAuthStore()

// 響應變數
const email = ref('')
const password = ref('')
const passwordVisible = ref(false)
const alert = ref('')
const hasError = ref(false)

// modal 內容切換
const emit = defineEmits(['changeContent'])
const toRegister = (): void => {
  console.log('toRegister')
  emit('changeContent', 'register')
}

const toForgetPwd = (): void => {
  console.log('toForgetPwd')
  emit('changeContent', 'forgetPwd')
}

// 登入
const login = async () => {
  console.log('login')
  localStorage.removeItem('token')
  localStorage.removeItem('member')
  if (!email.value || !password.value) {
    alert.value = '請輸入帳號密碼'
    hasError.value = true
    return
  }
  await axios
    .post(`${baseUrl}/auth/signin`, {
      account: email.value,
      password: password.value
    })
    .then((res) => {
      emit('changeContent', 'close')
      console.log(res.data)
      const token = res.data.user.token
      const member = res.data.user.id
      // localStorage.setItem('token', token)
      // localStorage.setItem('member', member)
      authStore.setMember(token, member)
      console.log('end')
      // console.log(useAuthStore().isLogin.value)
    })
    .catch((err) => {
      console.log(err.response.data.message)
      alert.value = err.response.data.message
      hasError.value = true
    })
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
      class="box my-6 flex w-full items-center justify-center rounded-[4px] bg-primary py-2 text-center text-white"
      @click="login()"
    >
      登入
    </button>
    <div class="m-2 flex items-center">
      <button class="inline-block text-secondary" @click="toForgetPwd()">忘記密碼</button>
      <span class="inline-block px-2">|</span>
      <button class="inline-block text-primary" @click="toRegister()">註冊會員</button>
    </div>
  </div>
</template>

<!-- <template>
  <div class="sign-in w-[560px] mx-auto flex flex-col items-center mt-[100px] p-6">
    <h1 class="mb-6">
      <img src="/assets/images/Logo_Img.png" alt="ciao-craft-logo" />
    </h1>
    <Form class="text-[16px]">
      <div class="box field-box mb-2">
        <label for="email">
          <Icon name="ph:user-light" />
        </label>
        <input
          class="field-box__input"
          type="email"
          name="email"
          v-model="email"
          placeholder="電子信箱*"
        />
      </div>
      <div class="box field-box">
        <label for="">
          <Icon name="carbon:password" />
        </label>
        <input
          class="field-box__input"
          :type="passwordVisible ? 'text' : 'password'"
          name="password"
          v-model="password"
          placeholder="密碼*"
        />
        <button class="ml-5" @click="passwordVisible = !passwordVisible">
          <Icon name="ph:eye-light" />
        </button>
      </div>
      <div class="box text-center flex justify-center my-6 bg-primary text-[#FFFFFF]">
        <button type="submit">登入</button>
      </div>
      <nav class="box justify-center m-2">
        <button>忘記密碼</button>
        <span class="p-2">|</span>
        <button class="text-primary">註冊會員</button>
      </nav>
      <div class="box flex justify-center">
        <button class="text-primary">回上一頁</button>
      </div>
    </Form>
  </div>
</template> -->

<style scoped>
/* .sign-in {
  box-shadow: 0px 20px 20px 0px #050d1d33;
}
.field-box__input {
  padding-left: 8px;
  width: 80%;
}
.field-box {
  border-radius: 4;
  border: 1px solid #aaaaaa;
}
.box {
  display: flex;
  align-items: center;
  padding-left: 4px;
  height: 42px;
  width: 400px;
}

.field-box__input:focus {
  outline: 0;
} */
</style>
