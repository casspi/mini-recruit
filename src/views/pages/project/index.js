//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Image,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Loading
  ],
  data: {
    tabs: ['项目接受', '治疗方案', '入排标准', '研究中心'],
    active: 0,
    collect: false
  },
  onLoad(options) {
    this.routerGetParams(options)
    console.log(this.data)
  },

  jupHandle(e) {
    const {item} = this.inputParams(e)
    this.setData({
      active: item,
      toView: `item${item}`
    })
  },
  billHandle(e) {
    const {item} = this.inputParams(e)
    this.loadingShow({
      title: '海报下载中...',
      mask: true
    })
    this.imageDownload(item.url).then((res) => {
      console.log(res)
      return this.imageSave(res.path)
    }).toast().finally(() => {
      this.loadingHide()
    })
    console.log(item.url)
  }

})

