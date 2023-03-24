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
    WowPage.wow$.mixins.Curl,
  ],
  onLoad(options) {
    this.routerGetParams(options)
  },
  // 选择组件选中回调
  selectHandle(options) {
    console.log('options=>', options)
    const {key, valkey = 'value', active} = options
    this.setData({
      [`${key}.${valkey}`]: active.length ? active : ''
    })
  },
  //城市选择控件
  cityHandle(item) {
    const {api$, source = []} = this.data
    ;(source.length ? Promise.resolve(source) : this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
      this.data.source = res.map(item => {
        const {value: label, childs: citys, id} = item
        const children = citys.map(({value, id}) => ({label: value, id}))
        return {children, label, id}
      })
      return this.data.source
    })).then(source => {
      // 去选择城市
      return this.selectComponent('#refCity').show({
        value: item.value,
        source,
        beforeClose: (action, done) => {
          if (action === 'cancel') return done()
          done()
        }
      })
    }).then(res => {
      this.setData({[`${item.key}.value`]: res.value})
    }).toast()
  },
  cityConfirm(data) {
    console.log('cityconfirm=>', data)
  }
})

