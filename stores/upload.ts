import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://localhost:3666'

export const useUploadStore = defineStore({
  id: 'uploadStore',
  state: () => ({}),
  actions: {
    async uploadSingleImage(file: File) {
      return await axios.post(`${apiUrl}/upload/singleImage/front`, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
})
