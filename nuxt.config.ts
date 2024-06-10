// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-swiper', 'nuxt-icon', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      {
        name: 'load-svg',
        enforce: 'pre',
        transform(src, id) {
          if (id.endsWith('.svg')) {
            const svgExport = `const content = ${JSON.stringify(src)};
              export default content;`
            return svgExport
          }
        }
      }
    ]
  }
})
