import axios from 'axios'
import { defineStore } from 'pinia'

const apiUrl = 'https://ciaocraft-api.onrender.com'

// 定義資料類型
type courseType = {
  courseType: String | null | undefined
  pageSize: number
}

export const useCourseStore = defineStore('course', {
  state: () => ({}),
  getters: {},
  actions: {
    // 取得特定課程
    async apiGetOneCourse(data: courseType) {
      return await axios.get(
        `${apiUrl}/courses?courseType=${data.courseType}&pageSize=${data.pageSize}`
      )
    },
    // 取得所有課程
    async apiGetAllCourse(data: courseType) {
      return await axios.get(`${apiUrl}/courses?courseType=&pageSize=${data.pageSize}`)
    }
  }
})
