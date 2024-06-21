<script setup lang="ts">
const router = useRouter()
const keyword = ref('')

const clickToSearch = () => {
  router.push({ path: '/search', query: { keyword: keyword.value } })
}
</script>

<template>
  <div class="flex justify-between bg-white px-5 py-[18px]">
    <input
      id="search"
      class="mr-3 w-full outline-none"
      type="text"
      name="search"
      placeholder="搜尋適合您的手作體驗、培訓課程"
      v-model="keyword"
    />
    <button @click="clickToSearch">
      <Icon name="ph:magnifying-glass" class="text-xl" />
    </button>
  </div>
</template>
