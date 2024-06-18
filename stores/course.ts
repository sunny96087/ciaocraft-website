import axios from 'axios'
import { defineStore } from 'pinia'
import type { JsonObject } from 'type-fest'

const apiUrl = 'https://ciaocraft-api.onrender.com'

export const useCourseStore = defineStore('course', {
  state: () => ({
    // member: null,
    // memberCollections: null
  }),
  getters: {},
  actions: {
    // 取得所有課程
    async getCourseCollection(data: JsonObject) {
      console.log(`${apiUrl}/courses`)
      return await axios.get(`${apiUrl}/courses`)
    }
  }
})
