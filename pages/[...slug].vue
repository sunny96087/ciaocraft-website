<script setup lang="ts"></script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div>
      <img src="~/assets/images/error_page.png" alt="找不到頁面" class="mx-auto block" />
      <p class="mb-[70px] text-center text-[40px] font-medium leading-[48px]">404 Page No Found</p>
      <NuxtLink to="/" class="flex justify-center">
        <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
          回首頁
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
