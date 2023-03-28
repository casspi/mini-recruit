export default {
  pickByKey: function (arr, val, key) {
    let res = []
    if (Array.isArray(val)) {
      val.forEach(item => {
        res.push(arr.find(o => o[key] === item[key]))
      })
    } else {
      res.push(arr.find(o => o[key] === item[key]))
    }
    res.filter(Boolean)
    return res
  },
  includes: function (arr, value, key, arrKey) {
    if (arrKey) arr = arr.map(function (item) {
      return item[arrKey]
    })
    if (!arr) arr = []
    var data = arr
    if (key) {
      data = []
      arr.forEach(function (item) {
        data.push(item[key])
      })
    }
    return data.indexOf(value) > -1
  }
}
