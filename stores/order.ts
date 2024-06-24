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
      return await axios.get(`${apiUrl}/orders/${orderId}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    async createOrder(data: JsonObject) {
      return await axios.post(`${apiUrl}/orders`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 更新付費後五碼
    async updateLastFiveDigit(orderId: string, data: JsonObject) {
      return await axios.patch(`${apiUrl}/orders/${orderId}`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  }
})
