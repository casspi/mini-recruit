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
      sex: {
        value: 1,
        key: 'objInput.sex',
        is: 'radio-group',
        label: '性别',
        use: [
          {nonempty: true, prompt: '请选择性别'},
        ],
        options: [
          {label: '女', value: 1},
          {label: '男', value: 2},
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
        multiple: false,
        limit: 10,
        use: [
          {nonempty: true, prompt: '请选择照片'},
          {rule: v => v.length, prompt: '请选择照片'},
        ]
      },
      // 所在地
      nowcity: {
        value: [],
        label: '服务城市',
        key: 'objInput.nowcity',
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
        labelKey: 'text',
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
        confirm: 'selectHandle'
      },
    },
    // 城市数据
    source: []
  }
}
