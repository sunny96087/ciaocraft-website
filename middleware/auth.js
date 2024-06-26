export default defineNuxtRouteMiddleware(async (to, from) => {
    // 驗證權限頁面，監控 isLogin 如非登入狀態則導向首頁
    const authStore = useAuthStore()
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
})