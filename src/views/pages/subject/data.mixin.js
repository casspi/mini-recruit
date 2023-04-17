export default {
  data: {
    objInput: {
      // 患者
      patient: {
        value: 'lss',
        key: 'objInput.patient',
        is: 'field',
        label: '患者姓名',
        labelSuffix: "(字母缩写)",
        maxlength: 10,
        disabled: false,
        use: [
          {nonempty: true, prompt: '请输入患者姓名'},
        ],
      },
      // 电话
      phone: {
        value: '13817672345',
        key: 'objInput.phone',
        type: 'number',
        is: 'field',
        label: '联系电话',
        labelSuffix: "(选填)",
        maxlength: 11,
        disabled: false,
      },
      sex: {
        value: 1,
        key: 'objInput.sex',
        is: 'radio-group',
        label: '患者性别',
        disabled: false,
        use: [
          {nonempty: true, prompt: '请选择性别'},
        ],
        options: [
          {label: '女', value: 1},
          {label: '男', value: 2},
        ],
      },
      // 年龄
      age: {
        value: '18',
        key: 'objInput.age',
        type: 'number',
        is: 'field',
        label: '年龄',
        maxlength: 3,
        use: [
          {nonempty: true, prompt: '请输入年龄'},
        ],
      },
      // 体能状况
      health: {
        value: [],
        label: '体能状况',
        key: 'objInput.health',
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
        confirm: 'selectHandle',
        use: [
          // {nonempty: true, prompt: '请选择体能状况'},
          {rule: v => v.length, prompt: '请选择体能状况'},
        ],
        disabled: false,
      },
      // 所在地
      nowcity: {
        value: [],
        label: '所在城市',
        key: 'objInput.nowcity',
        is: 'picker',
        title: '请选择所在地',
        fn: 'cityHandle',
        formatter: 'formatCity',
        multiple: true,
        limit: 10,
        use: [
          {nonempty: true, prompt: '请选择所在城市'},
          {rule: v => v.length, prompt: '请选择所在城市'},
        ],
        disabled: false,
      },
      disease: {
        value: [],
        label: '确诊疾病',
        key: 'objInput.disease',
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
        confirm: 'selectHandle',
        use: [
          {nonempty: true, prompt: '请选择确诊疾病'},
          {rule: v => v.length, prompt: '请选择确诊疾病'},
        ],
        disabled: false,
      },
      pics: {
        value: ["group1/M00/67/A0/wKghH1S8ppmANAd9AABqLm0OBok204.jpg", "group1/M00/67/A0/wKghH1S8ppmANAd9AABqLm0OBok204.jpg", "group1/M00/67/A0/wKghH1S8ppmANAd9AABqLm0OBok204.jpg"],
        key: 'objInput.pics',
        is: 'photo',
        label: '病例图片',
        labelSuffix: "(选填)",
        fn: 'handlePics',
        limit: 9,
        tips: [
          '1.最后一次入院记录，',
          '2.最后一次出院小结',
          '3.病理报告，',
          '4.最近两次以上CT报告，',
          '5.最后一次血常规、血生化、传染病结果，',
          '6.基因报告（如有）'
        ],
        use: [
          {nonempty: true, prompt: '请选择照片'},
          {rule: v => v.length, prompt: '请选择照片'},
        ],
        disabled: false,
      },
      file: {
        value: [
          {name: 'c06419728.pdf', src: 'http://h10032.www1.hp.com/ctg/Manual/c06419728.pdf'},
          {
            name: 'xxx1.xls',
            src: 'xxx'
          }],
        key: 'objInput.file',
        is: 'file',
        label: '病例文档',
        labelSuffix: "（病历图片或病历文档有一种上传即可）",
        fn: 'handleFile',
        limit: 3,
        tips: [
          '注：支持上传PDF、Word、Excel'
        ],
        use: [
          {nonempty: true, prompt: '请选择病例文档'},
          {rule: v => v.length, prompt: '请选择病例文档'},
        ],
        disabled: false,
      },
      dsc: {
        value: '',
        label: '病情描述',
        labelSuffix: "(选填)",
        placeholder: '请输入患者简要病史或其他备注信息，最多不超过500字',
        key: 'objInput.dsc',
        is: 'textarea',
        maxlength: 300,
        disabled: false,
      }
    },
    // 城市数据
    source: []
  }
}
