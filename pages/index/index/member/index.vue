<script setup lang="ts">
import { useMemberStore } from '~/stores/member'

// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})
const defaultImg: any = ref('https://dummyimage.com/300x300/#F8F8F8')

const memberStore = useMemberStore()
const router = useRouter()

// 會員資料區
const member: any = ref({})
const fetchMember = async () => {
  try {
    const res = await memberStore.getMember()
    member.value = res.data.data
  } catch (err) {
    router.push('/error')
  }
}

// 訂單和收藏區
const currentView = ref('orders') // 當前畫面
const filter = ref('all') // 篩選條件
const selectedFilterName = ref('所有課程') // 篩選條件名稱
const selectedFilterCount = ref(0) // 選中的條件數量 (下拉選單用)
const rawData: any = ref([])
const data: any = ref([])
const hasData = ref(true)

// 動態切換渲染元件
const content: any = {
  collections: resolveComponent('FrontMemberCourseCard'),
  orders: resolveComponent('FrontMemberOrderCard')
}

const setCurrentView = async (viewName: string) => {
  showLoading()
  rawData.value = [] // 清空原始資料
  data.value = [] // 清空filter用資料
  currentView.value = viewName // 根據 頁面名稱 取得資料
  // 根據畫面取得資料
  if (viewName === 'orders') {
    await fetchOrdersData()
  } else {
    await fetchCollectionData()
  }
  // 重置篩選條件 (預設為點選 all 標籤)
  setFilter('all')
  hideLoading()
}

// 排序下拉選單
const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 處理排序
const handleSort = (orderName: string) => {
  if (orderName === 'newest') {
  } else if (orderName === 'experience') {
    data.value = rawData.sort((a: any, b: any) => a.courseTerm - b.courseTerm)
  } else if (orderName === 'training') {
    data.value = data.value.sort((a: any, b: any) => b.courseTerm - a.courseTerm)
  }
}

// 透過 filter 名稱篩選資料
const setFilter: any = (filterName: string) => {
  showDropdown.value = false
  filter.value = filterName
  if (currentView.value === 'orders') {
    handleOrderFilter(filterName)
  } else {
    handleCollectionFilter(filterName)
  }
}

const handleCollectionFilter = (filterName: string) => {
  if (filterName === 'experience') {
    data.value = rawData.value.filter((item: any) => item.courseTerm === 1)
    selectedFilterName.value = '體驗課程'
  } else if (filterName === 'training') {
    data.value = rawData.value.filter((item: any) => item.courseTerm === 0)
    selectedFilterName.value = '培訓課程'
  } else {
    data.value = rawData.value
    selectedFilterName.value = '所有課程'
  }
  selectedFilterCount.value = data.value.length
}

const handleOrderFilter = (filterName: string) => {
  if (filterName === 'paid') {
    data.value = rawData.value.filter((item: any) => [1, 2].includes(item.paidStatus))
    selectedFilterName.value = '報名成功'
  } else if (filterName === 'unpaid') {
    data.value = rawData.value.filter((item: any) => item.paidStatus === 0)
    selectedFilterName.value = '待付款'
  } else if (filterName === 'completed') {
    data.value = rawData.value.filter((item: any) => item.paidStatus === 3)
    selectedFilterName.value = '已完課'
  } else if (filterName === 'cancel') {
    data.value = rawData.value.filter((item: any) => [4, 5, 6, 7].includes(item.paidStatus))
    selectedFilterName.value = '課程取消'
  } else {
    data.value = rawData.value
    selectedFilterName.value = '所有課程'
  }
  selectedFilterCount.value = data.value.length
}

// 取得訂單資料
const fetchOrdersData = async () => {
  try {
    const res = await memberStore.getMemberOrders()
    const data = res.data.data.map((item: any) => {
      item.courseImage = item.courseId?.courseImage?.[0] || ''
      item.courseId = item.courseId?._id || ''
      return item
    })
    console.log(data)
    rawData.value = data
    data.value = rawData.value
    if (res.data.data.length > 0) {
      hasData.value = true
    } else {
      hasData.value = false
    }
  } catch (err) {
    router.push('/error')
  }
}

// 取得收藏資料
const fetchCollectionData = async () => {
  try {
    const res = await memberStore.getMemberCollection()
    rawData.value = res.data.data
    data.value = rawData.value
    if (res.data.data.length > 0) {
      hasData.value = true
    } else {
      hasData.value = false
    }
  } catch (err) {
    router.push('/error')
  }
}

onMounted(() => {
  fetchMember()
  setCurrentView('orders')
})
</script>

