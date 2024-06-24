import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://localhost:3666'
// const apiUrl = 'http://127.0.0.1:3666'

export const useMemberStore = defineStore('member', {
  state: () => ({
    member: {} as any,
    collections: [] as any,
    orders: [] as any
  }),
  getters: {},
  actions: {
    // 取得會員收藏
    async getMemberCollection() {
      return await axios.get(`${apiUrl}/members/memberOne/collections`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 取得會員資料
    async getMember() {
      return await axios.get(`${apiUrl}/members/memberOne`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 更新會員資料
    async updateMember(data: JsonObject) {
      return await axios.patch(`${apiUrl}/members/memberOne`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 更新會員密碼
    async updatePassword(data: JsonObject) {
      return await axios.patch(`${apiUrl}/members/memberOne/password`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 取得會員訂單
    async getMemberOrders() {
      return await axios.get(`${apiUrl}/members/memberOne/orders`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 新增收藏
    async addCollection(data: JsonObject) {
      return await axios.post(`${apiUrl}/members/memberOne/collections`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 刪除收藏
    async removeCollection(data: JsonObject) {
      return await axios.delete(`${apiUrl}/members/memberOne/collections`, {
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          courseId: data.courseId
        }
      })
    }
  }
})
