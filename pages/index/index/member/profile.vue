<script lang="ts" setup>
// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})

import defaultAvatar from '~/assets/images/front/member/default-avatar.jpg'

const memberStore = useMemberStore()
const uploadStore = useUploadStore()

const breadcrumb = [
  { pageName: '首頁', link: '/', isCurrentPage: false },
  { pageName: '會員中心', link: '/member', isCurrentPage: false },
  { pageName: '會員資料', link: `/member/profile`, isCurrentPage: true }
]

// 取得會員資料
const isMemberLoding = ref(false)
const memberEmail = ref('')
const member: any = ref({
  email: '會員email',
  nickname: '會員暱稱',
  name: '會員姓名',
  photo: '會員大頭貼',
  gender: 'other',
  birthday: new Date('2024-06-01'),
  phone: '會員電話',
  interests: [],
  googleId: 'Google Email'
})
// 會員資料區
// 監聽 memberStore.orders 的變化
watch(
  () => memberStore.member,
  (newOrders, oldOrders) => {
    member.value = newOrders
  }
)
const fetchMemberData = async () => {
  isMemberLoding.value = true
  try {
    const res: any = await memberStore.getMember()
    const result = res.data
    memberStore.member = result.data
    memberStore.member.birthday = result.data.birthday.split('T')[0]
    // member.value = result.data
    // member.value.birthday = result.data.birthday.split('T')[0]
    memberEmail.value = result.data.email ? result.data.email : result.data.googleAccount
  } catch (error) {
    showToast('取得會員資料失敗')
  }
  isMemberLoding.value = false
}

// 上傳圖片，點擊編輯照片按鈕時觸發隱藏的圖片上傳輸入框
const fileInput: any = ref(null)
const isUpdating = ref(false)
const clickFileInput = () => {
  fileInput.value.click()
}

// 圖片上傳
const handleFileUpload = async (event: any, type: string) => {
  showToast('圖片上傳中')
  const file = event.target.files[0]
  const formData: any = new FormData()
  formData.append('file', file)
  if (!file) {
    showToast('圖片上傳失敗')
    return
  }
  isUpdating.value = true
  try {
    const res: any = await uploadStore.uploadSingleImage(formData)
    const result = res.data
    if (result.status == 'success') {
      member.value.photo = result.data.imgUrl
      showToast('圖片上傳成功')
    }
  } catch (err) {
    showToast('圖片上傳失敗')
  }
  isUpdating.value = false
}

// 更新會員資料
const updateMember = async () => {
  if (!member.value.name) {
    showToast('名字不可為空')
    return
  }

  if (member.value.interests.length === 0) {
    showToast('請至少選擇一個有興趣領域')
    return
  }

  await memberStore
    .updateMember(member.value)
    .then((res) => {
      showToast('更新成功')
    })
    .catch((err) => {
      showToast('更新失敗')
    })
  fetchMemberData()
}

// 取消連結Google帳號
const unlinkGoogleAccount = async () => {
  await useAuthStore()
    .unlinkGoogleAccount()
    .then(() => {
      showToast('取消連結成功')
    })
    .catch(() => {
      showToast('取消連結失敗')
    })
  fetchMemberData()
}

onMounted(() => {
  fetchMemberData()
})
</script>