<template>
  <div class="bg-gray1 p-5 lg:px-[80px]">
    <div class="mx-auto py-14 lg:max-w-screen-xl">
      <div class="mx-auto mb-14 flex space-x-8">
        <!-- 大頭貼 -->
        <div
          class="aspect-square max-h-[120px] w-1/3 max-w-[120px] overflow-hidden md:max-h-[180px] md:max-w-[180px]"
        >
          <img
            :src="member.photo || defaultImg"
            alt="member-photo"
            class="h-full w-full rounded-full bg-gray3 object-cover"
          />
        </div>
        <div class="md:flex md:w-full md:items-center md:justify-between">
          <!-- 個人資料 -->
          <div class="mb-6 space-y-3 md:mb-0">
            <div class="block text-sm">Hello!</div>
            <div>
              <div class="text-xl md:text-base">{{ member.nickname || '會員暱稱未提供' }}</div>
              <div class="text-sm">{{ member.email || '會員 email 未提供' }}</div>
            </div>
            <div>
              <NuxtLink
                class="inline-block rounded-[4px] border-[1px] border-solid bg-primary px-6 py-2 text-white transition duration-500 hover:bg-primary-light hover:text-white"
                to="/member/profile"
              >
                會員資料
              </NuxtLink>
            </div>
          </div>

          <!-- 數字計算 -->
          <div class="flex space-x-4 md:space-x-8">
            <div class="flex flex-col items-center">
              <div class="mb-1 text-xs md:text-sm">課程累積</div>
              <div class="text-2xl md:text-4xl">{{ member.completedCourseCount || 0 }}</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="mb-1 text-xs md:text-sm">我的收藏</div>
              <div class="text-2xl md:text-4xl">{{ member.collectionCount || 0 }}</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="mb-1 text-xs md:text-sm">累積點數</div>
              <div class="text-2xl md:text-4xl">{{ member.point || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-8 flex w-full border-b-[1px] border-solid border-[#E5E7EB]">
        <button
          class="flex items-center rounded-t-lg px-5 py-2 text-base md:text-xl"
          :class="{ 'bg-secondary text-white': currentView === 'orders' }"
          @click="setCurrentView('orders')"
        >
          <Icon name="ph:receipt" class="mr-1 text-xl" />
          訂單紀錄
        </button>
        <button
          class="flex items-center rounded-t-lg px-5 py-2 text-base md:text-xl"
          :class="{ 'bg-secondary text-white': currentView === 'collections' }"
          @click="setCurrentView('collections')"
        >
          <Icon name="ph:star" class="mr-1 text-xl" />
          我的收藏
        </button>
      </div>
      <!-- 以下為動態內容 -->
      <!-- Filter & Order Controll 篩選 和 排序 控制 -->
      <div class="mb-8 flex items-center justify-between">
        <!-- Filter 篩選 -->
        <!-- 底下是 orders 的篩選 -->
        <div class="hidden space-x-5 lg:flex" v-if="currentView === 'orders'">
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'all', 'bg-white': filter !== 'all' }"
            @click="setFilter('all')"
          >
            所有課程({{ rawData.length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'unpaid', 'bg-white': filter !== 'unpaid' }"
            @click="setFilter('unpaid')"
          >
            待付款({{ rawData.filter((item: any) => item.paidStatus === 0).length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'paid', 'bg-white': filter !== 'paid' }"
            @click="setFilter('paid')"
          >
            報名成功({{
              rawData.filter((item: any) => [1, 2].includes(item.paidStatus)).length || 0
            }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'completed', 'bg-white': filter !== 'completed' }"
            @click="setFilter('completed')"
          >
            已完課({{ rawData.filter((item: any) => item.paidStatus === 3).length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'cancel', 'bg-white': filter !== 'cancel' }"
            @click="setFilter('cancel')"
          >
            課程取消({{
              rawData.filter((item: any) => [4, 5, 6, 7].includes(item.paidStatus)).length || 0
            }})
          </button>
        </div>
        <div class="relative w-40 cursor-pointer lg:hidden" v-if="currentView === 'orders'">
          <!-- <div
            name="paidStatus"
            class="rounded border-[1px] border-solid border-primary bg-white px-4 py-2"
          ></div> -->
          <div
            value="all"
            class="flex items-center justify-between rounded border-[1px] border-solid border-primary bg-white px-4 py-2"
            @click="toggleDropdown"
          >
            {{ selectedFilterName }}({{ selectedFilterCount }})
            <Icon name="ph:caret-down-fill" class="text-lg text-dark1" />
          </div>
          <div
            class="absolute w-full overflow-hidden rounded border-[1px] border-solid border-gray3 bg-white text-center"
            v-if="showDropdown"
          >
            <div
              value="all"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('all')"
            >
              所有課程({{ rawData.length || 0 }})
            </div>
            <div
              value="unpaid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('unpaid')"
            >
              待付款({{ rawData.filter((item: any) => item.paidStatus === 0).length || 0 }})
            </div>
            <div
              value="paid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('paid')"
            >
              報名成功({{
                rawData.filter((item: any) => [1, 2].includes(item.paidStatus)).length || 0
              }})
            </div>
            <div
              value="completed"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('completed')"
            >
              已完課({{ rawData.filter((item: any) => item.paidStatus === 3).length || 0 }})
            </div>
            <div
              value="cancel"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('cancel')"
            >
              課程取消({{
                rawData.filter((item: any) => [4, 5, 6, 7].includes(item.paidStatus)).length || 0
              }})
            </div>
          </div>
        </div>

        <!-- 排序只有 Orders 會出現 -->
        <div class="group relative mb-1 px-6" v-if="currentView === 'orders'">
          <button class="flex text-primary">
            <span class="mr-1 inline-block">排序</span>
            <Icon name="ph:arrows-down-up" class="mr-1 text-2xl text-dark1" />
          </button>
          <ul
            class="absolute left-0 right-0 z-10 hidden max-h-48 cursor-pointer rounded border-[1px] border-solid border-black bg-white group-hover:block"
          >
            <li
              value="newest"
              class="py-1 text-center hover:bg-secondary hover:text-white"
              @click="handleSort('newest')"
            >
              最近時間
            </li>
            <li
              value="expirence"
              class="py-1 text-center hover:bg-secondary hover:text-white"
              @click="handleSort('expirence')"
            >
              體驗課程優先
            </li>
            <li
              value="training"
              class="py-1 text-center hover:bg-secondary hover:text-white"
              @click="handleSort('training')"
            >
              培訓課程優先
            </li>
          </ul>
        </div>

        <!-- 底下是 collections 的篩選 -->
        <div class="hidden space-x-5 lg:flex" v-if="currentView == 'collections'">
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'all', 'bg-white': filter !== 'all' }"
            @click="setFilter('all')"
          >
            {{ selectedFilterName }}({{ rawData.length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'experience', 'bg-white': filter !== 'experience' }"
            @click="setFilter('experience')"
          >
            體驗課程({{ rawData.filter((item: any) => item.courseTerm === 1).length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'training', 'bg-white': filter !== 'training' }"
            @click="setFilter('training')"
          >
            培訓課程({{ rawData.filter((item: any) => item.courseTerm === 0).length || 0 }})
          </button>
        </div>

        <div
          class="relative z-10 w-40 cursor-pointer lg:hidden"
          v-if="currentView === 'collections'"
        >
          <div
            value="all"
            class="flex items-center justify-between rounded border-[1px] border-solid border-primary bg-white px-4 py-2"
            @click="toggleDropdown"
          >
            {{ selectedFilterName }}({{ selectedFilterCount }})
            <Icon name="ph:caret-down-fill" class="text-lg text-dark1" />
          </div>
          <div
            class="absolute w-full overflow-hidden rounded border-[1px] border-solid border-gray3 bg-white text-center"
            v-if="showDropdown"
          >
            <div
              value="unpaid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('all')"
            >
              所有課程({{ rawData.length || 0 }})
            </div>
            <div
              value="unpaid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('experience')"
            >
              體驗課程({{ rawData.filter((item: any) => item.courseTerm === 1).length || 0 }})
            </div>
            <div
              value="unpaid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('training')"
            >
              培訓課程({{ rawData.filter((item: any) => item.courseTerm === 0).length || 0 }})
            </div>
          </div>
        </div>
      </div>
      <!-- Card -->
      <ul
        class="grid grid-cols-2 gap-8 px-4 md:grid-cols-3 md:px-8 lg:grid-cols-5"
        v-if="hasData && currentView === 'collections'"
      >
        <li v-for="item in data" :key="item._id">
          <component :is="content[currentView]" :key="currentView" :collection="item"></component>
        </li>
      </ul>

      <ul class="space-y-3" v-if="hasData && currentView === 'orders'">
        <li v-for="item in data" :key="item._id">
          <component :is="content[currentView]" :key="currentView" :order="item"></component>
        </li>
      </ul>
      <!-- No Data -->
      <div class="" v-if="!hasData">
        <div class="mx-auto max-w-[600px] p-8 md:p-14">
          <img
            src="/assets/images/nodata.png"
            alt="ciao-craft-logo"
            class="w-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* .custom-select {
  position: relative;
  background-color: white;
}

.custom-select-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='%23AAAAAA' d='m4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427'/%3E%3C/svg%3E")
    no-repeat right center;
  background-size: 1em;
  background-origin: content-box;
}

.custom-select-input::-ms-expand {
  display: none;
} */
</style>
