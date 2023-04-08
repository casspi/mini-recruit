export const isProd = (() => {
  let result = true
  try {
    if (wx.getAccountInfoSync) {
      const accountInfo = wx.getAccountInfoSync()
      const {envVersion} = accountInfo.miniProgram
      // develop trial release
      if (['develop', 'trial'].includes(envVersion)) {
        result = false
      }
    }
  } catch (e) {
  }
  return result
})()


export default {

  H5_BASE_URL: isProd ? '' : '',

  // 获取城市列表
  REQ_CITY_LIST: 'https://vas-wap.autostreets.com/violation/getCitys',
  // 上传地址
  DO_IMAGE_UPLOAD: 'certificateBosOrder/imageFileUpload',

  // list
  REQ_AUCTION_LIST: 'auction/una/index-page',

  homeList: 'https://api.shuidichou.com/api/cf/pr/mini/recruit-project/list',
  subjectList: 'https://api.shuidichou.com/api/cf/pr/mini/patient/search-info'
}
