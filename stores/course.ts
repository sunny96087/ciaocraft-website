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
        id: '',
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
          avatar: '',
          courseId: [],
          intro: '',
          _id: ''
        },
        vendorAvgRating: 0,
        vendorCommentsCount: 0,
        courseSuitableFor: '',
        courseContent: '',
        courseSkillsLearned: '',
        courseNotice: '',
        courseItemId: [
          {
            capacity: 0,
            // endTime: new Date('2024-08-17T00:00:00.000Z'),
            endTime: '',
            itemName: '',
            // startTime: new Date('2024-08-17T00:00:00.000Z'),
            startTime: '',
            _id: ''
          }
        ]
      }
    ]
  }),
  getters: {},
  actions: {
    // 取得特定課程
    async apiGetCourse(courseId: string) {
      return await axios.get(`${apiUrl}/courses/${courseId}`)
    },

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

    // 取得單一課程
    async apiGetOneCourse(data: CourseQuery) {
      console.log(data.courseId)
      console.log(`${apiUrl}/courses/${data.courseId}`)
      return await axios.get(`${apiUrl}/courses/${data.courseId}`)
    },

    // 取得單一課程所有評論
    async apiGetOneCourseComments(data: CourseQuery) {
      console.log(data.courseId)
      console.log(`${apiUrl}/courses/${data.courseId}/comments`)
      return await axios.get(`${apiUrl}/courses/${data.courseId}/comments`)
    },

    // 新增訂單(預約)
    async apiPostOrders(data: any) {
      console.log(data)
      console.log(`${apiUrl}/orders`)
      return await axios.post(`${apiUrl}/orders`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 新增課程評論按讚/取消讚
    async apiPostLikeComment(data: any) {
      console.log(data)
      console.log(`${apiUrl}/courses/comments/like`)
      return await axios.post(`${apiUrl}/courses/comments/like`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
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
          id: '',
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
            avatar: '',
            courseId: [],
            intro: '',
            _id: ''
          },
          vendorAvgRating: 0,
          vendorCommentsCount: 0,
          courseSuitableFor: '',
          courseContent: '',
          courseSkillsLearned: '',
          courseNotice: '',
          courseItemId: [
            {
              capacity: 0,
              // endTime: new Date('2024-08-17T00:00:00.000Z'),
              endTime: '',
              itemName: '',
              // startTime: new Date('2024-08-17T00:00:00.000Z'),
              startTime: '',
              _id: ''
            }
          ]
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
