<script setup lang="ts">
import { ref } from 'vue'
import defaultAvatar from '~/assets/images/front/member/default-avatar.jpg'
const router = useRouter()
const authStore = useAuthStore()
const memberStore = useMemberStore()

// 定義 isMenuOpen 為布林類型的 ref
// 使用 ref 管理漢堡選單的顯示狀態
const isMenuOpen = ref<boolean>(false)

// 定義 toggleMenu 函數，其返回類型為 void
// 切換漢堡選單顯示狀態
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}

// 控制訊息 icon 是否有新訊息
const hasNewMessage = ref<boolean>(false)

// 登入/註冊 modal 控制
const isLoginModalOpen = ref(authStore.isLoginModalOpen)
watch(
  () => authStore.isLoginModalOpen,
  (newValue) => {
    isLoginModalOpen.value = newValue
  },
  { immediate: true } // 立即執行一次回調，以確保初始值的同步
)

const openLoginModal = (): void => {
  authStore.openLoginModal()
  isMenuOpen.value = false
}

// 前往會員中心，點擊我的收我的收藏 tab
const toMemberAndClickTab = (tab: string): void => {
  isMenuOpen.value = false
  if (isLogin.value && tab === 'collections') {
    router.push({ name: 'index-index-member', query: { tab: 'collections' } })
  } else if (isLogin.value && tab === 'orders') {
    router.push({ name: 'index-index-member', query: { tab: 'orders' } })
  } else {
    openLoginModal()
  }
}

// 會員資料區
const member: any = ref({})
// 監聽 memberStore.orders 的變化
watch(
  () => memberStore.member,
  (newOrders, oldOrders) => {
    member.value = newOrders
  }
)

const fetchMember = async () => {
  try {
    const res = await memberStore.getMember()
    const result = res.data
    memberStore.member = result.data
    member.value = memberStore.member
  } catch (err) {
    showToast('取得登入會員資料失敗')
  }
}

const isLogin = ref<boolean>()
watch(
  () => authStore.isLogin,
  (newValue) => {
    isLogin.value = newValue
  }
)

const signOut = (): void => {
  authStore.logout()
  isMenuOpen.value = false
}

onMounted(async () => {
  try {
    await authStore.checkLogin()
    isLogin.value = authStore.isLogin
    if (authStore.isLogin) {
      fetchMember()
    }
  } catch (err) {
    showToast('發生錯誤')
  }
})
</script>

