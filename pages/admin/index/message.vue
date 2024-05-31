<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'

const userIP: any = ref('')

onMounted(() => {
  getUserIP()
})

// NOTE 取得使用者IP
async function getUserIP() {
  try {
    showLoading()

    const res = await store.apiGetUserIp()
    const result = res.data
    console.log(`getUserIP result = ${JSON.stringify(result)}`)

    userIP.value = result.ip
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="">{{ userIP }}</div>
</template>
<style scoped></style>
