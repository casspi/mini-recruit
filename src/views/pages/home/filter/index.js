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
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Page,
  ],
  data: {},
  onLoad(o) {
    this.routerGetParams(o)
    let {api$, params$} = this.data
    // 疾病字典
    this.curl(api$.DIC_FILTER_DISEASE, {}, {method: 'get'}).then((res = []) => {
      const omitDisease = ["全部肿瘤", "其他肿瘤", "全部慢病", "其他慢病"]
      res = res.filter(o => !omitDisease.includes(o.label))
      let options = res.map(item => {
        // 有些疾病没有children 这里补个默认的
        if (!item.children || !item.children.length) {
          const {value, label, level} = item
          item.children = [{value, label, level}]
        }
        return item
      })
      this.setData({
        'params$.objFilter.disease.options': options
      })
    })
    // 地区字典
    this.curl(api$.DIC_FILTER_AREA, {}, {method: 'get'}).then(res => {
      this.setData({
        'params$.objFilter.area.options': res || []
      })
    })
    const areaValue = (params$.objFilter.area.value.children) ? params$.objFilter.area.value.children.value : ''
    if (areaValue) {
      this.curl(api$.DIC_FILTER_HOSPITAL, {value: areaValue}, {method: 'get'}).then(res => {
        this.setData({
          ['params$.objFilter.hospital.options']: res
        })
      })
    }

    // 科室
    this.curl(api$.DIC_FILTER_SECTION, {}, {method: 'get'}).then(res => {
      this.setData({
        'params$.objFilter.more.children.department.options': res || []
      })
    })
    // 基因
    this.curl(api$.DIC_FILTER_GENE, {}, {method: 'get'}).then(res => {
      this.setData({
        'params$.objFilter.more.children.gene.options': res || []
      })
    })
    // 线数
    this.curl(api$.DIC_FILTER_TREATMENT, {}, {method: 'get'}).then(res => {
      this.setData({
        ['params$.objFilter.more.children.treatment.options']: res || []
      })
    })
  },
  // tabs 切换逻辑
  inputHandle(e) {
    const {item, value} = this.inputParams(e)
    const {params$, api$} = this.data
    // 选中心前必选地区
    if (value === 'hospital') {
      const area = params$.objFilter.area.value
      if (!Object.keys(area).length) {
        this.modalToast('请选择地区')
        return
      }
      this.curl(api$.DIC_FILTER_HOSPITAL, {value: area.children.value}, {method: 'get'}).then(res => {
        this.setData({
          [`${item}`]: value,
          ['params$.objFilter.hospital.options']: res
        })
      })

    } else {
      this.setData({
        [`${item}`]: value
      })
    }
  },
  // 选中回显
  handleSelect(options) {
    const {detail} = options
    console.log(detail)
    this.setData({[`${detail.key}.value`]: detail.value})
    if (detail.key === 'params$.objFilter.area') {
      this.setData({
        ['params$.objFilter.hospital.value']: ''
      })
    }
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
  },
  confirmHandle(e) {
    const refHomePage = this.pagesGetByIndex(1)
    let {params$: {confirm, objFilter}} = this.data
    if (refHomePage && confirm && refHomePage[confirm]) {
      refHomePage[confirm](objFilter)
    }
    this.jumpTabBarPage(e)
  }
})

