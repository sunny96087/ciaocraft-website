import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

export const APIStore = defineStore({
  id: 'api-store',
  state: () => {
    return {
      // 開發
      api: 'http://localhost:3666/',

      // 線上
      // api: 'https://ciaocraft-api.onrender.com/',

      vendorInfo: null as any | null, // 用戶資料，初始為 null
      isVendorLoggedIn: false // 登入狀態
    }
  },
  actions: {
    // todo 賣家 vendors (Back)
    // 確認賣家帳號是否存在 (Back)
    async apiCheckVenderEmail(data: JsonObject) {
      return await axios.get(`${this.api}vendors/admin/checkAccount/${data.forgetEmail}`)
    },
    // 登入
    async apiVenderLogin(data: JsonObject) {
      return await axios.post(`${this.api}vendors/login`, data)
    },
    // todo 賣家登入 本地端資料處理 localStorage

    // * 儲存賣家登入資料至 localStorage
    saveVendorDataToLocalStorage(data: { token: string; id: string; brandName: string }) {
      // 將資料轉化為 JSON 字符串
      const vendorInfo = JSON.stringify(data)

      console.log(`vendorInfo = ${vendorInfo}`)

      // 存儲 vendorInfo 至 localStorage
      localStorage.setItem('vendorInfo', vendorInfo)
      // 更新 store 的狀態
      this.vendorInfo = JSON.parse(vendorInfo) // 將字符串解析回對象
      this.isVendorLoggedIn = true // 設置登入狀態為 true
    },

    // * 設置賣家 localStorage 資料
    setVendorInfo(vendorInfo: any | null) {
      this.vendorInfo = vendorInfo
      this.isVendorLoggedIn = vendorInfo !== null
    },

    // * 取賣家 localStorage token
    getVendorToken() {
      // 從 localStorage 中取得 vendorInfo 字符串
      const vendorInfoString = localStorage.getItem('vendorInfo')
      // 將字符串反序列化為 JavaScript 對象
      const vendorInfo = vendorInfoString ? JSON.parse(vendorInfoString) : null
      // 從 vendorInfo 對象中提取 token
      const token = vendorInfo ? vendorInfo.token : null
      return token
    },

    // * 取賣家 localStorage 資料
    getVendorInfoFromLocalStorage() {
      // 從 localStorage 取出 vendorInfo 字符串
      const vendorInfoString = localStorage.getItem('vendorInfo')
      // 將字符串反序列化為 JavaScript 對象
      const vendorInfo = vendorInfoString ? JSON.parse(vendorInfoString) : null
      return vendorInfo
    },

    // * 登出方法，移除 localStorage 中的資訊
    logoutVendor() {
      // 直接移除名為 'vendorInfo' 的項目
      localStorage.removeItem('vendorInfo')
      this.vendorInfo = null
      this.isVendorLoggedIn = false
    },

    // >> 以下為參考用，未使用，請寫在這邊上面
    // todo 文章 posts

    // 取得所有文章
    async apiGetPost(data: JsonObject) {
      try {
        return await axios.get(
          `${this.api}posts?sort=${data.sort}&keyword=${data.keyword}&userId=${data.userId ? data.userId : ''}`
        )
      } catch (e) {
        console.log(`apiGetPost error`, e)
        return e
      }
    },
    // 新增單筆文章
    async apiAddPost(data: JsonObject) {
      try {
        const user = await this.userInfo.token
        console.log(`token = ${user}`)
        return await axios.post(`${this.api}posts`, data, {
          headers: {
            token: user
          }
        })
      } catch (e) {
        console.log(`apiAddPost error`, e)
        return e
      }
    },
    // 新增單筆文章留言
    async apiAddPostComment(data: JsonObject) {
      try {
        return await axios.post(`${this.api}posts/comments/${data.postId}`, data)
      } catch (e) {
        console.log(`apiAddPostComment error`, e)
        return e
      }
    },
    // 指定文章按讚
    async apiLikePost(data: JsonObject) {
      try {
        return await axios.patch(`${this.api}posts/like/${data.postId}`, data)
      } catch (e) {
        console.log(`apiAddPostComment error`, e)
        return e
      }
    },

    // todo 使用者 users

    // 取得單筆使用者資料 自己
    async apiGetSpecifyUser() {
      const user = await this.getToken()
      console.log(`token = ${user}`)
      return await axios.get(`${this.api}users/userOne`, {
        headers: {
          token: user
        }
      })
    },
    // 取得單筆使用者資料 公開
    async apiGetSpecifyOpenUser(data: JsonObject) {
      try {
        console.log(data)

        return await axios.get(`${this.api}users/userOneOpen/${data.id}`)
      } catch (e) {
        console.log(`apiGetSpecifyUser error`, e)
        return e
      }
    },
    // 取得使用者按讚文章資料
    async apiGetUserLikePost(data: JsonObject) {
      return await axios.get(`${this.api}users/likedPosts/${data}`)
    },
    // 修改使用者資料 自己
    async apiUpdateUser(data: JsonObject) {
      const user = await this.userInfo.token
      console.log(`token = ${user}`)
      return await axios.patch(`${this.api}users/`, data, {
        headers: {
          token: user
        }
      })
    },
    // 重設密碼
    async apiUpdatePassword(data: JsonObject) {
      const user = await this.userInfo.token
      console.log(`token = ${user}`)
      return await axios.post(`${this.api}users/updatePassword`, data, {
        headers: {
          token: user
        }
      })
    },

    // 取得使用者蹤清單 自己
    async apiGetUserFollowList() {
      try {
        const user = await this.userInfo.token
        console.log(`token = ${user}`)
        return await axios.get(`${this.api}users/followList`, {
          headers: {
            token: user
          }
        })
      } catch (e) {
        console.log(`apiGetUserFollowList error`, e)
        return e
      }
    },
    // 追蹤
    async apiFollowUser(data: JsonObject) {
      const user = await this.userInfo.token
      console.log(`token = ${user}`)
      return await axios.patch(
        `${this.api}users/follow/${data}`,
        {},
        {
          headers: {
            token: user
          }
        }
      )
    },
    // 註冊
    async apiRegister(data: JsonObject) {
      try {
        return await axios.post(`${this.api}users/sign_up`, data)
      } catch (e) {
        console.log(`apiRegister error`, e)
        return e
      }
    },
    // 註冊 => email 驗證
    async apiVerifyEmail(data: JsonObject) {
      return await axios.post(`${this.api}users/signup-with-email-verification`, data)
    },
    // 驗證 email 是否重複
    async apiCheckEmail(data: JsonObject) {
      try {
        return await axios.get(`${this.api}users/checkEmail/${data.email}`)
      } catch (e) {
        console.log(`apiCheckEmail error`, e)
        return e
      }
    },
    // 登入
    async apiLogin(data: JsonObject) {
      return await axios.post(`${this.api}users/sign_in`, data)
    },
    // google 登入 || 註冊
    async apiGoogleLogin() {
      return await axios.get(`${this.api}users/google`)
    },

    // todo 圖片 upload

    // 上傳單張圖片
    async apiUploadImage(data: JsonObject) {
      // const user = await this.userInfo.token
      // console.log(`token = ${user}`)
      return await axios.post(`${this.api}upload/image`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // try {
      // } catch (e) {
      //   console.log(`apiAddPost error`, e)
      //   return e
      // }
    },

    // todo 公告 announcements

    // 後台 取得公告列表
    async apiGetAdminAnnouncements(data: JsonObject) {
      const user = await this.getToken()
      console.log(`token = ${user}`)
      return await axios.get(
        `${this.api}announcements/admin?status=${data.status}&tag=${data.tag}&keyword=${data.keyword}&startDate=${data.startDate}&endDate=${data.endDate}`,
        {
          headers: {
            token: user
          }
        }
      )
    },

    // 後台 新增公告
    async apiPostAnnouncement(data: JsonObject) {
      const user = await this.getToken()
      console.log(`token = ${user}`)
      return await axios.post(`${this.api}announcements/`, data, {
        headers: {
          token: user
        }
      })
    },

    // 後台 編輯公告
    async apiUpdateAnnouncement(data: JsonObject) {
      const user = await this.getToken()
      console.log(`token = ${user}`)
      return await axios.put(`${this.api}announcements/update/${data.id}`, data, {
        headers: {
          token: user
        }
      })
    },

    // 後台 刪除公告
    async apiDeleteAnnouncement(data: JsonObject) {
      const user = await this.getToken()
      console.log(`token = ${user}`)
      return await axios.delete(`${this.api}announcements/delete/${data.id}`, {
        headers: {
          token: user
        }
      })
    },

    // 前台 取得公告列表
    async apiGetAnnouncements(data: JsonObject) {
      return await axios.get(
        `${this.api}announcements/all?sort=${data.sort}&tag=${data.tag}&keyword=${data.keyword}`
      )
    },

    // 前台 紀錄公告觀看次數
    async apiViewAnnouncement(data: JsonObject) {
      return await axios.put(`${this.api}announcements/views/${data.id}`)
    }
  },
  getters: {
    //   getUserInfo: (state) => state.userInfo,
  }
})
