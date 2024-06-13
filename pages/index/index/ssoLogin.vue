<script setup lang="ts">
const authStore = useAuthStore()
const memberStore = useMemberStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (process.client) {
    const token: any = route.query.user
    const memberId: any = route.query.memberId

    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('memberId', memberId)
    }

    memberStore
      .getMember()
      .then((res: any) => {
        const result = res.data
        console.log('member', result.data)
        localStorage.setItem('name', result.data.name)
        localStorage.setItem('photo', result.data.photo)
        authStore.isLogin = true
        router.push('/')
      })
      .catch((err) => {
        alert('登入失敗，請重新嘗試')
        router.push('/')
      })
  }
})
</script>

<template></template>
