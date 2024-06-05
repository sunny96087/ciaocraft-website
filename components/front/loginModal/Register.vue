<script setup lang="ts">
const isEmailCheck = ref(false)
const password = ref('')
const passwordVisible = ref(false)
const confirmPassword = ref('')
const confirmPasswordVisible = ref(false)
const email = ref('')

const emit = defineEmits(['changeContent'])
const hasError = ref(false)
const alertText = ref('歡迎您成為巧手玩藝的一員!')

const registerMember = () => {
  console.log('registerMember')
  console.log('register success')
  emit('changeContent', 'registerSuccess')
}

const checkEmail = () => {
  isEmailCheck.value = true
}
</script>
<template>
  <div class="space-y-8 md:px-[60px]" v-if="!isEmailCheck">
    <div class="space-y-4">
      <span class="flex justify-center self-center text-2xl font-medium">電子信箱驗證</span>
      <span class="block">為了確認您本人曾否註冊會員，我們將先進行驗證。</span>
    </div>
    <div
      class="flex w-full items-center justify-between rounded-[4px] border border-solid border-gray px-4 py-2 text-sm"
    >
      <Icon name="ph:user-light" class="mr-2 flex w-4 items-center justify-center self-center" />
      <input class="w-full" type="email" name="email" v-model="email" placeholder="電子信箱*" />
    </div>
    <button
      class="box my-6 flex w-full items-center justify-center rounded-[4px] bg-primary py-2 text-center text-white"
      @click="checkEmail()"
    >
      驗證
    </button>
  </div>

  <div v-else class="space-y-8 md:px-[60px]">
    <div class="space-y-4">
      <span class="flex justify-center text-2xl font-medium">會員註冊</span>
      <span class="flex justify-center" :class="{ 'text-danger': hasError }">{{ alertText }}</span>
    </div>
    <div class="w-full space-y-3">
      <div
        class="flex items-center justify-between rounded-[4px] border border-solid border-gray px-4 py-2 text-sm"
      >
        <Icon name="ph:user-light" class="mr-2 flex w-4 items-center justify-center self-center" />
        <input
          class="w-full"
          type="email"
          name="email"
          v-model="email"
          placeholder="電子信箱*"
          autocomplete="off"
        />
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
            placeholder="密碼"
            autocomplete="off"
          />
        </div>
        <button
          class="flex w-4 items-center justify-center self-center"
          @click="passwordVisible = !passwordVisible"
        >
          <Icon name="ph:eye-light" />
        </button>
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
            :type="confirmPasswordVisible ? 'text' : 'password'"
            name="password"
            v-model="confirmPassword"
            placeholder="確認密碼"
            autocomplete="off"
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
    <div class="space-y-3">
      <button
        class="box flex w-full items-center justify-center rounded-[4px] bg-primary py-2 text-center text-white"
        @click="registerMember()"
      >
        註冊
      </button>
      <span class="flex justify-center text-sm">
        註冊即同意
        <a
          href="#"
          class="underline-2 underline-offset-3 underlin-4 underline-offset-3 px-1 text-secondary underline underline-offset-4"
          >隱私權政策</a
        >
        和
        <a href="#" class="px-1 text-secondary">使用者條款</a>
      </span>
    </div>
  </div>
</template>
