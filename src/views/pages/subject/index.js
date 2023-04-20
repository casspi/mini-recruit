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
  ],
  onLoad(options) {
    this.routerGetParams(options)
    console.log('data=>', this.data)
    const {params$: {isDetail}, objInput} = this.data
    if (isDetail) {
      wx.setNavigationBarTitle({title: '患者详情'})
      console.log(objInput)
      for (let key in objInput) {
        this.setData({
          [`${objInput[key].key}.disabled`]: true
        })
      }

    }

  },
  // 选择组件选中回调
  selectHandle(options) {
    console.log('options=>', options)
    const {key, value} = options
    this.setData({
      [`${key}.value`]: value
    }, () => {

      console.log('data=>', this.data)
    })
  },
  //城市选择控件
  cityHandle(item) {
    const {value} = item
    const {api$, source = []} = this.data
    ;(source.length ? Promise.resolve(source) : this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
      this.data.source = res.map(item => {
        const {value: label, childs: citys, id} = item
        const children = citys.map(({value, id}) => ({label: value, id}))
        return {children, label, id}
      })
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
      console.log('res', res)
      this.setData({[`${item.key}.value`]: res.value})
    }).toast()
  },
  // 图片上传控件事件
  handlePics(item, e) {
    console.log('handlePics=>', item)
    let {value, limit} = item
    const {pre, del} = this.inputParams(e)
    if (pre >= 0) {// 预览
      const urls = value.map(item => {
        return this.formatImage(item)
      })
      this.imagePreview({
        current: this.formatImage(value[pre]),
        urls,
      }).toast()
      return
    }
    if (del >= 0) {// 删除
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
      const tasks = res.tempFilePaths.map(path => this.curl(api$.DO_IMAGE_UPLOAD, {
        imageRate: '750X750',
      }, {
        loading: true,
        fn: 'uploadFile',
        filePath: path,
        name: 'imageFile'
      }))
      return Promise.all(tasks)
    }).then(res => {
      const urls = res.map(item => item.saveUrl)
      console.log(urls)
      this.setData({[`${item.key}.value`]: [...item.value, ...urls]})
    }).toast()

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
      const {src} = value[pre]
      this.previewFile(src)
      return
    }
    const {api$} = this.data
    // 上传
    this.helperFnPromise('chooseMessageFile', {
      count: 1,
      type: 'file',
      extension: ['xls', 'xlsx', 'doc', 'docx']
    }).then(res => {
      const tasks = res.tempFiles.map(temp => this.curl(api$.DO_IMAGE_UPLOAD, {}, {
        loading: true,
        fn: 'uploadFile',
        filePath: temp.path,
        name: temp.name
      }))
      return Promise.all(tasks)
    }).catch(msg => {
      console.log(msg)
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
  handleSubmit() {
    const {objInput, api$, params$, objHidden} = this.data
    // true 是 有问题
    if (this.validateCheck(this.data.objInput)) return;
    const options = this.validateInput(objInput)
    console.log(options);
    // cityId: Array(1)
    // 0:
    // city: {label: "北京", id: "110100"}
    // province: {id: "110000", label: "北京"}
    // __proto__: Object
    // length: 1
    // nv_length: (...)
    // __proto__: Array(0)
    // file: Array(2)
    // 0: {name: "c06419728.pdf", src: "http://h10032.www1.hp.com/ctg/Manual/c06419728.pdf"}
    // 1: {name: "xxx1.xls", src: "xxx"}
    // length: 2
    // nv_length: (...)
    // __proto__: Array(0)
    // patientAge: "1"
    // patientDisease: [{…}]
    // patientDiseaseCondition: ""
    // patientGender: 1
    // patientName: "1111"
    // patientPhone: "1"
    // patientPhysicalCondition: [{…}]
    // pics: (3) ["group1/M00/67/A0/wKghH1S8ppmANA
    //
    // this.validateAssignment(this, {
    //   //
    // }, this.data.objInput, 'objInput')
    //
    // // 提取参数
    // const options = this.validateInput(this.data.objInput, this.data.objInput2)
    const {patientName, patientPhone, patientGender, patientAge, patientPhysicalCondition,patientDiseaseCondition,docList=[],picList=[] } = options
    this.curl(api$.REQ_PATIENT_ADD, {
      patientName, patientPhone, patientGender, patientAge, patientPhysicalCondition:'',
      patientDisease:'2',
      picList: '',
      docList: '',
      patientDiseaseCondition,
    }, { method: 'get' }).then(res=>{
      console.log(res)
    })
  }
})

