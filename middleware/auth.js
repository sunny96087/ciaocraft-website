// 可以用於驗證是否登入，如果沒有登入就導向首頁
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    const nuxtApp = useNuxtApp()
    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
        return
    }
    else {
        authStore.checkLogin()
        console.log('middleware', authStore.isLogin)
        if (authStore.isLogin) {
            return
        } else {
            return navigateTo('/')
        }
    }
    // debugger
    // 在客戶端檢查是否正在 Hydrating
    // if (process.client && nuxtApp.isHydrating) {
    //     return
    // }

    // await authStore.checkLogin()
    // const isLogin = authStore.isLogin

    // // 如果沒有登入就導向首頁
    // if (!isLogin) {
    //     console.log('login', isLogin)
    //     return navigateTo('/')
    // }
    // else {
    //     // 取得當前路由參數
    //     const { params } = from
    //     console.log('params', params)
    //     // return navigateTo('/')
    // }

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