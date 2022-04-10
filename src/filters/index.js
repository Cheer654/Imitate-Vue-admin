// 数字按千位制进行格式化
export function toThousandFilter(num) {
  // Number类型写法
  // num.toLocaleString()
  // "123,456,789"
  // num.toLocaleString("en-US",{style:"currency",currency:"USD"})
  // "$123,456,789.00"
  // num.toLocaleString("zh-Hans-CN",{style:"currency",currency:"CNY"})
  // "￥123,456,789.00"

  // 正则替换，先提取小数点前面部分再进一步分隔
  // ?=与?!为正则先行断言，目标字符串右侧部分是否匹配(匹配字符串只是隐式匹配，而不是显式匹配)
  // 匹配字符串是不会出现在目标字符串上的，/a(?=b)c/.test('abc') => false
  // (\d{3})+$为了匹配111111、111等情况，而(?!\b)排除个数刚好被3整除的头部
  // 由于(?=)前面没有字符串，replace相当于往符合匹配字符串的前面插入','
  // 相当于/(?!\b)(?=(\d{3})+$)/g
  return +num ? String(num).replace(/^\d+/, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) : num
}

// 首字母大写
export function uppercaseFirst(str) {
  return str[0].toLocaleUpperCase() + str.substr(1)
}
