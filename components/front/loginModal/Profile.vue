<script setup land="ts">
const memberStore = useMemberStore()
const emit = defineEmits(['changeContent'])
const router = useRouter()
const alertText = ref('除了評論將以匿名顯示，巧手玩意將以此稱呼您。')
const isNameFilled = ref()
const nickName = ref('')
const interests = ref([])
const isUpdateSuccess = ref(false)

const updateProfile = async () => {
  if (!nickName.value) {
    alertText.value = '請輸入暱稱'
    isNameFilled.value = true
    return
  }
  showLoading()
  const postData = {
    nickname: nickName.value,
    interests: interests.value
  }
  await memberStore
    .updateMember(postData)
    .then((res) => {
      hideLoading()
      console.log(res.data)
      showToast('更新成功')
      isUpdateSuccess.value = true
    })
    .catch((err) => {
      hideLoading()
      console.log(err)
      showToast('儲存失敗，請再試一次', 'error')
      isUpdateSuccess.value = false
    })
}

const saveAndToHome = () => {
  updateProfile()
  if (isUpdateSuccess.value) {
    emit('changeContent', 'close')
    router.push('/search')
  } else {
    showToast('儲存失敗，請再試一次', 'error')
  }
}

const saveToMemberProfile = () => {
  updateProfile()
  if (isUpdateSuccess.value) {
    emit('changeContent', 'close')
    router.push('/member/profile')
  } else {
    showToast('儲存失敗，請再試一次', 'error')
  }
}

watchEffect(() => {
  if (nickName.value) {
    isNameFilled.value = false
    alertText.value = '除了評論將以匿名顯示，巧手玩意將以此稱呼您。'
  }
})
</script>
<template>
  <div class="mx-auto space-y-8 md:px-[60px]">
    <div class="space-y-4">
      <span class="block text-center text-2xl font-medium">基本資料</span>
      <span class="block text-center">方便巧手玩藝推薦更適合你的課程。 </span>
    </div>
    <div class="mb-4 w-full">
      <div
        class="textransition-transform mb-1 flex items-center justify-between rounded-[4px] border border-solid px-4 py-2"
        :class="{ 'border-danger': isNameFilled, 'border-gray': !isNameFilled }"
      >
        <Icon name="ph:user-light" class="mr-2 flex w-4 items-center justify-center self-center" />
        <input
          class="w-full"
          type="text"
          name="nickName"
          v-model="nickName"
          placeholder="暱稱*"
          autocomplete="off"
        />
      </div>
      <span
        class="font-secondary mb-3 block text-[14px]"
        :class="{ 'text-danger': isNameFilled, 'text-dark3': !isNameFilled }"
      >
        {{ alertText }}
      </span>
      <div class="space-y-2">
        <span class="block">有興趣的領域(多選)</span>
        <div
          class="flex flex-wrap justify-between gap-5 rounded-[4px] border-[1px] border-solid border-[#AAAAAA] p-4"
        >
          <div class="flex items-center">
            <input
              type="checkbox"
              id="craft"
              name="工藝手作"
              value="工藝手作"
              checked
              v-model="interests"
            />
            <label for="craft" class="">工藝手作</label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="cooking"
              name="cooking"
              value="烹飪烘烤"
              v-model="interests"
            />
            <label for="cooking">烹飪烘烤</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="art" name="art" value="藝術人文" v-model="interests" />
            <label for="art">藝術人文</label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="lifestyle"
              name="lifestyle"
              value="生活品味"
              v-model="interests"
            />
            <label for="lifestyle">生活品味</label>
          </div>
        </div>
        <span class="font-secondary block text-[14px] text-[#7d7d7d]">
          除了評論將以匿名顯示，巧手玩意將以此稱呼您。
        </span>
      </div>
    </div>
    <div class="flex w-full space-x-2">
      <button
        class="w-1/2 rounded-[4px] border-[1px] border-solid border-primary py-2 text-center text-primary transition duration-300 hover:bg-primary hover:text-white"
        @click="saveAndToHome()"
      >
        逛逛賣場
      </button>
      <button
        class="w-1/2 rounded-[4px] border-[1px] border-solid bg-primary py-2 text-center text-white transition duration-300 hover:bg-primary-light hover:text-white"
        @click="saveToMemberProfile()"
      >
        填寫完整個人資料
      </button>
    </div>
  </div>
</template>
<style>
/* 隱藏原本的 checkbox */
input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  min-width: 20px;
  min-height: 20px;
  border: 1px solid var(--color-secondary);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-right: 8px; /* 增加與文字的間距 */
}

/* 模擬未選中的狀態 */
input[type='checkbox']::before {
  content: '';
  display: block;
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 模擬選中的狀態 */
input[type='checkbox']:checked::before {
  background: var(--color-secondary);
}

label {
  display: flex;
  align-items: center; /* 垂直居中 */
}
</style>
