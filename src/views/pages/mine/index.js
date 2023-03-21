//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
  ],
  data: {
    isAgree: false,
    arrMenu: [
      {label: '我的资料', icon: 'icon-wode', url: 'user_index'},
      {label: '我的邀请码', icon: 'icon-qr-code', url: 'demo_index'},
      {label: '我邀请的好友', icon: 'icon-wodewo', value: '0人', fn: 'handleCall'},
      {label: '患者提报', icon: 'icon-jihua', fn: 'handleCall'},
      {label: '我的预约', icon: 'icon-yuyue', fn: 'handleCall'},
    ],
  }
})

