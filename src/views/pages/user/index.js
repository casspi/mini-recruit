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
    WowPage.wow$.mixins.Format,
    WowPage.wow$.mixins.Validate,
    WowPage.wow$.mixins.Page,
  ],
  onLoad(options) {
    this.routerGetParams(options)
    this.getDic(this.getDetail)
  },
  //详情
  getDetail() {
    let {api$, objInput, cityList} = this.data
    this.curl(api$.REQ_MINE_INFO, {}, {method: 'get'}).then(res => {
      const {name, gender, areaIdList, diseaseIds, provinceId, cityId, typeName} = res
      objInput.name.value = name
      objInput.gender.value = gender
      objInput.disease.value = objInput.disease.options.filter(o => diseaseIds.includes(o.value))
      const province = cityList.find(o => o.value === provinceId)
      const city = province ? province.children.find(o => o.value === cityId) : null
      objInput.city.value = [{
        province, city
      }]
      objInput.userType.value = typeName
      // 服务区域回显
      const area = []
      areaIdList.forEach(item => {
        const province = cityList.find(o => o.children.find(i => i.value === item))
        area.push({
          province,
          city: province.children.find(o => o.value === item)
        })
      })
      objInput.allocateAreaId.value = area
      this.setData({
        objInput
      })
    })
  },
  // 获取字典
  getDic(cb) {
    const {api$} = this.data
    this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
      this.data.cityList = res
    }).then(() => {
      return this.curl(api$.REQ_DISEASE_LIST, {}, {method: 'get'})
        .then(res => {
          this.data.objInput.disease.options = res
        })
    }).then(() => {
      return this.curl(api$.DIC_USER_TYPE, {}, {method: 'get'})
        .then(res => {
          this.data.userType = res
        })
    }).then(() => {
      cb()
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
    const {api$, cityList = []} = this.data
    ;(cityList.length ? Promise.resolve(cityList) : this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
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
    // true 有问题
    this.validateCheck(this.data.objInput)
    //
    this.validateAssignment(this, {
      //
    }, this.data.objInput, 'objInput')

    // 提取参数
    let {allocateAreaId, city, disease, gender, name} = this.validateInput(this.data.objInput, this.data.objInput)
    allocateAreaId = allocateAreaId.map(item => item.city.value).join(',')
    disease = disease.map(item => item.value).join(',')
    const {api$} = this.data
    this.curl(api$.REQ_MINE_INFO_CHANGE, {
      allocateAreaId,
      provinceId: city[0].province.value,
      cityId: city[0].city.value,
      diseaseIds: disease,
      gender,
      name
    }, {method: 'get'}).then(res => {
      const refPage = this.pagesGetByIndex(1)
      if (refPage) {
        refPage.getDetail()
      }
      this.routerPop()
    }).toast()
  }
})

