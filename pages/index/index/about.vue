<script lang="ts" setup></script>

<template>
  <div class="h-full w-full bg-[#F9FAFB]">
    <div class="page">
      <div class="banner">
        <img src="~/assets/images/front/about/banner.jpeg" alt="banner" class="pic-auto" />
      </div>

      <div class="mx-auto mt-[60px] max-w-[300px]">
        <img src="~/assets/images/admin/logo.svg" alt="logo" class="pic-auto" />
      </div>

      <section class="flex flex-col items-center">
        <!-- * 關於「巧手玩藝」 -->
        <div class="max-w-[800px] text-center">
          <div class="mt-[60px] text-[36px] lg:text-[30px]">關於「巧手玩藝」</div>
          <p class="mt-5">
            歡迎來到「巧手玩藝」，一個專為熱愛創作與學習手作技藝的您打造的社群平台！我們致力於連結具有獨特專業技能的品牌賣家與渴望學習的學員，為您提供一個豐富多元的手作體驗空間。不論您是想要尋找生活中的樂趣、提升專業技能，抑或是發展斜槓事業，「巧手玩藝」都能滿足您的需求。
          </p>
          <p class="mt-5">
            在這裡，您可以輕鬆瀏覽各種課程，從金工、美甲到繪畫等各式各樣的手作技藝應有盡有。我們提供單堂體驗課以及有系統的長期培訓課程，讓您能夠根據自己的興趣和需求選擇最合適的學習方式。課程內容豐富多彩，品質保證，讓您放心學習，享受手作的樂趣。
          </p>
        </div>
        <div class="flex flex-col gap-[30px] py-10 lg:flex-row">
          <div class="about-item hover-auto">
            <div class="w-[150px] min-w-[150px] max-w-[150px]">
              <img
                src="~/assets/images/front/about/p1.png"
                alt="整合線下工作坊課程"
                class="pic-auto"
              />
            </div>
            <div class="about-item-content">
              <h3 class="font-medium">整合線下工作坊課程</h3>
              <p>提供各類型的線下工作坊之課程資訊方便學員瀏覽、與品牌線上對話及預約課程</p>
            </div>
          </div>
          <div class="about-item hover-auto">
            <div class="w-[150px] min-w-[150px] max-w-[150px]">
              <img
                src="~/assets/images/front/about/p2.png"
                alt="選擇適合您的課程"
                class="pic-auto"
              />
            </div>
            <div class="about-item-content">
              <h3 class="font-medium">選擇適合您的課程</h3>
              <p>除了提供不同課程類型，將課程區分「單堂體驗」和「系統培訓」，方便學員查詢</p>
            </div>
          </div>
          <div class="about-item hover-auto">
            <div class="w-[150px] min-w-[150px] max-w-[150px]">
              <img
                src="~/assets/images/front/about/p3.png"
                alt="課程體驗的社群平台"
                class="pic-auto"
              />
            </div>
            <div class="about-item-content">
              <h3 class="font-medium">課程體驗的社群平台</h3>
              <p>重視每堂課程的體驗，鼓勵學員分享課後心得，提供有興趣的學員寶貴的評價</p>
            </div>
          </div>
        </div>

        <!-- * 如何累積點數 -->
        <div class="w-full max-w-[800px] text-center">
          <div class="mt-[60px] text-[36px] lg:text-[30px]">如何累積點數</div>
          <p class="mt-5">
            在「巧手玩藝」，您不僅能夠學習手作技藝，還能夠通過參與社群互動來累積點數，獲得更多的回饋和禮遇！
          </p>
          <p class="mt-5">
            當您參加完課程後，可以在線上分享您的學習心得和體驗，包括評分和評價。您的分享將為其他學員提供有價值的參考，同時也能夠為品牌賣家帶來更多曝光和支持。每次分享體驗心得或收到他人的支持，您都將獲得一定的點數獎勵。累積的點數可以用於未來預約課程時的折扣或禮品兌換，讓您在學習的同時享受更多的優惠和驚喜。此外，點數還能夠提升您在社群中的等級和身份，讓您成為更受尊敬和關注的一員。在「巧手玩藝」，您不僅能夠獲得專業的手作技能，還能夠與其他手作愛好者共同成長，一起享受手作帶來的樂趣和成就感。
          </p>
          <p class="mt-5">快來加入我們的社群，一起探索創意的無限可能吧！</p>
        </div>

        <div class="flex w-full flex-col gap-[30px] py-10 md:flex-row">
          <div class="point-item hover-auto">
            <div class="w-[150px] min-w-[150px] max-w-[150px]">
              <img
                src="~/assets/images/front/about/p4.png"
                alt="整合線下工作坊課程"
                class="pic-auto"
              />
            </div>
            <div class="point-item-content">預約課程</div>
          </div>
          <div class="point-item hover-auto">
            <div class="w-[150px] min-w-[150px] max-w-[150px]">
              <img
                src="~/assets/images/front/about/p5.png"
                alt="選擇適合您的課程"
                class="pic-auto"
              />
            </div>
            <div class="point-item-content">分享課後評論</div>
          </div>
          <div class="point-item hover-auto">
            <div class="w-[150px] min-w-[150px] max-w-[150px]">
              <img
                src="~/assets/images/front/about/p6.png"
                alt="課程體驗的社群平台"
                class="pic-auto"
              />
            </div>
            <div class="point-item-content">您的評論獲得支持</div>
          </div>
        </div>

        <!-- * 表單 -->
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  @apply mx-auto max-w-[1200px] px-5 py-12;
}
.banner {
  @apply flex h-[300px] max-h-[300px] items-center justify-center overflow-hidden rounded-[12px];
}

/* about-item */
.about-item {
  @apply flex items-center gap-3 rounded-lg border border-[#DFE4EA] bg-white p-3 lg:flex-col;
}

.about-item:hover {
  @apply border-primary;
  box-shadow: 0px 10px 15px 0px #050d1d2e;
}

.about-item-content {
  @apply flex flex-col gap-3 lg:items-center lg:text-center;
}

/* point-item */
.point-item {
  @apply flex grow flex-col items-center gap-3 rounded-lg border border-[#DFE4EA] bg-white p-3;
}

.point-item:hover {
  @apply border-primary;
  box-shadow: 0px 10px 15px 0px #050d1d2e;
}

.point-item-content {
  @apply text-center font-medium;
}
</style>
