//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
  mixins: [
    WowPage.wow$.mixins.Router,
    WowPage.wow$.mixins.Input,
    WowPage.wow$.mixins.Modal,
    WowPage.wow$.mixins.Curl,
    WowPage.wow$.mixins.Jump,
    WowPage.wow$.mixins.Page,
  ],
  data: {},
  onLoad(o) {
    this.routerGetParams(o)
    let {params$, api$} = this.data
    // Object.keys(params$.objFilter).forEach(item => {
    //   params$.objFilter[item].key = `params$.${params$.objFilter[item].key}`
    //   let children = params$.objFilter[item].children
    //   if (children) {
    //     Object.keys(children).forEach(o => {
    //       children[o].key = `params$.${children[o].key}`
    //     })
    //   }
    // })
    const d = [{
      "value": "402882408754384e018754384ebf0015",
      "label": "全部慢病",
      "level": "1",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf0016",
      "label": "风湿免疫科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf0017",
      "label": "皮肤科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf0018",
      "label": "呼吸科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf0019",
      "label": "消化内科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf001a",
      "label": "心血管科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf001b",
      "label": "感染科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec0001c",
      "label": "骨科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec0001d",
      "label": "普外科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec0001e",
      "label": "眼科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec0001f",
      "label": "耳鼻喉科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec00020",
      "label": "神经科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec00021",
      "label": "肾内科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec00022",
      "label": "血液科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec00023",
      "label": "中医科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec00024",
      "label": "儿科",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec00025",
      "label": "医美",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec00026",
      "label": "罕见病",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ec00027",
      "label": "其他慢病",
      "level": "1",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf0014",
      "label": "其他肿瘤",
      "level": "1",
      "children": []
    }, {
      "value": "4028824087545a320187545a32aa0000",
      "label": "全部肿瘤",
      "level": "1",
      "children": []
    }, {
      "value": "402882408754384e018754384ebe0000",
      "label": "肺癌",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebe0000",
        "label": "全部肺癌",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00028",
        "label": "局限期小细胞肺癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00029",
        "label": "广泛期小细胞肺癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0002a",
        "label": "非鳞状非小细胞肺癌",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec0002b", "label": "鳞状非小细胞肺癌", "level": "3", "children": []}]
    }, {"value": "402882408754384e018754384ebf0001", "label": "胸腺癌", "level": "2", "children": []}, {
      "value": "402882408754384e018754384ebf0002",
      "label": "细化系统肿瘤",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf0002",
        "label": "全部细化系统肿瘤",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0002c",
        "label": "胃癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0002d",
        "label": "肝细胞癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0002e",
        "label": "食管癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0002f",
        "label": "肝内胆管癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00030",
        "label": "肝外胆管癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00031",
        "label": "胆囊癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00032",
        "label": "胰腺癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00033",
        "label": "结直肠癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00034",
        "label": "恶性腹水",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00035",
        "label": "恶性胸水",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00036",
        "label": "小肠癌",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec00037", "label": "阑尾癌", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf0003",
      "label": "乳腺癌",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf0003",
        "label": "全部乳腺癌",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00038",
        "label": "三阴乳腺癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00039",
        "label": "HER2阳性乳腺癌",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec0003a", "label": "HR阳性乳腺癌", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf0004",
      "label": "妇科肿瘤",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf0004",
        "label": "全部妇科肿瘤",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0003b",
        "label": "宫颈癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0003c",
        "label": "卵巢癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0003d",
        "label": "腹膜癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec0003e",
        "label": "输卵管癌",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec0003f", "label": "子宫内膜癌", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf0005",
      "label": "泌尿系统肿瘤",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf0005",
        "label": "全部泌尿系统肿瘤",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00040",
        "label": "尿路上皮癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00041",
        "label": "膀胱癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00042",
        "label": "前列腺癌",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00043",
        "label": "肾癌",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec00044", "label": "睾丸癌", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf0006",
      "label": "头颈肿瘤",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf0006",
        "label": "全部头颈肿瘤",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00045",
        "label": "头颈鳞癌",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec00046", "label": "鼻咽癌", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf0007",
      "label": "脑胶质瘤",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf0008",
      "label": "甲状腺癌",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf0009",
      "label": "骨肿瘤",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf0009",
        "label": "全部骨肿瘤",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00047",
        "label": "腱鞘巨细胞瘤",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec00048",
        "label": "骨肉瘤",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec00049", "label": "软骨肉瘤", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf000a",
      "label": "间皮瘤",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf000a",
        "label": "全部间皮瘤",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec1004a",
        "label": "胸膜间皮瘤",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec1004b", "label": "腹膜间皮瘤", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf000b",
      "label": "间质瘤",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf000c",
      "label": "黑色素瘤",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf000d",
      "label": "皮肤鳞癌",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf000e",
      "label": "神经内分泌癌",
      "level": "2",
      "children": []
    }, {
      "value": "402882408754384e018754384ebf000f",
      "label": "骨质增殖肿瘤",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf000f",
        "label": "全部骨质增殖肿瘤",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec1004d",
        "label": "真性红细胞增多症",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec1004e",
        "label": "原发性血小板增多症",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec1004f", "label": "骨髓纤维化", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf0010",
      "label": "淋巴瘤",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf0010",
        "label": "全部淋巴瘤",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10050",
        "label": "霍奇金淋巴瘤",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10051",
        "label": "B细胞淋巴瘤",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec10052", "label": "T/NK细胞淋巴瘤", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf0011",
      "label": "白血病",
      "level": "2",
      "children": [{
        "value": "402882408754384e018754384ebf0011",
        "label": "全部白血病",
        "level": "2",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10053",
        "label": "急性B淋巴细胞白血病",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10054",
        "label": "急性T淋巴细胞白血病",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10055",
        "label": "急性髓细胞白血病",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10056",
        "label": "慢性髓细胞白血病",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10057",
        "label": "慢性淋巴细胞白血病",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10058",
        "label": "毛细胞白血病",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec10059",
        "label": "幼淋巴细胞白血病",
        "level": "3",
        "children": []
      }, {
        "value": "402882408754384e018754384ec1005a",
        "label": "骨髓增生异常综合征",
        "level": "3",
        "children": []
      }, {"value": "402882408754384e018754384ec1005b", "label": "多发性骨髓瘤", "level": "3", "children": []}]
    }, {
      "value": "402882408754384e018754384ebf0012",
      "label": "实体瘤",
      "level": "2",
      "children": []
    }, {"value": "402882408754384e018754384ebf0013", "label": "血液系统肿瘤", "level": "2", "children": []}]
    const c = [{
      "value": "110000",
      "label": "北京市",
      "provinceLevel": "1",
      "children": [{"value": "110100", "label": "北京市市辖区", "children": []}]
    }, {
      "value": "120000",
      "label": "天津市",
      "provinceLevel": "1",
      "children": [{"value": "120100", "label": "天津市市辖区", "children": []}]
    }, {
      "value": "130000",
      "label": "河北省",
      "children": [{
        "value": "130000",
        "label": "河北省全部",
        "children": []
      }, {"value": "130100", "label": "石家庄市", "children": []}, {
        "value": "130200",
        "label": "唐山市",
        "children": []
      }, {"value": "130300", "label": "秦皇岛市", "children": []}, {
        "value": "130400",
        "label": "邯郸市",
        "children": []
      }, {"value": "130500", "label": "邢台市", "children": []}, {
        "value": "130600",
        "label": "保定市",
        "children": []
      }, {"value": "130700", "label": "张家口市", "children": []}, {
        "value": "130800",
        "label": "承德市",
        "children": []
      }, {"value": "130900", "label": "沧州市", "children": []}, {
        "value": "131000",
        "label": "廊坊市",
        "children": []
      }, {"value": "131100", "label": "衡水市", "children": []}]
    }, {
      "value": "140000",
      "label": "山西省",
      "children": [{
        "value": "140000",
        "label": "山西省全部",
        "children": []
      }, {"value": "140100", "label": "太原市", "children": []}, {
        "value": "140200",
        "label": "大同市",
        "children": []
      }, {"value": "140300", "label": "阳泉市", "children": []}, {
        "value": "140400",
        "label": "长治市",
        "children": []
      }, {"value": "140500", "label": "晋城市", "children": []}, {
        "value": "140600",
        "label": "朔州市",
        "children": []
      }, {"value": "140700", "label": "晋中市", "children": []}, {
        "value": "140800",
        "label": "运城市",
        "children": []
      }, {"value": "140900", "label": "忻州市", "children": []}, {
        "value": "141000",
        "label": "临汾市",
        "children": []
      }, {"value": "141100", "label": "吕梁市", "children": []}]
    }, {
      "value": "150000",
      "label": "内蒙古自治区",
      "children": [{
        "value": "150000",
        "label": "内蒙古自治区全部",
        "children": []
      }, {"value": "150100", "label": "呼和浩特市", "children": []}, {
        "value": "150200",
        "label": "包头市",
        "children": []
      }, {"value": "150300", "label": "乌海市", "children": []}, {
        "value": "150400",
        "label": "赤峰市",
        "children": []
      }, {"value": "150500", "label": "通辽市", "children": []}, {
        "value": "150600",
        "label": "鄂尔多斯市",
        "children": []
      }, {"value": "150700", "label": "呼伦贝尔市", "children": []}, {
        "value": "150800",
        "label": "巴彦淖尔市",
        "children": []
      }, {"value": "150900", "label": "乌兰察布市", "children": []}, {
        "value": "152200",
        "label": "兴安盟",
        "children": []
      }, {"value": "152500", "label": "锡林郭勒盟", "children": []}, {
        "value": "152900",
        "label": "阿拉善盟",
        "children": []
      }]
    }, {
      "value": "210000",
      "label": "辽宁省",
      "children": [{
        "value": "210000",
        "label": "辽宁省全部",
        "children": []
      }, {"value": "210100", "label": "沈阳市", "children": []}, {
        "value": "210200",
        "label": "大连市",
        "children": []
      }, {"value": "210300", "label": "鞍山市", "children": []}, {
        "value": "210400",
        "label": "抚顺市",
        "children": []
      }, {"value": "210500", "label": "本溪市", "children": []}, {
        "value": "210600",
        "label": "丹东市",
        "children": []
      }, {"value": "210700", "label": "锦州市", "children": []}, {
        "value": "210800",
        "label": "营口市",
        "children": []
      }, {"value": "210900", "label": "阜新市", "children": []}, {
        "value": "211000",
        "label": "辽阳市",
        "children": []
      }, {"value": "211100", "label": "盘锦市", "children": []}, {
        "value": "211200",
        "label": "铁岭市",
        "children": []
      }, {"value": "211300", "label": "朝阳市", "children": []}, {
        "value": "211400",
        "label": "葫芦岛市",
        "children": []
      }]
    }, {
      "value": "220000",
      "label": "吉林省",
      "children": [{
        "value": "220000",
        "label": "吉林省全部",
        "children": []
      }, {"value": "220100", "label": "长春市", "children": []}, {
        "value": "220200",
        "label": "吉林市",
        "children": []
      }, {"value": "220300", "label": "四平市", "children": []}, {
        "value": "220400",
        "label": "辽源市",
        "children": []
      }, {"value": "220500", "label": "通化市", "children": []}, {
        "value": "220600",
        "label": "白山市",
        "children": []
      }, {"value": "220700", "label": "松原市", "children": []}, {
        "value": "220800",
        "label": "白城市",
        "children": []
      }, {"value": "222400", "label": "延边朝鲜族自治州", "children": []}]
    }, {
      "value": "230000",
      "label": "黑龙江省",
      "children": [{
        "value": "230000",
        "label": "黑龙江省全部",
        "children": []
      }, {"value": "230100", "label": "哈尔滨市", "children": []}, {
        "value": "230200",
        "label": "齐齐哈尔市",
        "children": []
      }, {"value": "230300", "label": "鸡西市", "children": []}, {
        "value": "230400",
        "label": "鹤岗市",
        "children": []
      }, {"value": "230500", "label": "双鸭山市", "children": []}, {
        "value": "230600",
        "label": "大庆市",
        "children": []
      }, {"value": "230700", "label": "伊春市", "children": []}, {
        "value": "230800",
        "label": "佳木斯市",
        "children": []
      }, {"value": "230900", "label": "七台河市", "children": []}, {
        "value": "231000",
        "label": "牡丹江市",
        "children": []
      }, {"value": "231100", "label": "黑河市", "children": []}, {
        "value": "231200",
        "label": "绥化市",
        "children": []
      }, {"value": "232700", "label": "大兴安岭地区", "children": []}]
    }, {
      "value": "310000",
      "label": "上海市",
      "provinceLevel": "1",
      "children": [{"value": "310100", "label": "上海市市辖区", "children": []}]
    }, {
      "value": "320000",
      "label": "江苏省",
      "children": [{
        "value": "320000",
        "label": "江苏省全部",
        "children": []
      }, {"value": "320100", "label": "南京市", "children": []}, {
        "value": "320200",
        "label": "无锡市",
        "children": []
      }, {"value": "320300", "label": "徐州市", "children": []}, {
        "value": "320400",
        "label": "常州市",
        "children": []
      }, {"value": "320500", "label": "苏州市", "children": []}, {
        "value": "320600",
        "label": "南通市",
        "children": []
      }, {"value": "320700", "label": "连云港市", "children": []}, {
        "value": "320800",
        "label": "淮安市",
        "children": []
      }, {"value": "320900", "label": "盐城市", "children": []}, {
        "value": "321000",
        "label": "扬州市",
        "children": []
      }, {"value": "321100", "label": "镇江市", "children": []}, {
        "value": "321200",
        "label": "泰州市",
        "children": []
      }, {"value": "321300", "label": "宿迁市", "children": []}]
    }, {
      "value": "330000",
      "label": "浙江省",
      "children": [{
        "value": "330000",
        "label": "浙江省全部",
        "children": []
      }, {"value": "330100", "label": "杭州市", "children": []}, {
        "value": "330200",
        "label": "宁波市",
        "children": []
      }, {"value": "330300", "label": "温州市", "children": []}, {
        "value": "330400",
        "label": "嘉兴市",
        "children": []
      }, {"value": "330500", "label": "湖州市", "children": []}, {
        "value": "330600",
        "label": "绍兴市",
        "children": []
      }, {"value": "330700", "label": "金华市", "children": []}, {
        "value": "330800",
        "label": "衢州市",
        "children": []
      }, {"value": "330900", "label": "舟山市", "children": []}, {
        "value": "331000",
        "label": "台州市",
        "children": []
      }, {"value": "331100", "label": "丽水市", "children": []}]
    }, {
      "value": "340000",
      "label": "安徽省",
      "children": [{
        "value": "340000",
        "label": "安徽省全部",
        "children": []
      }, {"value": "340100", "label": "合肥市", "children": []}, {
        "value": "340200",
        "label": "芜湖市",
        "children": []
      }, {"value": "340300", "label": "蚌埠市", "children": []}, {
        "value": "340400",
        "label": "淮南市",
        "children": []
      }, {"value": "340500", "label": "马鞍山市", "children": []}, {
        "value": "340600",
        "label": "淮北市",
        "children": []
      }, {"value": "340700", "label": "铜陵市", "children": []}, {
        "value": "340800",
        "label": "安庆市",
        "children": []
      }, {"value": "341000", "label": "黄山市", "children": []}, {
        "value": "341100",
        "label": "滁州市",
        "children": []
      }, {"value": "341200", "label": "阜阳市", "children": []}, {
        "value": "341300",
        "label": "宿州市",
        "children": []
      }, {"value": "341500", "label": "六安市", "children": []}, {
        "value": "341600",
        "label": "亳州市",
        "children": []
      }, {"value": "341700", "label": "池州市", "children": []}, {
        "value": "341800",
        "label": "宣城市",
        "children": []
      }]
    }, {
      "value": "350000",
      "label": "福建省",
      "children": [{
        "value": "350000",
        "label": "福建省全部",
        "children": []
      }, {"value": "350100", "label": "福州市", "children": []}, {
        "value": "350200",
        "label": "厦门市",
        "children": []
      }, {"value": "350300", "label": "莆田市", "children": []}, {
        "value": "350400",
        "label": "三明市",
        "children": []
      }, {"value": "350500", "label": "泉州市", "children": []}, {
        "value": "350600",
        "label": "漳州市",
        "children": []
      }, {"value": "350700", "label": "南平市", "children": []}, {
        "value": "350800",
        "label": "龙岩市",
        "children": []
      }, {"value": "350900", "label": "宁德市", "children": []}]
    }, {
      "value": "360000",
      "label": "江西省",
      "children": [{
        "value": "360000",
        "label": "江西省全部",
        "children": []
      }, {"value": "360100", "label": "南昌市", "children": []}, {
        "value": "360200",
        "label": "景德镇市",
        "children": []
      }, {"value": "360300", "label": "萍乡市", "children": []}, {
        "value": "360400",
        "label": "九江市",
        "children": []
      }, {"value": "360500", "label": "新余市", "children": []}, {
        "value": "360600",
        "label": "鹰潭市",
        "children": []
      }, {"value": "360700", "label": "赣州市", "children": []}, {
        "value": "360800",
        "label": "吉安市",
        "children": []
      }, {"value": "360900", "label": "宜春市", "children": []}, {
        "value": "361000",
        "label": "抚州市",
        "children": []
      }, {"value": "361100", "label": "上饶市", "children": []}]
    }, {
      "value": "370000",
      "label": "山东省",
      "children": [{
        "value": "370000",
        "label": "山东省全部",
        "children": []
      }, {"value": "370100", "label": "济南市", "children": []}, {
        "value": "370200",
        "label": "青岛市",
        "children": []
      }, {"value": "370300", "label": "淄博市", "children": []}, {
        "value": "370400",
        "label": "枣庄市",
        "children": []
      }, {"value": "370500", "label": "东营市", "children": []}, {
        "value": "370600",
        "label": "烟台市",
        "children": []
      }, {"value": "370700", "label": "潍坊市", "children": []}, {
        "value": "370800",
        "label": "济宁市",
        "children": []
      }, {"value": "370900", "label": "泰安市", "children": []}, {
        "value": "371000",
        "label": "威海市",
        "children": []
      }, {"value": "371100", "label": "日照市", "children": []}, {
        "value": "371200",
        "label": "莱芜市",
        "children": []
      }, {"value": "371300", "label": "临沂市", "children": []}, {
        "value": "371400",
        "label": "德州市",
        "children": []
      }, {"value": "371500", "label": "聊城市", "children": []}, {
        "value": "371600",
        "label": "滨州市",
        "children": []
      }, {"value": "371700", "label": "菏泽市", "children": []}]
    }, {
      "value": "410000",
      "label": "河南省",
      "children": [{
        "value": "410000",
        "label": "河南省全部",
        "children": []
      }, {"value": "410100", "label": "郑州市", "children": []}, {
        "value": "410200",
        "label": "开封市",
        "children": []
      }, {"value": "410300", "label": "洛阳市", "children": []}, {
        "value": "410400",
        "label": "平顶山市",
        "children": []
      }, {"value": "410500", "label": "安阳市", "children": []}, {
        "value": "410600",
        "label": "鹤壁市",
        "children": []
      }, {"value": "410700", "label": "新乡市", "children": []}, {
        "value": "410800",
        "label": "焦作市",
        "children": []
      }, {"value": "410900", "label": "濮阳市", "children": []}, {
        "value": "411000",
        "label": "许昌市",
        "children": []
      }, {"value": "411100", "label": "漯河市", "children": []}, {
        "value": "411200",
        "label": "三门峡市",
        "children": []
      }, {"value": "411300", "label": "南阳市", "children": []}, {
        "value": "411400",
        "label": "商丘市",
        "children": []
      }, {"value": "411500", "label": "信阳市", "children": []}, {
        "value": "411600",
        "label": "周口市",
        "children": []
      }, {"value": "411700", "label": "驻马店市", "children": []}, {
        "value": "419000",
        "label": "省直辖县级行政区划",
        "children": []
      }]
    }, {
      "value": "420000",
      "label": "湖北省",
      "children": [{
        "value": "420000",
        "label": "湖北省全部",
        "children": []
      }, {"value": "420100", "label": "武汉市", "children": []}, {
        "value": "420200",
        "label": "黄石市",
        "children": []
      }, {"value": "420300", "label": "十堰市", "children": []}, {
        "value": "420500",
        "label": "宜昌市",
        "children": []
      }, {"value": "420600", "label": "襄阳市", "children": []}, {
        "value": "420700",
        "label": "鄂州市",
        "children": []
      }, {"value": "420800", "label": "荆门市", "children": []}, {
        "value": "420900",
        "label": "孝感市",
        "children": []
      }, {"value": "421000", "label": "荆州市", "children": []}, {
        "value": "421100",
        "label": "黄冈市",
        "children": []
      }, {"value": "421200", "label": "咸宁市", "children": []}, {
        "value": "421300",
        "label": "随州市",
        "children": []
      }, {"value": "422800", "label": "恩施土家族苗族自治州", "children": []}, {
        "value": "429000",
        "label": "省直辖县级行政区划",
        "children": []
      }]
    }, {
      "value": "430000",
      "label": "湖南省",
      "children": [{
        "value": "430000",
        "label": "湖南省全部",
        "children": []
      }, {"value": "430100", "label": "长沙市", "children": []}, {
        "value": "430200",
        "label": "株洲市",
        "children": []
      }, {"value": "430300", "label": "湘潭市", "children": []}, {
        "value": "430400",
        "label": "衡阳市",
        "children": []
      }, {"value": "430500", "label": "邵阳市", "children": []}, {
        "value": "430600",
        "label": "岳阳市",
        "children": []
      }, {"value": "430700", "label": "常德市", "children": []}, {
        "value": "430800",
        "label": "张家界市",
        "children": []
      }, {"value": "430900", "label": "益阳市", "children": []}, {
        "value": "431000",
        "label": "郴州市",
        "children": []
      }, {"value": "431100", "label": "永州市", "children": []}, {
        "value": "431200",
        "label": "怀化市",
        "children": []
      }, {"value": "431300", "label": "娄底市", "children": []}, {
        "value": "433100",
        "label": "湘西土家族苗族自治州",
        "children": []
      }]
    }, {
      "value": "440000",
      "label": "广东省",
      "children": [{
        "value": "440000",
        "label": "广东省全部",
        "children": []
      }, {"value": "440100", "label": "广州市", "children": []}, {
        "value": "440200",
        "label": "韶关市",
        "children": []
      }, {"value": "440300", "label": "深圳市", "children": []}, {
        "value": "440400",
        "label": "珠海市",
        "children": []
      }, {"value": "440500", "label": "汕头市", "children": []}, {
        "value": "440600",
        "label": "佛山市",
        "children": []
      }, {"value": "440700", "label": "江门市", "children": []}, {
        "value": "440800",
        "label": "湛江市",
        "children": []
      }, {"value": "440900", "label": "茂名市", "children": []}, {
        "value": "441200",
        "label": "肇庆市",
        "children": []
      }, {"value": "441300", "label": "惠州市", "children": []}, {
        "value": "441400",
        "label": "梅州市",
        "children": []
      }, {"value": "441500", "label": "汕尾市", "children": []}, {
        "value": "441600",
        "label": "河源市",
        "children": []
      }, {"value": "441700", "label": "阳江市", "children": []}, {
        "value": "441800",
        "label": "清远市",
        "children": []
      }, {"value": "441900", "label": "东莞市", "children": []}, {
        "value": "442000",
        "label": "中山市",
        "children": []
      }, {"value": "445100", "label": "潮州市", "children": []}, {
        "value": "445200",
        "label": "揭阳市",
        "children": []
      }, {"value": "445300", "label": "云浮市", "children": []}]
    }, {
      "value": "450000",
      "label": "广西壮族自治区",
      "children": [{
        "value": "450000",
        "label": "广西壮族自治区全部",
        "children": []
      }, {"value": "450100", "label": "南宁市", "children": []}, {
        "value": "450200",
        "label": "柳州市",
        "children": []
      }, {"value": "450300", "label": "桂林市", "children": []}, {
        "value": "450400",
        "label": "梧州市",
        "children": []
      }, {"value": "450500", "label": "北海市", "children": []}, {
        "value": "450600",
        "label": "防城港市",
        "children": []
      }, {"value": "450700", "label": "钦州市", "children": []}, {
        "value": "450800",
        "label": "贵港市",
        "children": []
      }, {"value": "450900", "label": "玉林市", "children": []}, {
        "value": "451000",
        "label": "百色市",
        "children": []
      }, {"value": "451100", "label": "贺州市", "children": []}, {
        "value": "451200",
        "label": "河池市",
        "children": []
      }, {"value": "451300", "label": "来宾市", "children": []}, {
        "value": "451400",
        "label": "崇左市",
        "children": []
      }]
    }, {
      "value": "460000",
      "label": "海南省",
      "children": [{
        "value": "460000",
        "label": "海南省全部",
        "children": []
      }, {"value": "460100", "label": "海口市", "children": []}, {
        "value": "460200",
        "label": "三亚市",
        "children": []
      }, {"value": "460300", "label": "三沙市", "children": []}, {
        "value": "469000",
        "label": "省直辖县级行政区划",
        "children": []
      }]
    }, {
      "value": "500000",
      "label": "重庆市",
      "provinceLevel": "1",
      "children": [{"value": "500100", "label": "重庆市市辖区", "children": []}]
    }, {
      "value": "510000",
      "label": "四川省",
      "children": [{
        "value": "510000",
        "label": "四川省全部",
        "children": []
      }, {"value": "510100", "label": "成都市", "children": []}, {
        "value": "510300",
        "label": "自贡市",
        "children": []
      }, {"value": "510400", "label": "攀枝花市", "children": []}, {
        "value": "510500",
        "label": "泸州市",
        "children": []
      }, {"value": "510600", "label": "德阳市", "children": []}, {
        "value": "510700",
        "label": "绵阳市",
        "children": []
      }, {"value": "510800", "label": "广元市", "children": []}, {
        "value": "510900",
        "label": "遂宁市",
        "children": []
      }, {"value": "511000", "label": "内江市", "children": []}, {
        "value": "511100",
        "label": "乐山市",
        "children": []
      }, {"value": "511300", "label": "南充市", "children": []}, {
        "value": "511400",
        "label": "眉山市",
        "children": []
      }, {"value": "511500", "label": "宜宾市", "children": []}, {
        "value": "511600",
        "label": "广安市",
        "children": []
      }, {"value": "511700", "label": "达州市", "children": []}, {
        "value": "511800",
        "label": "雅安市",
        "children": []
      }, {"value": "511900", "label": "巴中市", "children": []}, {
        "value": "512000",
        "label": "资阳市",
        "children": []
      }, {"value": "513200", "label": "阿坝藏族羌族自治州", "children": []}, {
        "value": "513300",
        "label": "甘孜藏族自治州",
        "children": []
      }, {"value": "513400", "label": "凉山彝族自治州", "children": []}]
    }, {
      "value": "520000",
      "label": "贵州省",
      "children": [{
        "value": "520000",
        "label": "贵州省全部",
        "children": []
      }, {"value": "520100", "label": "贵阳市", "children": []}, {
        "value": "520200",
        "label": "六盘水市",
        "children": []
      }, {"value": "520300", "label": "遵义市", "children": []}, {
        "value": "520400",
        "label": "安顺市",
        "children": []
      }, {"value": "520500", "label": "毕节市", "children": []}, {
        "value": "520600",
        "label": "铜仁市",
        "children": []
      }, {"value": "522300", "label": "黔西南布依族苗族自治州", "children": []}, {
        "value": "522600",
        "label": "黔东南苗族侗族自治州",
        "children": []
      }, {"value": "522700", "label": "黔南布依族苗族自治州", "children": []}]
    }, {
      "value": "530000",
      "label": "云南省",
      "children": [{
        "value": "530000",
        "label": "云南省全部",
        "children": []
      }, {"value": "530100", "label": "昆明市", "children": []}, {
        "value": "530300",
        "label": "曲靖市",
        "children": []
      }, {"value": "530400", "label": "玉溪市", "children": []}, {
        "value": "530500",
        "label": "保山市",
        "children": []
      }, {"value": "530600", "label": "昭通市", "children": []}, {
        "value": "530700",
        "label": "丽江市",
        "children": []
      }, {"value": "530800", "label": "普洱市", "children": []}, {
        "value": "530900",
        "label": "临沧市",
        "children": []
      }, {"value": "532300", "label": "楚雄彝族自治州", "children": []}, {
        "value": "532500",
        "label": "红河哈尼族彝族自治州",
        "children": []
      }, {"value": "532600", "label": "文山壮族苗族自治州", "children": []}, {
        "value": "532800",
        "label": "西双版纳傣族自治州",
        "children": []
      }, {"value": "532900", "label": "大理白族自治州", "children": []}, {
        "value": "533100",
        "label": "德宏傣族景颇族自治州",
        "children": []
      }, {"value": "533300", "label": "怒江傈僳族自治州", "children": []}, {
        "value": "533400",
        "label": "迪庆藏族自治州",
        "children": []
      }]
    }, {
      "value": "540000",
      "label": "西藏自治区",
      "children": [{
        "value": "540000",
        "label": "西藏自治区全部",
        "children": []
      }, {"value": "540100", "label": "拉萨市", "children": []}, {
        "value": "540200",
        "label": "日喀则市",
        "children": []
      }, {"value": "542100", "label": "昌都地区", "children": []}, {
        "value": "542200",
        "label": "山南地区",
        "children": []
      }, {"value": "542400", "label": "那曲地区", "children": []}, {
        "value": "542500",
        "label": "阿里地区",
        "children": []
      }, {"value": "542600", "label": "林芝地区", "children": []}]
    }, {
      "value": "610000",
      "label": "陕西省",
      "children": [{
        "value": "610000",
        "label": "陕西省全部",
        "children": []
      }, {"value": "610100", "label": "西安市", "children": []}, {
        "value": "610200",
        "label": "铜川市",
        "children": []
      }, {"value": "610300", "label": "宝鸡市", "children": []}, {
        "value": "610400",
        "label": "咸阳市",
        "children": []
      }, {"value": "610500", "label": "渭南市", "children": []}, {
        "value": "610600",
        "label": "延安市",
        "children": []
      }, {"value": "610700", "label": "汉中市", "children": []}, {
        "value": "610800",
        "label": "榆林市",
        "children": []
      }, {"value": "610900", "label": "安康市", "children": []}, {
        "value": "611000",
        "label": "商洛市",
        "children": []
      }]
    }, {
      "value": "620000",
      "label": "甘肃省",
      "children": [{
        "value": "620000",
        "label": "甘肃省全部",
        "children": []
      }, {"value": "620100", "label": "兰州市", "children": []}, {
        "value": "620200",
        "label": "嘉峪关市",
        "children": []
      }, {"value": "620300", "label": "金昌市", "children": []}, {
        "value": "620400",
        "label": "白银市",
        "children": []
      }, {"value": "620500", "label": "天水市", "children": []}, {
        "value": "620600",
        "label": "武威市",
        "children": []
      }, {"value": "620700", "label": "张掖市", "children": []}, {
        "value": "620800",
        "label": "平凉市",
        "children": []
      }, {"value": "620900", "label": "酒泉市", "children": []}, {
        "value": "621000",
        "label": "庆阳市",
        "children": []
      }, {"value": "621100", "label": "定西市", "children": []}, {
        "value": "621200",
        "label": "陇南市",
        "children": []
      }, {"value": "622900", "label": "临夏回族自治州", "children": []}, {
        "value": "623000",
        "label": "甘南藏族自治州",
        "children": []
      }]
    }, {
      "value": "630000",
      "label": "青海省",
      "children": [{
        "value": "630000",
        "label": "青海省全部",
        "children": []
      }, {"value": "630100", "label": "西宁市", "children": []}, {
        "value": "630200",
        "label": "海东市",
        "children": []
      }, {"value": "632200", "label": "海北藏族自治州", "children": []}, {
        "value": "632300",
        "label": "黄南藏族自治州",
        "children": []
      }, {"value": "632500", "label": "海南藏族自治州", "children": []}, {
        "value": "632600",
        "label": "果洛藏族自治州",
        "children": []
      }, {"value": "632700", "label": "玉树藏族自治州", "children": []}, {
        "value": "632800",
        "label": "海西蒙古族藏族自治州",
        "children": []
      }]
    }, {
      "value": "640000",
      "label": "宁夏回族自治区",
      "children": [{
        "value": "640000",
        "label": "宁夏回族自治区全部",
        "children": []
      }, {"value": "640100", "label": "银川市", "children": []}, {
        "value": "640200",
        "label": "石嘴山市",
        "children": []
      }, {"value": "640300", "label": "吴忠市", "children": []}, {
        "value": "640400",
        "label": "固原市",
        "children": []
      }, {"value": "640500", "label": "中卫市", "children": []}]
    }, {
      "value": "650000",
      "label": "新疆维吾尔自治区",
      "children": [{
        "value": "650000",
        "label": "新疆维吾尔自治区全部",
        "children": []
      }, {"value": "650100", "label": "乌鲁木齐市", "children": []}, {
        "value": "650200",
        "label": "克拉玛依市",
        "children": []
      }, {"value": "652100", "label": "吐鲁番地区", "children": []}, {
        "value": "652200",
        "label": "哈密地区",
        "children": []
      }, {"value": "652300", "label": "昌吉回族自治州", "children": []}, {
        "value": "652700",
        "label": "博尔塔拉蒙古自治州",
        "children": []
      }, {"value": "652800", "label": "巴音郭楞蒙古自治州", "children": []}, {
        "value": "652900",
        "label": "阿克苏地区",
        "children": []
      }, {"value": "653000", "label": "克孜勒苏柯尔克孜自治州", "children": []}, {
        "value": "653100",
        "label": "喀什地区",
        "children": []
      }, {"value": "653200", "label": "和田地区", "children": []}, {
        "value": "654000",
        "label": "伊犁哈萨克自治州",
        "children": []
      }, {"value": "654200", "label": "塔城地区", "children": []}, {
        "value": "654300",
        "label": "阿勒泰地区",
        "children": []
      }, {"value": "659000", "label": "自治区直辖县级行政区划", "children": []}]
    }, {"value": "710000", "label": "台湾省", "children": []}, {
      "value": "810000",
      "label": "香港特别行政区",
      "children": []
    }, {"value": "820000", "label": "澳门特别行政区", "children": []}]
    params$.objFilter.disease.options = d
    params$.objFilter.area.options = c
    this.setData({
      params$
    })

    // 疾病字典
    // this.curl(api$.DIC_FILTER_DISEASE, {}, {method: 'get'}).then(res => {
    //   console.log('DIC_FILTER_AREA=>', res)
    //   let {params$} = this.data
    //   params$.objFilter.disease.options = res
    //   this.setData({
    //     params$
    //   })
    // })
    // 地区字典
    // this.curl(api$.DIC_FILTER_AREA, {}, {method: 'get'}).then(res => {
    //   let {params$} = this.data
    //   params$.objFilter.area.options = res
    //   this.setData({
    //     params$
    //   })
    // })
    // 科室
    this.curl(api$.DIC_FILTER_SECTION, {}, {method: 'get'}).then(res => {
      this.setData({
        ['params$.objFilter.more.children.department.options']: res || []
      })
    })
    // 基因
    this.curl(api$.DIC_FILTER_GENE, {}, {method: 'get'}).then(res => {
      this.setData({
        ['params$.objFilter.more.children.gene.options']: res || []
      })
    })
    // 线数
    this.curl(api$.DIC_FILTER_TREATMENT, {}, {method: 'get'}).then(res => {
      this.setData({
        ['params$.objFilter.more.children.treatment.options']: res || []
      })
    })

    // // 获取城市数据
    // this.curl(api$.REQ_CITY_LIST, {}, {method: 'get'}).then(res => {
    //   let {params$} = this.data
    //   params$.objFilter.area.options = res.map(item => {
    //     const {value: label, childs: citys, id: value} = item
    //     const children = citys.map(({value, id}) => ({label: value, value: id}))
    //     return {children, label, value}
    //   })
    //   this.setData({
    //     params$
    //   })
    // })

  },
  // tabs 切换逻辑
  inputHandle(e) {
    const {item, value} = this.inputParams(e)
    const {params$, api$} = this.data
    // 选中心前必选地区
    if (value === 'hospital') {
      const area = params$.objFilter.area.value
      if (!Object.keys(area).length) {
        this.modalToast('请选择地区')
        return
      }
      this.curl(api$.DIC_FILTER_HOSPITAL, {value: area.children.value}, {method: 'get'}).then(res => {
        this.setData({
          [`${item}`]: value,
          ['params$.objFilter.hospital.options']: res
        })
      })

    } else {
      this.setData({
        [`${item}`]: value
      })
    }
    console.log(this.data)
  },
  // 选中回显
  handleSelect(options) {
    const {detail} = options
    console.log(detail)
    this.setData({[`${detail.key}.value`]: detail.value})
  },
  resetHandle() {
    let {params$: {objFilter}} = this.data
    Object.keys(objFilter).forEach(item => {
      objFilter[item].value = objFilter[item].defaultValue
      let children = objFilter[item].children
      if (children) {
        Object.keys(children).forEach(i => {
          children[i].value = children[i].defaultValue
        })
      }
    })
    this.setData({
      ['params$.objFilter']: objFilter
    })
  },
  confirmHandle(e) {
    const refHomePage = this.pagesGetByIndex(1)
    let {params$: {confirm, objFilter}} = this.data
    if (refHomePage && confirm && refHomePage[confirm]) {
      refHomePage[confirm](objFilter)
    }
    this.jumpTabBarPage(e)
  }
})

