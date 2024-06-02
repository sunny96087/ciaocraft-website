<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const representative = ref('') // 申請人姓名

const account = ref('') // 申請人帳號
const mobile = ref('') // 手機號碼
const brandName = ref('') // 品牌名稱
const reviewLinks = ref(['']) // ['網站1', '網站2', '網站3', '網站4', '網站5']
const reviewBrief = ref('') // 審核用簡介
const reviewImages = ref([]) // ['圖片1', '圖片2', '圖片3', '圖片4', '圖片5']

// * 申請人姓名
const isRepresentativeError = ref(false)
const checkRepresentative = () => {
  isRepresentativeError.value = representative.value.trim() === ''
}

// * 手機號碼
const isMobileError = ref(false)
const checkMobile = () => {
  const mobileReg = /^[0-9]*$/ // 正則表達式，檢查是否只包含數字
  isMobileError.value = mobile.value.trim() === '' || !mobileReg.test(mobile.value)
}

// * 品牌名稱
const isBrandNameError = ref(false)
const checkBrandName = () => {
  isBrandNameError.value = brandName.value.trim() === ''
}

// * 電子信箱
const isAccountError = ref(false)
const accountErrorText = ref('')
const checkAccount = () => {
  isAccountError.value = account.value.trim() === ''
  accountErrorText.value = '此欄位不得為空'

  //  驗證是否為 Email 格式
  const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
  if (!emailReg.test(account.value)) {
    isAccountError.value = true
    accountErrorText.value = '請輸入正確的 Email 格式'
  } else {
    isAccountError.value = false
    accountErrorText.value = ''
    checkAccountDuplicate()
  }

  //   if (account.value !== '') {
  //   }
}

// * 評論連結
const isReviewLinksError = ref([false])

const checkReviewLinks = (index: any) => {
  isReviewLinksError.value[index] = reviewLinks.value[index].trim() === ''
}

const addLink = () => {
  if (reviewLinks.value.length < 5) {
    reviewLinks.value.push('')
    isReviewLinksError.value.push(false)
  }
}

const removeLink = (index: any) => {
  reviewLinks.value.splice(index, 1)
  isReviewLinksError.value.splice(index, 1)
}

// * 品牌簡介
const isReviewBriefError = ref(false)
const checkReviewBrief = () => {
  isReviewBriefError.value = reviewBrief.value.trim() === ''
}

// * 確認賣家帳號是否重複 (Front)
// yu13142013@gmail.com
async function checkAccountDuplicate() {
  try {
    showLoading()

    let data = {
      account: account.value
    }

    const res = await store.apiCheckVendorEmailRepeat(data)
    console.log(`checkAccountDuplicate result = ${JSON.stringify(res)}`)

    const result = res.data
    if (result.statusCode === 400) {
      console.log('此帳號已被使用')
      isAccountError.value = true
      accountErrorText.value = '此帳號已被使用'
    }
  } catch (e) {
    console.log(e)
    isAccountError.value = true
    accountErrorText.value = '此帳號已被使用'
  } finally {
    hideLoading()
  }
}

// NOTE 上傳圖片
// 參考元素
const fileInput: any = ref(null)

// 觸發文件上傳
function triggerFileUpload() {
  fileInput.value?.click()
}

