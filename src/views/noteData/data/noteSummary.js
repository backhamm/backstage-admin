export const searchParams = {userName: '', gameType: ''}
export const searchList = [
  {key: 'userName', type: 'input', placeholder: '用户名'},
  {key: 'gameType', type: 'select', title: '游戏类型', options: [], width: 110},
  // {key: 'startTime', type: 'time', title: '开始时间', timeText: '至'},
  // {key: 'endTime', type: 'time', title: '结束时间'},
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
    {key: 'platformType', prop: 'platformType', label: '游戏类型', slot: 'platformType'},
    {key: 'noteNum', prop: 'noteNum', label: '注单数'},
    {key: 'betAmount', prop: 'betAmount', label: '投注额'},
    {key: 'validBetAmount', prop: 'validBetAmount', label: '有效投注额'},
    {key: 'netAmount', prop: 'netAmount', label: '输赢额', slot: 'netAmount'}
  ]
}
