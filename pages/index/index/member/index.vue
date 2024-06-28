<script setup lang="ts">
// 此頁面需要登入，中介層驗證身分，若未登入則導向登入頁
definePageMeta({
  middleware: ['auth']
})

import defaultAvatar from '~/assets/images/front/member/default-avatar.jpg'

const memberStore = useMemberStore()
const route = useRoute()

// 會員資料區
const member: any = ref({})
const memberPhoto: any = ref('')
const isMemberLoading = ref(false)
const fetchMember = async () => {
  isMemberLoading.value = true
  try {
    const res = await memberStore.getMember()
    const result = res.data
    member.value = result.data
    if (memberPhoto.value == '') {
      memberPhoto.value = member.value.photo
    }
  } catch (err) {
    showToastError('取得會員資料失敗，請重新登入')
  }
  isMemberLoading.value = false
}

// 監聽 memberStore.orders 的變化
watch(
  () => memberStore.orders,
  (newOrders, oldOrders) => {
    memberOrders.value = newOrders
    filterOrders.value = newOrders
  }
)

// 訂單和收藏區
const currentView = ref('orders') // 當前畫面
const filter = ref('all') // 篩選條件
const selectedFilterName = ref('所有課程') // 篩選條件名稱
const selectedFilterCount = ref(0) // 選中的條件數量 (下拉選單用)

let memberCollections: any = ref([])
let memberOrders: any = ref([])
let filterCollection: any = ref([])
let filterOrders: any = ref([])

watch(
  () => memberStore.collections,
  (newCollections, oldCollections) => {
    memberCollections.value = newCollections
  }
)

watch(
  () => filterCollection.value,
  (newValues, oldValues) => {
    filterCollection.value = newValues
  }
)

const hasData = ref(true)

// 動態切換渲染元件
// const content: any = {
//   collections: resolveComponent('FrontMemberCourseCard'),
//   orders: resolveComponent('FrontMemberOrderCard')
// }

const isCardLoading = ref(false)
const renderCurrentView = async (viewName: string) => {
  currentView.value = viewName
  isCardLoading.value = true
  if (viewName === 'orders') {
    await fetchOrdersData()
  } else {
    await fetchCollectionData()
  }
  setFilter(filter.value)
  isCardLoading.value = false
}

// 排序下拉選單
const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 處理排序
const handleSort = (orderName: string) => {
  if (orderName === 'newest') {
    filterOrders.value = filterOrders.value.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } else if (orderName === 'experience') {
    filterOrders.value = filterOrders.value.sort((a: any, b: any) => {
      if (a.courseTerm === 0 && b.courseTerm !== 0) return -1
      if (a.courseTerm !== 0 && b.courseTerm === 0) return 1
      return a.courseTerm - b.courseTerm
    })
  } else if (orderName === 'training') {
    filterOrders.value = filterOrders.value.sort((a: any, b: any) => {
      if (a.courseTerm === 1 && b.courseTerm !== 1) return -1
      if (a.courseTerm !== 1 && b.courseTerm === 1) return 1
      return b.courseTerm - a.courseTerm
    })
  }
}

// 透過 filter tags 名稱篩選資料
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
    filterCollection.value = memberCollections.value.filter((item: any) => item.courseTerm === 0)
    selectedFilterName.value = '體驗課程'
  } else if (filterName === 'training') {
    filterCollection.value = memberCollections.value.filter((item: any) => item.courseTerm === 1)
    selectedFilterName.value = '培訓課程'
  } else {
    filterCollection.value = memberCollections.value
    selectedFilterName.value = '所有課程'
  }
  // 選中的條件數量 (下拉選單用)
  selectedFilterCount.value = filterCollection.value.length
}

