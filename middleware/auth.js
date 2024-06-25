// 可以用於驗證是否登入，如果沒有登入就導向首頁
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const nuxtApp = useNuxtApp()
    const router = useRouter()

    // 在客戶端檢查是否正在 Hydrating
    if (process.client && nuxtApp.isHydrating) {
        return
    }

    authStore.checkLogin()

    if (!authStore.isLogin) {
        return navigateTo('/')
    }
    // if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
    //     authStore.checkLogin()
    //     if (authStore.isLogin) {
    //         return
    //     } else {
    //         return router.push('/')
    //         // return navigateTo('/')
    //     }
    // }
})