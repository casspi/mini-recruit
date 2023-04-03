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
  ],
  onLoad(options) {
    this.routerGetParams(options)
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
  // 图片上传
  handlePics(item, e) {
    console.log('handlePics=>', item)
    let {value, limit} = item
    const {upt, del} = this.inputParams(e)
    if (upt >= 0) {// 预览
      const urls = value.map(item => {
        return this.formatImage(item)
      })
      this.imagePreview({
        current: this.formatImage(value[upt]),
        urls,
      }).toast()
      return
    }
    if (del >= 0) {// 删除
      value.splice(del, 1)
      this.setData({[`${item.key}.value`]: value})
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
    const {del} = this.inputParams(e)
    if (del >= 0) {// 删除
      value.splice(del, 1)
      this.setData({[`${item.key}.value`]: value})
      return
    }
    const {api$} = this.data
    this.helperFnPromise('chooseMessageFile', {
      count: 1,
      type: 'file',
      extension: ['xls', 'xlsx', 'doc', 'docx']
    }).then(res => {
      console.log('chooseMessageFile', res.tempFiles)
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
  handleSubmit() {
    const {objInput, api$, params$, objHidden} = this.data
    // true 是 有问题
    if (this.validateCheck(this.data.objInput)) return;
    const options = this.validateInput(objInput)
    console.log(options);
    //
    // this.validateAssignment(this, {
    //   //
    // }, this.data.objInput, 'objInput')
    //
    // // 提取参数
    // const options = this.validateInput(this.data.objInput, this.data.objInput2)
  }
})

