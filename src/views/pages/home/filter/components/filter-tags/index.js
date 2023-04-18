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
    value: {
      type: String,
      value: ''
    },
    key: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    }
  },
  data: {
    expand: false
  },
  methods: {
    handleSelect(event) {
      const {item} = this.inputParams(event)
      const {value, key} = this.data
      console.log(item, key, value)
      this.triggerEvent('select', {key, value: item.value === value ? '' : item.value})
    },
  },
});
