<script setup lang="ts">
// 利用 dynamic component 動態替換 modal 內容
const currentView = ref('loginOptions')
const lastView = ref('close')
const hideNextBtn = ref(false)
const emit = defineEmits(['close'])

const modalContent: any = {
  loginOptions: resolveComponent('FrontLoginModalLoginOptions'),
  ciaoLogin: resolveComponent('FrontLoginModalCiaoLogin'),
  forgetPwd: resolveComponent('FrontLoginModalForgetPwd'),
  forgetPwdSuccess: resolveComponent('FrontLoginModalForgetPwdSuccess'),
  register: resolveComponent('FrontLoginModalRegister'),
  registerSuccess: resolveComponent('FrontLoginModalRegisterSuccess'),
  profile: resolveComponent('FrontLoginModalProfile')
}

// 根據當前頁面決定 回前一頁按鈕 要回到哪個頁面，viewName 透過 emit 從子元件傳遞回來
const changeContent = async (viewName: string) => {
  switch (viewName) {
    case 'close':
      emit('close')
      break
    case 'loginOptions':
      lastView.value = 'close'
      currentView.value = 'loginOptions'
      hideNextBtn.value = false
      break
    case 'ciaoLogin':
      lastView.value = 'loginOptions'
      currentView.value = 'ciaoLogin'
      hideNextBtn.value = false
      break
    case 'forgetPwd':
      lastView.value = 'ciaoLogin'
      currentView.value = 'forgetPwd'
      hideNextBtn.value = false
      break
    case 'forgetPwdSuccess':
      lastView.value = 'forgetPwd'
      currentView.value = 'forgetPwdSuccess'
      hideNextBtn.value = true
      break
    case 'register':
      lastView.value = 'ciaoLogin'
      currentView.value = 'register'
      hideNextBtn.value = false
      break
    case 'registerSuccess':
      lastView.value = 'ciaoLogin'
      currentView.value = 'registerSuccess'
      hideNextBtn.value = true
      break
    case 'profile':
      lastView.value = 'registerSuccess'
      currentView.value = 'profile'
      hideNextBtn.value = false
      break
    default:
      emit('close')
      break
  }
}

// 點擊背景關閉 modal
const clickMaskToCloseModal = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <div class="modal-bg z-40" @click.capture="clickMaskToCloseModal">
    <div
      class="z-50 mx-auto w-full max-w-[560px] flex-col items-center justify-center rounded-lg bg-white p-5"
    >
      <div class="mx-auto mb-[30px] w-[160px]">
        <img
          src="/assets/images/front/Logo_Img.png"
          alt="ciao-craft-logo"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="modal-content">
        <component
          :is="modalContent[currentView]"
          :key="currentView"
          @changeContent="changeContent"
        ></component>
      </div>
      <div class="mt-[30px]" v-if="!hideNextBtn">
        <div class="flex justify-center">
          <button
            class="inline-block text-primary transition hover:text-primary-light"
            @click="changeContent(lastView)"
          >
            回上一頁
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
