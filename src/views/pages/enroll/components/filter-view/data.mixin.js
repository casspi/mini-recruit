import WowPage from 'wow-wx/lib/page'

const {config$} = WowPage.wow$.mixins.Config.data

export default {
  data: {
    objFilter: {
      // name: {
      //   label: '患者姓名或编号:',
      //   key: 'objFilter.name',
      //   is: 'input',
      //   placeholder: '请输入患者姓名、患者编号搜索',
      //   maxlength: 10,
      // },
      datetime: {
        label: '创建日期:',
        is: 'datepicker',
        children: {
          startTime: {
            value: '',
            label: '开始日期',
            mode: 'date',
            key: 'objFilter.datetime.children.startTime',
            endKey: 'objFilter.datetime.children.endTime',
            start: '',
            end: '',
            useBar: true,
          },
          endTime: {
            value: '',
            label: '结束日期',
            start: '',
            end: '',
            mode: 'date',
            startKey: 'objFilter.datetime.children.startTime',
            key: 'objFilter.datetime.children.endTime',
          },
        }
      },
      collectionStatus: {
        value: [],
        label: '患者状态:',
        key: 'objFilter.collectionStatus',
        is: 'checkbox',
        options: [{
          id: 1,
          label: '未提交',
          value: 11
        }, {
          id: 2,
          label: '医学审核中',
          value: 12
        }, {
          id: 3,
          label: '医学审核驳回',
          value: 13
        }, {
          id: 4,
          label: '审核通过',
          value: 14
        }, {
          id: 5,
          label: '缺资料',
          value: 15
        }],
      },
      referee: {
        label: '推荐人',
        key: 'objFilter.referee',
        is: 'picker',
        placeholder: '请选择推荐人',
        rangeKey: 'name',
        options: [
          '张三',
          '李四',
        ]
      }
    }
  }
}
