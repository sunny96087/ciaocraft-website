<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const commentInfo: any = ref({})

const currentStartDate = ref('') // 查詢日期範圍起始日
const currentEndDate = ref('') // 查詢日期範圍終止日
const currentKeyword = ref('') // 搜尋關鍵字, 查詢訂單編號 || 評價內容
const currentTags = ref('-1') // 評論標籤, 可帶入值包含 "師生互動", "教學環境", "專業度", "其他"
const currentSort = ref('createdAtDesc') // 排序方式，建立日期新到舊: createdAtDesc (預設) 、舊到新: createdAtAsc、評分高到低: ratingAsc、評分低到高: ratingDesc'

onMounted(() => {
  getCommentsData()
})

watch(currentTags, () => {
  getCommentsData()
})

watch(currentSort, () => {
  getCommentsData()
})

// 取得所有評論 (Back)
async function getCommentsData() {
  try {
    showLoading()

    let data = {
      // page: 1,
      // limit: 10,
      startDate: currentStartDate.value,
      endDate: currentEndDate.value,
      keyword: currentKeyword.value,
      tags: currentTags.value === '-1' ? '' : currentTags.value,
      sort: currentSort.value
    }

    const res = await store.apiGetAdminComments(data)
    const result = res.data
    console.log(`getCommentsData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      commentInfo.value = result.data
      console.log(`commentInfo = ${JSON.stringify(commentInfo.value)}`)
    } else {
      console.log('取得所有評論資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// function toggleCreatedAt() {
//   currentCreatedAt.value = currentCreatedAt.value === '' ? 'CREATED_AT_ASC' : ''

//   getTeachersData()
// }

// NOTE 查看評價詳細內容
const showModal = ref(false)
const selectedItem: any = ref({})
function openModal(item: any) {
  showModal.value = true
  selectedItem.value = item
}

function closeDialog() {
  showModal.value = false
  selectedItem.value = {}
}
</script>
<template>
  <div v-if="commentInfo" class="h-full w-full overflow-hidden">
    <div class="admin-page-title">評價管理</div>

    <!-- * search -->
    <div class="mb-7 flex w-full flex-col items-start gap-3">
      <div class="flex w-full flex-col gap-3 lg:flex-row">
        <!-- Tags -->
        <select v-model="currentTags" class="admin-select w-full shrink-0 lg:max-w-[180px]">
          <option value="-1">全部類型</option>
          <option value="師生互動">師生互動</option>
          <option value="教學環境">教學環境</option>
          <option value="專業度">專業度</option>
          <option value="其他">其他</option>
        </select>

        <!-- Sort -->
        <select v-model="currentSort" class="admin-select w-full shrink-0 lg:max-w-[180px]">
          <option value="createdAtDesc">建立日期新到舊</option>
          <option value="createdAtAsc">建立日期舊到新</option>
          <option value="ratingAsc">評分高到低</option>
          <option value="ratingDesc">評分低到高</option>
        </select>

        <!-- Keyword -->
        <div class="admin-select flex w-full shrink-0 lg:max-w-[360px]">
          <input
            type="text"
            class="w-full"
            v-model="currentKeyword"
            placeholder="完整訂單編號/評價內容"
          />
          <button class="" @click="getCommentsData">
            <Icon name="fluent:search-48-filled" size="24" class="text-dark3"></Icon>
          </button>
        </div>
      </div>

      <!-- Date -->
      <div class="flex w-full flex-col gap-3 sm:flex-row">
        <input type="date" class="admin-select w-full md:w-[180px]" v-model="currentStartDate" />
        <input type="date" class="admin-select w-full md:w-[180px]" v-model="currentEndDate" />
        <button class="btn-orange-outline shrink-0" @click="getCommentsData">日期查詢</button>
      </div>
    </div>

    <!-- * table -->
    <div class="table-block" v-if="commentInfo.length > 0">
      <!-- header -->
      <div class="table-header min-w-[1500px] grid-cols-12">
        <div class="col-span-2">訂單編號</div>
        <div class="col-span-2">評論編號</div>
        <div class="col-span-1">留言用戶</div>
        <div class="col-span-2">評價內容</div>
        <div class="col-span-1">評分</div>
        <div class="col-span-2">建立時間</div>
        <div class="col-span-1">評論類型</div>
        <div class="col-span-1">操作</div>
      </div>
      <!-- body -->
      <div class="table-body min-w-[1500px] grid-cols-12" v-for="item in commentInfo">
        <div class="col-span-2">{{ item.orderId?._id }}</div>
        <div class="col-span-2">{{ item._id }}</div>
        <div class="col-span-1">
          {{
            item.memberId?.name
              ? item.memberId.name[0] +
                '*'.repeat(item.memberId.name.length - 2) +
                item.memberId.name.slice(-1)
              : ''
          }}
        </div>
        <div class="col-span-2">{{ item.content }}</div>
        <div class="col-span-1 flex items-center gap-1">
          <Icon name="material-symbols:star-rounded" size="20"></Icon>({{ item.rating }})
        </div>
        <div class="col-span-2">{{ item.createdAt }}</div>
        <div class="col-span-1">
          <div v-for="tag in item.tags">{{ tag }}</div>
        </div>
        <div class="col-span-1 flex items-start gap-2">
          <button @click="openModal(item)">
            <Icon name="ph:magnifying-glass-plus" size="24" class=""></Icon>
          </button>
        </div>
      </div>
    </div>

    <!-- no data -->
    <admin-no-data v-else />

    <!-- note 彈窗 顯示 selectedItem 的內容 -->
    <div v-if="showModal" class="modal-bg">
      <div class="modal-box">
        <div class="modal-top">
          <div class="modal-title">評價詳情</div>
          <button class="modal-cancle" @click="closeDialog">
            <Icon name="material-symbols:close-rounded" size="24"></Icon>
          </button>
        </div>

        <!-- ? modal-body -->
        <div class="flex flex-col gap-6">
          <div class="row-input">
            <div class="row-input-title-gray">訂單編號</div>
            <div class="">{{ selectedItem.orderId?._id }}</div>
          </div>

          <div class="row-input">
            <div class="row-input-title-gray">評論編號</div>
            <div class="">{{ selectedItem._id }}</div>
          </div>

          <div class="row-input">
            <div class="row-input-title-gray">課程名稱</div>
            <div class="">{{ selectedItem.orderId?.courseName }}</div>
          </div>

          <div class="row-input">
            <div class="row-input-title-area-gray">評價內容</div>
            <div class="flex flex-col gap-3">
              <div class="">{{ selectedItem.content }}</div>
              <div class="grid max-w-[408px] grid-cols-5 gap-3">
                <div class="" v-for="img in selectedItem.images">
                  <img :src="img" alt="" class="pic-auto" />
                </div>
              </div>
            </div>
          </div>

          <div class="row-input">
            <div class="row-input-title-gray">留言用戶</div>
            <div class="">
              {{
                selectedItem.memberId?.name
                  ? selectedItem.memberId.name[0] +
                    '*'.repeat(selectedItem.memberId.name.length - 2) +
                    selectedItem.memberId.name.slice(-1)
                  : ''
              }}
            </div>
          </div>

          <div class="row-input">
            <div class="row-input-title-gray">評分</div>
            <div class="flex items-center gap-1">
              <Icon name="material-symbols:star-rounded" size="20"></Icon>({{
                selectedItem.rating
              }})
            </div>
          </div>

          <div class="row-input">
            <div class="row-input-title-gray">建立時間</div>
            <div class="">{{ selectedItem.createdAt }}</div>
          </div>

          <div class="row-input">
            <div class="row-input-title-gray">評論類型</div>
            <div class="flex flex-wrap gap-3">
              <div v-for="tag in selectedItem.tags">{{ tag }}</div>
            </div>
          </div>

          <!-- <div class="row-input">
            <div class="row-input-title">舊密碼</div>
            <div class="w-full">
              <input
                class="admin-input"
                type="password"
                placeholder="請輸入舊密碼"
                v-model="currentPassword"
                :class="{ 'admin-input-error': currentPassword === '' }"
              />
              <div v-if="currentPassword === ''" class="admin-input-error-note">此欄位不能留空</div>
            </div>
          </div>

          <div class="row-input">
            <div class="row-input-title">新密碼</div>
            <div class="w-full">
              <input
                class="admin-input"
                type="password"
                placeholder="請輸入新密碼（至少8字元且中英混用）"
                v-model="password"
                :class="{ 'admin-input-error': password === '' }"
              />
              <div v-if="password === ''" class="admin-input-error-note">此欄位不能留空</div>
            </div>
          </div>

          <div class="row-input">
            <div class="row-input-title">確認新密碼</div>
            <div class="w-full">
              <input
                class="admin-input"
                type="password"
                placeholder="請確認新密碼（至少8字元且中英混用）"
                v-model="confirmPassword"
                :class="{ 'admin-input-error': confirmPassword === '' }"
              />
              <div v-if="confirmPassword === ''" class="admin-input-error-note">此欄位不能留空</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
