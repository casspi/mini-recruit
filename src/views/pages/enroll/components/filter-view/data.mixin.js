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
          createBeginTime: {
            value: '',
            label: '开始日期',
            mode: 'date',
            key: 'objFilter.datetime.children.createBeginTime',
            endKey: 'objFilter.datetime.children.endTime',
            start: '',
            end: '',
            useBar: true,
          },
          createEndTime: {
            value: '',
            label: '结束日期',
            start: '',
            end: '',
            mode: 'date',
            startKey: 'objFilter.datetime.children.startTime',
            key: 'objFilter.datetime.children.createEndTime',
          },
        }
      },
      patientStatus: {
        value: [],
        label: '患者状态:',
        key: 'objFilter.patientStatus',
        is: 'checkbox',
        options: [],
      },
      recruit: {
        label: '推荐人',
        key: 'objFilter.recruit',
        is: 'picker',
        placeholder: '请选择推荐人',
        rangeKey: 'label',
        options: []
      }
    }
  }
}
