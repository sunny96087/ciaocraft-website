import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    apiUrl: 'https://ciaocraft-api.onrender.com',
    // apiUrl: 'http://127.0.0.1:3666',
    memberId: null as any,
    name: null as any,
    token: null as any,
    photo: null as any,
    isLogin: null as any,
    isLoginModalOpen: false as boolean
  }),
  getters: {},
  actions: {
    async login(data: JsonObject) {
      return await axios.post(`${this.apiUrl}/auth/signin`, data)
    },
    async checkLogin() {
      if (process.client) {
        this.token = localStorage.getItem('token')
        this.memberId = localStorage.getItem('memberId')
        this.photo = localStorage.getItem('photo')
        if (this.token) {
          this.isLogin = true
        }
      }
    },
    setMember(user: JsonObject) {
      this.token = user.token
      this.memberId = user.id
      this.photo = user.photo
      localStorage.setItem('token', this.token)
      localStorage.setItem('memberId', this.memberId)
      localStorage.setItem('photo', this.photo)
    },
    async checkAccountExist(data: JsonObject) {
      return await axios.post(`${this.apiUrl}/auth/checkAccountExist`, data)
    },
    async register(data: JsonObject) {
      return await axios.post(`${this.apiUrl}/auth/signup`, data)
    },
    async sendForgetPasswordEmail(data: JsonObject) {
      return await axios.post(`${this.apiUrl}/auth/forgotPassword`, data)
    },
    async resetPassword(data: JsonObject) {
      return await axios.post(`${this.apiUrl}/auth/resetPassword`, data)
    },
    googleLogin() {
      console.log(`${this.apiUrl}/auth/google`)
      axios.get(`${this.apiUrl}/auth/google`)
    },
    unlinkGoogleAccount() {
      return axios.delete(`${this.apiUrl}/auth/unlinkGoogleAccount`, {
        headers: {
          token: this.token
        }
      })
    },
    checkGoogleAccountExisted() {
      return axios.get(`${this.apiUrl}/auth/checkGoogleAccountExisted`, {
        headers: {
          token: this.token
        }
      })
    },
    logout() {
      localStorage.removeItem('memberId')
      localStorage.removeItem('token')
      this.isLogin = false
      // 刷新頁面，清空資料
      if (process.client) {
        window.location.reload()
      }
    },

    // 開啟登入彈窗
    openLoginModal() {
      this.isLoginModalOpen = !this.isLoginModalOpen
    }
  }
})
