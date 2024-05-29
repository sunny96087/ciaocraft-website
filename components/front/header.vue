<script setup lang="ts">
// 使用 ref 選取 dom 元素
import { ref } from 'vue'

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
</script>

<template>
  <div class="mx-9 lg:mx-[100px]">
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
        <li class="hidden lg:block">
          <ul class="flex items-center">
            <li class="pr-6 text-primary">
              <a href="#" class="px-6 py-2 hover:text-primary-light">我要開課</a>
            </li>
            <li class="pr-6 text-white">
              <button class="rounded bg-primary px-6 py-2 hover:bg-primary-light">登入/註冊</button>
            </li>
            <li class="pr-6 text-white">
              <button class="rounded bg-primary px-6 py-2 hover:bg-primary-light">
                <NuxtLink to="/adminLogin">管理員登入</NuxtLink>
              </button>
            </li>
            <li class="pr-6">
              <a href="#"
                ><img src="~/assets/images/front/Icon_new_star.png" alt="我的收藏icon"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img src="~/assets/images/front/Button(money).png" alt="關於我們/如何累積點數icon"
              /></a>
            </li>
          </ul>
        </li>
        <!-- 手機板 header 右側 -->
        <li class="lg:hidden">
          <ul class="flex items-center">
            <li class="pr-6">
              <a href="#"
                ><img src="~/assets/images/front/Icon_new_star.png" alt="我的收藏icon"
              /></a>
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
  <div class="mx-9 hidden lg:mx-[100px]">
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
              <a href="#" class="px-6 py-2 hover:text-primary-light">我要開課</a>
            </li>
            <li class="pr-6">
              <a href="#"
                ><img src="~/assets/images/front/Icon_new_star.png" alt="我的收藏icon"
              /></a>
            </li>
            <li class="pr-6">
              <a href="#"><img src="~/assets/images/front/messages.png" alt="訊息icon" /></a>
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
              <!-- 桌機時頭像點擊後出現選單-已登入(2擇1) -->
              <div
                :class="[
                  'absolute right-0 top-[92px] z-50',
                  { 'max-h-0': !isUserOpen, 'max-h-full': isUserOpen }
                ]"
              >
                <ul
                  :class="[
                    'overflow-hidden bg-white',
                    { 'max-h-0': !isUserOpen, 'max-h-full': isUserOpen, 'p-3': isUserOpen }
                  ]"
                >
                  <li class="mb-4 pl-2">
                    <div class="flex items-center">
                      <img src="~/assets/images/front/userIcon.png" alt="人型icon" class="mr-3" />
                      <p>User Name</p>
                    </div>
                  </li>
                  <li class="mb-4 flex items-center pl-2">
                    <img
                      src="~/assets/images/front/Button(usermoney).png"
                      alt="點數icon"
                      class="mr-3"
                    />
                    <p class="flex items-center text-2xl font-medium leading-[30px] text-primary">
                      0
                    </p>
                  </li>
                  <li class="border-b border-[#AAAAAA] pb-3">
                    <a href="#" class="flex items-center text-xs leading-[20px] text-secondary">
                      <img
                        src="~/assets/images/front/information.png"
                        alt="資訊icon"
                        class="mr-1"
                      />
                      如何累積點數？
                    </a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
                      <img
                        src="~/assets/images/front/user_messages_Icon.png"
                        alt="訊息icon"
                        class="mr-2.5"
                      />我的訊息</a
                    >
                  </li>
                  <!-- 切缺：有訊息要切換到這icon -->
                  <li>
                    <a href="#" class="flex items-center py-2 pl-1 hover:text-primary-light">
                      <span class="mr-[7px] h-1.5 w-1.5 rounded-full bg-danger"></span>
                      <img
                        src="~/assets/images/front/user_messages_Icon.png"
                        alt="訊息icon"
                        class="mr-2.5"
                      />我的訊息</a
                    >
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
                      ><img
                        src="~/assets/images/front/orderIcon.png"
                        alt="訂單icon"
                        class="mr-2.5"
                      />訂單紀錄</a
                    >
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
                      ><img
                        src="~/assets/images/front/user_starIcon.png"
                        alt="收藏icon"
                        class="mr-2.5"
                      />我的收藏</a
                    >
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
                      ><img
                        src="~/assets/images/front/user_keyIcon.png"
                        alt="會員管理icon"
                        class="mr-2.5"
                      />會員管理</a
                    >
                  </li>
                  <li>
                    <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
                      ><img
                        src="~/assets/images/front/sign_out_Icon.png"
                        alt="會員管理icon"
                        class="mr-2.5"
                      />登出</a
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
              <a href="#"><img src="~/assets/images/front/Icon_new_star.png" alt="我的收藏" /></a>
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
  <!-- 漢堡選單 -->
  <div
    :class="[
      'absolute top-[69px] z-50 w-full bg-white',
      { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
    ]"
  >
    <ul
      :class="[
        'mx-[60px] mb-6 mt-5 overflow-hidden',
        { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
      ]"
    >
      <li class="border-b border-[#AAAAAA]">
        <a href="#" class="block p-2 pb-5 pl-5 hover:text-primary-light">登入/註冊</a>
      </li>
      <li>
        <NuxtLink to="/adminLogin" class="block p-2 pb-5 pl-5 hover:text-primary-light"
          >管理員登入</NuxtLink
        >
      </li>
      <li class="mt-3">
        <a href="#" class="block py-2 pl-5 hover:text-primary-light">我要開課</a>
      </li>
      <li><a href="#" class="block py-2 pl-5 hover:text-primary-light">如何累積點數</a></li>
    </ul>
  </div>
  <!-- 漢堡選單-已登入 -->
  <div
    :class="[
      'absolute top-[69px] z-50 hidden w-full bg-white',
      { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
    ]"
  >
    <ul
      :class="[
        'mx-[60px] mb-6 mt-5 overflow-hidden',
        { 'max-h-0': !isMenuOpen, 'max-h-full': isMenuOpen }
      ]"
    >
      <li class="mb-4 flex justify-between pl-2">
        <div class="flex items-center">
          <img src="~/assets/images/front/userIcon.png" alt="人型icon" class="mr-3" />
          <p>User Name</p>
        </div>
        <a href="#"
          ><img
            src="~/assets/images/front/userphoto.png"
            alt="大頭照"
            class="h-[60px] w-[60px] rounded-full"
        /></a>
      </li>
      <li class="mb-4 flex items-center pl-2">
        <img src="~/assets/images/front/Button(usermoney).png" alt="點數icon" class="mr-3" />
        <p class="flex items-center text-2xl font-medium leading-[30px] text-primary">0</p>
      </li>
      <li class="border-b border-[#AAAAAA] pb-3">
        <a href="#" class="flex items-center text-xs leading-[20px] text-secondary">
          <img src="~/assets/images/front/information.png" alt="資訊icon" class="mr-1" />
          如何累積點數？
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
          <img
            src="~/assets/images/front/user_messages_Icon.png"
            alt="訊息icon"
            class="mr-2.5"
          />我的訊息</a
        >
      </li>
      <!-- 切缺：有訊息要切換到這icon -->
      <!-- <li>
        <a href="#" class="flex items-center py-2 pl-1 hover:text-primary-light">
          <span class="mr-[7px] h-1.5 w-1.5 rounded-full bg-danger"></span>
          <img
            src="~/assets/images/front/user_messages_Icon.png"
            alt="訊息icon"
            class="mr-2.5"
          />我的訊息</a
        >
      </li> -->
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
          ><img
            src="~/assets/images/front/orderIcon.png"
            alt="訂單icon"
            class="mr-2.5"
          />訂單紀錄</a
        >
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
          ><img
            src="~/assets/images/front/user_starIcon.png"
            alt="收藏icon"
            class="mr-2.5"
          />我的收藏</a
        >
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
          ><img
            src="~/assets/images/front/user_keyIcon.png"
            alt="會員管理icon"
            class="mr-2.5"
          />會員管理</a
        >
      </li>
      <li class="mb-3 border-b border-[#AAAAAA] pb-3">
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
          ><img
            src="~/assets/images/front/sign_out_Icon.png"
            alt="會員管理icon"
            class="mr-2.5"
          />登出</a
        >
      </li>
      <li><a href="#" class="block py-2 pl-5 hover:text-primary-light">我要開課</a></li>
    </ul>
  </div>
  <!-- 桌機時頭像點擊後出現選單-已登入(2擇1) -->
  <!-- <div
    :class="[
      'absolute right-10 top-[123px] z-50 hidden bg-white',
      { 'max-h-0': !isUserOpen, 'max-h-full': isUserOpen }
    ]"
  >
    <ul :class="['m-3 overflow-hidden', { 'max-h-0': !isUserOpen, 'max-h-full': isUserOpen }]">
      <li class="mb-4 pl-2">
        <div class="flex items-center">
          <img
            src="~/assets/images/front/userIcon.png"
            alt="人型icon"
            class="mr-3"
          />
          <p>User Name</p>
        </div>
      </li>
      <li class="mb-4 flex items-center pl-2">
        <img src="~/assets/images/front/Button(usermoney).png" alt="點數icon" class="mr-3" />
        <p class="flex items-center text-2xl font-medium leading-[30px] text-primary">0</p>
      </li>
      <li class="border-b border-[#AAAAAA] pb-3">
        <a href="#" class="flex items-center text-xs leading-[20px] text-secondary">
          <img src="~/assets/images/front/information.png" alt="資訊icon" class="mr-1" />
          如何累積點數？
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light">
          <img
            src="~/assets/images/front/user_messages_Icon.png"
            alt="訊息icon"
            class="mr-2.5"
          />我的訊息</a
        >
      </li> -->
  <!-- 切缺：有訊息要切換到這icon -->
  <!-- <li>
        <a href="#" class="flex items-center py-2 pl-1 hover:text-primary-light">
          <span class="mr-[7px] h-1.5 w-1.5 rounded-full bg-danger"></span>
          <img
            src="~/assets/images/front/user_messages_Icon.png"
            alt="訊息icon"
            class="mr-2.5"
          />我的訊息</a
        >
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
          ><img
            src="~/assets/images/front/orderIcon.png"
            alt="訂單icon"
            class="mr-2.5"
          />訂單紀錄</a
        >
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
          ><img
            src="~/assets/images/front/user_starIcon.png"
            alt="收藏icon"
            class="mr-2.5"
          />我的收藏</a
        >
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
          ><img
            src="~/assets/images/front/user_keyIcon.png"
            alt="會員管理icon"
            class="mr-2.5"
          />會員管理</a
        >
      </li>
      <li>
        <a href="#" class="flex items-center py-2 pl-5 hover:text-primary-light"
          ><img
            src="~/assets/images/front/sign_out_Icon.png"
            alt="會員管理icon"
            class="mr-2.5"
          />登出</a
        >
      </li>
    </ul>
  </div> -->
</template>

<style scoped></style>
