//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'
import DataMixin from './data.mixin'

new WowPage({
  mixins: [
    DataMixin,
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Image,
    WowPage.wow$.mixins.Format,
    WowPage.wow$.mixins.Helper,
    WowPage.wow$.mixins.Validate,
    WowPage.wow$.mixins.File,
    WowPage.wow$.mixins.Loading,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Page,
  ],
  onLoad(options) {
    this.routerGetParams(options)
    const {params$: {isDetail, patientId}, objInput} = this.data
    if (patientId) {
      // 若是详情不可编辑
      if (isDetail) {
        wx.setNavigationBarTitle({title: '患者详情'})
        for (let key in objInput) {
          this.setData({
            [`${objInput[key].key}.disabled`]: true
          })
        }
      } else {
        wx.setNavigationBarTitle({title: '患者编辑'})
      }
      this.getDic(this.getDetail)
    } else {
      this.getDic()
    }
  },
  getDetail() {
    const {api$, params$, objInput, source} = this.data
    this.curl(api$.REQ_PATIENT_DETAIL, {patientId: params$.patientId}, {method: 'get'}).then(res => {
      objInput.patientName.value = res.patientName || ''
      objInput.patientGender.value = res.patientGender || ''
      objInput.patientPhone.value = res.patientPhone || ''
      objInput.patientAge.value = res.patientAge || ''
      if (res.patientPhysicalCondition) {// 体能状况
        objInput.patientPhysicalCondition.value = [{
          value: res.patientPhysicalCondition,
          name: res.patientPhysicalConditionName
        }]
      }
      // 所在城市
      if (res.provinceId) {
        const province = source.find(o => o.value === res.provinceId)
        const city = province ? province.children.find(o => o.value === res.cityId) : null
        objInput.city.value = [{
          province, city
        }]
      }
      //疾病
      if (res.patientDisease && res.patientDisease.length) {
        objInput.patientDisease.value = res.patientDisease.map((item, index) => {
          return {
            value: item,
            label: res.patientDiseaseName.split(',')[index]
          }
        })
      }

      if (res.picList && res.picList.length) {
        objInput.picList.value = res.picList
      }
      if (res.docList && res.docList.length) {
        objInput.docList.value = res.docList
      }
      // 备注
      objInput.patientDiseaseCondition.value = res.patientDiseaseCondition || ''

      console.log('回显值=>', objInput)
      this.setData({
        objInput
      })
    })
  },
  // 获取字典
  getDic(cb) {
    const {api$} = this.data
    this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'})
      .then(res => {
        this.data.source = res
        cb && cb()
      })
    this.curl(api$.DIC_CONDITION, {}, {method: 'get', loading: false})
      .then(res => {
        return this.setData({
          'objInput.patientPhysicalCondition.options': res.map(item => {
            item.value = item.code
            item.label = item.fullName
            return item
          })
        })
      })
    this.curl(api$.REQ_DISEASE_LIST, {}, {method: 'get', loading: false})
      .then(res => {
        this.setData({
          'objInput.patientDisease.options': res
        })
      })
  },
  // 选择组件选中回调
  selectHandle(options) {
    const {key, value} = options
    this.setData({
      [`${key}.value`]: value
    })
  },
  //城市选择控件
  cityHandle(item) {
    const {value} = item
    const {api$, source = []} = this.data
    ;(source.length ? Promise.resolve(source) : this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
      this.data.source = res
      return this.data.source
    })).then(source => {
      // 去选择城市
      return this.selectComponent('#refCity').show({
        ...item,
        parent: value.length ? value[0].province : '',
        source,
        beforeClose: (action, done) => {
          if (action === 'cancel') return done()
          done()
        }
      })
    }).then(res => {
      this.setData({[`${item.key}.value`]: res.value})
    }).toast()
  },
  // 图片上传控件事件
  handlePics(item, e) {
    let {value, limit} = item
    const {pre, del} = this.inputParams(e)
    if (typeof pre === 'number') {// 预览
      const urls = value.map(item => {
        return item.documentLocation
      })
      this.imagePreview({
        current: urls[pre],
        urls,
      }).toast()
      return
    }
    if (typeof del === 'number') {// 删除
      this.modalConfirm({
        content: `是否确定删除？`,
        confirmText: '确定',
        cancelText: '取消'
      }).then(() => {
        value.splice(del, 1)
        this.setData({[`${item.key}.value`]: value})
      }).toast()
      return
    }
    const {api$} = this.data
    this.imageChoose({
      count: limit - value.length,
      sourceType: ['album', 'camera'],
      sizeType: ['original'],
    }).then(res => {
      const tasks = res.tempFilePaths.map(path => this.curl(api$.FILE_UPLOAD, {}, {
        loading: true,
        fn: 'uploadFile',
        filePath: path,
        name: 'file'
      }))
      return Promise.all(tasks)
    }).then(res => {
      // documentId, documentLocation,documentName
      this.setData({[`${item.key}.value`]: [...item.value, ...res[0]]})
    }).toast(err => {
      if (err && err.errMsg === 'chooseImage:fail cancel') {
        return true
      }
    })

  },
  // 文件选择上传
  handleFile(item, e) {
    let {value} = item
    const {del, pre} = this.inputParams(e)
    // 删除
    if (del >= 0) {
      this.modalConfirm({
        content: `是否确定删除？`,
        confirmText: '确定',
        cancelText: '取消'
      }).then(() => {
        value.splice(del, 1)
        this.setData({[`${item.key}.value`]: value})
      }).toast()
      return
    }
    // 文件预览
    if (pre >= 0) {
      const {documentLocation} = value[pre]
      this.previewFile(documentLocation)
      return
    }
    const {api$} = this.data
    // 上传
    this.helperFnPromise('chooseMessageFile', {
      count: 1,
      type: 'file',
      extension: ['xls', 'xlsx', 'doc', 'docx', 'pdf']
    }).then(res => {
      const tasks = res.tempFiles.map(temp => this.curl(api$.FILE_UPLOAD, {}, {
        loading: true,
        fn: 'uploadFile',
        filePath: temp.path,
        name: 'file' || temp.name,
        timeout: 5*60*1000
      }))
      return Promise.all(tasks)
    }).then(res => {
      this.setData({[`${item.key}.value`]: [...item.value, ...res[0]]})
    }).toast(err => {
      if (err && err.errMsg === 'chooseMessageFile:fail cancel') {
        return true
      }
    })
  },
  // 文档预览
  previewFile(url) {
    this.loadingShow({
      title: '文档下载中...',
      mask: true
    })
    this.fileDownload(url).then(res => {
      const {tempFilePath} = res
      return this.fileOpenDocument(tempFilePath)
    }).toast().finally(() => {
      this.loadingHide()
    })
  },
  handleSubmit(e) {
    const {status} = this.inputParams(e)
    const {objInput, params$, objHidden} = this.data
    // true 是 有问题
    if (this.validateCheck(this.data.objInput)) return;
    const options = this.validateInput(objInput)
    const {
      patientName,
      patientPhone,
      patientGender,
      patientAge,
      city,
      patientPhysicalCondition = [],
      patientDisease = [],
      patientDiseaseCondition,
      docList = [],
      picList = []
    } = options
    if (patientPhone !== '' && patientPhone.length !== 11) {
      this.modalToast('请输入11位手机号')
      return;
    }
    // 参数
    let data = {
      patientName,
      patientPhone,
      patientGender,
      patientAge,
      patientPhysicalCondition: patientPhysicalCondition.map(item => item.value).join(','),
      patientDisease: patientDisease.map(item => item.value).join(','),
      picList: picList.map(item => item.documentId).join(','),
      docList: docList.map(item => item.documentId).join(','),
      cityId: city[0] ? city[0].city.value : '',
      provinceId: city[0] ? city[0].province.value : '',
      patientDiseaseCondition,
      patientStatus: status,
    }
    if (params$.projectId) {// 项目里面过来的需要带
      data.projectId = params$.projectId
    }
    params$.patientId ? this.edit({
      ...data,
      patientId: params$.patientId
    }) : this.add(data)
  },
  add(data) {
    const {api$} = this.data
    this.curl(api$.REQ_PATIENT_ADD, data, {method: 'get'}).then(() => {
      this.modalToast({
        message: '保存成功',
        icon: 'success'
      })
      // const refPage = this.pagesGetByIndex(1)
      // // 新增入口：1.首页-项目-立即报名；2.患者列表-立即报名
      // if (refPage && refPage.handleRefresh) {
      //   refPage.handleRefresh()
      // }
      // this.routerRoot('enroll_index')
      this.jumpToEnroll()

    }).toast()
  },
  edit(data) {
    const {api$} = this.data
    this.curl(api$.REQ_PATIENT_EDIT, data, {method: 'get'}).then(() => {
      this.modalToast({
        message: '保存成功',
        icon: 'success'
      })
      this.jumpToEnroll()

    }).toast()
  },
  jumpToEnroll() {
    wx.setStorageSync('refresh', '1')
    this.routerRoot('enroll_index')
  }
})

