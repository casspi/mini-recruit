//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
  ],
  selectHandle(options) {
    console.log('options=>', options)
    const {key, valkey = 'value', active} = options
    this.setData({
      [`${key}.${valkey}`]: active
    })
  }
})

