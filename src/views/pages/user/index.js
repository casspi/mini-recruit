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
    const {key, value} = options
    this.setData({
      [`${key}.value`]: value
    }, () => {

      console.log('data=>', this.data)
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
        ...item,
        source,
        beforeClose: (action, done) => {
          if (action === 'cancel') return done()
          done()
        }
      })
    }).then(res => {
      console.log('res', res)
      this.setData({[`${item.key}.value`]: res.value})
    }).toast()
  },
  // 图片上传
  handlePics(item) {
    console.log('handlePics=>', item)
  }
})

