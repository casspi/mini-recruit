export const isProd = (() => {
  let result = true
  try {
    if (wx.getAccountInfoSync) {
      const accountInfo = wx.getAccountInfoSync()
      const { envVersion } = accountInfo.miniProgram
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
  DIC_FILTER_DISEASE_BY_LEVEL: 'mini/recruit/dic/listDiseaseSelectByLevel',
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
  REQ_CITY_LIST: 'mini/recruit/dic/listAreaSelectCommon',
  // 获取疾病列表
  REQ_DISEASE_LIST: 'mini/recruit/dic/listDiseaseByType',
  //职业
  DIC_USER_TYPE: 'mini/recruit/dic/listUserType',


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
  // 我的邀请码
  REQ_QRCODE: 'mini/recruit/app/getMyQrCode',

  // 获取短信验证码
  REQ_MSG_CODE: 'mini/recruit/loginAuth/getMsgCode',
  // 验证码
  REQ_VALID_CODE: 'mini/recruit/loginAuth/validMsgCode',
  // 登录
  REQ_LOGIN: 'mini/recruit/loginAuth/login',
  // 注册
  REQ_REGISTER: 'mini/recruit/loginAuth/register',
  // 登出
  REQ_LOGOUT: 'mini/recruit/loginAuth/logout',


  //文件上传
  FILE_UPLOAD: 'mini/recruit/app/uploadFile',

  // 隐私政策
  PRIVACY_POLICY: 'https://xywy.zhongyipharma.com/mini/pic/privacy.html',
  // 用户协议
  USER_AGREEMENT: 'https://xywy.zhongyipharma.com/mini/pic/register.html'


}
