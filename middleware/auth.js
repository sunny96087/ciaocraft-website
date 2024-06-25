// 可以用於驗證是否登入，如果沒有登入就導向首頁
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    const nuxtApp = useNuxtApp()
    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
        return
    }
    else {
        authStore.checkLogin()
        if (authStore.isLogin) {
            return
        } else {
            return navigateTo('/')
        }
    }
})