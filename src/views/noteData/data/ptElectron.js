export const userOptions = [{id: 'username', name: '用户名'}, {id: 'proxyName', name: '上级代理'}]
export const searchParams = {nameType: 'username', name: '', gameType: 'PT', timeType: 0, startTime: '', endTime: ''}
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
    {key: 'playername', prop: 'playername', label: '用户名', minWidth: 100, fixed: true},
    {key: 'nickName', prop: 'nickName', label: '别名'},
    {key: 'bet', prop: 'bet', label: '投注额'},
    {key: 'bet2', prop: 'bet', label: '有效投注额'},
    {key: 'netAmount', prop: 'netAmount', label: '输赢金额', slot: 'netAmount'},
    {key: 'progressivewin', prop: 'progressivewin', label: '奖金'},
    {key: 'handsel', prop: 'handsel', label: '彩金'},
    {key: 'gameNameValue', prop: 'gameNameValue', label: '游戏类型', minWidth: 100},
    {key: 'gamedate', prop: 'gamedate', label: '投注时间', minWidth: 130},
    {key: 'gamecode', prop: 'gamecode', label: '注单号', minWidth: 120, slot: 'gamecode'}
  ]
}
