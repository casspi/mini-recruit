//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import WowComponent from 'wow-wx/lib/component'
import DataMixin from './data.mixin'
import Tools from 'src/mixins/tools.mixin'

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Config,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Page,
    WowComponent.wow$.mixins.Modal,
    Tools
  ],
  onLoad(p) {
    this.routerGetParams(p)
    const {title, value} = this.data.params$
    wx.setNavigationBarTitle({title})
    this.setData({
      value: value || []
    }, () => {
      this.renderSelected()
    })
  },
  itemHandle(event) {
    const {item} = this.inputParams(event)
    let {params$, value} = this.data
    if (params$.multiple) {
      if (value.find(o => o.id === item.id)) {
        value = value.filter(o => o.id !== item.id)
      } else {
        value.push(item)
      }
      this.setData({
        value
      }, () => {
        this.renderSelected()
      })
    } else {
      this.setData({
        value: [item]
      }, () => {
        this.renderSelected()
      })
    }

  },
  handleConfirm() {
    const {params$, value} = this.data
    console.log('params$', params$)
    const {confirm} = params$
    const refPage = this.pagesGetByIndex(1)
    if (refPage && confirm && refPage[confirm]) {
      refPage[confirm](
        {...params$, value: value.length ? value : ''}
      )
    }
    this.routerPop()
  },
  renderSelected() {
    const {params$, value} = this.data
    if (!params$.multiple) return
    const res = Tools.pickByKey(params$.options, value, 'id').map(item => item.text)
    this.setData({
      selectedText: res.length ? res.join(';') : ''
    })
  }
})

