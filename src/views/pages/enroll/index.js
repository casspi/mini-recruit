//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Paging,
    WowPage.wow$.mixins.Broadcast,
    WowPage.wow$.mixins.Config,
    WowPage.wow$.mixins.Loadmore,
    WowPage.wow$.mixins.Input,
    // WowPage.wow$.mixins.Refresh,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.TabItemTap,

  ],
  data: {
    statusChange: -1,
    patientName: '',
    selected: [],
    queryText: '',
    objFilter: {},
    dicStatus: [],
    dicRecruit: [],
  },
  onShow() {
    const refresh = wx.getStorageSync('refresh')
    wx.removeStorageSync('refresh')
    if (refresh === '1') this.handleRefresh()
  },
  tabItemTapCallback() {
    this.handleRefresh()
    this.getStatusDic()
  },
  // 详情回来更新状态，不请求接口情况下
  updateRead(patientId) {
    if (!patientId) return
    const pagingData = this.data.pagingData
    let arrIndex, itemIndex;
    updateStatus: for (let i = 0; i < pagingData.length; i++) {
      for (let j = 0; j < pagingData[i].length; j++) {
        const item = pagingData[i][j]
        if (item.patientId === patientId) {
          arrIndex = i, itemIndex = j
          break updateStatus
        }
      }
    }
    if (arrIndex >= 0) {
      this.setData({
        [`pagingData[${arrIndex}][${itemIndex}].readStatus`]: '1'
      })
    }
  },
  // 字典
  getStatusDic() {
    const {api$} = this.data
    this.curl(api$.DIC_PATIENT_STATUS, {}, {method: 'get', loading: false})
      .then(res => {
        this.setData({
          dicStatus: res
        })
      })
    this.curl(api$.DIC_RECRUIT, {}, {method: 'get', loading: false})
      .then(res => {
        this.setData({
          dicRecruit: res
        })
      })
  },
  handleRefresh(cb) {
    this.pagingRefresh(cb)
    this.getStatusChange()
  },
  pagingGetUrlParamsOptions({pagingIndex}) {
    if (pagingIndex === 1) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
    const {
      api$,
      objFilter: {createBeginTime = '', createEndTime = '', patientStatus = [], recruit},
      patientName
    } = this.data
    console.log('patientStatus=>', patientStatus)
    return {
      url: api$.REQ_PATIENT_LIST,
      params: {
        patientName,
        patientStatusList: patientStatus.join(','),
        recruitId: recruit ? recruit.value : '',
        createBeginTime: createBeginTime ? createBeginTime + ' 00:00:00' : '',
        createEndTime: createEndTime ? createEndTime + ' 23:59:59' : '',
      },
      options: {
        method: 'get',
        loading: false
      }
    }
  },
  // 状态更新条数
  getStatusChange() {
    const {api$} = this.data
    this.curl(api$.REQ_PATIENT_STATUS_CHANGE, {}, {method: 'get', loading: false})
      .then(res => {
        this.setData({
          statusChange: res
        })
      })
  },
  handleKeywordInput(event) {
    const {value} = this.inputParams(event)
    if (!value.trim()) this.handleKeywordConfirm(event)
  },
  handleKeywordConfirm(event) {
    const {value} = this.inputParams(event)
    this.setData({patientName: value.trim()}, () => {
      this.handleRefresh()
    })
  },
  // 详细搜索
  handleFilter() {
    const {objFilter, dicStatus, dicRecruit} = this.data
    this.selectComponent('#filter-view').show(objFilter, dicStatus, dicRecruit)
  },
  handleFilterConfirm(event) {
    const {objFilter} = this.inputParams(event)
    console.log(objFilter)
    this.setData({objFilter}, () => {
      this.handleRefresh()
    })

  },
})

