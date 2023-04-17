//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Jump,

  ],
  data: {
    infoObj: [
      {
        label: '所患疾病',
        value: '感冒'
      },
      {
        label: '患者编码',
        value: 'xxx'
      },
      {
        label: '创建时间',
        value: '2023-04-09'
      },
      {
        label: '材料',
        value: '审核中',
        arrow: true,
        url: 'subject_index',
        params: {
          isDetail: true
        }
      },
      {
        label: '状态',
        value: '变更记录',
        arrow: true,
        url: 'patientlog_index',
        params: {
          isDetail: true
        }
      }
    ]
  },
  onLoad() {
    const pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      form: 'detail'
    })
  }
})

