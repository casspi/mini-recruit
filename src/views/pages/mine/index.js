//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import User from "wow-wx/mixins/utils/user.mixin";

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.TabItemTap,
    WowPage.wow$.mixins.User,
  ],
  data: {
    isAgree: false,
    arrMenu: [
      {label: '我的资料', icon: 'icon-wode', url: 'user_index'},
      // {label: '新建患者', icon: 'icon-wode', url: 'subject_index'},
      {label: '我的邀请码', icon: 'icon-qr-code', url: 'qrcode_index'},
      {label: '我邀请的好友', icon: 'icon-wodewo', value: '0人', url: 'invited_index'},
      {label: '患者提报', icon: 'icon-jihua', url: 'submit_index', hidden: false},
      // {label: '我的预约', icon: 'icon-yuyue', fn: 'handleCell'},
      {label: '退出登录', fn: 'handleCell', hideArrow: true, className: 'logout-item', 'key': 'logout'},
    ],
    userInfo: {}
  },
  onShow() {
    this.getDetail()
  },
  getDetail() {
    const {api$} = this.data
    this.curl(api$.REQ_MINE, {}, {method: 'get', loading: false}).then(res => {
      this.setData({
        userInfo: res,
        ['arrMenu[2].value']: res.recruitNum + '人',
        // ['arrMenu[3].hidden']: res.type === '1'// 暂时不需要权限控制
      })
    }).toast()
  },
  handleCell(options) {
    const {api$} = this.data
    const {item} = options
    if (item.key === 'logout') {
      this.modalConfirm({
        content: `是否确定退出登录？`,
        confirmText: '确定',
        cancelText: '取消'
      }).then(() => {
        this.curl(api$.REQ_LOGOUT, {}, {method: 'get'}).then(() => {
          User.userLogout().then(() => {
            this.routerRoot('home_index')
          })
        })
      }).null()
    }
  },
})

