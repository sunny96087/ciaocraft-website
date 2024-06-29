<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['bookingReset', 'bookingSubmitted'])
const handleBookingCancel = () => {
  emit('bookingReset')
}

import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()
const selectedItem = ref(null)

// 將點擊的 item (課程名稱)賦值給 selectedItem
const selectItem = (item: any) => {
  selectedItem.value = item
  quantity.value = 1
  getRemainingCapacity(selectedItem.value)
}

const selectedObject = ref({
  capacity: 0,
  endTime: '',
  itemName: '',
  startTime: '',
  _id: ''
})

// 根據用戶所選的 item (課程名稱)找出對應的剩餘人數
const getRemainingCapacity = (selectedItem: any) => {
  if (!selectedItem) return 0

  const foundItem = courseStore.oneCourseData[0].courseItemId.find(
    (item) => item.itemName === selectedItem.itemName
  )

  // 找到對應資料後賦值給 selectedObject.value
  if (foundItem) {
    selectedObject.value = {
      capacity: foundItem.capacity,
      endTime: foundItem.endTime,
      itemName: foundItem.itemName,
      startTime: foundItem.startTime,
      _id: foundItem._id
    }
  } else {
    // 沒有找到就將 selectedObject.value 變成預設值
    selectedObject.value = {
      capacity: 0,
      endTime: '',
      itemName: '',
      startTime: '',
      _id: ''
    }
  }
  return selectedObject.value ? selectedObject.value : 0
}

// 預約人數預設 1 人
const quantity = ref(1)

// 預約人數減少數量
const decrementQuantity = () => {
  if (quantity.value > 0) {
    quantity.value -= 1
  }
}

// 預約人數增加數量
const incrementQuantity = () => {
  const remainingCapacity = getRemainingCapacity(selectedItem.value)
  if (remainingCapacity && quantity.value < remainingCapacity.capacity) {
    quantity.value += 1
  } else {
    showToast('預約人數已滿', 'error')
  }
}

// 計算總金額
const totalPrice = computed(() => {
  if (!selectedItem.value) return 0
  return quantity.value * courseStore.oneCourseData[0].coursePrice
})

const suggestion = ref('')
const authStore = useAuthStore()
// 新增訂單(預約)
const addBooking = async () => {
  if (!authStore.isLogin) {
    authStore.openLoginModal()
    return
  }
  try {
    if (authStore.isLogin) {
      let data = {
        vendorId: courseStore.oneCourseData[0].vendorId._id,
        courseId: courseStore.oneCourseData[0].id,
        courseItemId: selectedObject.value._id,
        brandName: courseStore.oneCourseData[0].vendorId.brandName,
        courseName: courseStore.oneCourseData[0].courseName,
        courseItemName: selectedObject.value.itemName,
        count: quantity.value,
        price: courseStore.oneCourseData[0].coursePrice,
        totalPrice: totalPrice.value,
        courseLocation: courseStore.oneCourseData[0].courseAddress,
        startTime: selectedObject.value.startTime,
        endTime: selectedObject.value.endTime,
        note: suggestion.value
      }

      const res: any = await courseStore.apiPostOrders(data)
      const result = res.data

      request(result)
    }
  } catch (e) {
    showToast('預約失敗，請聯繫客服人員', 'error')
  }
}

