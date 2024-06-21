<script setup lang="ts"></script>

<template>
  <div class="bg-gray1">
    <div class="mb-[30px] pt-5">
      <front-banner />
    </div>
    <div
      class="mx-5 mb-[30px] overflow-hidden rounded-[40px] border border-gray md:mx-[84px] lg:mx-[360px]"
    >
      <front-search />
    </div>
    <div
      class="mx-5 mb-[66px] overflow-hidden rounded-xl border border-white filter md:mx-10 lg:mx-[350px]"
    >
      <front-filter />
    </div>
    <div class="mx-5 lg:mx-[100px]">
      <div class="mx-auto max-w-screen-xl pb-9">
        <div class="mb-9">
          <div class="mb-[30px] flex items-end">
            <h2 class="mr-5 text-3xl font-medium leading-[38px]">藝術人文</h2>
            <a href="#" class="flex">
              <p class="mr-1 text-primary">更多</p>
              <Icon name="ph:caret-right" class="text-xl text-primary" />
            </a>
          </div>
          <front-product-card-swiper courseType="藝術人文" />
        </div>
        <div class="mb-9">
          <div class="mb-[30px] flex items-end">
            <h2 class="mr-5 text-3xl font-medium leading-[38px]">工藝手作</h2>
            <a href="#" class="flex">
              <p class="mr-1 text-primary">更多</p>
              <Icon name="ph:caret-right" class="text-xl text-primary" />
            </a>
          </div>
          <front-product-card-swiper courseType="工藝手作" />
        </div>
        <div class="mb-9">
          <div class="mb-[30px] flex items-end">
            <h2 class="mr-5 text-3xl font-medium leading-[38px]">你可能適合</h2>
            <a href="#" class="flex">
              <p class="mr-1 text-primary">更多</p>
              <Icon name="ph:caret-right" class="text-xl text-primary" />
            </a>
          </div>
          <front-product-card-swiper />
        </div>
        <div class="text-dark1">
          <front-about />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter {
  box-shadow: 0px 10px 15px 0px #050d1d2e;
}
</style>
