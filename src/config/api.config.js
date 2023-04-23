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
  // 中心变更记录
  REQ_HOSPITAL_LOG: 'mini/recruit/app/listAppProjectHospitalStatus',

  // 患者列表
  REQ_PATIENT_LIST: 'mini/recruit/app/listPatient',
  // 状态更新患者数
  REQ_PATIENT_STATUS_CHANGE: 'mini/recruit/app/getPatientStatusChange',
  // 患者状态
  DIC_PATIENT_STATUS: 'mini/recruit/app/listPatientStatusSelect',
  // 推荐人
  DIC_RECRUIT: 'mini/recruit/app/listAllRecruit',

  // 患者详情
  REQ_PATIENT_DETAIL: 'mini/recruit/app/getPatient',
  // 状态变更记录
  PATIENT_STATUS_LOG: 'mini/recruit/app/listPatientStatus',
  // 收藏
  COLLECT_CHANGE: 'mini/recruit/app/changeCollectStatus',

  // 新增患者
  REQ_PATIENT_ADD: 'mini/recruit/app/addPatient',
  // 患者编辑
  REQ_PATIENT_EDIT: 'mini/recruit/app/editPatient',
  // 患者体能状况
  DIC_CONDITION: 'mini/recruit/app/listCondition',
  // 获取城市列表
  REQ_CITY_LIST: 'mini/recruit/app/listAreaSelectCommon',
  // 获取疾病列表
  REQ_DISEASE_LIST: 'mini/recruit/app/listDiseaseByType',
  //职业
  DIC_USER_TYPE: 'mini/recruit/app/listUserType',


  //我的
  REQ_MINE: 'mini/recruit/app/getMyPage',
  // 我的资料
  REQ_MINE_INFO: 'mini/recruit/app/getMyInfo',
  // 我邀请的好友
  REQ_INVITED_LIST: 'mini/recruit/app/getMyRecruitList',
  //资料编辑
  REQ_MINE_INFO_CHANGE: 'mini/recruit/app/changeMyInfo',
  //患者提报
  REQ_PATIENT_REPORT: 'mini/recruit/app/addPatientReport',


  //文件上传
  FILE_UPLOAD: 'mini/recruit/app/uploadFile',

  // list
  REQ_AUCTION_LIST: 'auction/una/index-page',

  homeList: 'https://api.shuidichou.com/api/cf/pr/mini/recruit-project/list',
  subjectList: 'https://api.shuidichou.com/api/cf/pr/mini/patient/search-info',

  // 隐私政策
  PRIVACY_POLICY: 'http://testchw.w1.luyouxia.net/pic/html/ssss.html',
  // 用户协议
  USER_AGREEMENT: 'http://testchw.w1.luyouxia.net/pic/html/ssss.html',


}
