export const userOptions = [{id: 'username', name: '用户名'}, {id: 'proxyName', name: '上级代理'}]
export const searchParams = {nameType: 'username', name: '', gameType: 'IG', timeType: 0, igType: '', startTime: '', endTime: ''}
export const searchList = [
  {key: 'nameType', type: 'select', title: '用户类型', options: userOptions},
  {key: 'name', type: 'input', placeholder: ''},
  {key: 'igType', type: 'select', title: '彩票类型', options: [{id: '', name: '全部'}, {id: 1, name: '时时彩'}, {id: 2, name: '香港彩'}, {id: 3, name: '官方彩'}]},
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
    {key: 'username', prop: 'username', label: '用户名', minWidth: 100, fixed: true},
    {key: 'nickName', prop: 'nickName', label: '别名'},
    {key: 'stakeAmount', prop: 'stakeAmount', label: '投注额'},
    {key: 'validStake', prop: 'validStake', label: '有效投注额'},
    {key: 'winLoss', prop: 'winLoss', label: '输赢金额', slot: 'winLoss'},
    {key: 'odds', prop: 'odds', label: '会员下注', slot: 'odds', minWidth: 150},
    {key: 'gameName', prop: 'gameName', label: '游戏类型', slot: 'gameName'},
    {key: 'betTime', prop: 'betTime', label: '投注时间', minWidth: 130},
    {key: 'resultTime', prop: 'resultTime', label: '结算时间', minWidth: 130},
    {key: 'betId', prop: 'betId', label: '注单号', minWidth: 150}
  ]
}
