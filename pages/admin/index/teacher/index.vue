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
</script>
<template>
  <div v-if="teacherInfo" class="h-full w-full overflow-hidden">
    <div class="admin-page-title">師資管理</div>

    <!-- search -->
    <div class="">
      <div class="">
        <select v-model="currentCourseTerm">
          <option value="-1">全部</option>
          <option value="0">單堂體驗</option>
          <option value="1">培訓課程</option>
        </select>
      </div>
    </div>

    <!-- table -->
    <div class="table-block" v-if="teacherInfo.length > 0">
      <!-- header -->
      <div class="table-header w-[1200px] grid-cols-11">
        <div class="col-span-1">排序</div>
        <div class="col-span-1">老師姓名</div>
        <div class="col-span-3">基本介紹</div>
        <div class="col-span-3">建立時間</div>
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
        <div class="col-span-1">{{ item.description }}</div>
        <div class="col-span-1">進行中：</div>
        <div class="col-span-1 flex gap-2">
          <button>
            <Icon name="ph:magnifying-glass-plus" size="24" class="text-dark3"></Icon>
          </button>
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
