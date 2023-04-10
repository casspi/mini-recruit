export default {
  data: {
    objInput: {
      name: {
        value: '',
        key: 'objInput.name',
        is: 'field',
        label: '姓名',
        maxlength: 10,
        use: [
          {nonempty: true, prompt: '请输入姓名'}
        ],
      },
      // 年龄
      age: {
        value: '',
        key: 'objInput.age',
        type: 'number',
        is: 'field',
        label: '年龄',
        maxlength: 3,
        use: [
          {nonempty: true, prompt: '请输入年龄'},
        ],
      },
      // 电话
      phone: {
        value: '',
        key: 'objInput.phone',
        type: 'number',
        is: 'field',
        label: '联系电话',
        maxlength: 11,
      },
      // 所在地
      city: {
        value: [],
        label: '地区',
        key: 'objInput.city',
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
      disease: {
        value: [],
        label: '疾病',
        key: 'objInput.disease',
        is: 'picker',
        url: 'select_index',
        title: '请选择疾病',
        labelKey: 'text',
        multiple: false,
        formatter: 'formatArrayJoin',
        options: [
          {id: 1, text: '感冒'},
          {id: 2, text: '发烧'},
          {id: 3, text: '拉肚子'},
          {id: 32, text: '拉肚子1'},
          {id: 22, text: '拉肚子2'},
          {id: 31, text: '拉肚子3'},
          {id: 336, text: '拉肚子4'},
          {id: 12, text: '拉肚子1'},
          {id: 3112, text: '拉肚子2'},
          {id: 3122, text: '拉肚子3'},
          {id: 332226, text: '拉肚子4'},
          {id: 1220, text: '拉肚子1'},
          {id: 31102, text: '拉肚子2'},
          {id: 31202, text: '拉肚子3'},
          {id: 3326, text: '拉肚子4'},
        ],
        use: [
          {nonempty: true, prompt: '请选择疾病'},
          {rule: v => v.length, prompt: '请选择疾病'},
        ],
        confirm: 'selectHandle'
      },
      dsc: {
        value: '',
        label: '备注',
        labelSuffix: "(选填)",
        placeholder: '请简要描述患者的病情和治疗情况\n' +
          '举例：2021年确诊胃癌，确诊时是晚期，用\n' +
          '过奥沙利铂和卡培他滨，目前治疗无效',
        key: 'objInput.dsc',
        is: 'textarea',
        maxlength: 300,
      }
    },
    // 城市数据
    source: [],
    isAgreement: false,

  }
}
