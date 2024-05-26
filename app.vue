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
  title: 'Ciao!Craft - DIY 手作平台',
  htmlAttrs: {
    lang: 'zh-TW'
  },
  meta: [
    {
      name: 'description',
      content:
        '歡迎來到使用 Nuxt 3 開發的Ciao!Craft - DIY 手作平台，本網站僅作為參加六角 Node.js 團體專題使用'
    },
    { name: 'twitter:title', content: 'Ciao!Craft - DIY 手作平台' },
    {
      name: 'twitter:description',
      content:
        '歡迎來到使用 Nuxt 3 開發的Ciao!Craft - DIY 手作平台，本網站僅作為參加六角 Node.js 團體專題使用'
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
