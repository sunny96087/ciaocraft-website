<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  // 導航到前台首頁
  router.push('/front')
})
</script>

<template>
  <div></div>
</template>
