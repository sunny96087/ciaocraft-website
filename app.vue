<template>
  <div>
    <NuxtPage />

    <common-loading-tool class="z-50" />
    <common-toast-tool class="z-50" />
    <common-custom-dialog class="z-50" />
  </div>
</template>

<script setup>
useHead({
  title: 'DIY 手作平台 - Ciao!Craft',
  htmlAttrs: {
    lang: 'zh-TW'
  },
  meta: [
    {
      name: 'description',
      content:
        '歡迎來到使用 Nuxt 3 開發的DIY 手作平台 - Ciao!Craft，本網站僅作為參加六角 Node.js 團體專題使用'
    },
    { name: 'twitter:title', content: 'Nuxt 3 DIY 手作平台 - Ciao!Craft' },
    {
      name: 'twitter:description',
      content:
        '歡迎來到使用 Nuxt 3 開發的DIY 手作平台 - Ciao!Craft，本網站僅作為參加六角 Node.js 團體專題使用'
    },
    { name: 'twitter:image', content: 'https://i.imgur.com/AVNujNC.png' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Ciao!Craft' }
  ],
  link: [
    {
      rel: 'icon',
      href: '/icon.svg'
    }
  ]
})
</script>
