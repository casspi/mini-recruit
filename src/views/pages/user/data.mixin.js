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
      // 患者
      patient: {
        value: '',
        key: 'objInput.patient',
        is: 'field',
        label: '患者姓名',
        labelSuffix: "(选填)",
        maxlength: 10
      },
      // 电话
      phone: {
        value: '',
        key: 'objInput.phone',
        type: 'number',
        is: 'field',
        label: '联系电话',
        labelSuffix: "(选填)",
        maxlength: 11
      },
      // 所在地
      city: {
        value: [],
        label: '所在地',
        key: 'objInput.city',
        is: 'picker',
        title: '请选择所在地',
        fn: 'cityHandle',
        formatter: 'formatArrayJoin',
        use: [
          {nonempty: true, prompt: '请选择照片'},
          {rule: v => v.length, prompt: '请选择照片'},
        ]
      },
      // 所在地
      nowcity: {
        value: [],
        label: '所在城市',
        key: 'objInput.nowcity',
        is: 'picker',
        title: '请选择所在地',
        fn: 'cityHandle',
        formatter: 'formatArrayJoin',
        multiple: true,
        use: [
          {nonempty: true, prompt: '请选择照片'},
          {rule: v => v.length, prompt: '请选择照片'},
        ]
      },
      // 体能状况
      Health: {
        value: [],
        label: '体能状况',
        key: 'objInput.Health',
        is: 'picker',
        url: 'select_index',
        title: '请选择体能状况',
        labelKey: 'text',
        formatter: 'formatArrayJoin',
        options: [
          {id: 1, title: '2级', text: '见客户你看就看', tips: '3、4级不符合临床招募情况'},
          {id: 2, title: '2级', text: '见客户你看就看'},
          {id: 3, title: '3级', text: '见客户你看就看'}
        ],
        confirm: 'selectHandle'
      },
      Disease: {
        value: [],
        label: '确诊疾病',
        key: 'objInput.Disease',
        is: 'picker',
        url: 'select_index',
        title: '请选择确诊疾病',
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
      Pics: {
        value: [],
        key: 'objInput.Pics',
        is: 'photo',
        fn: 'handlePics',
        maxlength: 9,
        use: [
          {nonempty: true, prompt: '请选择照片'},
          {rule: v => v.length, prompt: '请选择照片'},
        ],
      },
      Content: {
        value: '',
        placeholder: '请输入患者简要病史或其他备注信息，最多不超过500字',
        key: 'objInput.Content',
        is: 'textarea',
        maxlength: 300,
        use: [
          {nonempty: true, prompt: '请填写你的饮食心得和经验'},
        ],
      },
      Title: {
        value: '',
        placeholder: '填写标题会有更多赞哦~',
        key: 'objInput.Title',
        is: 'input',
        maxlength: 50,
        use: [
          {nonempty: true, prompt: '请填写标题'},
        ],
      },
      MealTag: {
        value: '',
        label: '添加话题',
        key: 'objInput.MealTag',
        rangeKey: 'Name',
        placeholder: '请选择添加话题',
        icon: 'icon-huati',
        is: 'picker',
        from: 'community_diet_added_index',
        url: 'community_topic_index',
      },
      DayStep: {
        value: 1,
        key: 'objInput.DayStep',
        is: 'radio-group',
        use: [
          {nonempty: true, prompt: '请选择餐点'},
        ],
        options: [
          {label: '早餐', value: 1},
          {label: '午餐', value: 2},
          {label: '晚餐', value: 3},
          {label: '加餐', value: 4},
        ],
      },
      Before: {
        value: '',
        label: '餐前血糖',
        key: 'objInput.Before',
        placeholder: '请选择餐前血糖',
        is: 'picker',
        url: 'community_diet_enter_index',
        unit: 'mmol/L',
        icon: 'icon-xieyang',
      },
      After: {
        value: '',
        label: '餐后血糖',
        key: 'objInput.After',
        placeholder: '请选择餐后血糖',
        is: 'picker',
        url: 'community_diet_enter_index',
        unit: 'mmol/L',
        icon: 'icon-xieyang',
      },
      IsSelf: {
        value: false,
        label: '仅自己可见',
        key: 'objInput.IsSelf',
        placeholder: '选择餐后血糖',
        is: 'checkbox',
      }
    },
    // 城市数据
    source: []
  }
}
