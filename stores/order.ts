import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://localhost:3666'
// const apiUrl = 'http://127.0.0.1:3666'

export const useOrderStore = defineStore({
  id: 'useOrderStore',
  state: () => ({}),
  actions: {
    // 取得會員單筆訂單
    async getMemberOrderByOrderId(orderId: string) {
      console.log(`${apiUrl}/orders/${orderId}`)
      return await axios.get(`${apiUrl}/orders/${orderId}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    async createOrder(data: JsonObject) {
      console.log(`${apiUrl}/orders`)
      return await axios.post(`${apiUrl}/orders`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  }
})
