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
    logList: [
      {
        text: '待审核变为审核失败',
        time: '2023-04-12 19:32:21'
      },
      {
        text: '待审核变为审核失败1',
        time: '2023-04-12 19:32:21'
      },
      {
        text: '待审核变为审核失败2',
        time: '2023-04-12 19:32:21'
      },
      {
        text: '待审核变为审核失败3',
        time: '2023-04-12 19:32:21'
      },
    ]
  }
})

