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
        console.log('this.data=>', this.data)
      })
    },
    toggle(options) {
      // 重置数据
      let {isActive, objFilter} = this.data
      isActive = !isActive
      this.setData({isActive})
      // 开启 进行赋值操作
      if (isActive) {
        objFilter.certificateCity.isPicker = false
        this.validateAssignment(this, options, objFilter, 'objFilter')
      }
      this.setInputOrderRange()
      this.setDatetimeRange()
      this.triggerEvent('visible', {value: isActive})
      return isActive
    },
    handleConfirm() {
      const {objFilter} = this.data
      const options = this.validateInput(objFilter)
      this.setData({isActive: false})
      this.triggerEvent('confirm', {objFilter: options})
      this.triggerEvent('visible', {value: false})
    },
    handleReset() {
      const {objFilter} = this.data
      const options = this.validateInput(objFilter)
      Object.keys(options).forEach(k => options[k] = ['statusList', 'settlementStatusList', 'collectionStatus'].includes(k) ? [] : '')
      this.validateAssignment(this, options, objFilter, 'objFilter')
      this.setInputOrderRange()
      this.setDatetimeRange()
    },
    handlePickerHide(event) {
      const {item} = this.inputParams(event)
      this.setData({[`${item.key}.isPicker`]: false})
    },
    inputCallback(key) {
      if (
        [
          'objFilter.reassignmentDate.children.reassignmentDateStartTime.value',
          'objFilter.reassignmentDate.children.reassignmentDateEndTime.value',
        ].includes(key)
      ) {
        this.setInputOrderRange()
      }
      if (
        [
          'objFilter.datetime.children.startTime.value',
          'objFilter.datetime.children.endTime.value',
        ].includes(key)
      ) {
        this.setDatetimeRange()
      }
    },
    setDatetimeRange() {
      const {objFilter} = this.data
      const {startTime, endTime} = this.validateInput(objFilter)
      this.setData({
        'objFilter.datetime.children.startTime.end': endTime || this.formatDate('yyyy-MM-dd'),
        'objFilter.datetime.children.endTime.end': this.formatDate('yyyy-MM-dd'),
        'objFilter.datetime.children.endTime.start': startTime,
      })
    },
    setInputOrderRange() {
      const {objFilter} = this.data
      let {reassignmentDateStartTime, reassignmentDateEndTime} = this.validateInput(objFilter)
      const spacing = 90 * 24 * 60 * 60 * 1000
      if (!reassignmentDateStartTime && !reassignmentDateEndTime) {
        // 没有值 需要赋值
        reassignmentDateEndTime = this.formatDate('yyyy-MM-dd')
        reassignmentDateStartTime = this.formatDate('yyyy-MM-dd', Date.now() - spacing)
      }
      // 判断
      const maxStartTime = reassignmentDateEndTime
      const minStartTime = this.formatGetDateSpacing(reassignmentDateEndTime, spacing * -1)
      let maxEndTime = this.formatGetDateSpacing(reassignmentDateStartTime, spacing)
      if (this.formatGetTimeByStr(maxEndTime) > Date.now()) {
        maxEndTime = this.formatDate('yyyy-MM-dd')
      }
      const minEndTime = reassignmentDateStartTime
      this.setData({
        'objFilter.reassignmentDate.children.reassignmentDateStartTime.value': reassignmentDateStartTime,
        'objFilter.reassignmentDate.children.reassignmentDateStartTime.end': maxStartTime,
        'objFilter.reassignmentDate.children.reassignmentDateStartTime.start': minStartTime,
        'objFilter.reassignmentDate.children.reassignmentDateEndTime.value': reassignmentDateEndTime,
        'objFilter.reassignmentDate.children.reassignmentDateEndTime.end': maxEndTime,
        'objFilter.reassignmentDate.children.reassignmentDateEndTime.start': minEndTime,
      })
    },
  },
})
