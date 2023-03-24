import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Input,
  ],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    options: {
      type: Object,
      value: [],
    },
    overlayClose: {
      type: Boolean,
      value: true,
    },
    multiple: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    visible: false,
    current: '',
    value: []
  },
  methods: {
    // 选择省份
    provinceHandle(e) {
      const {item} = this.inputParams(e)
      this.setData({
        current: item.id
      })
    },
    // 选择城市
    cityHandle(e) {
      const {item} = this.inputParams(e)
      this.setData({
        value: [item]
      }, () => {
        // 单选直接关闭
        if (!this.data.multiple) this.handleConfirm(e)
      })
    },
    handledOverlay() {
      if (this.data.overlayClose) {
        this.hide(true)
      }
    },
    show(options = {}) {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
        this.setData({visible: true, ...options})
        console.log('this.data=>', this.data)
      })
    },
    hide(forced) {
      if (forced !== true && this.data.beforeClose) {
        return this.data.beforeClose('cancel', () => this.hide(true))
      }
      if (this.reject) this.reject()
      this.setData({visible: false})
      this.triggerEvent('cancel')
    },
    handleConfirm(event) {
      if (this.data.beforeClose) {
        return this.data.beforeClose('confirm', () => this.confirm(event))
      }
      this.confirm(event)
    },
    confirm(event) {
      const data = this.inputParams(event)
      if (this.resolve) {
        this.reject = null
        this.resolve({...data, ...this.data})
      }
      this.triggerEvent('confirm', data)
      this.setData({visible: false})
    }
  }

})
