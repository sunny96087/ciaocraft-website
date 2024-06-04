<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const router = useRouter()
const route = useRoute()

let ws: any

const roomId = ref('')
const memberId = ref('')
const vendorId = ref('')

const currentMemberInfo: any = ref({})

const inputMemberMessage = ref('')
const inputVendorMessage = ref('')

const spanUUID = ref('')

const rooms: any = ref([])
const messages: any = ref([])

const currentKeyword = ref('')

// http://localhost:3000/admin/message?memberId=665e98d8d118bf965c174ad8

// const sendMemberMessage = () => {
//   const value = inputMemberMessage.value
//   const message = {
//     memberId: memberId.value,
//     content: value,
//     timestamp: new Date()
//   }
//   ws.send(JSON.stringify(message))
//   inputMemberMessage.value = ''
// }

const sendVendorMessage = () => {
  const value = inputVendorMessage.value
  const message = {
    vendorId: vendorId.value,
    content: value,
    timestamp: new Date()
  }
  ws.send(JSON.stringify(message))
  inputVendorMessage.value = ''
}

watch(roomId, async (newRoomId) => {
  if (roomId.value === '') return

  // 如果已經存在一個開啟的 WebSocket 連線，則先關閉它
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close()
  }

  // * 獲取指定廠商的所有聊天室
  try {
    showLoading()
    let data = {
      vendorId: vendorId.value
    }
    const res = await store.apiGetVendorRooms(data)
    const result = res.data
    if (result && result.statusCode === 200) {
      rooms.value = result.data
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }

  // 當 roomId 改變時，重新獲取該聊天室的訊息
  try {
    showLoading()
    let data = {
      roomId: newRoomId
    }
    const res = await store.apiGetMessages(data)
    const result = res.data
    if (result && result.statusCode === 200) {
      messages.value = result.data.messages
      currentMemberInfo.value = result.data.member
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }

  // 建立新的 WebSocket 連線
  // ws = new WebSocket('ws://localhost:3666/ws')
  ws = new WebSocket('wss://ciaocraft-api.onrender.com/ws')

  ws.onopen = () => {
    console.log('Connected to WebSocket')
    ws.send(
      JSON.stringify({ roomId: roomId.value, memberId: memberId.value, vendorId: vendorId.value })
    )
  }

  ws.onmessage = (message: { data: string }) => {
    const data = JSON.parse(message.data)
    if (data.context === 'user') {
      spanUUID.value = data.uuid
    } else if (
      data.context === 'message' &&
      data.roomId === roomId.value &&
      data.uuid !== spanUUID.value
    ) {
      messages.value.push(data)
    }
  }

  ws.onclose = function () {
    console.log('WebSocket connection closed')
  }
})

const selectRoom = (room: { _id: string; memberId: { _id: string } }) => {
  // 點擊聊天室列表的項目時，將該聊天室的 ID 設置為當前的 roomId
  roomId.value = room._id
  memberId.value = room.memberId._id
}

onMounted(async () => {
  const vendorInfo = await store.getVendorInfoFromLocalStorage()
  console.log(vendorInfo)

  vendorId.value = store.vendorInfo.id
  memberId.value = route.query.memberId as string

  // 如果沒有 memberId，則不執行後續邏輯
  if (memberId.value) {
    // * 獲取指定廠商的所有聊天室
    try {
      showLoading()
      let data = {
        vendorId: vendorId.value
      }
      const res = await store.apiGetVendorRooms(data)
      const result = res.data
      if (result && result.statusCode === 200) {
        console.log(result.data)
        rooms.value = result.data

        // 檢查是否存在與特定會員的聊天室
        console.log(`rooms: ${JSON.stringify(rooms.value)}`)

        const room = await rooms.value.find((room) => room.memberId?._id === memberId.value)
        console.log(`room: ${room}`)

        if (room) {
          roomId.value = room._id // 如果存在聊天室，則設置 roomId
        } else {
          // 如果不存在聊天室，則創建新的聊天室

          try {
            showLoading()
            data = {
              vendorId: vendorId.value,
              memberId: memberId.value
            }
            const res = await store.apiCreateRoom(data)
            const result = res.data
            if (result && result.statusCode === 200) {
              roomId.value = result.data._id // 設置新聊天室的 roomId
            }
          } catch (e) {
            console.log(e)
          } finally {
            hideLoading()
          }
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      hideLoading()
    }
  } else {
    // * 獲取指定廠商的所有聊天室
    try {
      showLoading()
      let data = {
        vendorId: vendorId.value
      }
      const res = await store.apiGetVendorRooms(data)
      const result = res.data
      if (result && result.statusCode === 200) {
        console.log(result.data)
        rooms.value = result.data
      }
    } catch (e) {
      console.log(e)
    } finally {
      hideLoading()
    }
  }
})

const closeChatRoom = () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close()
  }
  roomId.value = ''
  memberId.value = ''
  // vendorId.value = ''
  currentMemberInfo.value = {}
  inputVendorMessage.value = ''
  // rooms.value = []
  messages.value = []
}

const messageList: any = ref(null)
const scrollToBottom = () => {
  nextTick(() => {
    const listElement = messageList.value
    if (listElement) {
      listElement.scrollTop = listElement.scrollHeight
    }
  })
}

watch(messages, () => {
  scrollToBottom()
})

onUpdated(scrollToBottom)

// NOTE ref 重複會衝突，所以手機改用 messageListM
const messageListM: any = ref(null)
const scrollToBottomM = () => {
  nextTick(() => {
    const listElement = messageListM.value
    if (listElement) {
      listElement.scrollTop = listElement.scrollHeight
    }
  })
}

watch(messages, () => {
  scrollToBottomM()
})

onUpdated(scrollToBottomM)
</script>

<template>
  <!-- * mb -->
  <div class="relative h-[90vh] items-start gap-[30px] overflow-hidden lg:hidden">
    <!-- * mb 聊天室列表 -->
    <div class="m-message-list" v-if="rooms.length">
      <div class="message-list-title">訊息中心</div>
      <div class="admin-select mb-7 flex">
        <input type="text" class="w-full" v-model="currentKeyword" placeholder="用戶名稱" />
        <button class="">
          <Icon name="fluent:search-48-filled" size="24" class="text-dark3"></Icon>
        </button>
      </div>

      <div class="max-h-full w-full overflow-y-auto">
        <div
          v-for="item in rooms"
          :key="item._id"
          @click="selectRoom(item)"
          :class="['message-list-item', { 'selected-room': roomId === item._id }]"
          class="flex gap-3"
        >
          <div
            v-if="currentMemberInfo.photo"
            class="h-[44px] min-h-[44px] w-[44px] min-w-[44px] overflow-hidden rounded-full"
          >
            <img :src="currentMemberInfo?.photo" alt="" class="pic-auto" />
          </div>
          <Icon
            v-else
            size="44"
            class="min-w-[44px] text-gray4"
            name="material-symbols:account-circle-full"
          />
          <div class="grow">
            <div class="">{{ item._id }}</div>
            <div class="">{{ item.memberId?.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- * mb 聊天框 -->
    <div class="m-message-block" v-if="messages && roomId">
      <!-- ? 測試資料 -->
      <!-- <div>
        <p>
          會員ID: <span id="memberId">{{ memberId }}</span>
        </p>
        <p>
          廠商ID: <span id="vendorId">{{ vendorId }}</span>
        </p>
        <p>
          房間ID: <span id="roomId">{{ roomId }}</span>
        </p>
      </div> -->

      <!-- ? 用戶資料 -->
      <div class="flex items-center gap-3 border-b border-[#DFE4EA] p-4" v-if="currentMemberInfo">
        <div v-if="currentMemberInfo.photo" class="h-[52px] w-[52px] overflow-hidden rounded-full">
          <img :src="currentMemberInfo?.photo" alt="" class="pic-auto" />
        </div>
        <Icon v-else size="52" class="text-gray4" name="material-symbols:account-circle-full" />

        <div class="grow">{{ currentMemberInfo.name }}</div>

        <button @click="closeChatRoom">
          <Icon name="material-symbols:close-rounded" size="24" class="text-gray"></Icon>
        </button>
      </div>

      <!-- ? 訊息 -->
      <div id="list" ref="messageListM" class="flex h-full grow flex-col gap-3 overflow-y-auto p-5">
        <div v-for="(message, index) in messages" :key="index">
          <div v-if="message.memberId">
            <div class="text-[14px] text-text-secondary">{{ currentMemberInfo.name }}</div>
            <div class="message left">
              <div class="left-content">{{ message.content }}</div>
            </div>
            <div class="message-date">{{ message.timestamp }}</div>
          </div>
          <div v-else class="message right">
            <div class="right-content">
              {{ message.content }}
            </div>
            <div class="message-date">{{ message.timestamp }}</div>
          </div>
        </div>
      </div>

      <!-- ? 輸入框 -->
      <div class="flex gap-5 border-t border-[#DFE4EA] p-5">
        <input
          type="text"
          v-model="inputVendorMessage"
          class="w-full rounded-md border border-gray5 bg-gray2 px-3 py-2"
          placeholder="輸入訊息..."
        />
        <button
          :disabled="!inputVendorMessage"
          type="button"
          id="vendorSendBtn"
          class="btn-orange shrink-0"
          @click="sendVendorMessage"
        >
          送出
        </button>
      </div>

      <!-- <input
        type="text"
        id="memberMessage"
        v-model="inputMemberMessage"
        placeholder="會員輸入訊息"
      />
      <button type="button" id="memberSendBtn" @click="sendMemberMessage">會員送出</button> 
    --></div>
  </div>
  <!-- * pc -->
  <div class="hidden h-[90vh] items-start gap-[30px] overflow-hidden lg:flex">
    <!-- * pc 聊天室列表 -->
    <div class="message-list" v-if="rooms.length">
      <div class="message-list-title">訊息中心</div>
      <div class="admin-select mb-7 flex">
        <input type="text" class="w-full" v-model="currentKeyword" placeholder="用戶名稱" />
        <button class="">
          <Icon name="fluent:search-48-filled" size="24" class="text-dark3"></Icon>
        </button>
      </div>

      <div class="max-h-full w-full">
        <div
          v-for="item in rooms"
          :key="item._id"
          @click="selectRoom(item)"
          :class="['message-list-item', { 'selected-room': roomId === item._id }]"
          class="flex gap-3"
        >
          <div
            v-if="currentMemberInfo.photo"
            class="h-[44px] min-h-[44px] w-[44px] min-w-[44px] overflow-hidden rounded-full"
          >
            <img :src="currentMemberInfo?.photo" alt="" class="pic-auto" />
          </div>
          <Icon
            v-else
            size="44"
            class="min-w-[44px] text-gray4"
            name="material-symbols:account-circle-full"
          />
          <div class="grow">
            <div class="">{{ item._id }}</div>
            <div class="">{{ item.memberId?.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- * pc 聊天框 -->
    <div class="message-block" v-if="messages && roomId">
      <!-- ? 測試資料 -->
      <!-- <div>
        <p>
          會員ID: <span id="memberId">{{ memberId }}</span>
        </p>
        <p>
          廠商ID: <span id="vendorId">{{ vendorId }}</span>
        </p>
        <p>
          房間ID: <span id="roomId">{{ roomId }}</span>
        </p>
      </div> -->

      <!-- ? 用戶資料 -->
      <div class="flex items-center gap-3 border-b border-[#DFE4EA] p-4" v-if="currentMemberInfo">
        <div v-if="currentMemberInfo.photo" class="h-[52px] w-[52px] overflow-hidden rounded-full">
          <img :src="currentMemberInfo?.photo" alt="" class="pic-auto" />
        </div>
        <Icon v-else size="52" class="text-gray4" name="material-symbols:account-circle-full" />

        <div class="grow">{{ currentMemberInfo.name }}</div>

        <button @click="closeChatRoom">
          <Icon name="material-symbols:close-rounded" size="24" class="text-gray"></Icon>
        </button>
      </div>

      <!-- ? 訊息 -->
      <div id="list" ref="messageList" class="flex h-full grow flex-col gap-3 overflow-y-auto p-5">
        <div v-for="(message, index) in messages" :key="index">
          <div v-if="message.memberId">
            <div class="text-[14px] text-text-secondary">{{ currentMemberInfo.name }}</div>
            <div class="message left">
              <div class="left-content">{{ message.content }}</div>
            </div>
            <div class="message-date">{{ message.timestamp }}</div>
          </div>
          <div v-else class="message right">
            <div class="right-content">
              {{ message.content }}
            </div>
            <div class="message-date">{{ message.timestamp }}</div>
          </div>
        </div>
      </div>

      <!-- ? 輸入框 -->
      <div class="flex gap-5 border-t border-[#DFE4EA] p-5">
        <input
          type="text"
          v-model="inputVendorMessage"
          class="w-full rounded-md border border-gray5 bg-gray2 px-3 py-2"
          placeholder="輸入訊息..."
        />
        <button
          :disabled="!inputVendorMessage"
          type="button"
          id="vendorSendBtn"
          class="btn-orange shrink-0"
          @click="sendVendorMessage"
        >
          送出
        </button>
      </div>

      <!-- <input
        type="text"
        id="memberMessage"
        v-model="inputMemberMessage"
        placeholder="會員輸入訊息"
      />
      <button type="button" id="memberSendBtn" @click="sendMemberMessage">會員送出</button> 
    --></div>
  </div>
</template>

<style scoped>
/* NOTE mb */

.m-message-list {
  @apply w-full overflow-y-auto rounded-lg bg-white p-5;
  box-shadow: 0px 1px 3px 0px #a6afc366;
}

.m-message-block {
  @apply fixed inset-0 z-[999] flex grow flex-col rounded-lg border border-[#DFE4EA] bg-white;
}

/* NOTE pc */
.message-list {
  @apply w-[360px] max-w-[360px] overflow-y-auto rounded-lg bg-white p-5;
  box-shadow: 0px 1px 3px 0px #a6afc366;
}

.message-list-title {
  @apply mb-5 border-b border-[#DFE4EA] pb-3 text-[30px] font-medium;
}

.message-list-item {
  @apply cursor-pointer border-b border-gray3 px-4 py-2;
}

.message-block {
  @apply flex h-full max-h-screen grow flex-col rounded-lg border border-[#DFE4EA] bg-white;
}

.message.left {
  @apply mr-auto flex  flex-col items-start gap-1 text-left;
  max-width: 375px;
  width: 50%;
}

.left-content {
  @apply max-w-full text-wrap bg-gray2 px-5 py-3 text-black;
  border-radius: 0px 16px 16px 16px;
  word-wrap: break-word;
  white-space: normal;
  text-align: left;
}

.message.right {
  @apply ml-auto flex flex-col items-end gap-1 text-right;
  max-width: 375px;
  width: 50%;
}

.right-content {
  @apply max-w-full text-wrap px-5 py-3 text-white;
  background: #2b71bf;
  border-radius: 16px 16px 0px 16px;
  word-wrap: break-word;
  white-space: normal;
  text-align: left;
}

.message-date {
  @apply text-[12px] text-text-secondary;
}

.selected-room {
  background-color: #f0f0f0; /* 你可以根據需要更改這個顏色 */
  border-radius: 5px;
}
</style>
