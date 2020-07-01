export const userOptions = [{id: 'username', name: '用户名'}, {id: 'proxyName', name: '上级代理'}]
export const searchParams = {nameType: 'username', name: '', gameType: 'TXH', timeType: 0, startTime: '', endTime: ''}
export const searchList = [
  {key: 'nameType', type: 'select', title: '用户类型', options: userOptions},
  {key: 'name', type: 'input', placeholder: ''},
  {key: 'startTime', type: 'time', title: '开始时间', timeText: '至'},
  {key: 'endTime', type: 'time', title: '结束时间'},
  {key: 'search', type: 'search'}
]
export const pageData = {
  pageSizes: [25, 50, 100],
  total: 0,
  limit: 25,
  page: 1
}

export const columns = {
  type: 'index',
  list: [
    {key: 'userName', prop: 'userName', label: '用户名', minWidth: 100, fixed: true},
    {key: 'nickName', prop: 'nickName', label: '别名'},
    {key: 'money', prop: 'money', label: '投注额'},
    {key: 'userWashProfit', prop: 'userWashProfit', label: '有效投注额'},
    {key: 'userProfit', prop: 'userProfit', label: '输赢金额', slot: 'userProfit'},
    {key: 'gameName', prop: 'gameName', label: '游戏类型', minWidth: 120},
    {key: 'orderTypeValue', prop: 'orderTypeValue', label: '会员下注'},
    {key: 'payResult', prop: 'payResult', label: '游戏结果'},
    {key: 'gameNum', prop: 'gameNum', label: '局号'},
    {key: 'diskNum', prop: 'diskNum', label: '桌号'},
    {key: 'startTime', prop: 'startTime', label: '投注时间', minWidth: 130},
    {key: 'betId', prop: 'betId', label: '注单号'}
  ]
}
