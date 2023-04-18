//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Paging,
    WowPage.wow$.mixins.Loadmore,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Refresh,
  ],
  onLoad() {
    this.handleRefresh()
  },
  handleRefresh(cb) {
    this.pagingRefresh(cb)
  },
  pagingGetUrlParamsOptions() {
    const {api$} = this.data
    return {
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
})

