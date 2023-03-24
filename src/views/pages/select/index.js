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
      active: value || []
    }, () => {
      this.renderSelected()
    })
  },
  itemHandle(event) {
    const {item} = this.inputParams(event)
    let {params$, active} = this.data
    if (params$.multiple) {
      if (active.includes(item)) {
        active = active.filter(o => o !== item)
      } else {
        active.push(item)
      }
      this.setData({
        active: active
      }, () => {
        this.renderSelected()
      })
    } else {
      this.setData({
        active: [item]
      }, () => {
        this.renderSelected()
      })
    }

  },
  handleConfirm() {
    const {params$, active} = this.data
    console.log('params$', params$)
    const {confirm} = params$
    const refPage = this.pagesGetByIndex(1)
    if (refPage && confirm && refPage[confirm]) {
      refPage[confirm](
        {...params$, active: active.length ? active : ''}
      )
    }
    this.routerPop()
  },
  renderSelected() {
    const {params$, active} = this.data
    if (!params$.multiple) return
    console.log(params$.options, active, Tools.pickByKey(params$.options, active, 'id'))
    const res = Tools.pickByKey(params$.options, active, 'id').map(item => item.text)
    this.setData({
      selectedText: res.length ? res.join(';') : ''
    })
  }
})

