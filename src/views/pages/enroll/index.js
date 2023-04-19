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
    isOpen: false,
    queryText: '',
    objFilter: {}
  },
  onLoad() {
    this.handleRefresh()
  },
  handleRefresh(cb) {
    this.pagingRefresh(cb)
  },
  pagingGetUrlParamsOptions() {
    const {api$, objFilter, patientName} = this.data
    return {
      url: api$.REQ_PATIENT_LIST,
      params: {
        patientName,
        patientDisease:'',
        patientStatus:'',
        createBeginTime:'',
        createEndTime:''
      },
      options: {
        method: 'get',
        loading: false
      }
    }
  },
  handleKeywordInput(event) {
    const { value } = this.inputParams(event)
    if (!value.trim()) this.handleKeywordConfirm(event)
  },
  handleKeywordConfirm(event) {
    const { value } = this.inputParams(event)
    this.setData({ patientName: value.trim() }, () => {
      this.handleRefresh()
    })
  },
  // 详细搜索
  handleFilter() {
    const {objFilter} = this.data
    this.selectComponent('#filter-view').show(objFilter)
  },
  handleFilterConfirm(event) {
    const {objFilter} = this.inputParams(event)
    console.log(objFilter)
    this.setData({objFilter},()=>{
      this.handleRefresh()
    })

  },
})

