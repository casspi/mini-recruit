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
    WowPage.wow$.mixins.Loading,
    WowPage.wow$.mixins.Share,
    WowPage.wow$.mixins.User,
  ],
  data: {
    tabs: ['项目介绍', '治疗方案', '入排标准', '研究中心'],
    detailInfo: {},
    active: 0,
    collect: false
  },
  onLoad(options) {
    this.routerGetParams(options)
    this.userGet().then(res => {

    }, err => {
      console.log('err', err);
    }).null()
    this.getDetail()
    console.log('userGet=>', this.data.user$)
  },
  getDetail() {
    const {api$, params$} = this.data
    this.curl(api$.REQ_PROJECT_DETAIL, {projectId: params$.projectId}, {method: 'get'}).then(res => {
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
  handleCollect(e) {
    wx.setStorageSync('home_refresh', '1')
    const {item} = this.inputParams(e)
    const {api$} = this.data
    this.curl(api$.COLLECT_CHANGE, {
      collectStatus: Boolean(item.collectStatus),
      projectId: item.projectId
    }, {method: 'get'}).then(res => {
      this.getDetail()
    }).toast()
  },
  billHandle(e) {
    const {item, disabled} = this.inputParams(e)
    if (disabled) {
      this.modalToast('暂无海报')
      return
    }
    this.imagePreview({
      current: 0,
      urls: item.urls,
    }).toast()
  },
  // 立即报名
  handleSubject() {
    const {params$} = this.data
    this.routerRoot('subject_index', {projectId: params$.projectId}, true)
  },
  //分享
  shareGetConfig() {
    const {params$, detailInfo} = this.data
    return {
      title: detailInfo.projectName,
      path: this.shareStringify({to: 'project_index', projectId: params$.projectId})
    }
  }
})

