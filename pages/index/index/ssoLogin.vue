<script setup lang="ts">
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (process.client) {
    const token = route.query.user
    const memberId = route.query.memberId
    const name = route.query.name
    const photo = route.query.photo
    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('memberId', memberId)
      localStorage.setItem('name', name)
      localStorage.setItem('photo', photo)
    }

    console.log('ssoLogin', token)
    console.log('ssoLogin', memberId)
    console.log('ssoLogin', name)
    console.log('ssoLogin', photo)

    if (localStorage.getItem('token')) {
      authStore.isLogin = true
      router.push('/')
    }
  }
})
</script>

<template></template>
