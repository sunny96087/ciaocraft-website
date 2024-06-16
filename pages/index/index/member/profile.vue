<script lang="ts" setup>
// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})

const memberStore = useMemberStore()
const authStore = useAuthStore()
const uploadStore = useUploadStore()

const member: any = ref({})

const fetchMemberData = async () => {
  try {
    const res: any = await memberStore.getMember()
    const result = res.data
    console.log('fetchMemberData', result.data)
    member.value = result.data
    console.log('member', member.value)
  } catch (error) {
    console.log(error)
  }
}

const updateMember = async () => {
  await memberStore
    .updateMember(member.value)
    .then((res) => {
      console.log(res.data)
      alert('更新成功')
    })
    .catch((err) => {
      console.log(err)
      alert('更新失敗')
    })
  fetchMemberData()
}

const unlinkGoogleAccount = async () => {
  await useAuthStore()
    .unlinkGoogleAccount()
    .then(() => {
      showToast('取消連結成功')
    })
    .catch(() => {
      showToast('取消連結失敗')
    })
}

const handleFileUpload = async (event: any, type: string) => {
  const file = event.target.file[0]
  if (!file) {
    return
  }

  const formData: any = new FormData()
  formData.append('file', file)

  try {
    showLoading()
    const res = await uploadStore.uploadSingleImage(formData)
    const result = res.data
    if (result.statuCode == 200) {
      member.photo.value = result.data.imgUrl
    }
    hideLoading()
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchMemberData()
})
</script>

<template>
  <div class="bg-gray1 p-5 lg:px-[100px]">
    <div class="mx-auto py-6 lg:max-w-screen-xl">
      <h1 class="mb-3 mt-3 text-4xl lg:text-4xl">會員資料</h1>
      <p class="mb-8 text-base">
        請放心，你的電子郵件及所有與品牌溝通的訊息、檔案及相關購買資料，網站將依照個人資料保護法保障你的個人隱私！
      </p>
      <div class="mb-8 max-w-[711px] space-y-3">
        <div class="mb-5 max-w-[160px]">
          <!-- 大頭貼 -->
          <div class="mb-3 aspect-square max-h-[160px] max-w-[160px] overflow-hidden">
            <img
              :src="member.photo"
              alt="ciao-craft-logo"
              class="h-full w-full rounded-full bg-gray3 object-cover"
            />
          </div>
          <button
            type="button"
            class="w-full rounded-[4px] border-[1px] border-solid border-primary py-2 text-base tracking-wider transition duration-300 hover:border-primary-light hover:bg-primary hover:text-white"
            @click=""
          >
            編輯照片
          </button>

          <!-- * 上傳圖片 -->
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
              v-model="member.email"
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
              type="email"
              name="email"
              placeholder="請輸入"
              class="w-full px-5 py-2"
              v-model="member.phone"
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
                value="craft"
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
          <label for="google-email">連結帳號</label>
          <div class="flex justify-between space-x-2">
            <div class="flex-1 rounded-[4px] border-[1px] border-solid border-gray3">
              <input
                type="email"
                name="google-email"
                placeholder="googleId"
                class="w-full px-5 py-2"
                disabled
                v-model="member.email"
              />
            </div>
            <button
              class="items-center justify-center rounded-[4px] bg-secondary px-4 py-2 text-center tracking-wider text-white transition duration-300 hover:bg-secondary-light"
              @click="unlinkGoogleAccount()"
            >
              取消連結
            </button>
          </div>
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
