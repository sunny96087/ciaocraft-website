<script setup lang="ts">
import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()
const route = useRoute()
const router = useRouter()

// 使用 ref 選取 dom 元素
import { ref } from 'vue'

// 定義 isBookingVisible 為布林類型的 ref
// 使用 ref 管理元件顯示狀態
const isBookingVisible = ref(false)

// 定義 toggleBooking 函數，其返回類型為 void
// 切換預定選單顯示狀態
const toggleBookingVisible = (): void => {
  isBookingVisible.value = !isBookingVisible.value
}

// 子層按了"取消預定"，要將 isBookingVisible 恢復預設
const handleBookingCancel = () => {
  isBookingVisible.value = false
}

const handleBookingSubmitted = () => {
  isBookingVisible.value = false
}

// 單一課程
const courseId = ref()
const courseInfo: any = ref({})

onMounted(async () => {
  // 恢復 courseStore 單一課程資料內容預設
  courseStore.resetoneCourseData()

  // 從網址取得參數
  courseId.value = route.params.id
  // console.log(courseId)
  getOneCourse()
})

// 取得單一課程資料
async function getOneCourse() {
  try {
    showLoading()

    let data = {
      courseId: courseId.value
    }
    const res = await courseStore.apiGetOneCourse(data)
    const result = res.data
    // console.log(result)
    // 將資料寫入 courseStore
    courseStore.oneCourseData[0].id = result.data._id
    courseStore.oneCourseData[0].courseTerm = result.data.courseTerm
    courseStore.oneCourseData[0].courseImage = result.data.courseImage
    courseStore.oneCourseData[0].courseName = result.data.courseName
    courseStore.oneCourseData[0].courseAvgRating = result.data.courseAvgRating
    courseStore.oneCourseData[0].courseCommentsCount = result.data.courseCommentsCount
    courseStore.oneCourseData[0].coursePrice = result.data.coursePrice
    courseStore.oneCourseData[0].courseSummary = result.data.courseSummary
    courseStore.oneCourseData[0].courseTotalHours = result.data.courseTotalHours
    courseStore.oneCourseData[0].courseAddress = result.data.courseAddress
    courseStore.oneCourseData[0].courseCapacity = result.data.courseCapacity
    courseStore.oneCourseData[0].teacherId = result.data.teacherId
    courseStore.oneCourseData[0].vendorId = result.data.vendorId
    courseStore.oneCourseData[0].vendorAvgRating = result.data.vendorAvgRating
    courseStore.oneCourseData[0].vendorCommentsCount = result.data.vendorCommentsCount
    courseStore.oneCourseData[0].courseSuitableFor = result.data.courseSuitableFor
    courseStore.oneCourseData[0].courseSkillsLearned = result.data.courseSkillsLearned
    courseStore.oneCourseData[0].courseContent = result.data.courseContent
    courseStore.oneCourseData[0].courseNotice = result.data.courseNotice
    courseStore.oneCourseData[0].courseItemId = result.data.courseItemId

    // console.log(courseStore.oneCourseData)

    request(result)
  } catch (e) {
    showToast('發生錯誤，請聯繫客服人員', 'error')
    console.log(e)
  } finally {
    hideLoading()
  }
}

function request(result: { statusCode: number; data: any }) {
  if (result.statusCode === 200) {
    courseInfo.value = result.data
    // console.log(`courseInfo = ${JSON.stringify(courseInfo.value)}`)
  } else {
    showToast('發生錯誤，請聯繫客服人員', 'error')
    console.log('取得單一課程失敗')
  }
}

const clickToSearch = (courseTerm: string, courseType: string) => {
  courseStore.courseData.courseTerm = courseTerm
  courseStore.courseData.courseType = courseType
  router.push({ path: '/search', query: { courseTerm: courseTerm, courseType: courseType } })
}

// 點擊預約課程鈕後滑動到預約區塊
const scrollToBookingSection = async () => {
  await nextTick()
  const element = document.getElementById('booking-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="mx-[20px] pt-14 lg:mx-[100px]">
    <nav class="mb-5 flex items-center">
      <button class="py-[3px] text-gray" @click="clickToSearch('全部', '全部')">
        <span class="mr-2.5">所有課程</span>
      </button>
      <Icon name="ph:caret-right" class="mr-2.5 text-2xl" />
      <button
        class="py-[3px] text-gray"
        @click="clickToSearch(`${courseStore.oneCourseData[0].courseTerm}`, '全部')"
      >
        <span class="mr-2.5 py-[3px]">{{
          courseStore.oneCourseData[0].courseTerm === 0 ? '單堂體驗' : '專業培訓'
        }}</span>
      </button>
      <Icon name="ph:caret-right" class="mr-2.5 text-2xl" />
      <div class="py-[3px]">
        <span class="py-[3px]">{{ courseStore.oneCourseData[0].courseName }}</span>
      </div>
    </nav>
    <section class="mb-[60px] justify-between lg:mb-[30px] lg:flex">
      <front-photo-carousel class="mb-[60px] lg:mb-0" />
      <front-course-title
        @toggleBooking="toggleBookingVisible"
        @scrollBooking="scrollToBookingSection"
      />
    </section>
    <section class="mb-[30px]" v-if="isBookingVisible">
      <front-course-booking
        @bookingReset="handleBookingCancel"
        @bookingSubmitted="handleBookingSubmitted"
        ref="bookingSection"
      />
    </section>
    <section class="mb-[30px]">
      <front-course-info />
    </section>
    <article class="mb-[30px]">
      <front-course-detail />
    </article>
    <article class="mb-[30px]">
      <front-course-comments />
    </article>
    <div class="pb-9">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
        其他相似的課程
      </h4>
      <front-product-card class="mb-5" />
      <!-- <div class="mt-10 flex justify-center">
        <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
          更多課程
        </button>
      </div> -->
    </div>
  </div>
</template>
