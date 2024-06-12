// 可以用於驗證是否登入，如果沒有登入就導向首頁
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const nuxtApp = useNuxtApp()

    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
        authStore.checkLogin()
        console.log('middleware', authStore.isLogin)
        if (authStore.isLogin) {
            return
        } else {
            alert('請先登入')
            return navigateTo('/')
        }
    }
})