const handleOrderFilter = (filterName: string) => {
  if (filterName === 'paid') {
    filterOrders.value = memberOrders.value.filter((item: any) => [1, 2].includes(item.paidStatus))
    selectedFilterName.value = '報名成功'
  } else if (filterName === 'unpaid') {
    filterOrders.value = memberOrders.value.filter((item: any) => item.paidStatus === 0)
    selectedFilterName.value = '待付款'
  } else if (filterName === 'completed') {
    filterOrders.value = memberOrders.value.filter((item: any) => item.paidStatus === 3)
    selectedFilterName.value = '已完課'
  } else if (filterName === 'cancel') {
    filterOrders.value = memberOrders.value.filter((item: any) =>
      [4, 5, 6, 7].includes(item.paidStatus)
    )
    selectedFilterName.value = '課程取消'
  } else {
    filterOrders.value = memberOrders.value
    selectedFilterName.value = '所有課程'
  }
  // 選中的條件數量 (下拉選單用)
  selectedFilterCount.value = filterOrders.value.length
}

const handleRefreshCollections = (courseId: string) => {
  fetchMember()
  filterCollection.value = filterCollection.value.filter((item: any) => item.courseId !== courseId)
  selectedFilterCount.value = filterCollection.value.length
  memberStore.collections = memberStore.collections.filter(
    (item: any) => item.courseId !== courseId
  )
}

// 取得訂單資料
const fetchOrdersData = async () => {
  try {
    const res = await memberStore.getMemberOrders()
    const result = res.data
    const orderData = result.data.map((item: any) => {
      item.courseImage = item.courseId?.courseImage?.[0] || ''
      item.courseTerm = item.courseId.courseTerm || ''
      item.courseId = item.courseId?._id || ''
      return item
    })
    memberStore.orders = orderData
    memberOrders.value = memberStore.orders
    filterOrders.value = memberStore.orders
    if (res.data.data.length > 0) {
      hasData.value = true
    } else {
      hasData.value = false
    }
  } catch (err) {
    showToastError('取得訂單資料失敗，請聯繫客服人員')
  }
}

// 取得收藏資料
const fetchCollectionData = async () => {
  try {
    const res = await memberStore.getMemberCollection()
    const result = res.data
    memberStore.collections = result.data
    memberCollections.value = memberStore.collections
    filterCollection.value = memberStore.collections
    if (result.data.length > 0) {
      hasData.value = true
    } else {
      hasData.value = false
    }
  } catch (err) {
    showToastError('取得收藏資料失敗，請聯繫客服人員')
  }
}

// 持續監聽路由的 query 參數切換畫面
const tab = watch(
  () => route.query.tab,
  (tab) => {
    if (tab === 'collections') {
      renderCurrentView('collections')
    } else {
      renderCurrentView('orders')
    }
  }
)

onMounted(async () => {
  fetchMember()
  // 元件初始時，判斷路由 query 參數切換畫面
  if (route.query.tab === 'collections') {
    renderCurrentView('collections')
  } else {
    renderCurrentView('orders')
  }
  setFilter('all')
})
</script>

