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
      type: Array,
      value: []
    },
    key: {
      type: String
    },
    value: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleSelect(e) {
      const {item} = this.inputParams(e)
      console.log(item)
      const {value, key} = this.data
      this.triggerEvent('select', {key, value: item.value === value ? '' : item.value})
    },
    parentHandle(e) {
      const {item: {value: pValue, label: pLabel, children}} = this.inputParams(e)
      const {value = {}, key} = this.data
      console.log(pValue, pLabel, children, value)
      Object.assign(value, {
        parent: {
          label: pLabel,
          value: pValue
        },
        children: {
          label: children[0].label,
          value: children[0].value
        }
      })
      this.triggerEvent('select', {key, value})
    },
    childrenHandle(e) {
      const {item} = this.inputParams(e)
      const {value = {}, key} = this.data
      Object.assign(value, {
        children: {
          label: item.label,
          value: item.value
        }
      })
      this.triggerEvent('select', {key, value})
    }
  },
});
