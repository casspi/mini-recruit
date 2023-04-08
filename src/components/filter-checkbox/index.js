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
            type: Array,
            optionalTypes: [String, Number, Object, Array],
            value: []
        },
    },
    methods: {
        handleSelect (event) {
            const { item } = this.inputParams(event)
            const { value } = this.data
            const index = value.indexOf(item.value)
            index === -1 ? value.push(item.value) : value.splice(index, 1)
            this.triggerEvent('input', { value })
        },
    },
});
