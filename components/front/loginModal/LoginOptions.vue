<script setup lang="ts">
import axios from 'axios'
const emit = defineEmits(['changeContent'])
const authStore = useAuthStore()
const googleUrl = ref(authStore.apiUrl + '/auth/google')
const toCiaoLogin = (): void => {
  emit('changeContent', 'ciaoLogin')
}
</script>

<template>
  <div class="mx-auto flex flex-col space-y-8 md:px-[110px]">
    <div class="mx-auto">
      <img
        src="/assets/images/front/Open Doodles Float.png"
        alt="open-doodles-float"
        class="h-full w-full object-cover"
      />
    </div>
    <span class="self-center">Enjoy Your Learning !</span>
    <div class="mt-6 flex flex-col items-center space-y-3">
      <a
        :href="googleUrl"
        class="btn transition duration-300 hover:border-dark6 hover:bg-dark6 hover:text-white"
      >
        <Icon name="logos:google-icon" class="mr-5" />
        <span>使用 Google 登入</span>
      </a>
      <button
        type="button"
        class="btn transition duration-300 hover:border-dark6 hover:bg-dark6 hover:text-white"
        @click="toCiaoLogin()"
      >
        <Icon name="clarity:email-solid" class="" />
        <span class="ml-2">使用 會員帳號 登入</span>
      </button>
    </div>
  </div>
</template>

<style>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  border: 1px solid #292524;
  border-radius: 4px;
  background: #ffffff;
}
</style>
