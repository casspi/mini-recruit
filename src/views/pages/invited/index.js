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
    // const {api$} = this.data
    // this.curl(api$.REQ_INVITED_LIST, {}, {method: 'get'}).then(res=>{
    //   console.log(res)
    // })
    this.handleRefresh()
  },
  handleRefresh(cb) {
    this.pagingRefresh(cb)
  },
  pagingGetUrlParamsOptions() {
    const {api$} = this.data
    return {
      url: api$.REQ_INVITED_LIST,
      params: {

      },
      options: {
        method: 'get',
        loading: false
      }
    }
  },
})

