//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Jump,
  ],
  data:{
    isAgreement: false,
    phone: '',
    code: '',
    conut:''
  },
  // 获取验证码
  handleCode(){
    const {phone, code} = this.data
    console.log(phone, code)
    this.countDown()
  },
  // 倒计时
  countDown(){
    let conut = 10
    this.setData({
      conut
    })
    const timer = setInterval(()=>{
      if(conut > 0){
        this.setData({
          conut: --conut
        })
      }else {
        clearInterval(timer)
      }
    },1000)
  },
  handleSubmit(){
    const {phone, code} = this.data
    console.log(phone, code)
  }

})

