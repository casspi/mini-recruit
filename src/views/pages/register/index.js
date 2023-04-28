//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'
import User from "wow-wx/mixins/utils/user.mixin";

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Format,
    WowPage.wow$.mixins.Validate,
    WowPage.wow$.mixins.Page,//
    WowPage.wow$.mixins.User,
  ],
  onLoad(options) {
    this.routerGetParams(options)
    console.log(this.data.params$)
    this.getDic()
  },
  // 获取字典
  getDic() {
    const {api$} = this.data
    this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'})
      .then(res => {
        this.data.source = res
      })
    this.curl(api$.REQ_DISEASE_LIST, {}, {method: 'get'})
      .then(res => {
        this.setData({
          ['objInput.diseaseIds.options']: res || []
        })
      })
    this.curl(api$.DIC_USER_TYPE, {}, {method: 'get'})
      .then(res => {
        this.setData({
          ['objInput.userType.options']: res || []
        })
      })

  },
  // 选择组件选中回调
  selectHandle(options) {
    console.log('options=>', options)
    const {key, value} = options
    if (key === 'objInput.userType') {
      this.setData({
        // 0-招募者 1-患者
        ['objInput.allocateAreaId.hidden']: value[0].value === '1'
      })
    }
    this.setData({
      [`${key}.value`]: value
    })
  },
  //城市选择控件
  cityHandle(item) {
    const {value} = item
    const {api$, source = []} = this.data
    ;(source.length ? Promise.resolve(source) : this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
      this.data.cityList = res
      return this.data.cityList
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
      console.log('res', res)
      this.setData({[`${item.key}.value`]: res.value})
    }).toast()
  },
  submitHandle() {
    // this.validateAssignment(this, {name: 1}, this.data.objInput, 'objInput')
    if (this.validateCheck(this.data.objInput)) return;
    // 提取参数
    let {allocateAreaId = [], city, diseaseIds = [], gender, name, userType} = this.validateInput(this.data.objInput)
    allocateAreaId = allocateAreaId.map(item => item.city.value).join(',')
    diseaseIds = diseaseIds.map(item => item.value).join(',')
    const {api$, params$} = this.data
    this.curl(api$.REQ_REGISTER, {
      allocateAreaId,
      provinceId: city[0] ? city[0].province.value : '',
      cityId: city[0] ? city[0].city.value : '',
      diseaseIds,
      type: userType[0] ? userType[0].value : '',
      gender,
      name,
      recruitCode: params$.recruitCode,
      phone: params$.phone
    }, {method: 'post'}).then(res => {
      const {__gsessionId} = res
      User.userUpdate({__gsessionId})
      wx.setStorageSync('home_refresh', '1')
      this.routerRoot('home_index')
    }).toast()
  }
})

