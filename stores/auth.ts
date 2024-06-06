import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    apiUrl: 'https://ciaocraft-api.onrender.com',
    // apiUrl: 'http://127.0.0.1:3666',
    memberId: null as any,
    token: null as any,
    photo: null as any,
    isLogin: false
  }),
  getters: {},
  actions: {
    // 登入並將 memberId 和 token 存入 localStorage
    async login(data: JsonObject) {
      return await axios.post(`${this.apiUrl}/auth/signin`, data)
    },
    setMember(user: JsonObject) {
      this.token = user.token
      this.memberId = user.id
      this.photo = user.photo
      localStorage.setItem('token', this.token)
      localStorage.setItem('memberId', this.memberId)
      localStorage.setItem('photo', this.photo)
    },
    async getMember(data: JsonObject) {
      return await axios.get(`${this.apiUrl}/member/memberOne`, data)
    },
    async register(data: JsonObject) {
      return await axios.post(`${this.apiUrl}/auth/signup`, data)
    },
    logout() {
      this.memberId = ''
      this.token = ''
      localStorage.removeItem('memberId')
      localStorage.removeItem('token')
    },
    async sendForgetPasswordEmail(data: JsonObject) {
      console.log(data)
      console.log(`${this.apiUrl}/auth/forgotPassword`)
      return await axios.post(`${this.apiUrl}/auth/forgotPassword`, data)
    },
    async resetPassword(data: JsonObject) {
      return await axios.post(`${this.apiUrl}/auth/resetPassword`, data)
    }
  }
})
