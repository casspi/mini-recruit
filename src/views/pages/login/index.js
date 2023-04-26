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
    this.setData({
      recruitCode: o.recruitCode || ''
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
  handleRegister() {
    const {phone, code, inputCode, recruitCode, _gearframework_session} = this.data
    this.curl(this.data.api$.REQ_VALID_CODE, {phone, code}, {
      method: 'get',
      header: {
        cookie: `_gearframework_session=${_gearframework_session}`
      }
    }).then(() => {
      return this.routerPush('register_index', {phone, code, recruitCode: recruitCode || inputCode})
    }).toast()
  },
  handleLogin() {
    const {phone, code} = this.data
    this.curl(this.data.api$.REQ_LOGIN, {phone, code}, {method: 'get'}).then(res => {
      const {__gsessionId} = res
      User.userUpdate({__gsessionId})
      this.routerPop()
    }).toast()
  }

})

