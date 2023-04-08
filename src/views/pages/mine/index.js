//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Modal,
  ],
  data: {
    isAgree: false,
    arrMenu: [
      {label: '我的资料', icon: 'icon-wode', url: 'user_index'},
      // {label: '新建患者', icon: 'icon-wode', url: 'subject_index'},
      {label: '我的邀请码', icon: 'icon-qr-code', url: 'qrcode_index'},
      {label: '我邀请的好友', icon: 'icon-wodewo', value: '0人', fn: 'handleCell'},
      {label: '患者提报', icon: 'icon-jihua', url: 'submit_index'},
      // {label: '我的预约', icon: 'icon-yuyue', fn: 'handleCell'},
      {label: '退出登录', fn: 'handleCell', hideArrow: true, className: 'logout-item', 'key': 'logout'},
    ],
  },
  handleCell(item) {
    console.log(item)
    if (item.key === 'logout') {
      this.modalConfirm({
        content: `是否确定退出登录？`,
        confirmText: '确定',
        cancelText: '取消'
      }).then(() => {
        this.routerPush('demo_index')
      }).null()
    }
  }
})

