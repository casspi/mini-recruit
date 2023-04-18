//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Curl,
  ],
  data: {},
  onLoad(o) {
    this.routerGetParams(o)
    let {params$, api$} = this.data
    Object.keys(params$.objFilter).forEach(item => {
      params$.objFilter[item].key = `params$.${params$.objFilter[item].key}`
      let children = params$.objFilter[item].children
      if (children) {
        Object.keys(children).forEach(o => {
          children[o].key = `params$.${children[o].key}`
        })
      }
    })
    this.setData({
      params$
    })
    // 获取城市数据
    this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
      let {params$} = this.data
      params$.objFilter.area.options = res.map(item => {
        const {value: label, childs: citys, id: value} = item
        const children = citys.map(({value, id}) => ({label: value, value: id}))
        return {children, label, value}
      })
      this.setData({
        params$
      })
    })

  },
  // tabs 切换逻辑
  inputHandle(e) {
    const {item, value} = this.inputParams(e)
    const {params$} = this.data
    // 选中心前必选地区
    if (value === "hospital" && !Object.keys(params$.objFilter.area.value).length) {
      this.modalToast('请选择地区')
      return
    }

    this.setData({
      [`${item}`]: value
    })
    console.log(this.data)
  },
  // 选中回显
  handleSelect(options) {
    const {detail} = options
    console.log(detail)
    this.setData({[`${detail.key}.value`]: detail.value})
  },
  resetHandle() {
    let {params$: {objFilter}} = this.data
    Object.keys(objFilter).forEach(item => {
      objFilter[item].value = objFilter[item].defaultValue
      let children = objFilter[item].children
      if (children) {
        Object.keys(children).forEach(i => {
          children[i].value = children[i].defaultValue
        })
      }
    })
    this.setData({
      ['params$.objFilter']: objFilter
    })
  }
})

