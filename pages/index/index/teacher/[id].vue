<script setup lang="ts">
import { APIStore } from '~/stores/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/stores/eventBus'
const router = useRouter()
const route = useRoute()

// 選單顯示狀態
const isSortOpen = ref<boolean>(false)
// 切換排序選單顯示狀態
const toggleSort = (): void => {
  isSortOpen.value = !isSortOpen.value
}

// teacher
const teacherId = ref()
const teacherInfo: any = ref({})

onMounted(async () => {
  // 從網址取得參數
  teacherId.value = route.params.id
  getTeacherData()
})

// 取得教師資料
async function getTeacherData() {
  try {
    showLoading()

    let data = {
      teacherId: teacherId.value
    }

    const res = await store.apiGetTeacher(data)
    const result = res.data
    console.log(`getTeacherData result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      teacherInfo.value = result.data
      console.log(`teacherInfo = ${JSON.stringify(teacherInfo.value)}`)
    } else {
      console.log('取得教師資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>

<template>
  <div v-if="teacherInfo" class="mx-[20px] pt-14 lg:mx-[100px]">
    <section class="mb-[56px]">
      <!-- <front-coash-title /> -->
      <ul class="justify-between md:flex">
        <li
          class="mb-[30px] flex justify-center md:mb-0 md:content-center md:items-center lg:flex-none lg:justify-normal"
        >
          <div class="h-[180px] w-[180px] md:mb-0 lg:h-[287px] lg:w-[287px]">
            <img
              :src="teacherInfo?.photo"
              alt="品牌賣場橫幅圖片"
              class="d-block mx-auto h-full w-full rounded-full object-cover"
            />
          </div>
        </li>
        <li class="mx-auto flex w-full content-center items-center md:w-4/6 lg:w-7/12 xl:w-3/4">
          <div class="mx-auto md:w-full">
            <ul class="mb-3">
              <li class="mb-2 text-center text-lg leading-[26px] md:text-left">師資</li>
              <li class="mb-2 text-center text-[40px] font-medium leading-[48px] md:text-left">
                {{ teacherInfo?.name }}
              </li>
              <li>
                {{ teacherInfo?.intro }}
              </li>
            </ul>
            <ul class="flex items-center justify-between">
              <li class="text-primary">{{ teacherInfo.vendorId?.brandName }}</li>
              <li>
                <ul>
                  <li class="flex items-center justify-end">
                    <a
                      v-if="teacherInfo.socialMediaInfo?.[0]?.link"
                      :href="teacherInfo.socialMediaInfo[0].link"
                      target="_blank"
                    >
                      <Icon name="ph:facebook-logo-fill" class="mr-2 text-[40px]" />
                    </a>
                    <a
                      v-if="teacherInfo.socialMediaInfo?.[1]?.link"
                      :href="teacherInfo.socialMediaInfo[1].link"
                      target="_blank"
                    >
                      <Icon name="ph:instagram-logo-fill" class="mr-2 text-[40px]" />
                    </a>
                    <a
                      v-if="teacherInfo.socialMediaInfo?.[2]?.link"
                      :href="teacherInfo.socialMediaInfo[2].link"
                      target="_blank"
                    >
                      <Icon name="ph:house-fill" class="text-[40px]" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
    <article class="mb-[30px]">
      <!-- <front-coash-detail /> -->
      <div>
        <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">
          師資介紹
        </h4>
        <!-- <img
          src="~/assets/images/front/Banner_2.png"
          alt="師資頁面照"
          class="object-over mb-5 h-[220px] w-full"
        /> -->
        <p class="mb-5">
          {{ teacherInfo?.description }}
        </p>
        <!-- <div class="flex justify-center pb-[66px]">
          <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
            展開內容
          </button>
        </div> -->
      </div>
    </article>
    <div class="mb-5">
      <h4 class="mb-5 border-b border-dark1 pb-3 text-[30px] font-medium leading-[38px]">課程</h4>
      <div class="mb-5 flex items-center justify-between">
        <!-- <div>
          <select name="course" id="course" class="mr-5 rounded border border-dark1 px-4 py-2">
            <option value="單堂體驗">單堂體驗</option>
          </select>
          <select name="courseType" id="courseType" class="rounded border border-dark1 px-4 py-2">
            <option value="工藝手作">工藝手作</option>
          </select>
        </div>
        <div class="relative">
          <button class="flex items-center" @click="toggleSort">
            <p class="mr-0.5 text-primary">排序</p>
            <Icon name="ph:arrows-down-up" class="text-xl text-primary" />
          </button>
          <ul
            :class="[
              'sort absolute right-0 z-50 w-[120px] rounded border border-gray5 bg-white text-center',
              { hidden: !isSortOpen, block: isSortOpen }
            ]"
          >
            <li>
              <button
                class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                @click="toggleSort"
              >
                最近時間
              </button>
            </li>
            <li>
              <button
                class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                @click="toggleSort"
              >
                熱門課程
              </button>
            </li>
            <li>
              <button
                class="d-block w-full py-1 hover:bg-secondary hover:text-white"
                @click="toggleSort"
              >
                評分最高
              </button>
            </li>
          </ul>
        </div> -->
      </div>

      <!-- * courses -->
      <!-- <front-product-card /> -->
      <div
        v-if="teacherInfo.courseId?.length > 0"
        class="grid grid-cols-2 items-stretch gap-[30px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <nuxt-link
          v-for="item in teacherInfo.courseId"
          :key="item._id"
          :to="`/course/${item._id}`"
          class="relative flex flex-col"
        >
          <div
            class="course mb-2 flex h-[223px] max-h-[223px] w-full items-center justify-center overflow-hidden rounded"
          >
            <img
              v-if="item.courseImage?.length > 0"
              :src="item.courseImage[0]"
              alt="課程圖片"
              class="pic-auto"
            />
            <div v-else class="flex h-full w-full items-center justify-center bg-gray3 text-gray">
              圖片還在準備中
            </div>
          </div>
          <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
          <div class="flex grow flex-col">
            <div class="mb-2 flex grow items-start">
              <p
                v-if="item.courseTerm === 0"
                class="mr-[8px] shrink-0 rounded bg-blue4 px-2 py-0.5 text-secondary"
              >
                體驗
              </p>
              <p v-else class="mr-[8px] shrink-0 rounded bg-primary-light px-2 py-0.5 text-white">
                培訓
              </p>
              <p>{{ item.courseName }}</p>
            </div>
            <p class="mb-1 text-sm leading-[22px]">{{ teacherInfo.vendorId?.brandName }}</p>
            <p class="text-secondary">
              NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">{{ item.coursePrice }}</span>
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <!-- <div class="flex justify-center pb-[66px]">
      <button class="rounded bg-primary px-6 py-2 text-white hover:bg-primary-light">
        載入更多
      </button>
    </div> -->
  </div>
</template>
