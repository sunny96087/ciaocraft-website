<script lang="ts" setup>
// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})
const router = useRouter()
const route = useRoute()
const orderId: any = route.params.id

const orderStore = useOrderStore()
const uploadStore = useUploadStore()
const courseStore = useCourseStore()

const breadcrumb = [
  { pageName: '首頁', link: '/', isCurrentPage: false },
  { pageName: '會員中心', link: '/member', isCurrentPage: false },
  { pageName: '訂單詳情', link: `/member/order/${orderId}`, isCurrentPage: false },
  { pageName: '課後心得分享', link: `/member/comment/${orderId}`, isCurrentPage: true }
]

const order: any = ref('')

const courseId = ref('id')
const courseImage = ref('')
const vendorId = ref('id')

const isLoading = ref(false)
const fetchOrder = async () => {
  isLoading.value = true
  try {
    const res = await orderStore.getMemberOrderByOrderId(orderId)
    const result = res.data
    order.value = result.data
    courseId.value = result.data.courseId._id
    courseImage.value = result.data.courseId.courseImage[0]
    vendorId.value = result.data.vendorId._id
  } catch (err) {
    showToast('取得訂單失敗，請聯繫客服人員')
  }
  isLoading.value = false
}

const rating: any = ref(0)
const tags = ref<string[]>([])
const content = ref('')

// 評分星星
const setRating = (stars: number) => {
  rating.value = stars
}

// 檢查評論內容字數
const checkContentLength = () => {
  if (content.value.length > 500) {
    content.value = content.value.slice(0, 500)
  }
}

const commentImages = ref<string[]>([])
const originalCommentImages = ref<string[]>([])

// 上傳圖片，點擊編輯照片按鈕時觸發隱藏的圖片上傳輸入框
const fileInput: any = ref(null)
const clickFileInput = () => {
  originalCommentImages.value = commentImages.value
  fileInput.value.click()
}

// 圖片上傳
const handleFileUpload = async (event: any, type: string) => {
  const files = event.target.files

  // 如果按下取消按鈕，則恢復原始圖片
  if (files.length === 0) {
    commentImages.value = originalCommentImages.value
    return
  }

  // 限制圖片張數
  if (files.length > 5) {
    alert('最多上傳五張圖片')
    return
  }

  showLoading()
  originalCommentImages.value = commentImages.value.slice()

  // 清空 commentImages
  commentImages.value = []

  try {
    const uploadPromises = []
    for (let i = 0; i < files.length; i++) {
      const formData: any = new FormData()
      formData.append('file', files[i])

      const uploadPromise = uploadStore
        .uploadSingleImage(formData)
        .then((res: any) => {
          commentImages.value.push(res.data.data.imgUrl)
        })
        .catch((err: any) => {
          showToast(files[i].name + ' 上傳失敗')
        })

      uploadPromises.push(uploadPromise)
    }

    await Promise.all(uploadPromises)
    showToast('圖片上傳成功')
  } catch (err) {
    showToast('圖片上傳失敗')
  }
  hideLoading()
}

// 新增評論
const createComment = async () => {
  if (rating.value === 0) {
    showToast('請選擇評分')
    return
  }

  if (tags.value.length === 0) {
    showToast('請選擇分享類型')
    return
  }

  showLoading()

  try {
    let postData = {
      courseId: courseId.value,
      orderId: orderId,
      content: content.value,
      tags: tags.value,
      images: commentImages.value,
      rating: rating.value
    }
    const res = await courseStore.addComment(postData)
    const result = res.data
    if (result.statusCode === 200) {
      showToast('心得分享成功')
      setTimeout(() => {
        hideLoading()
        router.push({ name: 'index-index-member-order-id', params: { orderId } })
      }, 1000)
    }
  } catch (err) {
    showToast('心得分享失敗')
    hideLoading()
  }
}

