import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'https://ciaocraft-api.onrender.com'
// const apiUrl = 'http://localhost:3666'
// const apiUrl = 'http://127.0.0.1:3666'

export const useMemberStore = defineStore('member', {
  state: () => ({
    member: null,
    memberCollections: null
  }),
  getters: {},
  actions: {
    // 取得會員收藏
    async getMemberCollection() {
      console.log(`${apiUrl}/members/memberOne/collections`)
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
      return await axios.put(`${apiUrl}/members/memberOne`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    // 更新會員密碼
    async updatePassword(data: JsonObject) {
      return await axios.put(`${apiUrl}/members/memberOne/password`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    async getMemberOrders() {
      // let courseStatus: Number = 1
      // let query = `?pageNo=${pageNo}&pageSize=${pageSize}`

      // if (filter === 'unPaid') {
      //   query += `&courseStatus=1`
      // } else if (filter === 'paid') {
      //   query += `&courseStatus=1`
      // } else if (filter === 'completed') {
      //   query += `&courseStatus=3`
      // } else if (filter === 'cancelled') {
      //   query += `&courseStatus=4`
      // }
      console.log(`${apiUrl}/members/memberOne/orders`)
      return await axios.get(`${apiUrl}/members/memberOne/orders`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  }
})
