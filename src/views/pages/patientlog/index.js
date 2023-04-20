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
    this.getStatusDic()
  },
  getStatusDic(){
    const {api$, params$} = this.data
    this.curl(api$.PATIENT_STATUS_LOG,{patientId: params$.patientId},{method:'get'})
      .then(res=>{
        this.setData({
          logList: res
        })
      })
  },

})

