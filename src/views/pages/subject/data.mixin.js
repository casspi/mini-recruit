export default {
  data: {
    // private String patientName;
    //
    // private String patientGender;
    //
    // private String patientAge;
    //
    // private String patientPhone;
    //
    // private String patientDisease;
    //
    // private String patientPhysicalCondition;
    //
    // private String patientDiseaseCondition;
    //
    // private String patientStatus;
    //
    // private String provinceId;
    //
    // private String cityId;
    //
    // private List<String> picList;
    //
    // private List<String> docList;
    objInput: {
      // 患者
      patientName: {
        value: '',
        key: 'objInput.patientName',
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
      patientPhone: {
        value: '',
        key: 'objInput.patientPhone',
        type: 'number',
        is: 'field',
        label: '联系电话',
        labelSuffix: "(选填)",
        maxlength: 11,
        disabled: false,
      },
      patientGender: {
        value: '',
        key: 'objInput.patientGender',
        is: 'radio-group',
        label: '患者性别',
        disabled: false,
        use: [
          {nonempty: true, prompt: '请选择性别'},
        ],
        options: [
          {label: '女', value: '0'},
          {label: '男', value: '1'},
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
      // 体能状况
      patientPhysicalCondition: {
        value: [],
        label: '体能状况',
        key: 'objInput.patientPhysicalCondition',
        is: 'picker',
        url: 'select_index',
        title: '请选择体能状况',
        labelKey: 'name',
        formatter: 'formatArrayJoin',
        options: [
          // {id: 1, title: '2级', text: '见客户你看就看', tips: '3、4级不符合临床招募情况'},
          // {id: 2, title: '2级', text: '见客户你看就看'},
          // {id: 3, title: '3级', text: '见客户你看就看'}
        ],
        confirm: 'selectHandle',
        use: [
          // {nonempty: true, prompt: '请选择体能状况'},
          {rule: v => v.length, prompt: '请选择体能状况'},
        ],
        disabled: false,
      },
      // 所在城市
      cityId: {
        value: [],
        label: '所在城市',
        key: 'objInput.cityId',
        is: 'picker',
        title: '请选择所在地',
        fn: 'cityHandle',
        formatter: 'formatCity',
        use: [
          {nonempty: true, prompt: '请选择所在城市'},
          {rule: v => v.length, prompt: '请选择所在城市'},
        ],
        disabled: false,
      },
      patientDisease: {
        value: [],
        label: '确诊疾病',
        key: 'objInput.patientDisease',
        is: 'picker',
        url: 'select_index',
        title: '请选择确诊疾病',
        remind: '注：最多选择10个',
        multiple: true,
        labelKey: 'label',
        formatter: 'formatArrayJoin',
        options: [],
        confirm: 'selectHandle',
        limit: 10,
        use: [
          {nonempty: true, prompt: '请选择确诊疾病'},
          {rule: v => v.length, prompt: '请选择确诊疾病'},
        ],
        disabled: false,
      },
      picList: {
        value: ["group1/M00/67/A0/wKghH1S8ppmANAd9AABqLm0OBok204.jpg", "group1/M00/67/A0/wKghH1S8ppmANAd9AABqLm0OBok204.jpg", "group1/M00/67/A0/wKghH1S8ppmANAd9AABqLm0OBok204.jpg"],
        key: 'objInput.picList',
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
      docList: {
        value: [
          {name: 'c06419728.pdf', src: 'http://h10032.www1.hp.com/ctg/Manual/c06419728.pdf'},
          {
            name: 'xxx1.xls',
            src: 'xxx'
          }],
        key: 'objInput.docList',
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
      patientDiseaseCondition: {
        value: '',
        key: 'objInput.patientDiseaseCondition',
        label: '病情描述',
        labelSuffix: "(选填)",
        placeholder: '请输入患者简要病史或其他备注信息，最多不超过500字',
        is: 'textarea',
        maxlength: 300,
        disabled: false,
      }
    },
    // 城市数据
    source: []
  }
}
