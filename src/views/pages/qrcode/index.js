//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Share,
    WowPage.wow$.mixins.User,
    WowPage.wow$.mixins.Helper,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Api,
    WowPage.wow$.mixins.Clipboard
  ],
  data: {
    userInfo: {},
    codeUrl: '',
    canvas: null,
    canvasW: '',
    canvasH: ''
  },
  onLoad(o) {
    this.routerGetParams(o)
    let {userInfo} = this.data.params$
    userInfo.nameInitial = userInfo.name.slice(0, 1)
    this.setData({
      userInfo
    })
    this.getMiniCode()
  },
  // 获取小程序码
  getMiniCode() {
    const {api$, userInfo} = this.data
    this.curl(api$.REQ_QRCODE, {
      scene: `recruitCode=${userInfo.recruitCode}`,
      page: 'pages/login/index',
      check_path: false,// 是否校验页面存在
      env_version: 'develop'
    }, {method: 'get'}).then(res => {
      if (res) {
        // 通过 SelectorQuery 获取 Canvas 节点
        wx.createSelectorQuery()
          .select('#canvas')
          .fields({
            node: true,
            size: true,
          })
          .exec(this.init.bind(this))
      }
      this.setData({
        codeUrl: res
      })
    })
  },
  // 单位转换
  rpx2px(value) {
    let currentWidth = this.data.canvasW
    let oldWidth = 750
    return Math.floor(value * currentWidth / oldWidth)
  },
  // 绘制圆角矩形
  roundRect(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath()
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    ctx.fillStyle = '#fff'
    // ctx.setStrokeStyle('transparent')
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    ctx.fill()
    // ctx.stroke()
    ctx.closePath()
    // 剪切
    ctx.clip()
  },
  init(res) {
    const {userInfo} = this.data
    const primaryColor = '#f0831f'
    let {screenWidth: canvasW, screenHeight: canvasH, pixelRatio} = wx.getSystemInfoSync()
    canvasH = 600
    console.log(canvasW, canvasH, pixelRatio)
    const canvas = res[0].node
    this.setData({
      canvas,
      pixelRatio, // 图片像素比
      canvasW,
      canvasH,
    })
    canvas.width = canvasW * pixelRatio
    canvas.height = canvasH * pixelRatio
    const ctx = canvas.getContext('2d')
    ctx.scale(pixelRatio, pixelRatio)

    //画布与背景
    ctx.fillStyle = primaryColor
    ctx.fillRect(0, 0, canvasW, canvasH)
    this.roundRect(ctx, this.rpx2px(25), this.rpx2px(25), this.rpx2px(700), this.rpx2px(920), this.rpx2px(20))

    // 圆形位置 大小
    const borderSize = this.rpx2px(40);
    ctx.save(); // 保存
    ctx.beginPath(); // 开始绘制
    ctx.fillStyle = primaryColor
    ctx.arc(this.rpx2px(24), this.rpx2px(216), borderSize / 2, 0, Math.PI * 2, false);
    ctx.arc(this.rpx2px(750 - 25), this.rpx2px(216), borderSize / 2, 0, Math.PI * 2, false);
    ctx.fill()
    ctx.closePath();
    //直线
    ctx.beginPath();
    ctx.strokeStyle = '#f3f8f9';
    ctx.moveTo(this.rpx2px(45), this.rpx2px(216)) //描述路径的起点为手指触摸的x轴和y轴
    ctx.lineTo(this.rpx2px(750 - 45), this.rpx2px(216))
    ctx.stroke()

    // 头像
    ctx.beginPath();
    ctx.fillStyle = primaryColor
    ctx.arc(this.rpx2px(150), this.rpx2px(116), this.rpx2px(130) / 2, 0, Math.PI * 2, false);
    ctx.fill()
    ctx.closePath();

    // 头像文案
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.font = `${this.rpx2px(44)}px bold`
    ctx.fillStyle = '#fff'
    ctx.fillText(userInfo.nameInitial, this.rpx2px(150), this.rpx2px(116));

    // 用户名
    ctx.font = `${this.rpx2px(44)}px normal`
    ctx.fillStyle = '#000'
    ctx.textAlign = 'left'
    ctx.fillText(userInfo.name, this.rpx2px(240), this.rpx2px(80));
    ctx.font = `${this.rpx2px(30)}px normal`
    ctx.fillText(userInfo.phone, this.rpx2px(240), this.rpx2px(150));

    // 邀请码文案
    ctx.textAlign = 'center'
    ctx.font = `${this.rpx2px(36)}px bold`
    ctx.fillStyle = primaryColor
    ctx.fillText(`邀请码:${userInfo.recruitCode}`, this.rpx2px(375), this.rpx2px(306));
    ctx.fillText('长按图片进入小程序，和我一起做招募！', this.rpx2px(375), this.rpx2px(840))


    //绘制小程序码
    const image = canvas.createImage()
    image.onload = () => {
      ctx.drawImage(
        image,
        this.rpx2px(175), this.rpx2px(380),
        this.rpx2px(400), this.rpx2px(400)
      )
    }
    image.src = this.data.codeUrl
  },
  saveHandle() {
    // 第一步，把canvas画布转换成临时图片
    this.helperFnPromise('canvasToTempFilePath', {
      x: 0,
      y: 0,
      width: this.data.canvasW,
      height: this.data.canvasH,
      canvas: this.data.canvas,  // canvas实例对象
      destWidth: this.data.canvasW * this.data.pixelRatio,
      destHeight: this.data.canvasH * this.data.pixelRatio,
    }).then(res => {
      console.log(res)
      return this.helperFnPromise('saveImageToPhotosAlbum', {
        filePath: res.tempFilePath
      })
    }).then(() => {
      this.modalToast({
        icon: 'success',
        message: '已保存到相册'
      })
    }).toast(({errMsg}) => {
      if (errMsg === 'saveImageToPhotosAlbum:fail cancel') {// 取消 不提示错误
        return true
      }
    }).finally((res) => {
      console.log('finally=>', res)
    })
  },
  // 复制
  handleCopy() {
    this.clipboardSetData(this.data.userInfo.recruitCode)
  },
  shareGetConfig() {
    return {
      title: '蚂蚁招募',
      path: this.shareStringify({to: 'login_index', recruitCode: this.data.userInfo.recruitCode})
    }
  },
})