<template>
  <div class="bg-gray1">
    <div class="mx-auto px-5 py-14 lg:max-w-screen-xl">
      <FrontBreadcrumb class="mb-8" :breadcrumb="breadcrumb"></FrontBreadcrumb>
      <h1 class="mb-3 mt-3 text-4xl lg:text-4xl">會員資料</h1>
      <p class="mb-8 text-base">
        請放心，你的電子郵件及所有與品牌溝通的訊息、檔案及相關購買資料，網站將依照個人資料保護法保障你的個人隱私！
      </p>
      <div class="mb-8 max-w-[711px] space-y-3">
        <div class="mb-5 max-w-[160px]">
          <!-- 大頭貼 -->
          <div
            class="mb-3 aspect-square max-h-[160px] max-w-[160px] overflow-hidden"
            v-if="!isUpdating && !isMemberLoding"
          >
            <img
              :src="member.photo || defaultAvatar"
              alt="ciao-craft-logo"
              class="h-full w-full rounded-full bg-gray3 object-cover"
            />
          </div>
          <div
            class="mb-3 aspect-square max-h-[160px] max-w-[160px] animate-pulse overflow-hidden"
            v-if="isUpdating || isMemberLoding"
          >
            <div class="flex h-full w-full items-center justify-center rounded-full bg-gray3">
              圖片載入中...
            </div>
          </div>
          <button
            type="button"
            class="w-full rounded-[4px] border-[1px] border-solid border-primary py-2 text-base tracking-wider transition duration-300 hover:border-primary-light hover:bg-primary hover:text-white"
            @click="clickFileInput"
          >
            編輯照片
          </button>

          <!-- 隱藏的圖片上傳輸入框 -->
          <input
            class="hidden"
            type="file"
            @change="handleFileUpload($event, 'photo')"
            ref="fileInput"
          />
        </div>
        <div class="space-y-2">
          <label>帳號/電子信箱</label>
          <div class="w-full rounded-[4px] border-[1px] border-solid border-gray3">
            <input
              type="email"
              name="email"
              placeholder="帳號/電子信箱"
              class="w-full rounded-[4px] border-[1px] border-solid border-gray3 px-5 py-2"
              v-model="memberEmail"
              disabled
            />
          </div>
          <span class="block text-sm text-[--color-text-secondary]">任何通知將發送至此信箱</span>
        </div>
        <div class="space-y-2">
          <label>密碼 <span class="text-danger">*</span></label>
          <NuxtLink
            to="/member/resetPwd"
            class="inline-block rounded-[4px] bg-secondary px-6 py-2 text-center tracking-wider text-white transition duration-300 hover:bg-secondary-light hover:text-white"
          >
            修改密碼
          </NuxtLink>
        </div>
        <div class="space-y-2">
          <label>顯示暱稱 <span class="text-danger">*</span></label>
          <p class="text-sm font-normal">請選擇一個你喜歡的暱稱，系統會用你設定的暱稱來稱呼你</p>
          <div class="w-full rounded-[4px] border-[1px] border-solid border-gray3">
            <input
              type="text"
              name="text"
              placeholder="請輸入"
              class="w-full rounded-[4px] border-[1px] border-solid border-gray3 px-5 py-2"
              v-model="member.nickname"
            />
          </div>
        </div>
        <div class="space-y-2">
          <label>姓名<span class="text-danger">*</span></label>
          <div class="w-full rounded-[4px] border-[1px] border-solid border-gray3">
            <input
              type="text"
              name="text"
              placeholder="請輸入"
              class="w-full rounded-[4px] border-[1px] border-solid border-gray3 px-5 py-2"
              v-model="member.name"
            />
          </div>
        </div>
        <div class="space-y-2">
          <label>性別<span class="text-danger">*</span></label>
          <div class="custom-select w-[140px] rounded-[4px] border-[1px] border-solid border-gray3">
            <select
              name="gender"
              class="custom-select-input w-full px-5 py-2"
              placeholder="請選擇"
              v-model="member.gender"
            >
              <option value="male" :selected="member.gender === 'male'">男</option>
              <option value="female" :selected="member.gender === 'female'">女</option>
              <option value="other" :selected="member.gender === 'other'">其他</option>
            </select>
          </div>
        </div>
        <div class="space-y-2">
          <label class="">生日<span class="text-danger">*</span></label>
          <input
            type="date"
            name="birthday"
            placeholder="請選擇"
            class="w-full rounded border-[1px] border-solid border-gray3 px-5 py-2"
            v-model="member.birthday"
          />
        </div>
        <div class="space-y-2">
          <label>聯絡電話</label>
          <div class="w-full rounded-[4px] border-[1px] border-solid border-gray3">
            <input
              type="tel"
              name="tel"
              placeholder="請輸入"
              class="w-full px-5 py-2"
              v-model="member.phone"
              oninput="value=value.replace(/[^\d]/g,'')"
            />
          </div>
        </div>
        <div class="space-y-2">
          <div>有興趣的領域(多選)</div>
          <div class="flex space-x-5">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="craft"
                name="craft"
                value="工藝手作"
                v-model="member.interests"
              />
              <label for="craft">工藝手作</label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="cooking"
                name="cooking"
                value="烹飪烘烤"
                v-model="member.interests"
              />
              <label for="cooking">烹飪烘烤</label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="art"
                name="art"
                value="藝術人文"
                v-model="member.interests"
              />
              <label for="art">藝術人文</label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="lifestyle"
                name="lifestyle"
                value="生活品味"
                v-model="member.interests"
              />
              <label for="lifestyle">生活品味</label>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <label for="google-email">連結 google 帳號</label>
          <div class="flex justify-between space-x-2">
            <div class="flex-1 rounded-[4px] border-[1px] border-solid border-gray3">
              <input
                type="email"
                name="gmail"
                placeholder="No gmail account linked"
                class="w-full px-5 py-2"
                disabled
                v-model="member.googleAccount"
              />
            </div>
            <!-- <button
              class="items-center justify-center rounded-[4px] bg-secondary px-4 py-2 text-center tracking-wider text-white transition duration-300 hover:bg-secondary-light"
              @click="unlinkGoogleAccount()"
            >
              取消連結
            </button> -->
            <!-- <button
              v-else
              class="items-center justify-center rounded-[4px] bg-secondary px-4 py-2 text-center tracking-wider text-white transition duration-300 hover:bg-secondary-light"
              @click="linkGoogleAccount()"
            >
              連結 Google 帳號
            </button> -->
          </div>
          <!-- <a
            v-else
            :href="googleUrl"
            class="btn transition duration-300 hover:border-dark6 hover:bg-dark6 hover:text-white"
          >
            <Icon name="logos:google-icon" class="mr-5" />
            <span>使用 Google 登入</span>
          </a> -->
        </div>
      </div>
      <button
        class="rounded-[4px] bg-primary px-4 py-2 text-center tracking-wider text-white transition duration-300 hover:bg-primary-light"
        @click="updateMember()"
      >
        儲存資料
      </button>
    </div>
  </div>
</template>

<style>
.custom-select {
  position: relative;
  background-color: white;
}

.custom-select-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='%23AAAAAA' d='m4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427'/%3E%3C/svg%3E")
    no-repeat right center;
  background-size: 1em;
  background-origin: content-box;
}

.custom-select-input::-ms-expand {
  display: none;
}

/* 隱藏原本的 checkbox */
input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  min-width: 20px;
  min-height: 20px;
  border: 1px solid var(--color-secondary);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-right: 8px; /* 增加與文字的間距 */
}

/* 模擬未選中的狀態 */
input[type='checkbox']::before {
  content: '';
  display: block;
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  transform: translate(-50%, -50%);
}

/* 模擬選中的狀態 */
input[type='checkbox']:checked::before {
  background: var(--color-secondary);
}

label {
  display: flex;
  align-items: center; /* 垂直居中 */
}
</style>
