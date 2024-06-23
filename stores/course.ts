import axios from 'axios'
import { defineStore } from 'pinia'
import type { JsonObject } from 'type-fest'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://127.0.0.1:3666'

// // 定義資料類型
// type courseType = {
//   courseType: string | null | undefined
//   pageSize: number
// }

type Query = {
  courseTerm: string
  pageSize: number
}

type CourseQuery = {
  query?: string
  countCourseQuery?: string
}

export type courseData = {
  courseTerm: number | null | undefined
  courseType: string | null | undefined
  keyword: string | null | undefined
  sortBy: string | null | undefined
  pageSize: number
}

export const useCourseStore = defineStore('course', {
  state: () => ({
    courseData: {
      courseTerm: '',
      courseType: '',
      keyword: '',
      sortBy: '',
      // 該頁面顯示筆數預設 20 筆
      pageSize: 20,
      searchResultCount: 0
    }
  }),
  getters: {},
  actions: {
    // 取得特定課程
    async apiGetOneCourse(data: Query) {
      return await axios.get(
        `${apiUrl}/courses?courseTerm=${data.courseTerm}&pageSize=${data.pageSize}`
      )
    },
    // 取得篩選的課程
    async apiGetCourses(data: CourseQuery) {
      console.log(data.countCourseQuery)
      console.log(data.query)
      if (data.countCourseQuery) {
        console.log(`${apiUrl}/courses?${data.countCourseQuery}`)
        return await axios.get(`${apiUrl}/courses?${data.countCourseQuery}`)
      } else {
        console.log(`${apiUrl}/courses?${data.query}`)
        return await axios.get(`${apiUrl}/courses?${data.query}`)
      }
    },
    // 取得所有課程
    async apiGetAllCourse(data: Query) {
      return await axios.get(`${apiUrl}/courses?pageSize=${data.pageSize}`)
    },

    async getCourseCollection(data: JsonObject) {
      console.log(`${apiUrl}/courses`)
      return await axios.get(`${apiUrl}/courses`)
    },

    // 頁面載入時就恢復預設
    resetCourseData() {
      this.courseData = {
        courseTerm: '',
        courseType: '',
        keyword: '',
        sortBy: '',
        pageSize: 20,
        searchResultCount: 0
      }
    },

    // 變更課程篩選條件時就恢復筆數預設
    resetPageSize() {
      this.courseData.pageSize = 20
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
