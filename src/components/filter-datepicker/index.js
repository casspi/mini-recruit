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
            value: { }
        }
    },
    methods: {
        handleChange (event) {
            const { item, value } = this.inputParams(event)
            this.triggerEvent('input', { item: `${item.key}.value`, value })
        },
    }
});
