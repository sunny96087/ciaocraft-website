import axios from 'axios'
import { defineStore } from 'pinia'
import type { JsonObject } from 'type-fest'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://127.0.0.1:3666'

type CourseQuery = {
  query?: string
  countCourseQuery?: string
  courseId?: any
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
    },
    oneCourseData: [
      {
        courseTerm: 0,
        courseImage: [],
        courseName: '',
        courseAvgRating: 0,
        courseCommentsCount: 0,
        coursePrice: 0,
        courseSummary: '',
        courseTotalHours: 0,
        courseAddress: '',
        courseCapacity: 0,
        teacherId: {
          name: '',
          photo: '',
          _id: ''
        },
        vendorId: {
          brandName: '',
          courseId: [],
          intro: ''
        },
        courseSuitableFor: '',
        courseContent: '',
        courseSkillsLearned: '',
        courseNotice: ''
      }
    ]
  }),
  getters: {},
  actions: {
    // 取得所有課程
    async apiGetCourses(data: CourseQuery) {
      // console.log(data.countCourseQuery)
      // console.log(data.query)
      if (data.countCourseQuery) {
        console.log(`${apiUrl}/courses?${data.countCourseQuery}`)
        return await axios.get(`${apiUrl}/courses?${data.countCourseQuery}`)
      } else {
        console.log(`${apiUrl}/courses?${data.query}`)
        return await axios.get(`${apiUrl}/courses?${data.query}`)
      }
    },

    // 取得單筆課程
    async apiGetOneCourse(data: CourseQuery) {
      console.log(data.courseId)
      // if (data.courseId) {
      console.log(`${apiUrl}/courses/${data.courseId}`)
      return await axios.get(`${apiUrl}/courses/${data.courseId}`)
      // }
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
        pageSize: 5,
        searchResultCount: 0
      }
    },
    // 頁面載入時就恢復預設
    resetoneCourseData() {
      this.oneCourseData = [
        {
          courseTerm: 0,
          courseImage: [],
          courseName: '',
          courseAvgRating: 0,
          courseCommentsCount: 0,
          coursePrice: 0,
          courseSummary: '',
          courseTotalHours: 0,
          courseAddress: '',
          courseCapacity: 0,
          teacherId: {
            name: '',
            photo: '',
            _id: ''
          },
          vendorId: {
            brandName: '',
            courseId: [],
            intro: ''
          },
          courseSuitableFor: '',
          courseContent: '',
          courseSkillsLearned: '',
          courseNotice: ''
        }
      ]
    },

    // 變更課程篩選條件時就恢復筆數預設
    resetPageSize() {
      this.courseData.pageSize = 5
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
