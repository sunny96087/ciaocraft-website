<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'
const router = useRouter()

const teacherInfo: any = ref({})
onMounted(() => {
  getTeachersData()
})

// 取得所有老師 (Back)
async function getTeachersData() {
  try {
    showLoading()

    let data = {
      // page: 1,
      // limit: 10,
      order: '',
      createdAt: '',
      keyword: '',
      courseTerm: ''
    }

    const res = await store.apiGetAdminTeachers(data)
    const result = res.data
    console.log(`getTeachersData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      teacherInfo.value = result.data
      console.log(`teacherInfo = ${JSON.stringify(teacherInfo.value)}`)
    } else {
      console.log('取得使用者資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

const courseInfo: any = ref({
  teacherId: '',
  courseItems: [
    // {
    //   startTime: '',
    //   endTime: '',
    //   itemName: ''
    // }
  ],
  courseType: [], // 工藝手作、烹飪烘焙、藝術人文、生活品味
  courseTerm: 0, // 0: 單堂體驗 1:培訓課程
  courseName: '',
  coursePrice: 0,
  courseStatus: 0, // 0: 下架, 1: 上架
  courseCapacity: 0,
  courseSummary: '',
  courseAddress: '',
  courseRemark: '',
  courseImage: [],
  courseContent: '',
  courseNotice: '',
  courseSuitableFor: '',
  courseSkillsLearned: '',
  courseTotalHours: 0
})

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

  let totalFiles = courseInfo.value.courseImage.length + files.length

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
            courseInfo.value.courseImage.push(imgUrl)
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
  courseInfo.value.courseImage.splice(index, 1)
}

// NOTE tooltip
const tooltip1 = ref(false)

// NOTE 新增課程 (Back)
async function addCourse(courseStatus: number) {
  // if (
  //   courseInfo.value.name === '' ||
  //   courseInfo.value.description === '' ||
  //   courseInfo.value.intro === '' ||
  //   courseInfo.value.order <= 0
  // ) {
  //   showToast('請填寫完整資料')
  //   return
  // }
  if (
    courseInfo.value.courseName === '' ||
    courseInfo.value.courseSummary === '' ||
    courseInfo.value.courseType.length === 0 ||
    courseInfo.value.courseItems.length === 0 ||
    courseInfo.value.courseSuitableFor === '' ||
    courseInfo.value.courseSkillsLearned === '' ||
    courseInfo.value.courseContent === '' ||
    courseInfo.value.courseNotice === '' ||
    courseInfo.value.courseTotalHours === 0 ||
    courseInfo.value.courseAddress === '' ||
    courseInfo.value.courseCapacity === 0 ||
    courseInfo.value.coursePrice === 0 ||
    courseInfo.value.courseImage.length === 0 ||
    courseInfo.value.teacherId === ''
  ) {
    showToast('請填寫完整資料')
    return
  }

  try {
    showLoading()

    let data = {
      teacherId: courseInfo.value.teacherId,
      courseItems: courseInfo.value.courseItems,
      courseType: courseInfo.value.courseType,
      courseTerm: Number(courseInfo.value.courseTerm),
      courseName: courseInfo.value.courseName,
      coursePrice: Number(courseInfo.value.coursePrice),
      courseStatus: courseStatus,
      courseCapacity: Number(courseInfo.value.courseCapacity),
      courseSummary: courseInfo.value.courseSummary,
      courseAddress: courseInfo.value.courseAddress,
      courseRemark: courseInfo.value.courseRemark,
      courseImage: courseInfo.value.courseImage,
      courseContent: courseInfo.value.courseContent,
      courseNotice: courseInfo.value.courseNotice,
      courseSuitableFor: courseInfo.value.courseSuitableFor,
      courseSkillsLearned: courseInfo.value.courseSkillsLearned,
      courseTotalHours: Number(courseInfo.value.courseTotalHours)
    }

    const res = await store.apiAddCourse(data)
    const result = res.data
    console.log(`editVendorData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      console.log('新增課程成功')

      // 提示成功
      showToast('新增課程成功')

      // 清空表單
      courseInfo.value = {
        teacherId: '',
        courseItems: [
          // {
          //   startTime: '',
          //   endTime: '',
          //   itemName: ''
          // }
        ],
        courseType: [], // 工藝手作、烹飪烘焙、藝術人文、生活品味
        courseTerm: 0, // 0: 單堂體驗 1:培訓課程
        courseName: '',
        coursePrice: 0,
        courseStatus: 0, // 0: 下架, 1: 上架
        courseCapacity: 0,
        courseSummary: '',
        courseAddress: '',
        courseRemark: '',
        courseImage: [],
        courseContent: '',
        courseNotice: '',
        courseSuitableFor: '',
        courseSkillsLearned: '',
        courseTotalHours: 0
      }

      // 返回列表
      router.push('/admin/course')
    } else {
      console.log('新增課程失敗')
      showToast('新增課程失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// NOTE 課程項目
const itemsChoose = ref('0')

const newItem = ref({
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  itemText: '',
  itemName: ''
})

const addItem = () => {
  if (
    itemsChoose.value === '0' &&
    (newItem.value.startDate === '' ||
      newItem.value.endDate === '' ||
      newItem.value.startTime === '' ||
      newItem.value.endTime === '')
  ) {
    showToast('請填寫開始/結束日期、開始/結束時間')
    return
  } else if (
    itemsChoose.value === '1' &&
    (newItem.value.startDate === '' ||
      newItem.value.endDate === '' ||
      newItem.value.itemText === '')
  ) {
    showToast('請填寫開始/結束日期、自訂文字')
    return
  }

  let dateRange =
    newItem.value.startDate === newItem.value.endDate
      ? newItem.value.startDate
      : `${newItem.value.startDate} ~ ${newItem.value.endDate}`

  if (itemsChoose.value === '0') {
    newItem.value.itemName = `${dateRange} ${newItem.value.startTime} ~ ${newItem.value.endTime}`
  } else if (itemsChoose.value === '1') {
    newItem.value.itemName = `${dateRange} ${newItem.value.itemText}`
  }
  const item = {
    startTime: newItem.value.startDate,
    endTime: newItem.value.endDate,
    itemName: newItem.value.itemName
    // 其他欄位...
  }

  courseInfo.value.courseItems.push(item)
  newItem.value = {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    itemText: '',
    itemName: ''
  }
}

const removeItem = (index: number) => {
  courseInfo.value.courseItems.splice(index, 1)
}

watch(itemsChoose, () => {
  newItem.value.startTime = ''
  newItem.value.endTime = ''
  newItem.value.itemText = ''
})
</script>
<template>
  <div class="">
    <!-- >> component: 麵包屑 Breadcrumbs -->
    <div class="admin-breadcrumbs">
      <nuxt-link to="/admin/course">課程管理</nuxt-link>
      <Icon name="material-symbols-light:arrow-forward-ios-rounded" size="16" class=""></Icon>
      <span class="text-dark1">新增課程</span>
    </div>

    <!-- * title -->
    <div class="admin-page-title">新增課程</div>

    <!-- * page-block -->
    <div class="admin-page-block-with-header">
      <!-- header -->
      <div class="bg-primary p-[10px] font-medium text-white">主要內容</div>

      <div class="admin-page-block flex flex-col gap-6">
        <!-- 課程類型 -->
        <div class="row-input">
          <div class="row-input-title">課程類型</div>
          <div class="admin-radio-row">
            <label class="admin-radio-row-label">
              <input type="radio" value="0" v-model="courseInfo.courseTerm" />單堂體驗
            </label>
            <label class="admin-radio-row-label">
              <input type="radio" value="1" v-model="courseInfo.courseTerm" />培訓課程
            </label>
          </div>
        </div>

        <!-- ? 課程名稱 -->
        <div class="row-input">
          <div class="row-input-title">課程名稱</div>
          <div class="w-full">
            <input
              class="admin-input"
              type="text"
              placeholder="請輸入課程名稱"
              v-model="courseInfo.courseName"
              :class="{ 'admin-input-error': courseInfo.courseName === '' }"
            />
            <div v-if="courseInfo.courseName === ''" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 課程簡述 -->
        <div class="row-input">
          <div class="row-input-title-area">課程簡述</div>
          <div class="w-full">
            <textarea
              class="admin-input min-h-[200px]"
              type="tel"
              placeholder="請輸入課程簡述"
              v-model="courseInfo.courseSummary"
              :class="{ 'admin-input-error': courseInfo.courseSummary === '' }"
            ></textarea>
            <div v-if="courseInfo.courseSummary === ''" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 課程類別 -->
        <div class="row-input">
          <div class="row-input-title-area">課程類別</div>
          <div class="admin-radio-row">
            <label class="admin-radio-row-label">
              <input type="checkbox" value="工藝手作" v-model="courseInfo.courseType" />工藝手作
            </label>
            <label class="admin-radio-row-label">
              <input type="checkbox" value="烹飪烘焙" v-model="courseInfo.courseType" />烹飪烘焙
            </label>
            <label class="admin-radio-row-label">
              <input type="checkbox" value="藝術人文" v-model="courseInfo.courseType" />藝術人文
            </label>
            <label class="admin-radio-row-label">
              <input type="checkbox" value="生活品味" v-model="courseInfo.courseType" />生活品味
            </label>
          </div>
        </div>

        <!-- ? 課程圖片 -->
        <!-- 隱藏的圖片上傳輸入框 -->
        <input
          type="file"
          @change="handleFileUpload($event, 'photo')"
          ref="fileInput"
          multiple
          style="display: none"
        />

        <div class="row-input">
          <div class="row-input-title-area relative flex items-center text-nowrap">
            課程圖片
            <Icon
              name="ph:question-light"
              size="20"
              class="shrink-0 cursor-help"
              @click="tooltip1 = !tooltip1"
            />

            <!-- hover 提示 -->
            <div class="tooltip" v-if="tooltip1">
              <div class="p-5 pb-10">
                &nbsp;·&nbsp;第一張照片為封面照
                <br />&nbsp;·&nbsp;圖片格式為jpg/png圖片，<br />&nbsp;&nbsp;&nbsp;&nbsp;檔案大小不超過
                2Mb
              </div>
            </div>
          </div>

          <!-- 圖片顯示處 -->
          <div class="flex flex-wrap gap-[10px]">
            <div
              v-for="(image, index) in courseInfo.courseImage"
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
              v-if="courseInfo.courseImage.length < 5"
              @click="triggerFileUpload"
              class="h-[128px] w-[128px] cursor-pointer rounded border border-dashed border-gray px-3 py-[26px] text-dark3"
            >
              <div class="flex flex-col items-center justify-center gap-1">
                <Icon name="bi:images" size="48" />
                <div>新增圖片({{ courseInfo.courseImage.length }}/5)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ? 課程場次 -->
        <div class="row-input">
          <div class="row-input-title-area">課程場次</div>

          <div class="flex flex-col">
            <!-- 新增場次 -->
            <div class="flex w-full gap-2">
              <input
                type="date"
                v-model="newItem.startDate"
                class="admin-input"
                placeholder="請輸入開始時間"
              />
              <input
                type="date"
                v-model="newItem.endDate"
                class="admin-input"
                placeholder="請輸入結束時間"
              />
              <select name="type" v-model="itemsChoose" class="admin-input">
                <option value="0">時段</option>
                <option value="1">文字</option>
              </select>
              <div class="flex items-center gap-2" v-if="itemsChoose === '0'">
                <input type="time" class="admin-input" v-model="newItem.startTime" />
                <span>至</span>
                <input type="time" class="admin-input" v-model="newItem.endTime" />
              </div>
              <input
                v-else
                type="text"
                v-model="newItem.itemText"
                class="admin-input"
                placeholder="請輸入自訂文字"
              />
              <button @click="addItem" class="btn-orange-outline shrink-0">新增場次</button>
            </div>

            <!-- 已新增項目 -->
            <div
              class="mt-3 flex w-full flex-wrap gap-3"
              v-if="courseInfo && courseInfo.courseItems.length"
            >
              <div
                v-for="(item, index) in courseInfo.courseItems"
                :key="index"
                class="flex items-center gap-2 rounded-full border border-gray bg-gray2 px-3 py-2"
              >
                <span>{{ item.itemName }}</span>
                <button @click="removeItem(index)">
                  <Icon name="ic:round-close" size="20" class="text-gray"></Icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ? 適合對象 -->
        <div class="row-input">
          <div class="row-input-title-area">適合對象</div>
          <div class="w-full">
            <textarea
              class="admin-input min-h-[200px]"
              type="tel"
              placeholder="請輸入適合對象"
              v-model="courseInfo.courseSuitableFor"
              :class="{ 'admin-input-error': courseInfo.courseSuitableFor === '' }"
            ></textarea>
            <div v-if="courseInfo.courseSuitableFor === ''" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 你可學到 -->
        <div class="row-input">
          <div class="row-input-title-area">你可學到</div>
          <div class="w-full">
            <textarea
              class="admin-input min-h-[200px]"
              type="tel"
              placeholder="請輸入你可學到"
              v-model="courseInfo.courseSkillsLearned"
              :class="{ 'admin-input-error': courseInfo.courseSkillsLearned === '' }"
            ></textarea>
            <div v-if="courseInfo.courseSkillsLearned === ''" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 課程內容 -->
        <div class="row-input">
          <div class="row-input-title-area">課程內容</div>
          <div class="w-full">
            <textarea
              class="admin-input min-h-[200px]"
              type="tel"
              placeholder="請輸入課程內容"
              v-model="courseInfo.courseContent"
              :class="{ 'admin-input-error': courseInfo.courseContent === '' }"
            ></textarea>
            <div v-if="courseInfo.courseContent === ''" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 注意事項 -->
        <div class="row-input">
          <div class="row-input-title-area">注意事項</div>
          <div class="w-full">
            <textarea
              class="admin-input min-h-[200px]"
              type="tel"
              placeholder="請輸入注意事項"
              v-model="courseInfo.courseNotice"
              :class="{ 'admin-input-error': courseInfo.courseNotice === '' }"
            ></textarea>
            <div v-if="courseInfo.courseNotice === ''" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- * 課程資訊 block -->
    <div class="admin-page-block-with-header mt-7">
      <!-- header -->
      <div class="bg-primary p-[10px] font-medium text-white">課程資訊</div>
      <div class="admin-page-block flex flex-col gap-6">
        <!-- ? 課程時長 -->
        <div class="row-input">
          <div class="row-input-title">課程時長</div>
          <div class="w-full">
            <input
              class="admin-input"
              type="number"
              placeholder="請輸入課程時長"
              v-model="courseInfo.courseTotalHours"
              :class="{ 'admin-input-error': courseInfo.courseTotalHours === 0 }"
            />
            <div v-if="courseInfo.courseTotalHours === 0" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 課程地點 -->
        <div class="row-input">
          <div class="row-input-title">課程地點</div>
          <div class="w-full">
            <input
              class="admin-input"
              type="text"
              placeholder="請輸入課程地點"
              v-model="courseInfo.courseAddress"
              :class="{ 'admin-input-error': courseInfo.courseAddress === '' }"
            />
            <div v-if="courseInfo.courseAddress === ''" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 開課人數 -->
        <div class="row-input">
          <div class="row-input-title">開課人數</div>
          <div class="w-full">
            <input
              class="admin-input"
              type="number"
              placeholder="請輸入開課人數"
              v-model="courseInfo.courseCapacity"
              :class="{ 'admin-input-error': courseInfo.courseCapacity === 0 }"
            />
            <div v-if="courseInfo.courseCapacity === 0" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 課程價格 -->
        <div class="row-input">
          <div class="row-input-title">課程價格</div>
          <div class="w-full">
            <input
              class="admin-input"
              type="number"
              placeholder="請輸入課程價格"
              v-model="courseInfo.coursePrice"
              :class="{ 'admin-input-error': courseInfo.coursePrice === '' }"
            />
            <div v-if="courseInfo.coursePrice === ''" class="admin-input-error-note">
              此欄位不能留空
            </div>
          </div>
        </div>

        <!-- ? 課程師資 -->
        <div class="row-input" v-if="teacherInfo">
          <div class="row-input-title">課程師資</div>
          <div class="w-full">
            <select
              v-model="courseInfo.teacherId"
              class="admin-select w-[180px] max-w-[180px] shrink-0"
            >
              <option value="">請選擇課程師資</option>
              <option v-for="teacher in teacherInfo" :key="teacher._id" :value="teacher._id">
                {{ teacher.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- * btn -->
    <div class="mt-[28px] flex gap-3">
      <button class="btn-orange-outline" @click="addCourse(0)">儲存先不上架</button>
      <button class="btn-orange" @click="addCourse(1)">上架課程</button>
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
