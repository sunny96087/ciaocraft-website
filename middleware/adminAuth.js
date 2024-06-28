export default defineNuxtRouteMiddleware(async (to, from) => {
  // 驗證權限頁面，監控 isLogin 如非登入狀態則導向首頁
  const authStore = APIStore()
  const router = useRouter()
  const nuxtApp = useNuxtApp()

  watch(
    () => authStore.vendorInfo,
    (newValue) => {
      if (!newValue) {
        return navigateTo('/adminLogin')
      } else {
        return
      }
    }
  )

  if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    await authStore.checkVendorLogin()
    if (!authStore.vendorInfo) {
      router.push('/adminLogin')
    }
  }
})
