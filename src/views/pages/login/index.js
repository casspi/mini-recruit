//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import User from "wow-wx/mixins/utils/user.mixin";

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Api,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Modal,
  ],
  data: {
    isAgreement: false,
    recruitCode: '',
    inputCode: '',// 手输邀请码
    phone: '',
    code: '',
    count: '',
    _gearframework_session: '',
  },
  onLoad(o) {
    console.log('decodeURIComponent', o)
    let recruitCode = ''
    // 我的邀请码页面分享过来的
    if (o.params) {
      recruitCode = JSON.parse(decodeURIComponent(o.params)).recruitCode || ''
    }
    // 小程序码过来的参数
    if (o.scene) {
      const scene = decodeURIComponent(o.scene).split('=')
      recruitCode = scene[1] || ''
    }
    this.setData({
      recruitCode
    })

    console.log(this.data)
  },
  // 获取验证码
  handleCode() {
    const {phone, code} = this.data
    console.log(phone, code)
    this.countDown()
    this.curl(this.data.api$.REQ_MSG_CODE, {phone}, {method: 'get'}).then(res => {
      console.log(res)
      this.setData({
        _gearframework_session: res.token
      })
    }).toast()

  },
  // 倒计时
  countDown() {
    let count = 60
    this.setData({
      count
    })
    const timer = setInterval(() => {
      if (count > 0) {
        this.setData({
          count: --count
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)
  },
  inputCodeChange(e) {
    let val = e.detail.value
    val.replace(/[^\w\/]/ig, '')
    this.setData({
      inputCode: val
    })
  },
  handleRegister() {
    const {phone, code, inputCode, recruitCode, _gearframework_session} = this.data
    if (/[^\w\/]/ig.test(inputCode)) {
      this.modalToast('邀请码只能含数字、字母')
      return
    }
    this.curl(this.data.api$.REQ_VALID_CODE, {phone, code}, {
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        cookie: `_gearframework_session=${_gearframework_session}`
      }
    }).then(() => {
      return this.routerPush('register_index', {phone, code, recruitCode: recruitCode || inputCode})
    }).toast()
  },
  handleLogin() {
    const {phone, code, _gearframework_session, api$} = this.data
    this.curl(api$.REQ_LOGIN, {phone, code}, {
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        cookie: `_gearframework_session=${_gearframework_session}`
      }
    }).then(res => {
      const {__gsessionId} = res
      User.userUpdate({
        __gsessionId
      })
      wx.setStorageSync('home_refresh', '1')
      this.routerRoot('home_index')
      // return this.curl(api$.REQ_MINE, {}, {method: 'get', loading: false}).then(res => {
      // })
    }).toast()
  }

})

