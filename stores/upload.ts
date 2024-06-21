import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://localhost:3666'

export const useUploadStore = defineStore({
  id: 'uploadStore',
  state: () => ({}),
  actions: {
    async uploadSingleImage(data: JsonObject) {
      try {
        console.log(`${apiUrl}/upload/singleImage/front`)
        return await axios.post(`${apiUrl}/upload/singleImage/front`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem('token')
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
})
