<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const courseInfo: any = ref({})

const currentStartDate = ref('') // 新到舊 (預設)、asc: 舊到新
const currentCourseTerm = ref('-1') // 課程時長類型, 0: 單堂體驗 1:培訓課程
const currentCourseStatus = ref('-1') // 課程時長類型, 0: 下架, 1: 上架, 2: 刪除
const currentKeyword = ref('') // 搜尋關鍵字, 查詢課程名稱 || 老師名稱

onMounted(() => {
  getCoursesData()
})

watch(currentCourseTerm, () => {
  getCoursesData()
})

watch(currentCourseStatus, () => {
  getCoursesData()
})

// 取得所有課程 (Back)
async function getCoursesData() {
  try {
    showLoading()

    let data = {
      // page: 1,
      // limit: 10,
      startDate: currentStartDate.value,
      courseTerm: currentCourseTerm.value === '-1' ? '' : Number(currentCourseTerm.value),
      courseStatus: currentCourseStatus.value === '-1' ? '' : Number(currentCourseStatus.value),
      keyword: currentKeyword.value
    }

    const res = await store.apiGetAdminCourses(data)
    const result = res.data
    console.log(`getCoursesData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      courseInfo.value = result.data
      console.log(`courseInfo = ${JSON.stringify(courseInfo.value)}`)
    } else {
      console.log('取得課程資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 更換起始日期排序
function toggleStartDate() {
  currentStartDate.value = currentStartDate.value === '' ? 'asc' : ''

  getCoursesData()
}

// NOTE 刪除課程 (偽刪除) (Back)
async function deleteCourse(courseId: string) {
  const confirmed = await openDialog('注意', '刪除後不可復原，確定要刪除嗎？')
  if (!confirmed) {
    return
  }

  try {
    showLoading()
    let data = {
      courseId: courseId
    }
    const res = await store.apiDeactivateCourse(data)
    const result = res.data
    console.log(`deleteCourse result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('刪除課程成功')
      getCoursesData()
    } else {
      showToast('刪除課程失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div v-if="courseInfo" class="h-full w-full overflow-hidden">
    <div class="admin-page-title">課程管理</div>

    <!-- * tab -->
    <div class="admin-tab">
      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentCourseStatus === '-1' }"
        @click="currentCourseStatus = '-1'"
      >
        全部
      </div>
      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentCourseStatus === '1' }"
        @click="currentCourseStatus = '1'"
      >
        已上架
      </div>
      <div
        class="admin-tab-item"
        :class="{ 'admin-tab-item-active': currentCourseStatus === '0' }"
        @click="currentCourseStatus = '0'"
      >
        已下架
      </div>
      <div class="line-b"></div>
    </div>

    <!-- * search -->
    <div
      class="mb-7 flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="flex w-full flex-col gap-3 lg:flex-row">
        <select v-model="currentCourseTerm" class="admin-select w-[180px] max-w-[180px] shrink-0">
          <option value="-1">全部</option>
          <option value="0">體驗課</option>
          <option value="1">培訓課</option>
        </select>

        <div class="admin-select flex w-[360px] max-w-[360px] shrink-0">
          <input type="text" class="w-full" v-model="currentKeyword" placeholder="課程名稱/老師" />
          <button class="" @click="getCoursesData">
            <Icon name="fluent:search-48-filled" size="24" class="text-dark3"></Icon>
          </button>
        </div>
      </div>

      <nuxt-link to="/admin/course/add" class="btn-orange btn-orange-icon mt-3 shrink-0 lg:mt-0">
        <Icon name="ic:round-add" size="24" class=""></Icon>
        新增課程
      </nuxt-link>
    </div>

    <!-- * table -->
    <div class="table-block" v-if="courseInfo.length > 0">
      <!-- header -->
      <div class="table-header min-w-[1400px] grid-cols-12">
        <div class="col-span-1">排序</div>
        <div class="col-span-3">課程名稱</div>
        <div class="col-span-1">課程類型</div>
        <div class="col-span-1">授課老師</div>
        <div class="col-span-1">課程狀態</div>
        <div @click="toggleStartDate" class="table-th-icon col-span-2">
          開課時間<Icon name="fluent:arrow-sort-20-filled" size="20"></Icon>
        </div>
        <div class="col-span-2">結束時間</div>
        <div class="col-span-1">操作</div>
      </div>
      <!-- body -->
      <div class="table-body min-w-[1400px] grid-cols-12" v-for="(item, i) in courseInfo">
        <div class="col-span-1">{{ i + 1 }}</div>
        <div class="col-span-3">{{ item.courseName }}</div>
        <div class="col-span-1">{{ item.courseTerm === 0 ? '體驗課' : '培訓課' }}</div>
        <div class="col-span-1">{{ item.teacherId.name }}</div>
        <div class="col-span-1">{{ item.courseStatus === 0 ? '下架' : '上架' }}</div>
        <div class="col-span-2">{{ item.earliestStartTime }}</div>
        <div class="col-span-2">{{ item.latestEndTime }}</div>
        <div class="col-span-1 flex items-start gap-2">
          <nuxt-link :to="{ path: '/admin/course/edit', query: { id: item._id } }">
            <Icon name="ic:round-edit-note" size="24" class="text-dark3"></Icon>
          </nuxt-link>
          <button @click="deleteCourse(item._id)">
            <Icon name="solar:trash-bin-trash-outline" size="24" class="text-danger"></Icon>
          </button>
        </div>
      </div>
    </div>

    <!-- no data -->
    <admin-no-data v-else />
  </div>
</template>
<style scoped>
.admin-tab {
  @apply relative mb-7 flex gap-8;
}
.admin-tab-item {
  @apply z-10 cursor-pointer border-b-2 border-[#C7C6C6] pb-5 text-gray;
}

.admin-tab-item-active {
  @apply border-dark1 text-text-primary;
}

.line-b {
  @apply absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7C6C6];
}
</style>
