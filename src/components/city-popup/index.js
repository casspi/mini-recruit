import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'
import Tools from 'src/mixins/tools.mixin'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Input,
  ],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
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
      let {multiple, value} = this.data
      if (multiple) {
        if (Tools.includes(value, item.id, 'id')) {
          value = value.filter(o => o.id !== item.id)
        } else {
          value.push(item)
        }
        this.setData({
          value
        })
      } else {
        this.setData({
          value: [item]
        }, () => {
          this.handleConfirm(e)
        })
      }

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
