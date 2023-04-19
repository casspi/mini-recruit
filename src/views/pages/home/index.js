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
    WowPage.wow$.mixins.Modal,

  ],
  data: {
    collect: false,
    objFilter: {
      sort: {
        name: '排序',
        key: 'params$.objFilter.sort',
        value: '',
        defaultValue: '',
        options: [{value: '1', label: 'xx'}, {value: '2', label: 'jkkk'}],
        range: 'sort',
      },
      disease: {
        name: '疾病',
        key: 'params$.objFilter.disease',
        value: {},
        defaultValue: '',
        options: [],
      },
      area: {
        name: '地区',
        key: 'params$.objFilter.area',
        value: {},
        defaultValue: {},
        options: []
      },
      hospital: {
        name: '研究中心',
        key: 'params$.objFilter.hospital',
        value: '',
        defaultValue: ''
      },
      more: {
        name: '更多',
        children: {
          department: {
            key: 'params$.objFilter.more.children.department',
            name: '科室',
            value: '',
            defaultValue: '',
            options: []
          },
          gene: {
            key: 'params$.objFilter.more.children.gene',
            name: '基因型',
            value: '',
            defaultValue: '',
            options: []
          },
          treatment: {
            key: 'params$.objFilter.more.children.treatment',
            name: '治疗线数要求',
            value: '',
            defaultValue: '',
            options: []
          }
        }
      },

    }
  },
  onShow(options) {
    console.log(options)
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
    const {api$, objFilter, collect} = this.data
    // hospitalId  中心
    // projectGeneType  gene
    // projectTreatmentDemand  治疗
    // sectionId 科室
    // diseaseId  疾病
    // areaId  地区
    // isSort  是否排序
    // userId  是否收藏 要是收藏就传当前登录者id，没登录就传'0'
    return {
      url: api$.REQ_PROJECT_LIST,
      params: {
        hospitalId: objFilter.hospital.value.value || '',
        projectGeneType: objFilter.more.children.gene.value.value || '',
        projectTreatmentDemand: objFilter.more.children.treatment.value.value || '',
        sectionId: objFilter.more.children.department.value.value || '',
        userId: collect ? 'xxx' : '0'
      },
      options: {
        method: 'get',
        loading: false
      }
    }
    // return {
    //   url: api$.homeList,
    //   params: {
    //     AuthorizationV2: '9_zPc9FqNfhzVv6g9_EgywTFayIyueMyD3mGLka11Aw=',
    //     'departmentId': 0,
    //     'illness': 0,
    //     'genetic': 0,
    //     'treatmentLines': 0,
    //     'province': 0,
    //     'cityId': 0,
    //     'researchCenterIdList': '',
    //     'centerStartState': 0,
    //     'searchContent': '',
    //     'collectInfo': false,
    //     'addedTimeSort': 0,
    //   },
    //   options: {
    //     method: 'get',
    //     loading: false
    //   }
    // }
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
    console.log('1111=>', item)
  },
  // 验证
  validateArea(data) {
    const {objFilter, item} = data
    console.log('validateArea=>', data)
    if (item.name === 'hospital' && objFilter.area.value.children) {
      this.modalToast('请选择地区')
      return true
    }
  },
  // 筛选确定
  filterConfirm(objFilter) {
    this.setData({
      objFilter
    }, () => {
      console.log('filterConfirm=>', this.data)
    })
  }

})

