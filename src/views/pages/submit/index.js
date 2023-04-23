//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from "./data.mixin";

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Format,
    WowPage.wow$.mixins.Validate,
  ],
  onLoad() {
    this.getDic()
  },
  // 获取字典
  getDic() {
    const {api$} = this.data
    this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'})
      .then(res => {
        this.data.source = res
      })
    this.curl(api$.REQ_DISEASE_LIST, {}, {method: 'get', loading: false})
      .then(res => {
        this.setData({
          'objInput.patientDisease.options': res
        })
      })
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
    const {value} = item
    const {api$, source = []} = this.data
    ;(source.length ? Promise.resolve(source) : this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
      this.data.source = res
      return this.data.source
    })).then(source => {
      // 去选择城市
      return this.selectComponent('#refCity').show({
        ...item,
        parent: value.length ? value[0].province : '',
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
  submitHandle() {
    const {api$} = this.data
    if (!this.data.isAgreement) return
    // true 有问题
    if (this.validateCheck(this.data.objInput)) return
    // 提取参数
    const {patientDisease, area, ...options} = this.validateInput(this.data.objInput, this.data.objInput)
    this.curl(api$.REQ_PATIENT_REPORT, {
      ...options,
      patientDisease: patientDisease[0].value,
      provinceId: area[0].province.value,
      cityId: area[0].city.value
    }, {method: 'get'}).then(() => {
      this.routerPop()
    }).toast()
  }
})

