import WowPage from 'wow-wx/lib/page'

const {config$} = WowPage.wow$.mixins.Config.data

export default {
  data: {
    objFilter: {
      collectionStatus: {
        value: [],
        label: '收款状态',
        key: 'objFilter.collectionStatus',
        is: 'checkbox',
        options: [{
          id: 1,
          label: '感冒',
          value: 11
        }],
      },
      datetime: {
        label: '创建日期',
        is: 'datepicker',
        children: {
          startTime: {
            value: '',
            label: '开始日期',
            mode: 'date',
            key: 'objFilter.datetime.children.startTime',
            useBar: true,
          },
          endTime: {
            value: '',
            label: '结束日期',
            mode: 'date',
            key: 'objFilter.datetime.children.endTime',
          },
        }
      }
    }
  }
}
