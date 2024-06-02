<script setup lang="ts"></script>

<template>
  <div class="px-5 lg:px-[100px]">
    <ul class="mx-auto max-w-screen-xl pb-[60px] pt-[30px] lg:py-[60px]">
      <li class="mb-10 lg:mb-5">
        <a href="#"><img src="~/assets/images/front/Logo_Img(footer).png" alt="logo" /></a>
      </li>
      <li>
        <ul class="flex flex-col lg:flex-row lg:justify-between">
          <li class="footerText order-2 mb-5 lg:order-none lg:mb-0">
            歡迎來到「巧手玩藝」，一個專為熱愛創作與學習手作技藝的您打造的社群平台！我們致力於連結具有獨特專業技能的品牌賣家與渴望學習的學員，為您提供一個豐富多元的手作體驗空間。不論您是想要尋找生活中的樂趣、提升專業技能，抑或是發展斜槓事業，「巧手玩藝」都能滿足您的需求。
          </li>
          <li class="order-1 mb-[30px] lg:order-none lg:mb-0">
            <ul class="flex">
              <li class="mr-[30px]"><a href="#">關於我們</a></li>
              <li class="mr-[30px]">
                <NuxtLink to="/vendorApply">我要開課</NuxtLink>
              </li>
              <li class="mr-[30px]"><a href="#">使用者條款</a></li>
              <li class="mr-[30px]"><a href="#">服務契約</a></li>
              <li><a href="#">隱私權政策</a></li>
            </ul>
          </li>
        </ul>
        <p class="order-last lg:order-none lg:text-right">
          © 2024 Ciao! Craft. All Rights Reserved.
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .footerText {
    width: 40%;
  }
}

@media (min-width: 1280px) {
  .footerText {
    width: 46%;
  }
}
</style>
