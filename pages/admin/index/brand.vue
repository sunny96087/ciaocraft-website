<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const vendorInfo: any = ref({
  brandName: '',
  avatar: '',
  bannerImage: '',
  intro: '',
  socialMedias: [
    { platform: 'facebook', url: '' },
    { platform: 'instagram', url: '' },
    { platform: 'website', url: '' }
  ]
})

onMounted(() => {
  getVendorData()
})

// 取得登入賣家資料 (Back)
async function getVendorData() {
  try {
    showLoading()
    const res = await store.apiGetAdminVendor()
    const result = res.data
    console.log(`getVendorData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      vendorInfo.value = result.data
      console.log(`vendorInfo = ${JSON.stringify(vendorInfo.value)}`)
    } else {
      console.log('取得使用者資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 編輯賣家資料 (Back)
async function editVendorData() {
  if (vendorInfo.value.brandName === '') {
    showToast('請輸入品牌名稱')
    return
  }
  if (vendorInfo.value.intro === '') {
    showToast('請輸入品牌介紹')
    return
  }

  try {
    showLoading()
    let data = {
      brandName: vendorInfo.value.brandName,
      avatar: vendorInfo.value.avatar,
      bannerImage: vendorInfo.value.bannerImage,
      intro: vendorInfo.value.intro,
      socialMedias: vendorInfo.value.socialMedias
    }
    const res = await store.apiUpdateAdminVendor(data)
    const result = res.data
    console.log(`editVendorData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('修改成功')
      getVendorData()
    } else {
      console.log('修改失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 取消編輯
function cancelEdit() {
  getVendorData()
}

// 轉換社群連結格式
function getSocialMedia(platform: string) {
  let media = vendorInfo.value.socialMedias.find((m: any) => m.platform === platform)
  if (!media) {
    media = { platform, url: '' }
    vendorInfo.value.socialMedias.push(media)
  }
  return media
}

// NOTE 上傳圖片
// 參考元素
const fileInput: any = ref(null)
const fileInputBanner: any = ref(null)

// 觸發文件上傳
function triggerFileUpload() {
  fileInput.value?.click()
}

function triggerFileUploadBanner() {
  fileInputBanner.value?.click()
}

// 處理文件上傳
async function handleFileUpload(event: any, type: string) {
  const file = event.target.files[0]
  if (!file) return

  const formData: any = new FormData()
  formData.append('file', file)

  // 送出
  try {
    showLoading()
    const res = await store.apiUploadAdminImage(formData)
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      console.log('上傳圖片成功')

      if (type === 'avatar') {
        vendorInfo.value.avatar = result.data.imgUrl
      } else {
        vendorInfo.value.bannerImage = result.data.imgUrl
      }

      // 提示成功
      showToast('上傳圖片成功')
    } else {
      console.log('上傳圖片失敗，系統錯誤')
      showToast('上傳圖片失敗')
    }
  } catch (e) {
    console.log(e)
    showToast('上傳圖片失敗，請換一張圖片')
  } finally {
    hideLoading()
  }
}

// NOTE tooltip
const tooltip1 = ref(false)
const tooltip2 = ref(false)
</script>
<template>
  <div class="">
    <div class="admin-page-title">品牌管理</div>

    <div class="admin-page-block flex flex-col gap-6">
      <!-- >> component: row-input -->
      <div class="row-input">
        <div class="row-input-title">品牌名稱</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="text"
            placeholder="請輸入品牌名稱"
            v-model="vendorInfo.brandName"
            :class="{ 'admin-input-error': vendorInfo.brandName === '' }"
          />
          <div v-if="vendorInfo.brandName === ''" class="admin-input-error-note">
            此欄位不能留空
          </div>
        </div>
      </div>

      <div class="row-input">
        <div class="row-input-title-area">品牌介紹</div>
        <div class="w-full">
          <textarea
            class="admin-input min-h-[200px]"
            type="tel"
            placeholder="請輸入品牌介紹"
            v-model="vendorInfo.intro"
            :class="{ 'admin-input-error': vendorInfo.intro === '' }"
          ></textarea>
          <div v-if="vendorInfo.intro === ''" class="admin-input-error-note">此欄位不能留空</div>
        </div>
      </div>

      <!-- * 上傳圖片 -->
      <!-- 隱藏的圖片上傳輸入框 -->
      <input
        type="file"
        @change="handleFileUpload($event, 'avatar')"
        ref="fileInput"
        style="display: none"
      />
      <input
        type="file"
        @change="handleFileUpload($event, 'bannerImage')"
        ref="fileInputBanner"
        style="display: none"
      />

      <div class="row-input">
        <div class="row-input-title-area relative flex items-center text-nowrap">
          品牌頭像<Icon
            name="ph:question-light"
            size="20"
            class="shrink-0 cursor-help"
            @click="tooltip1 = !tooltip1"
          />

          <!-- hover 提示 -->
          <div class="tooltip" v-if="tooltip1">
            <div class="p-5 pb-10">
              &nbsp;·&nbsp;格式：1080X1080
              <br />&nbsp;·&nbsp;圖片格式為jpg/png<br />&nbsp;&nbsp;&nbsp;&nbsp;圖片檔案大小不超過
              4MB
            </div>
          </div>
        </div>

        <div @click="triggerFileUpload" class="cursor-pointer">
          <div
            v-if="!vendorInfo.avatar"
            class="flex flex-col items-center justify-center gap-1 rounded border border-dashed border-gray px-3 py-[26px] text-dark3"
          >
            <Icon name="bi:images" size="48" />
            <div>新增圖片(0/1)</div>
          </div>

          <div
            v-else
            class="h-[180px] min-h-[180px] w-[180px] min-w-[180px] overflow-hidden rounded"
          >
            <img :src="vendorInfo.avatar" alt="avatar" class="pic-auto" />
          </div>
        </div>
      </div>

      <div class="row-input">
        <div class="row-input-title-area relative flex items-center text-nowrap">
          形象圖片<Icon
            name="ph:question-light"
            size="20"
            class="shrink-0 cursor-help"
            @click="tooltip2 = !tooltip2"
          />

          <!-- hover 提示 -->
          <div class="tooltip" v-if="tooltip2">
            <div class="p-5 pb-10">
              &nbsp;·&nbsp;格式：1240Ｘ300
              <br />&nbsp;·&nbsp;圖片格式為jpg/png<br />&nbsp;&nbsp;&nbsp;&nbsp;圖片檔案大小不超過
              4MB
            </div>
          </div>
        </div>
        <div @click="triggerFileUploadBanner" class="cursor-pointer">
          <div
            v-if="!vendorInfo.bannerImage"
            class="flex flex-col items-center justify-center gap-1 rounded border border-dashed border-gray px-3 py-[26px] text-dark3"
          >
            <Icon name="bi:images" size="48" />
            <div>新增圖片(0/1)</div>
          </div>

          <div
            v-else
            class="flex max-h-[240px] w-full min-w-full items-center justify-center overflow-hidden rounded"
          >
            <img :src="vendorInfo.bannerImage" alt="bannerImage" class="pic-auto" />
          </div>
        </div>
      </div>

      <!-- * 社群連結 -->
      <div class="row-input">
        <div class="row-input-title-area">社群連結 <br />（選填）</div>
        <div class="flex w-full flex-col gap-3">
          <div class="media-row">
            <Icon name="ph:facebook-logo-fill" size="32" />
            <input
              class="admin-input"
              type="text"
              placeholder="請輸入連結"
              v-model="getSocialMedia('facebook').url"
            />
          </div>
          <div class="media-row">
            <Icon name="ph:instagram-logo-fill" size="32" />
            <input
              class="admin-input"
              type="text"
              placeholder="請輸入連結"
              v-model="getSocialMedia('instagram').url"
            />
          </div>
          <div class="media-row">
            <Icon name="ph:link-fill" size="32" />
            <input
              class="admin-input"
              type="text"
              placeholder="請輸入連結"
              v-model="getSocialMedia('website').url"
            />
          </div>
        </div>
      </div>

      <!-- <div class="row-input">
        <div class="row-input-title">密碼</div>
        <button class="btn-orange-outline" @click="openEditPasswordModal">修改密碼</button>
      </div> -->
    </div>

    <!-- * btn -->
    <div class="mt-[28px] flex gap-3">
      <button class="btn-orange-outline" @click="cancelEdit">取消</button>
      <button class="btn-orange" @click="editVendorData">儲存</button>
    </div>
  </div>
</template>
<style scoped>
.media-row {
  @apply flex items-center gap-[10px];
}

.tooltip {
  @apply absolute -right-[118px] bottom-[16px];
  background: url('~/assets/images/admin/tooltip-bg.svg') no-repeat center center;
  background-size: cover;
  background-size: 100% 100%;
  z-index: 10;
}
</style>