onMounted(async () => {
  await fetchOrder()
})
</script>
<template>
  <div class="bg-gray1 py-5 lg:px-[100px]">
    <div class="mx-auto px-5 py-9 lg:max-w-screen-xl">
      <FrontBreadcrumb class="mb-8" :breadcrumb="breadcrumb"></FrontBreadcrumb>
      <div class="max-w-[817px]">
        <h2 class="mb-3 mt-3 text-4xl font-medium lg:text-3xl">課後心得分享</h2>
        <p class="mb-8">
          恭喜你完成課程，試著將完課的體驗心得分享給其他也有興趣的朋友們，也可累積點數享優惠喔!
        </p>
        <div
          class="mb-8 flex items-center space-x-6 rounded border-[1px] border-solid border-gray3 bg-white p-3"
          v-if="!isLoading"
        >
          <div class="group aspect-square max-w-32 overflow-hidden rounded bg-gray2">
            <NuxtLink :to="{ name: 'index-index-course-id', params: { id: courseId } }">
              <img
                alt="course-img"
                :src="courseImage"
                class="h-full w-full object-cover transition duration-500 group-hover:opacity-50 group-hover:transition-opacity"
              />
            </NuxtLink>
          </div>
          <div class="space-y-2">
            <NuxtLink
              :to="{ name: 'index-index-course-id', params: { id: courseId } }"
              class="block transition duration-500 hover:opacity-50 hover:transition-opacity"
            >
              <h3 class="line-clamp-1 text-lg font-medium">
                {{ order.courseName }}
              </h3>
            </NuxtLink>
            <NuxtLink
              :to="{ name: 'index-index-vendor-id', params: { id: vendorId } }"
              class="block transition duration-500 hover:opacity-50 hover:transition-opacity"
            >
              <div class="text-sm leading-[22px]">{{ order.brandName }}</div>
            </NuxtLink>
          </div>
        </div>

        <!-- 課程 skeleton -->
        <div
          class="mb-8 flex items-center space-x-6 rounded border-[1px] border-solid border-gray3 bg-gray2 p-3"
          v-if="isLoading"
        >
          <div class="aspect-square overflow-hidden rounded">
            <div class="h-32 w-32 rounded bg-gray3 object-cover"></div>
          </div>
          <div class="space-y-2">
            <div class="line-clamp-1 bg-gray3 text-lg text-transparent">
              --- 課程名稱 placeholder ---
            </div>
            <div class="bg-gray3 text-sm text-transparent">品牌名稱</div>
          </div>
        </div>

        <div class="mb-5">
          <label for="rating" class="mb-2">為整個課程體驗打個分數 </label>
          <div class="flex items-center space-x-1 py-3 text-4xl">
            <Icon
              v-for="index in 5"
              :key="index"
              :name="index <= rating ? 'ph:star-fill' : 'ph:star'"
              class="cursor-pointer text-primary"
              @click="setRating(index)"
            />
          </div>
        </div>
        <div class="mb-5">
          <label for="rating" class="mb-2">分享類型(可多選)* </label>
          <div class="flex space-x-5">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="interaction"
                name="師生互動"
                value="師生互動"
                v-model="tags"
              />
              <label for="craft">師生互動</label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="environment"
                name="教學環境"
                value="教學環境"
                v-model="tags"
              />
              <label for="cooking">教學環境</label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="professional"
                name="專業度"
                value="專業度"
                v-model="tags"
              />
              <label for="art">專業度</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="other" name="其他" value="其他" v-model="tags" />
              <label for="lifestyle">其他</label>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <label for="rating" class="">心得分享* </label>
          <p>您分享的評論將會以匿名方式顯示。</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="w-full rounded-[4px] border-[1px] border-solid border-text-primary p-5"
            placeholder="請填寫不超過500字"
            v-model="content"
            @input="checkContentLength"
          ></textarea>
        </div>
        <div class="mb-8 space-y-2">
          <label for="rating" class="">心得分享* </label>
          <p class="text-sm leading-[22px]">
            照片勿後製上 logo、文字；請勿過度使用濾鏡、合成圖片或讓商品失焦。請提供解析度 72dpi
            以上的 JPG 或 PNG 圖檔，不符合規格的圖檔將無法上傳。 <br />
            (請一次選取所需照片，數量最多五張)
          </p>
          <div class="flex flex-wrap gap-2">
            <div
              class="block aspect-square max-w-24 overflow-hidden rounded bg-gray2 md:max-w-24"
              v-for="(imageUrl, index) in commentImages"
              :key="index"
            >
              <img
                :src="imageUrl"
                alt="course-img"
                class="h-full w-full object-cover transition duration-300 hover:opacity-50 hover:transition-opacity"
              />
            </div>
          </div>
          <input
            class="hidden"
            type="file"
            id="fileInput"
            name="files[]"
            multiple
            ref="fileInput"
            accept="image/*"
            @change="handleFileUpload($event, 'photo')"
          />
          <button
            class="block rounded border-[1px] border-solid border-primary bg-white px-6 py-2 text-center transition hover:border-primary hover:bg-primary hover:text-white"
            @click="clickFileInput"
          >
            上傳照片
          </button>
        </div>
        <button
          class="flex items-center justify-center rounded border-[1px] border-solid border-primary bg-primary px-6 py-2 text-center text-white transition hover:border-primary hover:bg-primary-light"
          @click="createComment"
        >
          <Icon name="ph:paper-plane-right" class="mr-2 text-white" />
          送出
        </button>
      </div>
    </div>
  </div>
</template>

<style>
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
