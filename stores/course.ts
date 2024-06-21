import axios from 'axios'
import { defineStore } from 'pinia'
import type { JsonObject } from 'type-fest'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://127.0.0.1:3666'

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
    },

    async getCourseCollection(data: JsonObject) {
      console.log(`${apiUrl}/courses`)
      return await axios.get(`${apiUrl}/courses`)
    },

    // 新增評論
    async addComment(data: JsonObject) {
      console.log(`${apiUrl}/courses/comments`)
      return await axios.post(`${apiUrl}/courses/comments`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  }
})
