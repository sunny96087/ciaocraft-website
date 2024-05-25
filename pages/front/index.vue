<script setup lang="ts">
import Header from '../../components/front/Header.vue'
import Footer from '../../components/front/Footer.vue'
import ProductCard from '../../components/front/ProductCard.vue'
import Search from '../../components/front/Search.vue'

import About from '../../pages/front/about.vue'
import Filter from '../../pages/front/filter.vue'
import Banner from '../../pages/front/banner.vue'
</script>

<template>
  <div class="border-b border-[#DFE4EA] mb-5">
    <Header />
  </div>
  <div class="mb-[30px]">
    <Banner />
  </div>
  <div class="border rounded-[40px] mx-5 md:mx-[84px] lg:mx-[360px] mb-[30px]">
    <Search />
  </div>
  <div class="rounded-xl border shadow-xl mb-[66px] mx-5 md:mx-10 lg:mx-[350px]">
    <Filter />
  </div>
  <div class="mx-5 lg:mx-[100px]">
    <div class="max-w-screen-xl mx-auto">
      <div class="mb-9">
        <div class="flex items-end mb-[30px]">
          <h2 class="text-3xl font-medium leading-[38px] mr-5">單堂體驗課程</h2>
          <a href="#" class="flex">
            <p class="mr-1 text-Primary-Orange">更多</p>
            <img src="~/assets/images/Icon(arrow).svg" alt="箭頭" />
          </a>
        </div>
        <ProductCard />
      </div>
      <div class="mb-9">
        <div class="flex items-end mb-[30px]">
          <h2 class="text-3xl font-medium leading-[38px] mr-5">系統培訓課程</h2>
          <a href="#" class="flex">
            <p class="mr-1 text-Primary-Orange">更多</p>
            <img src="~/assets/images/Icon(arrow).svg" alt="箭頭" />
          </a>
        </div>
        <ProductCard />
      </div>
      <div class="mb-9">
        <div class="flex items-end mb-[30px]">
          <h2 class="text-3xl font-medium leading-[38px] mr-5">你可能適合</h2>
          <a href="#" class="flex">
            <p class="mr-1 text-Primary-Orange">更多</p>
            <img src="~/assets/images/Icon(arrow).svg" alt="箭頭" />
          </a>
        </div>
        <ProductCard />
      </div>
      <div class="mb-9 text-Primary-Text">
        <About />
      </div>
    </div>
  </div>
  <div class="bg-Secondary-Blue text-white">
    <Footer />
  </div>
</template>
