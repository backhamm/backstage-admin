export const searchParams = {username: '', type: '', gameType: '', billno: '', ip: '', startTime: '', endTime: ''}
export const searchList = [
  {key: 'username', type: 'input', placeholder: ''},
  {key: 'type', type: 'select', title: '转账类型', options: []},
  {key: 'gameType', type: 'select', title: '游戏类型', options: []},
  {key: 'billno', type: 'input', placeholder: '订单号'},
  {key: 'ip', type: 'input', placeholder: 'IP'},
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
export const proxyColumns = {
  type: 'index',
  list: [
    {key: 'username', prop: 'username', label: '用户名', minWidth: 100, fixed: true},
    {key: 'type', prop: 'type', label: '操作类型', slot: 'type'},
    {key: 'oldBalance', prop: 'oldBalance', label: '原金额'},
    {key: 'money', prop: 'money', label: '操作金额', slot: 'money'},
    {key: 'balance', prop: 'balance', label: '现余额'},
    {key: 'createTime', prop: 'createTime', label: '操作时间', minWidth: 130},
    {key: 'msg', prop: 'msg', label: '备注', minWidth: 130},
    {key: 'billno', prop: 'billno', label: '订单号', minWidth: 150},
    {key: 'addr', prop: 'addr', label: '地址'},
    {key: 'ip', prop: 'ip', label: 'IP', minWidth: 130}
  ]
}

export const columns = {
  type: 'index',
  list: [
    {key: 'memberName', prop: 'memberName', label: '用户名', minWidth: 100, fixed: true},
    {key: 'type', prop: 'type', label: '操作类型', slot: 'type'},
    {key: 'oldBalance', prop: 'oldBalance', label: '原金额'},
    {key: 'money', prop: 'money', label: '操作金额', slot: 'money'},
    {key: 'balance', prop: 'balance', label: '现余额'},
    {key: 'gameType', prop: 'gameType', label: '游戏类型', slot: 'gameType'},
    {key: 'createTime', prop: 'createTime', label: '操作时间', minWidth: 130},
    {key: 'msg', prop: 'msg', label: '备注', minWidth: 130},
    {key: 'billno', prop: 'billno', label: '订单号', minWidth: 150},
    {key: 'addr', prop: 'addr', label: '地址'},
    {key: 'ip', prop: 'ip', label: 'IP', minWidth: 130}
  ]
}