// 處理多個文件上傳
async function handleFileUpload(event: any, type: string) {
  const files = event.target.files
  if (!files.length) return

  let totalFiles = reviewImages.value.length + files.length

  if (totalFiles > 5) {
    showToast('最多只能上傳五個文件')
    return
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const formData: any = new FormData()
    formData.append('file', file)

    // 送出
    try {
      showLoading()
      const res = await store.apiUploadAdminImages(formData)
      const result = res.data
      console.log(`editEvent result = ${JSON.stringify(result)}`)
      if (result.statusCode === 200) {
        console.log('上傳圖片成功')

        if (type === 'photo') {
          result.data.imgUrls.forEach((imgUrl: string) => {
            reviewImages.value.push(imgUrl)
          })
        } else {
          // courseInfo.value.bannerImage = result.data.imgUrl
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
}

const removeImage = (index: number) => {
  reviewImages.value.splice(index, 1)
}

// * 隱私權同意
const isPrivacyAgree = ref(false)
const isModeAgree = ref(false)

// * 新增賣家申請 (Front)
async function submitApply() {
  if (
    isRepresentativeError.value ||
    isMobileError.value ||
    isBrandNameError.value ||
    isAccountError.value ||
    isReviewLinksError.value.some((error) => error) ||
    isReviewBriefError.value ||
    !isPrivacyAgree ||
    !isModeAgree ||
    representative.value === '' ||
    account.value === '' ||
    mobile.value === '' ||
    brandName.value === '' ||
    reviewLinks.value.length === 0 ||
    reviewBrief.value === ''
  ) {
    showToast('請填寫完整資訊', 'error')
    return
  }

  // 再次確認
  const dialogresult = await openDialog(
    '確認送出申請表',
    '送出申請後，資料將無法修改，巧手玩藝將審核您的資料，審核結果將會寄送至電子信箱，您是否繼續?'
  )
  if (!dialogresult.confirmed) return

  try {
    showLoading()

    let data = {
      representative: representative.value,
      account: account.value,
      mobile: mobile.value,
      brandName: brandName.value,
      reviewLinks: reviewLinks.value,
      reviewBrief: reviewBrief.value,
      reviewImages: reviewImages.value
    }

    // console.log(`submitApply data = ${JSON.stringify(data)}`)

    const res = await store.apiApplyVendor(data)
    const result = res.data
    console.log(`submitApply result = ${JSON.stringify(result)}`)
    if (result.statusCode === 201) {
      showToast('申請成功，將於 7 個工作天內審核完畢，並將結果寄至您填寫之信箱！')

      // 清空欄位
      representative.value = ''
      account.value = ''
      mobile.value = ''
      brandName.value = ''
      reviewLinks.value = ['']
      reviewBrief.value = ''
      reviewImages.value = []

      isPrivacyAgree.value = false
      isModeAgree.value = false
    } else {
      console.log('申請失敗，請聯絡平台管理員')
      showToast('申請失敗，請聯絡平台管理員', 'error')
    }
  } catch (e) {
    console.log(e)
    showToast('申請失敗，請聯絡平台管理員', 'error')
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="bg-[#F9FAFB]">
    <div class="mx-auto w-full max-w-[1200px] p-5 md:pb-[36px] md:pt-[56px]">
      <h2 class="text-[36px]">申請成為品牌賣家</h2>

      <div class="mb-[30px] mt-3">
        請填寫以下資訊，經平台審核通過後，工作天約7天，將發送賣家帳號密碼至您的電子信箱。
      </div>

      <!-- * 表單申請內容 -->
      <div class="flex flex-col gap-6">
        <!-- ? 申請人姓名 -->
        <div class="flex flex-col gap-3">
          <div class="input-col">
            <p>申請人姓名</p>
            <input
              type="text"
              v-model="representative"
              class="input"
              @blur="checkRepresentative"
              placeholder="請輸入品牌負責人或主要聯絡人姓名"
            />
            <div v-if="isRepresentativeError" class="error-text">此欄位不得為空</div>
          </div>
        </div>

        <!-- ? 手機號碼 -->
        <div class="flex flex-col gap-3">
          <div class="input-col">
            <p>手機號碼</p>
            <input
              type="phone"
              v-model="mobile"
              class="input"
              @blur="checkMobile"
              placeholder="請輸入品牌負責人或主要聯絡人手機號碼"
            />
            <div v-if="isMobileError" class="error-text">此欄位不得為空且只能填寫數字</div>
          </div>
        </div>

        <!-- ? 品牌名稱 -->
        <div class="flex flex-col gap-3">
          <div class="input-col">
            <p>品牌名稱</p>
            <div class="note-text">申請通過後，將成為在平台上對外的品牌名稱</div>
            <input
              type="text"
              v-model="brandName"
              class="input"
              @blur="checkBrandName"
              placeholder="請輸入品牌名稱"
            />
            <div v-if="isBrandNameError" class="error-text">此欄位不得為空</div>
          </div>
        </div>

        <!-- ? 電子信箱 -->
        <div class="flex flex-col gap-3">
          <div class="input-col">
            <p>申請人帳號</p>
            <div class="note-text">任何消息將發送通知至此信箱，申請通過後，將成為品牌帳號</div>
            <input
              type="text"
              v-model="account"
              class="input"
              @blur="checkAccount"
              placeholder="請輸入電子信箱"
            />
            <div v-if="isAccountError" class="error-text">{{ accountErrorText }}</div>
          </div>
        </div>

        <!-- ? 品牌的社群媒體、通路連結或實體活動經驗 -->
        <div class="flex flex-col gap-3">
          <div class="input-col">
            <p>品牌的社群媒體、通路連結或實體活動經驗</p>
            <div class="note-text">
              歡迎提供品牌社群連結（如 Facebook、Instagram 等）或官網及其他通路連結（如 PChome、Etsy
              等）給我們參考；如品牌有參與實體市集的經驗，請一併提供相關連結，會是審核重要評估的項目之一。
            </div>
            <div class="flex flex-col gap-3" v-for="(link, index) in reviewLinks" :key="index">
              <div class="flex w-full items-center gap-3">
                <div class="input-col">
                  <input
                    type="text"
                    v-model="reviewLinks[index]"
                    class="input"
                    @blur="checkReviewLinks(index)"
                    placeholder="請輸入評論連結"
                  />
                  <div v-if="isReviewLinksError[index]" class="error-text">此欄位不得為空</div>
                </div>
                <button
                  v-if="index > 0"
                  class="flex shrink-0 items-center justify-center text-danger"
                  @click="removeLink(index)"
                >
                  <Icon name="material-symbols:close" size="20"></Icon>
                </button>
              </div>
            </div>
            <button
              @click="addLink"
              :disabled="reviewLinks.length >= 5"
              class="text-left"
              :class="{
                'text-primary': reviewLinks.length < 5,
                'cursor-not-allowed text-gray': reviewLinks.length >= 5
              }"
            >
              新增連結
            </button>
          </div>
        </div>

        <!-- ? 品牌簡介 -->
        <div class="flex flex-col gap-3">
          <div class="input-col">
            <p>品牌簡介</p>
            <div class="note-text">
              來與我們分享你的品牌和商品特色吧。請重點介紹你的設計理念及過程、商品亮點及品牌故事。其他想說的話，也歡迎告訴我們！
            </div>
            <textarea
              v-model="reviewBrief"
              class="input min-h-[200px]"
              @blur="checkReviewBrief"
              placeholder="請填寫不超過500字"
            ></textarea>
            <div v-if="isReviewBriefError" class="error-text">此欄位不得為空</div>
          </div>
        </div>

        <!-- ? 上傳圖片 -->
        <!-- 隱藏的圖片上傳輸入框 -->
        <input
          type="file"
          @change="handleFileUpload($event, 'photo')"
          ref="fileInput"
          multiple
          style="display: none"
        />

        <div class="flex flex-col gap-3">
          <div class="input-col">
            <p>照片、證照、課程花絮證明</p>
            <div class="note-text">
              如果有其他幫助審核的圖片也可以提供，加速平台審核，例如：教室環境、師資證照、課程側拍...等等！請提供可清晰瀏覽的商品實拍照。照片勿後製上
              logo、文字；請勿過度使用濾鏡、合成圖片或讓商品失焦。請提供解析度 72dpi 以上的 JPG 或
              PNG 圖檔，不符合規格的圖檔將無法上傳。 <br />(最多五張)
            </div>
            <!-- 圖片顯示處 -->
            <div class="flex flex-wrap gap-[10px]">
              <div
                v-for="(image, index) in reviewImages"
                :key="index"
                class="relative h-[128px] w-[128px] overflow-hidden rounded text-white"
              >
                <img :src="image" alt="image" class="pic-auto" />
                <div class="hover-auto absolute inset-0 bg-[#0000004D] opacity-0 hover:opacity-100">
                  <button @click="removeImage(index)" class="absolute bottom-3 right-3">
                    <Icon name="solar:trash-bin-trash-outline" size="20" class=""></Icon>
                  </button>
                </div>
              </div>

              <div
                v-if="reviewImages.length < 5"
                @click="triggerFileUpload"
                class="h-[128px] w-[128px] cursor-pointer rounded border border-dashed border-gray px-3 py-[26px] text-dark3"
              >
                <div class="flex flex-col items-center justify-center gap-1">
                  <Icon name="bi:images" size="48" />
                  <div>上傳圖片({{ reviewImages.length }}/5)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- * 隱私權同意 -->
      <div class="mt-10 flex flex-col gap-3">
        <label class="flex items-center gap-2"
          ><input v-model="isPrivacyAgree" type="checkbox" class="h-[20px] w-[20px] min-w-5" />
          <div class="">
            我已閱讀<span class="link-text">隱私權政策</span> 和
            <span class="link-text">使用者條款</span> 並確認我的商品屬於可以販售類別
          </div>
        </label>
        <label class="flex items-center gap-2"
          ><input v-model="isModeAgree" type="checkbox" class="h-[20px] w-[20px] min-w-5" />
          我已了解並同意在平台的合作模式
        </label>
      </div>

      <!-- * 送出申請 btn -->
      <div class="mt-10 flex justify-start">
        <button
          class="btn-gray"
          v-if="
            isRepresentativeError ||
            isMobileError ||
            isBrandNameError ||
            isAccountError ||
            isReviewLinksError.some((error) => error) ||
            isReviewBriefError ||
            !isPrivacyAgree ||
            !isModeAgree ||
            representative === '' ||
            account === '' ||
            mobile === '' ||
            brandName === '' ||
            reviewLinks.length === 0 ||
            reviewBrief === ''
          "
        >
          <Icon name="fluent:send-20-regular" size="20"></Icon>送出申請
        </button>
        <button v-else @click="submitApply" class="btn-primary hover-auto">
          <Icon name="fluent:send-20-regular" size="20"></Icon>
          送出申請
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input-col {
  @apply flex w-full flex-col gap-1;
}

.input {
  @apply w-full rounded border border-gray px-5 py-2;
}

.note-text {
  @apply text-[14px];
}

.error-text {
  @apply text-[14px] text-danger;
}

.link-text {
  @apply mx-2 border-b border-primary text-primary;
}

.btn-primary {
  @apply flex items-center justify-center gap-2 rounded bg-primary px-6 py-2 text-[18px] text-white hover:bg-primary-light;
}

.btn-gray {
  @apply flex cursor-not-allowed items-center justify-center gap-2 rounded bg-gray4 px-6 py-2 text-[18px] text-gray;
}
</style>
