<script lang="ts" setup>
// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})
// 響應變數
const password = ref('')
const passwordVisible = ref(false)
const confirmPassword = ref('')
const confirmPasswordVisible = ref(false)
const alert = ref('')
const hasError = ref(false)
</script>

<template>
  <div class="bg-gray1 p-5 lg:px-[100px]">
    <div class="mx-auto py-6 lg:max-w-screen-xl">
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
        </div>
        <button
          class="rounded-[4px] bg-primary px-6 py-2 text-center tracking-wider text-white transition duration-300 hover:bg-primary-light"
        >
          儲存
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
