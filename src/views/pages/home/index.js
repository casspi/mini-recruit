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
        options: [{value: '1', label: 'xx'}, {value: '2', label: 'jkkk'}],
        range: 'sort',
      },
      disease: {
        name: '疾病',
        key: 'objFilter.area',
        value: '',
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
        options: []
      },
      hospital: {
        name: '研究中心',
        key: 'objFilter.area',
        value: ''
      },
      more: {
        name: '更多',
        key: 'objFilter.area',
        children: {
          department: {
            name: '科室',
            value: '',
            options: []
          },
          gene: {
            name: '基因型',
            value: '',
            options: []
          },
          treatment: {
            name: '治疗线数要求',
            value: '',
            options: []
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

