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

  // 首页筛选-疾病
  DIC_FILTER_DISEASE: 'mini/recruit/dic/listDiseaseSelect',
  // 首页筛选-地区
  DIC_FILTER_AREA: 'mini/recruit/dic/listAreaSelect',
  // 首页筛选-研究中心
  DIC_FILTER_HOSPITAL: 'mini/recruit/dic/listHospitalByArea',

  // 首页筛选-更多-科室
  DIC_FILTER_SECTION: 'mini/recruit/dic/listSection',
  // 首页筛选-更多-基因
  DIC_FILTER_GENE: 'mini/recruit/dic/listGene',
  // 首页筛选-更多-基因
  DIC_FILTER_TREATMENT: 'mini/recruit/dic/listTreatmentDemand',

  // 查询项目列表
  REQ_PROJECT_LIST: 'mini/recruit/pub/project/listProject',
  // 项目详情
  REQ_PROJECT_DETAIL: 'mini/recruit/pub/project/getProject',


  // 获取城市列表
  REQ_CITY_LIST: 'https://vas-wap.autostreets.com/violation/getCitys',
  // 上传地址
  DO_IMAGE_UPLOAD: 'certificateBosOrder/imageFileUpload',

  // list
  REQ_AUCTION_LIST: 'auction/una/index-page',

  homeList: 'https://api.shuidichou.com/api/cf/pr/mini/recruit-project/list',
  subjectList: 'https://api.shuidichou.com/api/cf/pr/mini/patient/search-info'
}
