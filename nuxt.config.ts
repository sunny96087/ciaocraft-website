// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-swiper', 'nuxt-icon', '@pinia/nuxt'],
  css: ['~/assets/css/main.css']
})