function request(result: { statusCode: number; data: any }) {
  if (result.statusCode === 200) {
    showToast('預約成功')
    emit('bookingSubmitted')
    getOneCourse()
  } else {
    showToast('預約失敗，請聯繫客服人員', 'error')
  }
}
const courseInfo: any = ref({})
// 取得單一課程資料
async function getOneCourse() {
  try {
    let data = {
      courseId: courseStore.oneCourseData[0].id
    }
    const res = await courseStore.apiGetOneCourse(data)
    const result = res.data
    // 將資料寫入 courseStore
    courseStore.oneCourseData[0].courseItemId = result.data.courseItemId

    if (result.statusCode === 200) {
      courseInfo.value = result.data
      // console.log(`courseInfo = ${JSON.stringify(courseInfo.value)}`)
    } else {
      console.log('取得單一課程失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 格式化價格的計算屬性
const formattedPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const resetData = (item: any) => {
  quantity.value = 1
  suggestion.value = ''
  selectedObject.value = {
    capacity: 0,
    endTime: '',
    itemName: '',
    startTime: '',
    _id: ''
  }
}
</script>

<template>
  <ul
    class="rounded-xl border border-[#DFE4EA] bg-white p-5"
    v-for="(item, index) in courseStore.oneCourseData"
    :key="index"
    id="booking-section"
  >
    <li class="mb-5 flex justify-between">
      <h4 class="text-[30px] font-medium leading-[38px]">預約課程</h4>
      <button
        class="rounded border border-primary px-6 py-2 hover:bg-primary-light hover:text-white"
        @click="handleBookingCancel"
      >
        取消預約
      </button>
    </li>
    <li class="mb-5 flex items-center rounded bg-gray3 py-2 pl-2">
      <p class="mr-2.5 inline-block rounded bg-danger px-2 py-1 text-secondary text-white">注意</p>
      <p>預約3天內完成付款即完成報名課程</p>
    </li>
    <li class="mb-5 flex justify-between">
      <p class="text-lg font-medium leading-[26px]">選擇課程日期、場次、人數</p>
      <button class="flex items-center text-primary" @click="resetData">
        重新填寫
        <Icon name="ph:arrow-clockwise" class="ml-1 text-xl text-primary" />
      </button>
    </li>
    <li>
      <ul class="mb-10 justify-between lg:flex">
        <li class="mb-[30px] lg:mb-0 lg:w-[43%]">
          <div class="mb-[30px]">
            <p class="mb-5">場次時間<span class="text-danger">*</span></p>
            <div
              class="flex"
              v-for="(item, index) in courseStore.oneCourseData[0].courseItemId"
              :key="index"
            >
              <button
                class="mb-2 rounded border px-6 py-2"
                :class="{
                  'text-secondary hover:bg-secondary hover:text-white': true,
                  'bg-secondary text-white': selectedObject.itemName === item.itemName,
                  'cursor-not-allowed bg-gray5 hover:bg-gray5 hover:text-secondary':
                    item.capacity === 0
                }"
                @click="selectItem(item)"
                :disabled="item.capacity === 0"
              >
                {{ item.itemName }}
              </button>
            </div>
          </div>
          <div class="mb-5">
            <p class="mb-5">預約人數<span class="text-danger">*</span></p>
            <ul class="flex items-center justify-between border-b border-black pb-5">
              <li class="flex items-center">
                <p class="mr-5 text-secondary">
                  NT$<span class="mx-2">{{ formattedPrice(item.coursePrice) }}</span
                  >/ 每人
                </p>
                <div class="flex items-center">
                  <Icon
                    name="ph:minus-circle"
                    class="text-[38px] hover:cursor-pointer"
                    @click="decrementQuantity"
                  />
                  <p class="mx-5">{{ quantity }}</p>
                  <Icon
                    name="ph:plus-circle"
                    class="text-[38px] hover:cursor-pointer"
                    @click="incrementQuantity"
                  />
                </div>
              </li>
              <li>
                剩餘<span class="mx-2"> {{ selectedObject.capacity }}</span
                >人
              </li>
            </ul>
          </div>
          <ul>
            <li class="mb-2 flex items-center justify-between">
              <p>總金額</p>
              <p class="text-2xl font-medium leading-[36px] text-secondary">
                NT$<span>{{ formattedPrice(totalPrice) }}</span>
              </p>
            </li>
            <li class="flex items-center justify-between">
              <p>獲得點數</p>
              <p>99</p>
            </li>
          </ul>
        </li>
        <li class="lg:w-[53%]">
          <p class="mb-2">備註</p>
          <div class="rounded border border-black p-5">
            <textarea
              name="suggest"
              cols="30"
              rows="10"
              placeholder="請填寫不超過500字"
              class="inputSuggest w-full"
              v-model="suggestion"
            ></textarea>
          </div>
        </li>
      </ul>
      <div class="flex justify-end">
        <button
          class="flex items-center rounded bg-primary px-6 py-2 text-white hover:bg-primary-light"
          @click="addBooking()"
          :disabled="selectedObject.capacity === 0"
        >
          <Icon name="ph:paper-plane-right" class="mr-2 text-xl" />
          送出訂單
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.inputSuggest {
  resize: none;
}
</style>
