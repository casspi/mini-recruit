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
    projectQuery: '',
    collect: false,
    objFilter: {
      sort: {
        name: '排序',
        key: 'params$.objFilter.sort',
        value: '0',
        defaultValue: '',
        options: [{value: '0', label: '默认排序'}, {value: '1', label: '最新上架'}],
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
    const {api$, objFilter, collect, projectQuery} = this.data
    let params = {
      projectQuery,
      diseaseId: objFilter.disease.value.children? objFilter.disease.value.children.value:'',
      areaId: objFilter.area.value.children? objFilter.area.value.children.value:'',
      hospitalId: objFilter.hospital.value || '',
      sectionId: objFilter.more.children.department.value || '',
      projectGeneType: objFilter.more.children.gene.value || '',
      projectTreatmentDemand: objFilter.more.children.treatment.value || '',
      pageSize: 10,
      // userId: collect ? 'xxx' : '0'
    }
    if(objFilter.sort.value === '1'){
      params.isSort = '1'
    }
    return {
      url: api$.REQ_PROJECT_LIST,
      params,
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
  handleKeywordInput(event) {
    const { value } = this.inputParams(event)
    if (!value.trim()) this.handleKeywordConfirm(event)
  },
  handleKeywordConfirm(event) {
    const { value } = this.inputParams(event)
    this.setData({ projectQuery: value.trim() }, () => {
      this.handleRefresh()
    })
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

