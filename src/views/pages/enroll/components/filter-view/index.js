import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'
import DataMixin from './data.mixin'

new WowComponent({
  mixins: [
    DataMixin,
    WowComponent.wow$.mixins.Curl,
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Validate,
    WowComponent.wow$.mixins.Jump,
    WowComponent.wow$.mixins.Handle,
    WowComponent.wow$.mixins.Format,
  ],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {},
  data: {
    visible: false,
  },
  methods: {
    show(options) {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
        this.setData({visible: true, ...options})
      })
    },
    handleConfirm() {
      const {objFilter} = this.data
      const options = this.validateInput(objFilter)
      this.setData({visible: false})
      this.triggerEvent('confirm', {objFilter: options})
      this.triggerEvent('visible', {value: false})
    },
    handleReset() {
      const {objFilter} = this.data
      const options = this.validateInput(objFilter)
      Object.keys(options).forEach(k => options[k] = ['collectionStatus'].includes(k) ? [] : '')
      this.validateAssignment(this, options, objFilter, 'objFilter')
    },
    // 姓名
    handleInput(options) {
      const {detail} = options
      this.setData({[`${detail.key}.value`]: detail.value})
    },
    // 日期
    handleDatepicker(options) {
      const {detail} = options
      console.log('detail', detail)
      this.setData({
        [`${detail.key}.value`]: detail.value
      })
    },
    // 选择联系人
    handlePicker(options) {
      const {detail} = options
      this.setData({[`${detail.key}.value`]: detail.value})
    }
  },
})
