export const userOptions = [{id: 'username', name: '用户名'}, {id: 'proxyName', name: '上级代理'}]
export const searchParams = {nameType: 'username', name: '', gameType: 'DTQP', timeType: 0, startTime: '', endTime: ''}
export const searchList = [
  {key: 'nameType', type: 'select', title: '用户类型', options: userOptions},
  {key: 'name', type: 'input', placeholder: ''},
  {key: 'timeType', type: 'select', title: '时间类型', options: [{id: 0, name: '注单时间'}, {id: 1, name: '开奖时间'}]},
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
    {key: 'account', prop: 'account', label: '用户名', minWidth: 100, fixed: true},
    {key: 'nickName', prop: 'nickName', label: '别名'},
    {key: 'allBet', prop: 'allBet', label: '投注额'},
    {key: 'validBetAmount', prop: 'validBetAmount', label: '有效投注额'},
    {key: 'profit', prop: 'profit', label: '输赢金额', slot: 'profit'},
    {key: 'revenue', prop: 'revenue', label: '抽水'},
    {key: 'cardValue', prop: 'cardValue', label: '游戏结果', slot: 'cardValue'},
    {key: 'gameName', prop: 'gameName', label: '游戏名'},
    {key: 'gameInfoid', prop: 'gameInfoid', label: '局号'},
    {key: 'gameStartTime', prop: 'gameStartTime', label: '投注时间', minWidth: 130},
    {key: 'gameEndTime', prop: 'gameEndTime', label: '开奖时间', minWidth: 130}
  ]
}
