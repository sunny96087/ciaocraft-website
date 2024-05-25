<script setup lang="ts"></script>
<template>
  <div
    class="sign-in w-[560px] mx-auto flex flex-col items-center mt-[100px] p-6 outline text-[16px] leading-[24px]"
  >
    <div class="mb-6">
      <img src="/assets/images/Logo_Img.png" alt="ciao-craft-logo" />
    </div>
    <figure class="flex flex-col items-center gap-4">
      <img src="/assets/images/Open Doodles Float.png" alt="open-doodles-float" />
      <figcaption>Enjoy Your Learning !</figcaption>
    </figure>

    <div class="flex flex-col items-center mt-6 gap-3">
      <button type="button" class="btn">
        <Icon name="basil:google-solid" class="transform translate-x-[-70%]" />
        <span>使用 Google 登入</span>
      </button>
      <button type="button" class="btn">
        <Icon name="clarity:email-solid" />
        <span class="ml-2">使用 會員帳號 登入</span>
      </button>
    </div>
    <div class="flex justify-center mt-6">
      <button class="text-primary">回上一頁</button>
    </div>
  </div>
</template>
<style scoped>
.btn {
  display: flex;

  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  border: 1px solid #292524;
  border-radius: 4px;
  background: #ffffff;
}
</style>
