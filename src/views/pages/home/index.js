//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Paging,
    WowPage.wow$.mixins.Input,

  ],
  data: {
    collect: false,
    objFilter: {
      sort: {
        name: '排序',
        key: 'objFilter.sort',
        value: '',
        defaultValue: '',
        options: [{value: '1', label: 'xx'}, {value: '2', label: 'jkkk'}],
        range: 'sort',
      },
      disease: {
        name: '疾病',
        key: 'objFilter.area',
        value: '',
        defaultValue: '',
        options: [{
          value: '1', label: '全部肿瘤',
          children: [{value: '11', label: '全部'}]
        }, {
          value: '2', label: 'jkkk'
        }],
      },
      area: {
        name: '地区',
        key: 'objFilter.area',
        value: {},
        defaultValue: {},
        options: []
      },
      hospital: {
        name: '研究中心',
        key: 'objFilter.area',
        value: '',
        defaultValue: ''
      },
      more: {
        name: '更多',
        children: {
          department: {
            key: 'objFilter.more.children.department',
            name: '科室',
            value: '',
            defaultValue: '',
            options: [{
              value: '1',
              label: '妇科'
            }, {
              value: '2',
              label: '消化内科2222'
            }, {
              value: '3',
              label: '妇科'
            }, {
              value: '4',
              label: '消化内科'
            }, {
              value: '5',
              label: '妇科'
            }, {
              value: '6',
              label: '消化内科'
            }, {
              value: '7',
              label: '妇科'
            }, {
              value: '8',
              label: '消化内科'
            }, {
              value: '9',
              label: '妇科'
            }, {
              value: '10',
              label: '消化内科'
            }, {
              value: '11',
              label: '妇科'
            }, {
              value: '12',
              label: '消化内科'
            }]
          },
          gene: {
            key: 'objFilter.more.children.gene',
            name: '基因型',
            value: '',
            defaultValue: '',
            options: [{
              value: '1',
              label: '妇科'
            }, {
              value: '2',
              label: '消化内科'
            }, {
              value: '3',
              label: '妇科'
            }, {
              value: '4',
              label: '消化内科'
            }, {
              value: '5',
              label: '妇科'
            }, {
              value: '6',
              label: '消化内科'
            }, {
              value: '7',
              label: '妇科'
            }, {
              value: '8',
              label: '消化内科'
            }, {
              value: '9',
              label: '妇科'
            }, {
              value: '10',
              label: '消化内科'
            }, {
              value: '11',
              label: '妇科'
            }, {
              value: '12',
              label: '消化内科'
            }]
          },
          treatment: {
            key: 'objFilter.more.children.treatment',
            name: '治疗线数要求',
            value: '',
            defaultValue: '',
            options: [{
              value: '1',
              label: '妇科'
            }, {
              value: '2',
              label: '消化内科'
            }, {
              value: '3',
              label: '妇科'
            }, {
              value: '4',
              label: '消化内科'
            }, {
              value: '5',
              label: '妇科'
            }, {
              value: '6',
              label: '消化内科'
            }, {
              value: '7',
              label: '妇科'
            }, {
              value: '8',
              label: '消化内科'
            }, {
              value: '9',
              label: '妇科'
            }, {
              value: '10',
              label: '消化内科'
            }, {
              value: '11',
              label: '妇科'
            }, {
              value: '12',
              label: '消化内科'
            }, {
              value: '91',
              label: '妇科'
            }, {
              value: '101',
              label: '消化内科'
            }, {
              value: '111',
              label: '妇科'
            }, {
              value: '121',
              label: '消化内科'
            }, {
              value: '19',
              label: '妇科'
            }]
          }
        }
      },

    }
  },
  onShow() {
    this.handleRefresh()
  },
  handleRefresh(cb) {
    this.pagingRefresh(cb)
  },
  pagingGetUrlParamsOptions({pagingIndex}) {
    if (pagingIndex === 1) {
      const refWowScroll = this.selectComponent('#wowScroll')
      if (refWowScroll) {
        refWowScroll.returnTop()
      }
    }
    const {api$} = this.data
    return {
      url: api$.homeList,
      params: {
        AuthorizationV2: '9_zPc9FqNfhzVv6g9_EgywTFayIyueMyD3mGLka11Aw=',
        'departmentId': 0,
        'illness': 0,
        'genetic': 0,
        'treatmentLines': 0,
        'province': 0,
        'cityId': 0,
        'researchCenterIdList': '',
        'centerStartState': 0,
        'searchContent': '',
        'collectInfo': false,
        'addedTimeSort': 0,
      },
      options: {
        method: 'get',
        loading: false
      }
    }
  },
  collectHandle() {
    const collect = !this.data.collect
    this.setData({
      collect
    })
    this.handleRefresh()
  },
  // 筛选
  filterHandle(e) {
    const {item} = this.inputParams(e)
    console.log(item)
  }
})