<template>
  <header class="mx-auto py-[10px] lg:max-w-screen-xl">
    <div class="flex items-center justify-between px-5">
      <!-- header 左側 logo -->
      <h1 class="px-4 py-1 lg:py-5">
        <NuxtLink
          to="/"
          class="block h-10 w-40 overflow-hidden whitespace-nowrap bg-[url('~/assets/images/front/Logo_Img.png')] indent-[115%]"
          @click="isMenuOpen = false"
          >Ciao!Craft
        </NuxtLink>
      </h1>

      <!-- 右側選單 -->
      <div class="flex items-center justify-between">
        <!-- START 右側選單 - 未登入 -->
        <ul class="hidden items-center space-x-6 lg:flex" v-if="!isLogin">
          <li class="text-primary">
            <NuxtLink
              to="/vendorApply"
              class="px-6 py-2 hover:text-primary-light"
              @click="isMenuOpen = false"
              >我要開課
            </NuxtLink>
          </li>
          <li class="text-white">
            <button
              class="rounded bg-primary px-6 py-2 hover:bg-primary-light"
              @click="openLoginModal"
            >
              登入/註冊
            </button>
          </li>
          <li class="text-white">
            <button class="rounded bg-primary px-6 py-2 hover:bg-primary-light">
              <NuxtLink to="/adminLogin">賣家後台</NuxtLink>
            </button>
          </li>
          <li>
            <a href="#" @click="openLoginModal">
              <Icon name="ph:star" class="text-[32px]" />
            </a>
          </li>
          <li>
            <NuxtLink to="/about" class="mr-5 block">
              <Icon name="ph:currency-circle-dollar" class="text-[32px]" />
            </NuxtLink>
          </li>
        </ul>

        <!-- START 右側選單 - 已登入 -->
        <ul class="relative hidden items-center space-x-6 lg:flex" v-if="isLogin">
          <li>
            <NuxtLink
              to="/vendorApply"
              class="px-6 py-2 text-primary hover:text-primary-light"
              @click="isMenuOpen = false"
              >我要開課
            </NuxtLink>
          </li>
          <li>
            <button class="block" @click="toMemberAndClickTab('collections')">
              <Icon name="ph:star" class="text-4xl" />
            </button>
          </li>
          <li>
            <NuxtLink to="/message" class="relative block bg-center" @click="isMenuOpen = false">
              <Icon name="ph:chats" class="text-4xl" />
              <span
                class="absolute -right-1 top-0 h-[6px] w-[6px] rounded-full bg-danger"
                v-if="hasNewMessage"
              ></span>
            </NuxtLink>
          </li>
          <li>
            <button @click="toggleMenu" class="flex items-center">
              <img
                :src="member.photo || defaultAvatar"
                alt="大頭照"
                class="h-[60px] w-[60px] rounded-full bg-gray object-cover"
              />
            </button>
          </li>

          <transition name="hamburger">
            <!-- 桌面板。漢堡選單 (點擊頭像) -->
            <div
              class="absolute right-0 top-24 z-50 hidden rounded-lg bg-white p-3 shadow-2xl lg:block"
              v-if="isMenuOpen"
            >
              <div class="space-y-2 border-b border-solid border-black pb-3">
                <div class="sapce-x-3 flex items-center p-2">
                  <Icon name="ph:user" class="mr-3 text-lg" />
                  <p>{{ member.nickname }}</p>
                </div>
                <div class="sapce-x-3 flex items-center p-2">
                  <Icon name="ph:currency-circle-dollar" class="mr-3 text-lg text-primary" />
                  <p class="flex items-center text-2xl font-medium leading-[30px] text-primary">
                    0
                  </p>
                </div>
                <div class="flex items-center">
                  <Icon name="ph:info" class="mr-1 text-lg" />
                  <a href="#" class="block text-xs leading-[20px] text-secondary">
                    如何累積點數？
                  </a>
                </div>
              </div>
              <ul class="w-[216px] py-3">
                <li class="relative flex items-center space-x-2 py-2 pl-5">
                  <NuxtLink
                    to="/message"
                    class="flex items-center hover:text-primary-light"
                    @click="isMenuOpen = false"
                  >
                    <Icon name="ph:chats" class="mr-2.5 text-lg" />我的訊息
                  </NuxtLink>
                  <span
                    class="absolute left-0 h-1.5 w-1.5 rounded-full bg-danger"
                    v-if="hasNewMessage"
                  ></span>
                </li>
                <li>
                  <NuxtLink
                    :to="{ name: 'index-index-member', query: { tab: 'orders' } }"
                    class="flex items-center py-2 pl-5 hover:text-primary-light"
                    @click="isMenuOpen = false"
                  >
                    <Icon name="ph:receipt" class="mr-2.5 text-lg" />
                    訂單紀錄
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    :to="{ name: 'index-index-member', query: { tab: 'collections' } }"
                    class="flex items-center py-2 pl-5 hover:text-primary-light"
                    @click="isMenuOpen = false"
                  >
                    <Icon name="ph:star" class="mr-2.5 text-lg" />
                    我的收藏
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/member"
                    class="flex items-center py-2 pl-5 hover:text-primary-light"
                    @click="isMenuOpen = false"
                  >
                    <Icon name="ph:key" class="mr-2.5 text-lg" />
                    會員管理
                  </NuxtLink>
                </li>
                <li>
                  <button
                    class="flex items-center py-2 pl-5 hover:text-primary-light"
                    @click="signOut"
                  >
                    <Icon name="ph:sign-out" class="mr-2.5 text-lg" />
                    登出
                  </button>
                </li>
              </ul>
            </div>
          </transition>
        </ul>

        <!-- START 右側選單 - 手機板 -->
        <div class="mr-4 flex items-center space-x-6 lg:hidden">
          <button @click="toMemberAndClickTab('collections')" class="block">
            <Icon name="ph:star" class="text-2xl" />
          </button>
          <button class="relative bg-center" @click="toggleMenu">
            <Icon name="ph:list" class="text-2xl" />
            <span
              class="absolute -right-1 top-0 h-[6px] w-[6px] rounded-full bg-danger"
              v-if="hasNewMessage"
            ></span>
          </button>
        </div>
        <!-- END 右側選單 - 手機板 -->
      </div>
    </div>

    <!-- 平板、手機版，漢堡選單 -->
    <transition name="hamburgerM">
      <div
        class="absolute top-[68px] z-50 w-full rounded-b-lg border-t border-solid border-gray5 bg-white px-10 py-5 shadow-2xl lg:hidden"
        v-if="isMenuOpen"
      >
        <!-- 漢堡選單(未登入) -->
        <ul v-if="!isLogin" class="">
          <li class="mb-3 border-b border-gray p-2 pb-5 pl-5">
            <button class="block hover:text-primary-light" @click="openLoginModal">
              登入/註冊
            </button>
          </li>
          <li class="px-5 py-2">
            <NuxtLink to="/adminLogin" class="block hover:text-primary-light"> 賣家登入 </NuxtLink>
          </li>
          <li class="px-5 py-2">
            <NuxtLink
              to="/vendorApply"
              class="block hover:text-primary-light"
              @click="isMenuOpen = false"
            >
              我要開課
            </NuxtLink>
          </li>
          <li class="px-5 py-2">
            <NuxtLink
              to="/about"
              class="block hover:text-primary-light"
              @click="isMenuOpen = false"
            >
              如何累積點數
            </NuxtLink>
          </li>
        </ul>

        <!-- 漢堡選單(已登入) -->
        <div v-else>
          <div class="space-y-2 border-b border-solid border-black pb-3">
            <div class="flex items-center justify-between p-2">
              <div class="flex">
                <Icon name="ph:user" class="mr-3 text-2xl" />
                <p>{{ member.nickname }}</p>
              </div>
              <div>
                <NuxtLink to="/member/profile">
                  <img
                    :src="member.photo || defaultAvatar"
                    alt="ciao-craft-logo"
                    class="h-[60px] w-[60px] rounded-full bg-gray3 object-cover"
                    @click="isMenuOpen = false"
                  />
                </NuxtLink>
              </div>
            </div>
            <div class="flex w-full items-center p-2">
              <Icon name="ph:currency-circle-dollar" class="mr-3 text-2xl text-primary" />
              <p class="flex items-center text-2xl font-medium leading-[30px] text-primary">0</p>
            </div>
            <a href="#" class="block text-xs leading-[20px] text-secondary">
              <Icon name="ph:info" class="mr-1 text-lg" />
              如何累積點數？
            </a>
          </div>
          <ul class="border-b border-solid border-black py-3">
            <li class="relative flex items-center space-x-2 py-2 pl-5">
              <NuxtLink
                to="/message"
                class="flex items-center hover:text-primary-light"
                @click="isMenuOpen = false"
              >
                <Icon name="ph:chats" class="mr-2.5 text-lg" />我的訊息
              </NuxtLink>
              <span
                class="absolute left-0 h-1.5 w-1.5 rounded-full bg-danger"
                v-if="hasNewMessage"
              ></span>
            </li>
            <li class="py-2 pl-5">
              <NuxtLink
                :to="{ name: 'index-index-member', query: { tab: 'orders' } }"
                class="flex items-center hover:text-primary-light"
                @click="isMenuOpen = false"
              >
                <Icon name="ph:receipt" class="mr-2.5 text-lg" />
                訂單紀錄
              </NuxtLink>
              <!-- </a> -->
            </li>
            <li class="py-2 pl-5">
              <NuxtLink
                :to="{ name: 'index-index-member', query: { tab: 'collections' } }"
                class="flex items-center hover:text-primary-light"
                @click="isMenuOpen = false"
              >
                <Icon name="ph:star" class="mr-2.5 text-lg" />
                我的收藏
              </NuxtLink>
            </li>
            <li class="py-2 pl-5">
              <NuxtLink
                to="/member"
                class="flex items-center hover:text-primary-light"
                @click="isMenuOpen = false"
              >
                <Icon name="ph:key" class="mr-2.5 text-lg" />
                會員管理
              </NuxtLink>
            </li>
            <li class="py-2 pl-5">
              <button class="flex items-center hover:text-primary-light" @click="signOut">
                <Icon name="ph:sign-out" class="mr-2.5 text-lg" />
                登出
              </button>
            </li>
          </ul>
          <div class="py-3">
            <NuxtLink
              to="/vendorApply"
              class="block px-5 py-2 hover:text-primary-light"
              @click="isMenuOpen = false"
            >
              我要開課
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </header>

  <!-- 登入/註冊彈窗 -->
  <transition name="modal">
    <FrontLoginModal v-if="isLoginModalOpen" @close="openLoginModal"></FrontLoginModal>
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

/* 桌機漢堡動畫設置  */
.hamburger-enter-active,
.hamburger-leave-active {
  transition: all 0.5s ease;
}
.hamburger-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.hamburger-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.hamburger-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.hamburger-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 移動裝置漢堡 動畫設置  */
.hamburgerM-enter-active,
.hamburgerM-leave-active {
  transition: all 0.5s ease;
}
.hamburgerM-enter-from {
  opacity: 0;
  transform: translateY(0);
}

.hamburgerM-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.hamburgerM-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.hamburgerM-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>
