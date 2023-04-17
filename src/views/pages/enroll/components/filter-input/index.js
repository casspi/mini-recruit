import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
  externalClasses: ['class-external'],
  mixins: [
    WowComponent.wow$.mixins.Input,
  ],
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  methods: {
    inputHandle(event) {
      const {item, value} = this.inputParams(event)
      console.log(item, value);
      this.triggerEvent('input', {...item, value})
    },
  }
});
