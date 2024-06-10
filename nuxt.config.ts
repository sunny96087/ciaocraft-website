// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-swiper', 'nuxt-icon', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      {
        name: 'custom-phosphor-icons-handler',
        apply: 'build',
        transform(code, id) {
          // 检查模块ID是否包含特定的路径
          if (id.includes('node_modules/@phosphor-icons/vue')) {
            // 这里进行您需要的代码转换或修改
            // 例如，将导入语句改写为动态导入
            return `export const icon = ${JSON.stringify(code)};`
          }
          // 如果不匹配，则返回原始代码
          return code
        }
      }
    ]
  }
})
