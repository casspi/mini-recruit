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
    WowPage.wow$.mixins.TabItemTap,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Share,
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
        defaultValue: {},
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
        defaultValue: '',
        options: []
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
  onLoad(o) {
    console.log('home.onLoad=>', o)
    this.shareHandle(o)
    this.handleRefresh()
  },
  onShow() {
    console.log("home.onShow", this)
    // 登录回来后刷新接口
    this.userGet().then(res => {
      wx.showTabBar({})
    }).catch(() => {
      wx.hideTabBar({})
    })
    const refresh = wx.getStorageSync('home_refresh')
    wx.removeStorageSync('home_refresh')
    if (refresh === '1') this.handleRefresh()
  },

  tabItemTapCallback() {
    this.handleRefresh()
  },
  handleRefresh(cb) {
    this.pagingRefresh(cb)
  },
  pagingGetUrlParamsOptions({pagingIndex}) {
    //刷新列表，需要滚动到顶部
    if (pagingIndex === 1) {
      const refWowScroll = this.selectComponent('#wowScroll')
      if (refWowScroll) {
        refWowScroll.returnTop()
      }
    }
    const {api$, objFilter, collect, projectQuery} = this.data
    let params = {
      projectQuery,
      diseaseId: objFilter.disease.value.children ? objFilter.disease.value.children.value : '',
      areaId: objFilter.area.value.children ? objFilter.area.value.children.value : '',
      hospitalId: objFilter.hospital.value || '',
      sectionId: objFilter.more.children.department.value || '',
      projectGeneType: objFilter.more.children.gene.value || '',
      projectTreatmentDemand: objFilter.more.children.treatment.value || '',
      pageSize: 10,
      collect
    }
    if (objFilter.sort.value === '1') {
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
  },
  handleKeywordInput(event) {
    const {value} = this.inputParams(event)
    if (!value.trim()) this.handleKeywordConfirm(event)
  },
  handleKeywordConfirm(event) {
    const {value} = this.inputParams(event)
    this.setData({projectQuery: value.trim()}, () => {
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
  // 验证是否选择地区
  validateArea(data) {
    const {objFilter, item} = data
    console.log('validateArea=>', item.name, objFilter.area.value.children)
    if (item.name === '研究中心' && objFilter.area.value.children === undefined) {
      this.modalToast('请选择地区')
      return true
    }
  },
  // 筛选确定
  filterConfirm(objFilter) {
    this.setData({
      objFilter
    })
    this.handleRefresh()
  }

})

