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
    children: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleChange(event) {
      const {children} = this.data
      const {item, value} = this.inputParams(event)
      console.log(item, value, children)
      this.triggerEvent('input', {...item, value})
    },
  }
});
