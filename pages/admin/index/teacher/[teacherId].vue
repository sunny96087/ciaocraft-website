<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const router = useRouter()
const route = useRoute()

const teacherId = route.params.teacherId

const teacher: any = ref({})
const courseTerm0Count = ref(0)
const courseTerm1Count = ref(0)

onMounted(() => {
  getTeacherData()
})

// * 取得單一老師 (Back)
async function getTeacherData() {
  try {
    showLoading()
    let data = {
      teacherId: teacherId
    }

    const res = await store.apiGetAdminTeacher(data)
    const result = res.data
    console.log(`getTeacherData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      teacher.value = result.data
      console.log(`teacher = ${JSON.stringify(teacher.value)}`)

      // 計算 courseTerm 為 0 和 1 的數量，並且 courseStatus 為 1
      let courseTermCounts = { 0: 0, 1: 0 }

      if (teacher.value.courseId && Array.isArray(teacher.value.courseId)) {
        courseTermCounts = teacher.value.courseId.reduce(
          (counts: number[], course: { courseTerm: number; courseStatus: number }) => {
            if (course.courseStatus !== 1) {
              return counts
            }

            if (course.courseTerm === 0) {
              counts[0]++
            } else if (course.courseTerm === 1) {
              counts[1]++
            }
            return counts
          },
          { 0: 0, 1: 0 }
        )
      }

      // 將計算結果存儲到 ref 中
      courseTerm0Count.value = courseTermCounts[0]
      courseTerm1Count.value = courseTermCounts[1]
    } else {
      console.log('取得老師資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="" v-if="teacher">
    <!-- >> component: 麵包屑 Breadcrumbs -->
    <div class="admin-breadcrumbs">
      <nuxt-link to="/admin/teacher">師資管理</nuxt-link>
      <Icon name="material-symbols-light:arrow-forward-ios-rounded" size="16" class=""></Icon>
      <span class="text-dark1">{{ teacher.name }}</span>
    </div>

    <!-- * title -->
    <div class="admin-page-title">師資詳情</div>

    <!-- * Info -->
    <div class="admin-block flex gap-8 p-10">
      <!-- ? photo -->
      <div class="h-[100px] w-[100px] rounded-full bg-gray">
        <img v-if="teacher.photo" :src="teacher.photo" alt="" class="pic-auto" />
        <div v-else class="text-center leading-[100px]">{{ teacher.name }}</div>
      </div>

      <!-- ? Info -->
      <div class="flex grow flex-col gap-2">
        <div class="font-medium">{{ teacher.name }}</div>
        <div class="flex gap-6 text-[14px]">
          <p>體驗課：{{ courseTerm0Count }}</p>
          <p>培訓課：{{ courseTerm1Count }}</p>
        </div>
        <div v-if="teacher.description" class="">{{ teacher.description }}</div>
        <div v-else class="text-[14px] text-gray">該老師目前沒有介紹</div>
      </div>

      <!-- ? edit btn -->
      <nuxt-link to="/admin/teacher/edit" class="btn-orange-outline shrink-0 self-start"
        >編輯</nuxt-link
      >
    </div>

    <!-- * total -->
    <!-- note 暫時只計算課程總堂數 -->
    <div class="my-7 font-medium">{{ courseTerm0Count + courseTerm1Count }} 堂課</div>

    <!-- * couser -->
    <!-- note 暫時移除結束時間 -->
    <div class="table-block" v-if="teacher.courseId && teacher.courseId.length">
      <!-- header -->
      <div class="table-header w-[1200px] grid-cols-10">
        <div class="col-span-2">課程編號</div>
        <div class="col-span-3">課程名稱</div>
        <div class="col-span-1">課程時長</div>
        <div class="col-span-1">金額</div>
        <div class="col-span-2">建立時間</div>
        <!-- <div class="col-span-2">結束時間</div> -->
        <div class="col-span-1">課程狀態</div>
      </div>

      <!-- body -->
      <div class="table-body w-[1200px] grid-cols-10" v-for="item in teacher.courseId">
        <div class="col-span-2">{{ item._id }}</div>
        <div class="col-span-3">{{ item.courseName }}</div>
        <div class="col-span-1">{{ item.courseTotalHours }}</div>
        <div class="col-span-1">${{ item.coursePrice }}</div>
        <div class="col-span-2">{{ item.createdAt }}</div>
        <!-- <div class="col-span-2">{{ item._id }}</div> -->
        <div class="col-span-1">{{ item.courseStatus === 1 ? '上架中' : '下架' }}</div>
      </div>
    </div>

    <div v-else class="text-[14px] text-gray">暫時沒有課程</div>
  </div>
</template>
<style scoped></style>
