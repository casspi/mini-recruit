//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Curl,

  ],
  data: {
    logList: []
  },
  onLoad(options) {
    this.routerGetParams(options)
    const {api$, params$} = this.data
    this.curl(api$.REQ_HOSPITAL_LOG, {projectId: params$.projectId}, {method: 'get'}).then(res=>{
      console.log(res)
      this.setData({
        logList: res
      })
    })
  }
})

