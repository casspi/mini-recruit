//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Share,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Helper,
  ],
  handleCopy() {
    this.helperFnPromise('setClipboardData', {
      data: '222'
    }).toast()
  },
  shareGetConfig() {
    // const {params$, user$, objData} = this.data
    // const {id} = params$
    // const {nickName = ''} = user$
    return {
      title: 'sss999',
      ...this.shareStringify({to: 'login_index'})
    }
  },
})

