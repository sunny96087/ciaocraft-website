import axios from 'axios'
import { defineStore } from 'pinia'
import type { JsonObject } from 'type-fest'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://127.0.0.1:3666'

// 定義資料類型
type Query = {
  courseTerm: string
  pageSize: number
}

export const useCourseStore = defineStore('course', {
  state: () => ({}),
  getters: {},
  actions: {
    // 取得特定課程
    async apiGetCourse(courseId: string) {
      return await axios.get(`${apiUrl}/courses/${courseId}`)
    },

    // 取得特定課程
    async apiGetOneCourse(data: Query) {
      return await axios.get(
        `${apiUrl}/courses?courseTerm=${data.courseTerm}&pageSize=${data.pageSize}`
      )
    },
    // 取得所有課程
    async apiGetAllCourse(data: Query) {
      return await axios.get(`${apiUrl}/courses?pageSize=${data.pageSize}`)
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
