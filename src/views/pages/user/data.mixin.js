export default {
  data: {
    objInput: {
      name: {
        value: '',
        key: 'objInput.name',
        is: 'field',
        label: '姓名',
        maxlength: 12,
        use: [
          {nonempty: true, prompt: '请输入姓名'}
        ],
      },
      gender: {
        value: '',
        key: 'objInput.gender',
        is: 'radio-group',
        label: '性别',
        use: [
          {nonempty: true, prompt: '请选择性别'},
        ],
        options: [
          {label: '女', value: '0'},
          {label: '男', value: '1'},
        ],
      },
      // 职业
      userType: {
        value: '',
        key: 'objInput.userType',
        is: 'field',
        label: '职业',
        disabled: true,
        use: [
          {nonempty: true, prompt: '请输入姓名'}
        ],
      },
      // 所在地
      city: {
        value: [],
        label: '所在地',
        key: 'objInput.city',
        is: 'picker',
        title: '请选择所在地',
        fn: 'cityHandle',
        formatter: 'formatCity',
        hiddenProvince: true,
        multiple: false,
        limit: 10,
        use: [
          {nonempty: true, prompt: '请选择所在地'},
          {rule: v => v.length, prompt: '请选择所在地'},
        ]
      },
      // 服务城市
      allocateAreaId: {
        value: [],
        label: '服务城市',
        key: 'objInput.allocateAreaId',
        is: 'picker',
        title: '请选择服务城市',
        fn: 'cityHandle',
        formatter: 'formatCity',
        multiple: true,
        limit: 10,
        use: [
          {nonempty: true, prompt: '请选择服务城市'},
          {rule: v => v.length, prompt: '请选择服务城市'},
        ]
      },
      disease: {
        value: [],
        label: '疾病',
        key: 'objInput.disease',
        is: 'picker',
        url: 'select_index',
        title: '请选择疾病',
        remind: '注：最多选择10个',
        multiple: true,
        labelKey: 'label',
        formatter: 'formatArrayJoin',
        options: [],
        confirm: 'selectHandle',
        use: [
          {nonempty: true, prompt: '请选择疾病'},
          {rule: v => v.length, prompt: '请选择疾病'},
        ]
      },
    },
    // 城市数据
    cityList: [],
    // 职业
    userType: []
  }
}
