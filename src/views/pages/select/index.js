//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import WowComponent from 'wow-wx/lib/component'
import DataMixin from './data.mixin'

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Config,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Page,
    WowComponent.wow$.mixins.Modal,
  ],
  onLoad(p) {
    this.routerGetParams(p)
    const {title, value} = this.data.params$
    wx.setNavigationBarTitle({title})
    this.setData({
      active: value || []
    })
  },
  itemHandle(event) {
    const {item} = this.inputParams(event)
    let {params$, active} = this.data
    if (params$.multiple) {
      if (active.includes(item.id)) {
        active = active.filter(o => o !== item.id)
      } else {
        active.push(item.id)
      }
      this.setData({
        active: active
      })
    } else {
      this.setData({
        active: [item.id]
      })
    }

  },
  handleConfirm() {
    const {params$, active} = this.data
    console.log('params$', params$)
    const {confirm} = params$
    const refPage = this.pagesGetByIndex(1)
    console.log(refPage, confirm, active)
    if (!active.length) {
      this.modalToast('请选择')
      return
    }
    if (refPage && confirm && refPage[confirm]) {
      refPage[confirm](
        {...params$, active: active}
      )
    }
    this.routerPop()
  }
})

