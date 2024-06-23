<script setup lang="ts">
// 這個註解是我寫的嗎???(困惑)(非必要可刪)

// // 使用 ref 選取 dom 元素
// import { ref } from 'vue'

// // 定義 isStarShow 為布林類型的 ref
// // 使用 ref 管理漢堡選單的顯示狀態
// const isStarShow = ref<boolean>(false)

// // 定義 toggleStar 函數，其返回類型為 void
// // 切換漢堡選單顯示狀態
// const toggleStar = (): void => {
//   isStarShow.value = !isStarShow.value
// }

// 串接 API
import { useCourseStore } from '~/stores/course'
const courseStore = useCourseStore()

const courseInfo: any = ref({})

// 載入時取得 courseStore
onMounted(() => {
  const { courseTerm, courseType, keyword, sortBy, pageSize } = courseStore.courseData
  getCourse(courseTerm, courseType, keyword, sortBy, pageSize)
})

// 監控 courseStore。有異動就調用函式 getCourse
watchEffect(() => {
  const { courseTerm, courseType, keyword, sortBy, pageSize } = courseStore.courseData

  // 調用函式 getCourse
  getCourse(courseTerm, courseType, keyword, sortBy, pageSize)
})

async function getCourse(
  courseTerm: string,
  courseType: string,
  keyword: string,
  sortBy: string,
  pageSize: number
) {
  console.log(courseTerm, courseType, keyword, sortBy, pageSize)
  console.log('被call了')
  try {
    let query = ''
    let countCourseQuery = ''
    let res = null
    let countRes = null
    // 根據下拉選單決定 api url
    if (courseTerm !== '全部') {
      query += `courseTerm=${courseTerm}&`
      countCourseQuery += `courseTerm=${courseTerm}&`
    }
    if (courseType !== '全部') {
      query += `courseType=${courseType}&`
      countCourseQuery += `courseType=${courseType}&`
    }
    query += `sortBy=${sortBy}&pageSize=${pageSize}&keyword=${keyword}`
    countCourseQuery += `sortBy=${sortBy}&keyword=${keyword}`

    console.log(query)
    res = await courseStore.apiGetCourses({ query })
    countRes = await courseStore.apiGetCourses({ countCourseQuery })

    const result = res.data
    const countresult = countRes.data
    courseStore.courseData.searchResultCount = countresult.data.length
    console.log(result)
    console.log(countresult.data.length)
    console.log(courseStore.courseData)

    request(result)
  } catch (e) {
    console.log(e)
  }
}

function request(result: { statusCode: number; data: any }) {
  if (result.statusCode === 200) {
    courseInfo.value = result.data
    // console.log(`courseInfo = ${JSON.stringify(courseInfo.value)}`)
  } else {
    console.log('篩選課程資料失敗')
  }
}

// 格式化價格的計算屬性
const formattedPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<!-- 切版缺：卡片點擊時星星變色並留停 -->
<template>
  <ul class="flex grid grid-cols-2 gap-[30px] md:grid-cols-3 lg:grid-cols-5">
    <li v-for="item in courseInfo" class="flex min-h-[300px] flex-col">
      <a href="#" class="relative block flex h-full flex-col">
        <img
          :src="item.courseImage[0]"
          alt="課程圖片"
          class="course mb-2 h-[220px] w-full rounded object-cover"
        />
        <div class="course-star absolute right-0 top-0 hidden h-[32px] w-[32px]"></div>
        <div class="flex flex-col">
          <div class="mb-2 flex h-[90px] items-start lg:h-[95px]">
            <p
              class="mr-[8px] w-1/3 rounded px-2 py-0.5 text-center text-secondary"
              :class="{
                'bg-blue4': item.courseTerm === 0,
                'bg-orange2': item.courseTerm !== 0
              }"
            >
              {{ item.courseTerm === 0 ? '體驗' : '培訓' }}
            </p>
            <p>{{ item.courseName }}</p>
          </div>
          <p class="mb-1 w-full text-sm leading-[22px]">{{ item.brandName }}</p>
          <p class="text-secondary">
            NT$<span class="ml-2 font-medium leading-[30px] lg:ml-1">{{
              formattedPrice(item.coursePrice)
            }}</span>
          </p>
        </div>
      </a>
    </li>
  </ul>
</template>

<style scoped>
li:hover .course {
  background: #000000;
  opacity: 0.5;
}

li:hover .course-star {
  display: block;
  background-image: url('~/assets/images/front/Button(star).png');
}

li:hover .course-star:hover {
  background-image: url('~/assets/images/front/Button(star_hover).png');
  background-size: contain;
}

/* 切缺：點擊星星收藏後要停留在卡片上>>測不出來，當時寫的樣式 */
/* li .course:active + .course-star:hover {
    display: block;
    background-image: url('~/assets/images/front/Button(star_hover).png');
    width: 32px;
    height: 32px;
  } */
</style>
