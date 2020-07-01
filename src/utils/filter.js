import Vue from 'vue'

export const formatDate = (dateStr, time) => {
  if (!dateStr) {
    return ''
  }
  // 得到特定的时间
  var diffHour = new Date(dateStr).getTimezoneOffset() / 60 + 8
  var date = new Date(dateStr + diffHour * 3600000)
  // var date = new Date(dateStr);
  var year = date.getFullYear()
  // ES6语法填充：var month = (date.getMonth()+1).toString().padStart(2, '0');
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  // return `${year}-${month}-${day}`;

  if (time && time.toLowerCase() === 'yyyy-mm-dd') {
    // 用模板字符串拼接
    return `${year}-${month}-${day}`
  } else if (time && time.toLowerCase() === 'hh:mm:ss') {
    return `${hh}:${mm}:${ss}`
  } else {
    return `${year}-${month}-${day} ${hh}:${mm}:${ss}`
  }
}

Vue.filter('dateFormat', formatDate)

export const roleList = [
  ['admin', '管理员', 'ag1'],
  ['ag1', '股东', 'ag2'],
  ['ag2', '总代', 'ag3'],
  ['ag3', '代理', 'member'],
  ['member', '会员', '']
]

export const filterRole = (role, index = 1) => {
  return roleList.find(item => item[0] === role)[index]
}

Vue.filter('roleName', filterRole)
