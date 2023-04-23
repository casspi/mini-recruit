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
  ],
  data: {
    event: 'enrollList',
    patientName: '',
    selected: [],
    queryText: '',
    objFilter: {},
    dicStatus: [],
    dicRecruit: [],
  },
  onLoad() {
    this.handleRefresh()
    this.getStatusDic()
  },
  // 详情回来更新状态，不请求接口情况下
  updateRead(patientId) {
    if (!patientId) return
    const pagingData = this.data.pagingData
    updateStatus: for (let i = 0; i < pagingData.length; i++) {
      for (let j = 0; j < pagingData[i].length; j++) {
        const item = pagingData[i][j]
        console.log(i, j, item)
        if (item.patientId === patientId) {
          item.readStatus = '0'
          break updateStatus
        }
      }
    }
    this.setData({
      pagingData
    })
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
  },
  pagingGetUrlParamsOptions({pagingIndex}) {
    // if (pagingIndex === 1) {
    //   const refWowScroll = this.selectComponent('#wowScroll')
    //   if (refWowScroll) {
    //     refWowScroll.returnTop()
    //   }
    // }
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

