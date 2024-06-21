<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

// 定義 isMenuOpen 為布林類型的 ref
// 使用 ref 管理漢堡選單的顯示狀態
const isMenuOpen = ref<boolean>(false)
const isUserOpen = ref<boolean>(false)

// 定義 toggleMenu 函數，其返回類型為 void
// 切換漢堡選單顯示狀態
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleUser = (): void => {
  isUserOpen.value = !isUserOpen.value
}

// 登入/註冊 modal 控制
const isLoginModalOpen = ref<boolean>(false)
const openLoginModal = (): void => {
  isLoginModalOpen.value = !isLoginModalOpen.value
  isMenuOpen.value = false
}

const logout = (): void => {
  authStore.logout()
}

// 監控使用者登入狀態
const authStore = useAuthStore()
const loginState = authStore.isLogin
const isLogin = ref<boolean>(loginState)
watch(
  () => authStore.isLogin,
  (v) => {
    isLogin.value = v
    console.log('header isLogin', isLogin.value)
  }
)

onMounted(() => {
  authStore.checkLogin()
})

const signOut = (): void => {
  authStore.logout()
}
</script>

<template>
  <!-- 未登入 -->
  <div class="mx-9 lg:mx-[100px]" v-if="!isLogin">
    <div class="mx-auto max-w-full">
      <ul class="my-3.5 flex items-center justify-between lg:my-[30px]">
        <li>
          <h1>
            <NuxtLink
              to="/"
              class="block h-10 w-40 overflow-hidden whitespace-nowrap bg-[url('~/assets/images/front/Logo_Img.png')] indent-[115%]"
              >Ciao!Craft</NuxtLink
            >
          </h1>
        </li>
        <li class="hidden lg:block">
          <ul class="flex items-center">
            <li class="pr-6 text-primary">
              <NuxtLink to="/vendorApply" class="px-6 py-2 hover:text-primary-light"
                >我要開課</NuxtLink
              >
            </li>
            <li class="pr-6 text-white">
              <button
                class="rounded bg-primary px-6 py-2 hover:bg-primary-light"
                @click="openLoginModal"
              >
                登入/註冊
              </button>
            </li>
            <li class="pr-6 text-white">
              <button class="rounded bg-primary px-6 py-2 hover:bg-primary-light">
                <NuxtLink to="/adminLogin">管理員登入</NuxtLink>
              </button>
            </li>
            <li class="pr-6">
              <a href="#" @click="openLoginModal">
                <Icon name="ph:star-bold" class="text-[32px]" />
              </a>
            </li>
            <li>
              <NuxtLink to="/about">
                <Icon name="ph:currency-circle-dollar" class="text-[32px]" />
              </NuxtLink>
            </li>
          </ul>
        </li>
        <!-- 手機板 header 右側 -->
        <li class="lg:hidden">
          <ul class="flex items-center">
            <li class="pr-6">
              <a href="#" @click="openLoginModal">
                <Icon name="ph:star-bold" class="text-[32px]" />
              </a>
            </li>
            <li class="active:cursor-pointer" @click="toggleMenu">
              <a href="#" class="relative block">
                <div
                  class="h-8 w-8 bg-[url('~/assets/images/front/Button(ham).png')] bg-center hover:bg-[url('~/assets/images/front/Button(hoverham).png')]"
                ></div>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <!-- 已登入 -->
  <div class="mx-9 lg:mx-[100px]" v-else>
    <div class="mx-auto max-w-screen-xl">
      <ul class="my-3.5 flex items-center justify-between lg:my-[30px]">
        <li>
          <h1>
            <a
              href="#"
              class="block h-10 w-40 overflow-hidden whitespace-nowrap bg-[url('~/assets/images/front/Logo_Img.png')] indent-[115%]"
              >Ciao!Craft</a
            >
          </h1>
        </li>
        <li class="relative hidden lg:block">
          <ul class="flex items-center">
            <li class="pr-6 text-primary">
              <NuxtLink to="/vendorApply" class="px-6 py-2 hover:text-primary-light"
                >我要開課</NuxtLink
              >
            </li>
            <li class="pr-6">
              <a href="#">
                <Icon name="ph:star-bold" class="text-[32px]" />
              </a>
            </li>
            <li class="pr-6">
              <a href="#">
                <Icon name="ph:chats" class="text-[32px]" />
              </a>
            </li>
            <!-- 切缺：有訊息要切換到這icon -->
            <li class="hidden pr-6">
              <a href="#"
                ><img src="~/assets/images/front/messages(have).png" alt="有訊息icon"
              /></a>
            </li>
            <li>
              <a href="#" @click="toggleUser"
                ><img
                  src="~/assets/images/front/userphoto.png"
                  alt="大頭照"
                  class="h-[60px] w-[60px] rounded-full"
              /></a>
              <!-- 桌機時頭像點擊後出現選單-已登入(訊息2擇1) -->
              <div
                :class="[
                  'absolute right-0 top-[92px] z-50',
                  {
                    'max-h-0': !isUserOpen,
                    'max-h-full': isUserOpen
                  }
                ]"
              >
                <ul
                  :class="[
                    'overflow-hidden bg-white',
                    {
                      'max-h-0': !isUserOpen,
                      'max-h-full rounded border border-black p-3': isUserOpen
                    }
                  ]"
                >
                  <li class="mb-4 pl-2">
                    <div class="flex items-center">
                      <Icon name="ph:user" class="mr-3 text-[17px]" />
                      <p>User Name</p>
                    </div>
                  </li>
                  <li class="mb-4 flex items-center pl-2">
                    <Icon name="ph:currency-circle-dollar" class="mr-3 text-[17px] text-primary" />
                    <p class="flex items-center text-2xl font-medium leading-[30px] text-primary">
                      0
                    </p>
                  </li>
                  <li class="border-b border-[#AAAAAA] pb-3">
                    <a href="#" class="flex items-center text-xs leading-[20px] text-secondary">
                      <Icon name="ph:chats" class="mr-1 text-[17px]" />
                      如何累積點數？
                    </a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
                      <Icon name="ph:chats" class="mr-2.5 text-[17px]" />
                      我的訊息</a
                    >
                  </li>
                  <!-- 切缺：有訊息要切換到這icon -->
                  <li>
                    <a href="#" class="flex items-center py-2 pl-1 hover:text-primary-light">
                      <span class="mr-[7px] h-1.5 w-1.5 rounded-full bg-danger"></span>
                      <Icon name="ph:chats" class="mr-2.5 text-[17px]" />
                      我的訊息</a
                    >
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
                      <Icon name="ph:receipt" class="mr-2.5 text-[17px]" />
                      訂單紀錄
                    </a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
                      <Icon name="ph:star-bold" class="mr-2.5 text-[17px]" />
                      我的收藏</a
                    >
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
                      <Icon name="ph:key" class="mr-2.5 text-[17px]" />
                      會員管理</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center py-2 pl-5 hover:text-primary-light"
                      @click="signOut"
                    >
                      <Icon name="ph:sign-out" class="mr-2.5 text-[17px]" />
                      登出</a
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <!-- 手機板 header 右側 -->
        <li class="lg:hidden">
          <ul class="flex items-center">
            <li class="pr-6">
              <a href="#">
                <Icon name="ph:star-bold" class="text-[32px]" />
              </a>
            </li>
            <li class="active:cursor-pointer" @click="toggleMenu">
              <a href="#" class="relative block">
                <div
                  class="h-8 w-8 bg-[url('~/assets/images/front/Button(ham).png')] bg-center hover:bg-[url('~/assets/images/front/Button(hoverham).png')]"
                ></div>
                <!-- 切缺：有訊息要切換到這icon -->
                <!-- <div
                  class="h-10 w-10 bg-[url('~/assets/images/front/Button(ham_messages).png')] bg-center"
                ></div> -->
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- 漢堡選單(未登入) -->
  <div
    :class="[
      'absolute top-[69px] z-50 w-full bg-white',
      { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
    ]"
    v-if="!isLogin"
  >
    <ul
      :class="[
        'mx-[60px] mb-6 mt-5 overflow-hidden',
        { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
      ]"
    >
      <li class="border-b border-[#AAAAAA]">
        <a href="#" class="block p-2 pb-5 pl-5 hover:text-primary-light" @click="openLoginModal"
          >登入/註冊</a
        >
      </li>
      <li>
        <NuxtLink to="/adminLogin" class="block p-2 pb-5 pl-5 hover:text-primary-light"
          >管理員登入</NuxtLink
        >
      </li>
      <li class="mt-3">
        <NuxtLink to="/vendorApply" class="block py-2 pl-5 hover:text-primary-light"
          >我要開課</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/about" class="block py-2 pl-5 hover:text-primary-light"
          >如何累積點數</NuxtLink
        >
      </li>
    </ul>
  </div>
  <!-- 漢堡選單(已登入) -->
  <div
    :class="[
      'absolute top-[69px] z-50 w-full bg-white',
      { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
    ]"
    v-else
  >
    <ul
      :class="[
        'mx-[60px] mb-6 mt-5 overflow-hidden',
        { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
      ]"
    >
      <li class="mb-4 flex justify-between pl-2">
        <div class="flex items-center">
          <Icon name="ph:user" class="mr-3 text-2xl" />
          <p>User Name</p>
        </div>
        <NuxtLink to="/member/profile">
          <img
            src="~/assets/images/front/userphoto.png"
            alt="大頭照"
            class="h-[60px] w-[60px] rounded-full"
          />
        </NuxtLink>
      </li>
      <li class="mb-4 flex items-center pl-2">
        <Icon name="ph:currency-circle-dollar" class="mr-3 text-2xl text-primary" />
        <p class="flex items-center text-2xl font-medium leading-[30px] text-primary">0</p>
      </li>
      <li class="border-b border-[#AAAAAA] pb-3">
        <NuxtLink to="/about" class="flex items-center text-xs leading-[20px] text-secondary">
          <Icon name="ph:info" class="mr-1 text-sm" />
          如何累積點數？
        </NuxtLink>
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
          <Icon name="ph:chats" class="mr-2.5 text-2xl" />
          我的訊息
        </a>
      </li>
      <!-- 切缺：有訊息要切換到這icon -->
      <!-- <li>
        <a href="#" class="flex items-center py-2 pl-1 hover:text-primary-light">
          <span class="mr-[7px] h-1.5 w-1.5 rounded-full bg-danger"></span>
          <Icon name="ph:chats" class="mr-2.5 text-[17px]" />
          我的訊息</a
        >
      </li> -->
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
          <Icon name="ph:receipt" class="mr-2.5 text-2xl" />
          訂單紀錄</a
        >
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
          <Icon name="ph:star-bold" class="mr-2.5 text-xl" />
          我的收藏</a
        >
      </li>
      <li>
        <NuxtLink to="/member" class="flex items-center py-2 pl-5 hover:text-primary-light">
          <Icon name="ph:key" class="mr-2.5 text-2xl" />
          會員管理
        </NuxtLink>
      </li>
      <li class="mb-3 border-b border-[#AAAAAA] pb-3">
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light" @click="signOut">
          <Icon name="ph:sign-out" class="mr-2.5 text-2xl" />
          登出
        </a>
      </li>
      <li>
        <NuxtLink to="/vendorApply" class="block py-2 pl-5 hover:text-primary-light"
          >我要開課</NuxtLink
        >
      </li>
    </ul>
  </div>

  <!-- 登入/註冊彈窗 -->
  <transition name="modal">
    <FrontLoginModal v-if="isLoginModalOpen" @close="isLoginModalOpen = false"></FrontLoginModal>
  </transition>
</template>

<style scoped>
/* modal transition 動畫設置  */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
