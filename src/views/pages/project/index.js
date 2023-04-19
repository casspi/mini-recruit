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
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Loading
  ],
  data: {
    tabs: ['项目介绍', '治疗方案', '入排标准', '研究中心'],
    detailInfo: {},
    active: 0,
    collect: false
  },
  onLoad(options) {
    this.routerGetParams(options)
    this.getDetail()
    console.log(this.data)
  },
  getDetail() {
    const {api$, params$} = this.data
    this.curl(api$.REQ_PROJECT_DETAIL, {projectId: params$.projectId}, {method: 'get'}).then(res=>{
      console.log(res)
      this.setData({
        detailInfo: res
      })
    })
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

