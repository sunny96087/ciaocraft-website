import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    member: null,
    token: null
  }),
  actions: {
    setMember(member: any, token: any) {
      this.member = member
      this.token = token
      this.isLogin = true
      localStorage.setItem('token', token)
      localStorage.setItem('member', member)
      console.log(this.isLogin)
    },
    logout() {
      this.member = null
      this.token = null
      localStorage.removeItem('token')
    },
    async fetchUser() {
      const token = localStorage.getItem('token')
    }
  }
})
