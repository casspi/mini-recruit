import Curl from 'wow-wx/curl'
import Loading from 'wow-wx/mixins/wx/loading.mixin'
import User from 'wow-wx/mixins/utils/user.mixin'
import Router from 'wow-wx/mixins/wx/router.mixin'
import ApiConfig, {isProd} from 'src/config/api.config'
import {resetTabItemIndex} from 'src/mixins/tabItemTap.mixin'

const curl = new Curl({
  // baseURI: 'http://testchw.w1.luyouxia.net/',
  baseURI: 'https://xywy.zhongyipharma.com/mini/',
  header: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  timeout: 60 * 1000,
})
// 日志输出
curl.interceptors.request.use((config) => {
  const {url, method, data} = config
  console.log(`${url} [${method}] 请求参数 => `, data)
  return config
})

// 先判断是否需要 token
curl.interceptors.request.use((config) => new Promise((resolve, reject) => {
  let {
    data,
    useAuth = false,  // 校验 token 没有 token 直接不请求
    extend,
    header = {},
  } = config
  let objUser = {}
  User.userGet().then((res) => {
    objUser = res || {}
  }).catch(() => {
  }).finally(() => {
    let {
      __gsessionId,
    } = objUser
    if (__gsessionId) {
      config.header = Object.assign({
        'x-gsessionId': __gsessionId,
      }, header)
    }
    if (typeof extend === 'function') {
      config.data = Object.assign(config.data, (extend(objUser) || {}))
    }
    if (useAuth && (!config.header || !config.header.AccessToken)) {
      return reject('')
    }
    console.log('request.config.header=>', config.header)
    resolve(config)
  })
}))

curl.interceptors.response.use((response) => new Promise((resolve, reject) => {
  let {requestConfig, statusCode, data: respData} = response
  delete response.requestConfig
  let {url, method} = requestConfig
  if (statusCode !== 200 || !respData) {
    console.log(`${url} [${method}] 请求失败 => `, response)
    return reject(`网络繁忙，请稍后再试[${statusCode}]`)
  }
  if (typeof respData !== 'object') {
    try {
      respData = JSON.parse(respData)
    } catch (e) {
    }
  }
  console.log(`${url} [${method}] 请求返回 => `, respData)
  let {status, data, message} = respData
  if (status === 2) {
    reject(message || 'token已过期，请重新登录')
    return gotoLogin()
  }
  // if (status === 3) {
  //   reject('')
  //   return Router.routerPush('webview_index', {
  //     link: Extend,
  //     title: '关注公众号'
  //   })
  // }
  if (status !== 0) {
    return reject(message || respData)
  }
  return resolve(data)
}), (error) => {
  if (error && error.errMsg) {
    if (error.errMsg === 'request:fail timeout') {
      error.errMsg = '请求超时，请稍后再试'
    }
  }
  return Promise.reject(error)
})

export default {

  data: {
    api$: ApiConfig,
    isProd,
    error: '',
  },

  curl(url, data = {}, options = {}) {
    const {loading = true, useError} = options
    if (loading) {
      Loading.loadingShow()
    }
    if (useError) {
      this.setData({error: ''})
    }
    return curl.request({
      ...options,
      url,
      data,
    }).catch(err => {
      if (useError && err) {
        this.setData({error: err.errMsg || err.msg || err.message || JSON.stringify(err)})
        err = ''
      }
      throw err
    }).finally(() => {
      if (loading) {
        Loading.loadingHide()
      }
    })
  },

}

function gotoLogin() {
  const app = getApp()
  // 防止多个接口触发此方法 pages/mine/index
  if (app.goToLoginPageLock) return
  app.goToLoginPageLock = true
  setTimeout(() => app.goToLoginPageLock = false, 3000) // 3s 之后恢复
  setTimeout(() => {
    const pages = getCurrentPages()
    const {route} = pages[pages.length - 1] || {}
    // 如果已经进入到了登录页面，则无需执行后续操作
    if (route === 'pages/login/index') return
    User.userLogout().finally(() => {
      if (route !== 'pages/home/index') {
        resetTabItemIndex()
        // 如果是其他页面 先切回首页
        Router.routerRoot('home_index', {}, true)
      }
      // 去登录
      setTimeout(() => Router.routerPush('login_index'), 400)
    })
  }, 1000)
}
