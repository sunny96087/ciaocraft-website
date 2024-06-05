<script setup land="ts">
const emit = defineEmits(['changeContent'])
const router = useRouter()
const hasError = ref(false)
const alert = ref('方便巧手玩藝推薦更適合你的課程。')
const nickName = ref('')

const toHome = () => {
  emit('changeContent', 'close')
}
const toMemberProfile = () => {
  console.log('toMemberProfile')
  emit('changeContent', 'close')
  router.push('/member/profile')
}
</script>
<template>
  <div class="mx-auto space-y-8 md:px-[60px]">
    <div class="space-y-4">
      <span class="block text-center text-2xl font-medium">基本資料</span>
      <span class="block text-center" :class="{ 'text-danger': hasError }">{{ alert }}</span>
    </div>
    <div class="mb-4 w-full">
      <div
        class="textransition-transform mb-1 flex items-center justify-between rounded-[4px] border border-solid border-gray px-4 py-2"
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
      <span class="font-secondary mb-3 block text-[14px] text-[#7d7d7d]">
        除了評論將以匿名顯示，巧手玩意將以此稱呼您。
      </span>
      <div class="space-y-2">
        <span class="block">有興趣的領域(多選)</span>
        <div
          class="flex flex-wrap justify-between gap-5 rounded-[4px] border-[1px] border-solid border-[#AAAAAA] p-4"
        >
          <div class="flex items-center">
            <input type="checkbox" id="craft" name="craft" value="craft" class="craft" checked />
            <label for="craft" class="">工藝手作</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="cooking" name="cooking" value="cooking" />
            <label for="cooking">烹飪烘烤</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="art" name="art" value="art" />
            <label for="art">藝術人文</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="lifestyle" name="lifestyle" value="lifestyle" />
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
        class="w-1/2 rounded-[4px] border-[1px] border-solid border-primary py-2"
        @click="toHome()"
      >
        逛逛賣場
      </button>
      <button
        class="w-1/2 rounded-[4px] border-[1px] border-solid bg-primary py-2 text-center text-white"
        @click="toMemberProfile()"
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
  width: 20px;
  height: 20px;
  border: 1px solid var(--color-secondary);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-right: 10px; /* 增加與文字的間距 */
}

/* 模擬未選中的狀態 */
input[type='checkbox']::before {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
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
