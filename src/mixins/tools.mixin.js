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
  }
}
