export default {
  data: {
    objInput: {
      patientName: {
        value: '',
        key: 'objInput.patientName',
        is: 'field',
        label: '姓名',
        maxlength: 6,
        use: [
          {nonempty: true, prompt: '请输入姓名'}
        ],
      },
      // 年龄
      patientAge: {
        value: '',
        key: 'objInput.patientAge',
        type: 'number',
        is: 'field',
        label: '年龄',
        maxlength: 3,
        use: [
          {nonempty: true, prompt: '请输入年龄'},
        ],
      },
      // 电话
      patientPhone: {
        value: '',
        key: 'objInput.patientPhone',
        type: 'number',
        is: 'field',
        label: '电话',
        maxlength: 11,
        use: [
          {nonempty: true, prompt: '请输入手机号'},
          {rule: v => v.length === 11, prompt: '请输入11位手机号'},
        ],
      },
      patientDisease: {
        value: [],
        label: '疾病',
        key: 'objInput.patientDisease',
        is: 'picker',
        url: 'select_index',
        title: '请选择疾病',
        labelKey: 'label',
        multiple: false,
        formatter: 'formatArrayJoin',
        options: [],
        use: [
          {nonempty: true, prompt: '请选择疾病'},
          {rule: v => v.length, prompt: '请选择疾病'},
        ],
        confirm: 'selectHandle'
      },
      // 所在地
      area: {
        value: [],
        label: '地区',
        key: 'objInput.area',
        is: 'picker',
        title: '请选择省市',
        fn: 'cityHandle',
        formatter: 'formatCity',
        multiple: false,
        use: [
          {nonempty: true, prompt: '请选择地区'},
          {rule: v => v.length, prompt: '请选择地区'},
        ]
      },
      reportRemarks: {
        value: '',
        key: 'objInput.reportRemarks',
        label: '备注',
        is: 'textarea',
        labelSuffix: "(选填)",
        placeholder: '请简要描述患者的病情和治疗情况\n' +
          '举例：2021年确诊胃癌，确诊时是晚期，用\n' +
          '过奥沙利铂和卡培他滨，目前治疗无效',
        maxlength: 300,
      }
    },
    // 城市数据
    source: [],
    isAgreement: false,

  }
}
