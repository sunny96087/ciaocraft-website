<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'
const router = useRouter()

const teacherInfo: any = ref({
  name: '',
  description: '',
  photo: '',
  intro: '',
  order: 0,
  socialMedias: [
    { platform: 'facebook', link: '' },
    { platform: 'instagram', link: '' },
    { platform: 'website', link: '' }
  ]
})

// 轉換社群連結格式
function getSocialMedia(platform: string) {
  let media = teacherInfo.value.socialMedias.find((m: any) => m.platform === platform)
  if (!media) {
    media = { platform, link: '' }
    teacherInfo.value.socialMedias.push(media)
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

      if (type === 'photo') {
        teacherInfo.value.photo = result.data.imgUrl
      } else {
        // teacherInfo.value.bannerImage = result.data.imgUrl
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

// NOTE 新增老師 (Back)
async function addTeacher() {
  if (
    teacherInfo.value.name === '' ||
    teacherInfo.value.description === '' ||
    teacherInfo.value.intro === '' ||
    teacherInfo.value.order <= 0
  ) {
    showToast('請填寫完整資料')
    return
  }

  try {
    showLoading()

    let data = {
      name: teacherInfo.value.name,
      description: teacherInfo.value.description,
      photo: teacherInfo.value.photo,
      intro: teacherInfo.value.intro,
      order: teacherInfo.value.order,
      socialMediaInfo: teacherInfo.value.socialMedias
    }

    const res = await store.apiAddTeacher(data)
    const result = res.data
    console.log(`editVendorData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      console.log('新增老師成功')

      // 重置
      reset()

      // 提示成功
      showToast('新增老師成功')

      // 返回列表
      router.push('/admin/teacher')
    } else {
      console.log('新增老師失敗')
      showToast('新增老師失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// NOTE 重置
function reset() {
  teacherInfo.value = {
    name: '',
    description: '',
    photo: '',
    intro: '',
    order: 0,
    socialMedias: [
      { platform: 'facebook', link: '' },
      { platform: 'instagram', link: '' },
      { platform: 'website', link: '' }
    ]
  }
}
</script>
<template>
  <div class="">
    <!-- >> component: 麵包屑 Breadcrumbs -->
    <div class="admin-breadcrumbs">
      <nuxt-link to="/admin/teacher">師資管理</nuxt-link>
      <Icon name="material-symbols-light:arrow-forward-ios-rounded" size="16" class=""></Icon>
      <span class="text-dark1">新增師資</span>
    </div>

    <!-- * title -->
    <div class="admin-page-title">新增師資</div>

    <!-- * page-block -->
    <div class="admin-page-block flex flex-col gap-6">
      <div class="row-input">
        <div class="row-input-title">師資姓名</div>
        <div class="w-full">
          <input
            class="admin-input"
            type="text"
            placeholder="請輸入師資姓名"
            v-model="teacherInfo.name"
            :class="{ 'admin-input-error': teacherInfo.name === '' }"
          />
          <div v-if="teacherInfo.name === ''" class="admin-input-error-note">此欄位不能留空</div>
        </div>
      </div>

      <!-- * 上傳圖片 -->
      <!-- 隱藏的圖片上傳輸入框 -->
      <input
        type="file"
        @change="handleFileUpload($event, 'photo')"
        ref="fileInput"
        style="display: none"
      />

      <div class="row-input">
        <div class="row-input-title-area relative flex items-center text-nowrap">
          師資頭像
          <Icon
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
            v-if="!teacherInfo.photo"
            class="flex flex-col items-center justify-center gap-1 rounded border border-dashed border-gray px-3 py-[26px] text-dark3"
          >
            <Icon name="bi:images" size="48" />
            <div>新增圖片(0/1)</div>
          </div>

          <div
            v-else
            class="h-[180px] min-h-[180px] w-[180px] min-w-[180px] overflow-hidden rounded"
          >
            <img :src="teacherInfo.photo" alt="avatar" class="pic-auto" />
          </div>
        </div>
      </div>

      <!-- 師資敘述 -->
      <div class="row-input">
        <div class="row-input-title-area">師資敘述</div>
        <div class="w-full">
          <textarea
            class="admin-input min-h-[200px]"
            type="tel"
            placeholder="請輸入師資敘述"
            v-model="teacherInfo.intro"
            :class="{ 'admin-input-error': teacherInfo.intro === '' }"
          ></textarea>
          <div v-if="teacherInfo.intro === ''" class="admin-input-error-note">此欄位不能留空</div>
        </div>
      </div>

      <!-- 師資介紹 -->
      <div class="row-input">
        <div class="row-input-title-area">師資介紹</div>
        <div class="w-full">
          <textarea
            class="admin-input min-h-[200px]"
            type="tel"
            placeholder="請輸入師資介紹"
            v-model="teacherInfo.description"
            :class="{ 'admin-input-error': teacherInfo.description === '' }"
          ></textarea>
          <div v-if="teacherInfo.description === ''" class="admin-input-error-note">
            此欄位不能留空
          </div>
        </div>
      </div>

      <!-- 師資排序 -->
      <div class="row-input">
        <div class="row-input-title relative flex items-center text-nowrap">
          師資排序
          <Icon
            name="ph:question-light"
            size="20"
            class="shrink-0 cursor-help"
            @click="tooltip2 = !tooltip2"
          />

          <!-- hover 提示 -->
          <div class="tooltip" v-if="tooltip2">
            <div class="p-5 pb-10">
              請依照希望在品牌賣場的師資<br />陣容所呈現順序輸入數字，數<br />字越小的排序越前面。
            </div>
          </div>
        </div>
        <div class="w-full">
          <input
            class="admin-input"
            type="number"
            min="0"
            placeholder="請輸入師資排序數字"
            v-model="teacherInfo.order"
            :class="{ 'admin-input-error': teacherInfo.order <= 0 }"
          />
          <div v-if="teacherInfo.order <= 0" class="admin-input-error-note">此欄位不能為零</div>
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
              v-model="getSocialMedia('facebook').link"
            />
          </div>
          <div class="media-row">
            <Icon name="ph:instagram-logo-fill" size="32" />
            <input
              class="admin-input"
              type="text"
              placeholder="請輸入連結"
              v-model="getSocialMedia('instagram').link"
            />
          </div>
          <div class="media-row">
            <Icon name="ph:link-fill" size="32" />
            <input
              class="admin-input"
              type="text"
              placeholder="請輸入連結"
              v-model="getSocialMedia('website').link"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- * btn -->
    <div class="mt-[28px] flex gap-3">
      <button class="btn-orange-outline" @click="reset">取消</button>
      <button class="btn-orange" @click="addTeacher">儲存</button>
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