<template>
  <div class="bg-gray1 py-5 lg:px-[100px]">
    <div class="mx-auto px-5 py-9 lg:max-w-screen-xl">
      <div class="mx-auto mb-14 flex space-x-8" :class="{ 'animate-pulse': isMemberLoading }">
        <!-- 大頭貼 -->
        <div
          class="aspect-square max-h-[120px] w-1/3 max-w-[120px] overflow-hidden md:max-h-[180px] md:max-w-[180px]"
          v-if="!isMemberLoading"
        >
          <img
            :src="memberPhoto || defaultAvatar"
            alt="member-photo"
            class="h-full w-full rounded-full bg-gray3 object-cover"
          />
        </div>
        <div
          class="aspect-square max-h-[120px] w-1/3 max-w-[120px] overflow-hidden md:max-h-[180px] md:max-w-[180px]"
          v-if="isMemberLoading"
        >
          <img
            :src="memberPhoto || defaultAvatar"
            alt="member-photo"
            class="h-full w-full rounded-full bg-gray3 object-cover"
          />
        </div>
        <div class="md:flex md:w-full md:items-center md:justify-between">
          <!-- 個人資料 -->
          <div class="mb-6 space-y-3 md:mb-0">
            <div class="block text-sm">Hello!</div>
            <div>
              <div class="text-xl md:text-base">{{ member.nickname || '會員暱稱' }}</div>
              <div class="text-sm">{{ member.email || '會員 email ' }}</div>
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
          @click="renderCurrentView('orders')"
        >
          <Icon name="ph:receipt" class="mr-1 text-xl" />
          訂單紀錄
        </button>
        <button
          class="flex items-center rounded-t-lg px-5 py-2 text-base md:text-xl"
          :class="{ 'bg-secondary text-white': currentView === 'collections' }"
          @click="renderCurrentView('collections')"
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
            所有課程({{ memberOrders.length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'unpaid', 'bg-white': filter !== 'unpaid' }"
            @click="setFilter('unpaid')"
          >
            待付款({{ memberOrders.filter((item: any) => item.paidStatus === 0).length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'paid', 'bg-white': filter !== 'paid' }"
            @click="setFilter('paid')"
          >
            報名成功({{
              memberOrders.filter((item: any) => [1, 2].includes(item.paidStatus)).length || 0
            }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'completed', 'bg-white': filter !== 'completed' }"
            @click="setFilter('completed')"
          >
            已完課({{ memberOrders.filter((item: any) => item.paidStatus === 3).length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'cancel', 'bg-white': filter !== 'cancel' }"
            @click="setFilter('cancel')"
          >
            課程取消({{
              memberOrders.filter((item: any) => [4, 5, 6, 7].includes(item.paidStatus)).length ||
              0
            }})
          </button>
        </div>
        <div class="relative w-40 cursor-pointer lg:hidden" v-if="currentView === 'orders'">
          <div
            value="all"
            class="flex items-center justify-between rounded border-[1px] border-solid border-primary bg-white px-4 py-2"
            @click="toggleDropdown"
          >
            {{ selectedFilterName }}({{ selectedFilterCount }})
            <Icon name="ph:caret-down-fill" class="text-lg text-dark1" />
          </div>
          <div
            class="absolute w-full overflow-hidden rounded border-[1px] border-solid border-gray3 bg-white text-center shadow-lg"
            v-if="showDropdown"
          >
            <div
              value="all"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('all')"
            >
              所有課程({{ memberOrders.length || 0 }})
            </div>
            <div
              value="unpaid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('unpaid')"
            >
              待付款({{ memberOrders.filter((item: any) => item.paidStatus === 0).length || 0 }})
            </div>
            <div
              value="paid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('paid')"
            >
              報名成功({{
                memberOrders.filter((item: any) => [1, 2].includes(item.paidStatus)).length || 0
              }})
            </div>
            <div
              value="completed"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('completed')"
            >
              已完課({{ memberOrders.filter((item: any) => item.paidStatus === 3).length || 0 }})
            </div>
            <div
              value="cancel"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('cancel')"
            >
              課程取消({{
                memberOrders.filter((item: any) => [4, 5, 6, 7].includes(item.paidStatus)).length ||
                0
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
            class="absolute left-0 right-0 z-10 hidden max-h-48 cursor-pointer rounded border-[1px] border-solid border-gray3 bg-white shadow-lg group-hover:block"
          >
            <li
              value="newest"
              class="py-1 text-center hover:bg-secondary hover:text-white"
              @click="handleSort('newest')"
            >
              最近時間
            </li>
            <li
              value="experience"
              class="py-1 text-center hover:bg-secondary hover:text-white"
              @click="handleSort('experience')"
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
            所有課程({{ memberCollections.length || 0 }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'experience', 'bg-white': filter !== 'experience' }"
            @click="setFilter('experience')"
          >
            體驗課程({{
              memberCollections.filter((item: any) => item.courseTerm === 0).length || 0
            }})
          </button>
          <button
            class="rounded border-[1px] border-solid border-primary px-5 py-2"
            :class="{ 'bg-orange3 ': filter === 'training', 'bg-white': filter !== 'training' }"
            @click="setFilter('training')"
          >
            培訓課程({{
              memberCollections.filter((item: any) => item.courseTerm === 1).length || 0
            }})
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
            class="absolute w-full overflow-hidden rounded border-[1px] border-solid border-gray3 bg-white text-center shadow-lg"
            v-if="showDropdown"
          >
            <div
              value="unpaid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('all')"
            >
              所有課程({{ memberCollections.length || 0 }})
            </div>
            <div
              value="unpaid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('experience')"
            >
              體驗課程({{
                memberCollections.filter((item: any) => item.courseTerm === 0).length || 0
              }})
            </div>
            <div
              value="unpaid"
              class="px-2 py-1 leading-6 tracking-[0.5px] hover:bg-secondary hover:text-white"
              @click="setFilter('training')"
            >
              培訓課程({{
                memberCollections.filter((item: any) => item.courseTerm === 1).length || 0
              }})
            </div>
          </div>
        </div>
      </div>
      <!-- 訂單元件 -->
      <ul class="space-y-3" v-if="hasData && currentView === 'orders' && !isCardLoading">
        <li v-for="item in filterOrders" :key="item._id">
          <!-- <component :is="content[currentView]" :key="currentView" :order="item"></component> -->
          <FrontMemberOrderCard :order="item"></FrontMemberOrderCard>
        </li>
      </ul>
      <!-- 訂單元件 Skeleton loader -->
      <div class="animate-pulse space-y-3" v-if="currentView === 'orders' && isCardLoading">
        <div v-for="n in 5" :key="n">
          <div
            class="w-full items-center rounded-[4px] border-[1px] border-solid border-gray4 bg-gray1 p-4 md:flex md:justify-between"
          >
            <div class="mb-8 flex items-center md:m-0">
              <div class="mr-6 h-[120px] w-[120px] rounded-lg bg-gray4"></div>
              <div class="space-y-1">
                <div class="rounded-[4px] bg-gray4 text-sm text-transparent">課程名稱</div>
                <div class="rounded-[4px] bg-gray4 text-sm text-transparent">品牌名稱</div>
                <div class="space-x-1 text-sm text-transparent">
                  <span class="rounded-[4px] bg-gray4">總計</span>
                  <span class="rounded-[4px] bg-gray4">NT$ 1,000</span>
                </div>
                <div class="space-x-1 text-sm text-transparent">
                  <span class="rounded-[4px] bg-gray4">訂單編號 </span>
                  <span class="break-all rounded-[4px] bg-gray4">000000000000000000</span>
                </div>
                <span class="inline-block rounded-[4px] bg-gray4 px-2 py-1 text-sm text-transparent"
                  >付款狀態</span
                >
              </div>
            </div>
            <div class="space-y-3">
              <div
                class="block rounded bg-gray4 py-2 text-center text-transparent transition md:px-10"
              >
                訂單詳情
              </div>
              <div
                class="block rounded bg-gray4 py-2 text-center text-transparent transition md:px-10"
              >
                訂單詳情
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 收藏元件 -->
      <ul
        class="grid grid-cols-2 gap-8 px-4 md:grid-cols-3 md:px-8 lg:grid-cols-5"
        v-if="hasData && currentView === 'collections' && !isCardLoading"
      >
        <li v-for="item in filterCollection" :key="item._id">
          <!-- <component
            :is="content[currentView]"
            :key="currentView"
            :collection="item"
            @refecthCollections="handleRefreshCollections"
          ></component> -->
          <FrontMemberCourseCard
            :collection="item"
            @refecthCollections="handleRefreshCollections"
          ></FrontMemberCourseCard>
        </li>
      </ul>

      <!-- 收藏元件 Skeleton loader -->
      <div
        class="grid animate-pulse grid-cols-2 gap-8 px-4 md:grid-cols-3 md:px-8 lg:grid-cols-5"
        v-if="currentView === 'collections' && isCardLoading"
      >
        <div v-for="n in 5" :key="n">
          <div class="space-y-2">
            <div class="aspect-square">
              <div class="h-full w-full rounded-lg bg-gray3"></div>
            </div>
            <div class="flex space-x-2">
              <div
                class="self-start whitespace-nowrap rounded-[4px] bg-gray3 px-2 py-0.5 text-transparent"
              >
                體驗
              </div>
              <div
                class="line-clamp-2 w-full text-wrap rounded-[4px] bg-gray3 px-2 py-0.5 text-transparent"
              >
                課程名稱 placeholder
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <div
                class="line-clamp-2 self-start text-wrap rounded-[4px] bg-gray3 text-transparent"
              >
                品牌名稱 placeholder
              </div>
              <div class="self-start rounded-[4px] bg-gray3 text-transparent">NT$ 0,000</div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data -->
      <div class="" v-if="!hasData && !isCardLoading">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
