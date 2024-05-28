<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const teacherInfo: any = ref({})

const currentOrder = ref('') // ORDER_DESC
const currentCreatedAt = ref('') // CREATED_AT_ASC
const currentKeyword = ref('') // 搜尋關鍵字, 查詢姓名欄位
const currentCourseTerm = ref('-1') // 課程時長類型, 0: 單堂體驗 1:培訓課程

onMounted(() => {
  getTeachersData()
})

watch(currentCourseTerm, () => {
  getTeachersData()
})

// 取得所有老師 (Back)
async function getTeachersData() {
  try {
    showLoading()

    let data = {
      // page: 1,
      // limit: 10,
      order: currentOrder.value,
      createdAt: currentCreatedAt.value,
      keyword: currentKeyword.value,
      courseTerm: currentCourseTerm.value === '-1' ? '' : Number(currentCourseTerm.value)
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

function toggleOrder() {
  currentOrder.value = currentOrder.value === '' ? 'ORDER_DESC' : ''

  getTeachersData()
}

// function toggleCreatedAt() {
//   currentCreatedAt.value = currentCreatedAt.value === '' ? 'CREATED_AT_ASC' : ''

//   getTeachersData()
// }
</script>
<template>
  <div v-if="teacherInfo" class="h-full w-full overflow-hidden">
    <div class="admin-page-title">師資管理</div>

    <!-- * search -->
    <div
      class="mb-7 flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="flex w-full flex-col gap-3 lg:flex-row">
        <select v-model="currentCourseTerm" class="admin-select w-[180px] max-w-[180px] shrink-0">
          <option value="-1">全部</option>
          <option value="0">單堂體驗</option>
          <option value="1">培訓課程</option>
        </select>

        <div class="admin-select flex w-[360px] max-w-[360px] shrink-0">
          <input type="text" class="w-full" v-model="currentKeyword" placeholder="老師名稱" />
          <button class="" @click="getTeachersData">
            <Icon name="fluent:search-48-filled" size="24" class="text-dark3"></Icon>
          </button>
        </div>
      </div>

      <nuxt-link to="/admin/teacher/add" class="btn-orange btn-orange-icon mt-3 shrink-0 lg:mt-0">
        <Icon name="ic:round-add" size="24" class=""></Icon>
        新增老師
      </nuxt-link>
    </div>

    <!-- * table -->
    <div class="table-block" v-if="teacherInfo.length > 0">
      <!-- header -->
      <div class="table-header w-[1200px] grid-cols-11">
        <div @click="toggleOrder" class="table-th-icon col-span-1">
          排序
          <Icon name="fluent:arrow-sort-20-filled" size="20"></Icon>
        </div>
        <div class="col-span-1">老師姓名</div>
        <div class="col-span-3">基本介紹</div>
        <div class="col-span-3">建立時間</div>
        <!-- <div @click="toggleCreatedAt" class="table-th-icon col-span-3">
          建立時間<Icon name="fluent:arrow-sort-20-filled" size="20"></Icon>
        </div> -->
        <div class="col-span-1">課程類型</div>
        <div class="col-span-1">授課狀態</div>
        <div class="col-span-1">操作</div>
      </div>
      <!-- body -->
      <div class="table-body w-[1200px] grid-cols-11" v-for="item in teacherInfo">
        <div class="col-span-1">{{ item.order }}</div>
        <div class="col-span-1">{{ item.name }}</div>
        <div class="col-span-3">{{ item.description }}</div>
        <div class="col-span-3">{{ item.createdAt }}</div>
        <div class="col-span-1">
          <div v-for="courseId in item.courseId" :key="courseId">
            <div v-if="courseId.courseTerm === 0">體驗課</div>
            <div v-if="courseId.courseTerm === 1">培訓課</div>
          </div>
        </div>
        <div class="col-span-1">
          <div v-if="item.courseId && item.courseId.length">
            進行中： {{ item.courseId.filter((course: any) => course.courseStatus === 1).length }}
          </div>
        </div>
        <div class="col-span-1 flex items-start gap-2">
          <nuxt-link :to="{ path: '/admin/teacher/edit', query: { id: item._id } }">
            <Icon name="ic:round-edit-note" size="24" class="text-dark3"></Icon>
          </nuxt-link>
          <button>
            <Icon name="solar:trash-bin-trash-outline" size="24" class="text-danger"></Icon>
          </button>
        </div>
      </div>
    </div>

    <!-- no data -->
    <admin-no-data v-else />
  </div>
</template>
<style scoped></style>
