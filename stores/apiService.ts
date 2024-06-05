import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

export const APIStore = defineStore({
  id: 'api-store',
  state: () => {
    return {
      // 開發
      // api: 'http://localhost:3666/',

      // 線上
      api: 'https://ciaocraft-api.onrender.com/',

      vendorInfo: null as any | null, // 用戶資料，初始為 null
      isVendorLoggedIn: false // 登入狀態
    }
  },
  actions: {
    // todo 賣家 vendors (Back)
    // * 確認賣家帳號是否重複 (Front)
    async apiCheckVendorEmailRepeat(data: JsonObject) {
      return await axios.get(`${this.api}vendors/checkAccount/${data.account}`)
    },
    // * 新增賣家申請 (Front)
    async apiApplyVendor(data: JsonObject) {
      return await axios.post(`${this.api}vendors`, data)
    },
    // * 確認賣家帳號是否存在 (Back)
    async apiCheckVenderEmail(data: JsonObject) {
      return await axios.get(`${this.api}vendors/admin/checkAccount/${data.forgetEmail}`)
    },
    // * 登入
    async apiVenderLogin(data: JsonObject) {
      return await axios.post(`${this.api}vendors/login`, data)
    },
    // * 取得登入賣家資料 (Back)
    async apiGetAdminVendor() {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(`${this.api}vendors/admin`, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 編輯賣家資料 (Back)
    async apiUpdateAdminVendor(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.patch(`${this.api}vendors/admin`, data, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 修改密碼 (Back)
    async apiUpdateAdminVendorPassword(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.patch(`${this.api}vendors/password`, data, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 忘記密碼 (Back)
    async apiForgetAdminVendorPassword(data: JsonObject) {
      return await axios.post(`${this.api}vendors/forgetPassword`, data)
    },
    // * 重設密碼 (Back)
    async apiResetAdminVendorPassword(data: JsonObject) {
      return await axios.post(`${this.api}vendors/resetPassword`, data)
    },
    // * 取得登入賣家儀表板總覽 (Back)
    async apiGetAdminOverview() {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(`${this.api}vendors/admin/overview`, {
        headers: {
          token: vendorToken
        }
      })
    },

    // todo 師資 teachers (Back)
    // * 取得所有老師 (Back)
    async apiGetAdminTeachers(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(
        `${this.api}teachers/admin?order=${data.order}&createdAt=${data.createdAt}&keyword=${data.keyword}&courseTerm=${data.courseTerm}`,
        {
          headers: {
            token: vendorToken
          }
        }
      )
    },
    // * 取得單一老師 (Back)
    async apiGetAdminTeacher(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(`${this.api}teachers/admin/${data.teacherId}`, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 新增老師 (Back)
    async apiAddTeacher(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.post(`${this.api}teachers/`, data, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 編輯老師 (Back)
    async apiUpdateTeacher(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.patch(`${this.api}teachers/${data.teacherId}`, data, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 刪除老師 (偽刪除) (Back)
    async apiDeactivateTeacher(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.patch(
        `${this.api}teachers/admin/deactivate/${data.teacherId}`,
        {},
        {
          headers: {
            token: vendorToken
          }
        }
      )
    },

    // todo 課程 courses (Back)
    // * 取得全部課程 (Back)
    async apiGetAdminCourses(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(
        `${this.api}courses/admin?startDate=${data.startDate}&courseTerm=${data.courseTerm}&keyword=${data.keyword}&courseStatus=${data.courseStatus}`,
        {
          headers: {
            token: vendorToken
          }
        }
      )
    },
    // * 取得單筆課程資料 + 項目資料 (Back)
    async apiGetAdminCourse(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(`${this.api}courses/admin/${data.courseId}`, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 新增課程 + 項目資料 (Back)
    async apiAddCourse(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.post(`${this.api}courses/`, data, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 編輯課程 + 項目資料 (Back)
    async apiUpdateCourse(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.patch(`${this.api}courses/${data.courseId}`, data, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 刪除課程 (偽刪除) (Back)
    async apiDeactivateCourse(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.patch(
        `${this.api}courses/admin/deactivate/${data.courseId}`,
        {},
        {
          headers: {
            token: vendorToken
          }
        }
      )
    },

    // todo 訂單 orders (Back)

    // * 取得所有訂單 (Back)
    async apiGetAdminOrders(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(
        `${this.api}orders/admin?createdAt=${data.createdAt}&keyword=${data.keyword}&paidStatus=${data.paidStatus}&startDate=${data.startDate}&endDate=${data.endDate}`,
        {
          headers: {
            token: vendorToken
          }
        }
      )
    },
    // * 取得單筆訂單 (Back)
    async apiGetAdminOrder(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(`${this.api}orders/admin/${data.orderId}`, {
        headers: {
          token: vendorToken
        }
      })
    },
    // * 修改訂單 (賣家確認收款、取消訂單) (Back)
    async apiUpdateAdminOrder(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.patch(`${this.api}orders/admin/${data.orderId}`, data, {
        headers: {
          token: vendorToken
        }
      })
    },

    // todo 評價 (Back)
    // * 取得賣家所有課程評價 (Back)
    async apiGetAdminComments(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(
        `${this.api}courses/admin/comments?startDate=${data.startDate}&endDate=${data.endDate}&tags=${data.tags}&keyword=${data.keyword}&sort=${data.sort}`,
        {
          headers: {
            token: vendorToken
          }
        }
      )
    },

    // todo 進帳 (Back)
    // * 取得進帳詳情 (query: startDate + endDate) (Back)
    async apiGetAdminIncome(data: JsonObject) {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(
        `${this.api}orders/admin/payment?startDate=${data.startDate}&endDate=${data.endDate}`,
        {
          headers: {
            token: vendorToken
          }
        }
      )
    },
    // * 取得進帳總覽 (今日、近 7 天、30 天、12個月) (Back)
    async apiGetAdminIncomeSummary() {
      const vendorToken = await this.getVendorToken()
      console.log(`token = ${vendorToken}`)
      return await axios.get(`${this.api}orders/admin/payment/summary`, {
        headers: {
          token: vendorToken
        }
      })
    },
    // todo 取得歷史訊息 messages
    // * 取得該聊天室所有訊息 (Back)
    async apiGetMessages(data: JsonObject) {
      return await axios.get(`${this.api}messages/${data.roomId}`)
    },
    // * 獲取指定廠商的所有聊天室
    async apiGetVendorRooms(data: JsonObject) {
      return await axios.get(`${this.api}messages/admin/rooms/${data.vendorId}`)
    },
    // * 獲取指定會員的所有聊天室
    async apiGetMemberRooms(data: JsonObject) {
      return await axios.get(`${this.api}messages/rooms/${data.memberId}`)
    },
    // * 建立聊天室
    async apiCreateRoom(data: JsonObject) {
      return await axios.post(`${this.api}messages/rooms`, data)
    },

    // todo 賣家 上傳圖片 upload

    // * 上傳單張圖片 (back)
    async apiUploadAdminImage(data: JsonObject) {
      return await axios.post(`${this.api}upload/singleImage/admin`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    // * 上傳多張圖片 (不超過 5 張) (back)
    async apiUploadAdminImages(data: JsonObject) {
      return await axios.post(`${this.api}upload/multipleImage/admin`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },

    // todo 賣家登入 本地端資料處理 localStorage
    // * 儲存賣家登入資料至 localStorage
    saveVendorDataToLocalStorage(data: {
      token: string
      id: string
      brandName: string
      avatar: string
    }) {
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

    // todo IP
    // * 取得使用者 IP
    async apiGetUserIp() {
      return await axios.get('https://api.ipify.org?format=json')
    }

    // >> 以下為參考用，未使用，請寫在這邊上面
  },
  getters: {
    //   getUserInfo: (state) => state.userInfo,
  }
})
