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
    const {api$} = this.data
    return {
      // url: api$.subjectList,
      // params:{
      //   selectClewPage: false
      // },
      url: api$.homeList,
      params: {
        AuthorizationV2: '9_zPc9FqNfhzVv6g9_EgywTFayIyueMyD3mGLka11Aw=',
        'departmentId': 0,
        'illness': 0,
        'genetic': 0,
        'treatmentLines': 0,
        'province': 0,
        'cityId': 0,
        'researchCenterIdList': '',
        'centerStartState': 0,
        'searchContent': '',
        'collectInfo': false,
        'addedTimeSort': 0,
      },
      options: {
        method: 'get',
        loading: false
      }
    }
  },
  // 搜索
  handleFilter() {
    const {objFilter} = this.data
    this.selectComponent('#filter-view').show(objFilter)
  },
  handleFilterConfirm(event) {
    const {objFilter} = this.inputParams(event)
    console.log(objFilter)
    this.setData({objFilter})
    this.handleRefresh()
  },
})

