<script setup lang="ts">
const memberStore = useMemberStore()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (process.client) {
    const token: any = route.query.user
    const memberId: any = route.query.memberId

    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('memberId', memberId)
    }

    showLoading()
    const res = await memberStore.getMember()
    const result = res.data
    if (result.statusCode === 200) {
      memberStore.member = result.data
      router.push('/')
    }
    hideLoading()
  }
})
</script>

<template></template>
