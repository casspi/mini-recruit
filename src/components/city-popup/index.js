import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'
import Tools from 'src/mixins/tools.mixin'

new WowComponent({
  mixins: [
    WowComponent.wow$.mixins.Input,
    WowComponent.wow$.mixins.Modal,

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
    parent: '',
    value: []
  },
  methods: {
    // 选择省份
    provinceHandle(e) {
      const {item} = this.inputParams(e)
      this.setData({
        parent: item
      })
    },
    // 选择城市
    cityHandle(e) {
      const {item} = this.inputParams(e)
      let {multiple, value, parent, limit} = this.data
      if (multiple) {
        if (Tools.includes(value, item.id, 'id', 'city')) {
          value = value.filter(o => o.city.id !== item.id)
        } else {
          if (value.length >= 10) {
            this.modalToast(`最多选择${limit}个城市`)
            return
          }
          value.push({
            city: item,
            province: {id: parent.id, label: parent.label}
          })
        }
        this.setData({
          value
        })
      } else {
        this.setData({
          value: [{
            city: item,
            province: {id: parent.id, label: parent.label}
          }]
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
