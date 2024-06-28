export default defineNuxtRouteMiddleware(async (to, from) => {
    // 驗證權限頁面，監控 isLogin 如非登入狀態則導向首頁
    const authStore = useAuthStore()
    const nuxtApp = useNuxtApp()

    watch(
        () => authStore.isLogin,
        (newValue) => {
            if (!newValue) {
                return navigateTo('/');
            }
            else {
                return
            }
        }
    )

    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
        await authStore.checkLogin()
        if (!authStore.isLogin) {
            return navigateTo('/')
        }
    }
})