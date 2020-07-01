export const searchParams = {username: '', type: '', billno: '', startTime: '', endTime: ''}
export const searchList = [
  {key: 'username', type: 'input', placeholder: '下线会员名'},
  {key: 'type', type: 'select', title: '转账类型', options: [{id: '', name: '全部'}, {id: 0, name: '转出'}, {id: 1, name: '转入'}]},
  {key: 'startTime', type: 'time', title: '开始时间', timeText: '至'},
  {key: 'endTime', type: 'time', title: '结束时间'},
  {key: 'billno', type: 'input', placeholder: '订单号'},
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
    {key: 'memberName', prop: 'memberName', label: '会员名', minWidth: 100, fixed: true},
    {key: 'type', prop: 'type', label: '操作类型', slot: 'type'},
    {key: 'money', prop: 'money', label: '操作金额'},
    {key: 'gameType', prop: 'gameType', label: '游戏类型', slot: 'gameType'},
    {key: 'createTime', prop: 'createTime', label: '操作时间', minWidth: 130},
    {key: 'msg', prop: 'msg', label: '备注', minWidth: 130},
    {key: 'billno', prop: 'billno', label: '订单号', minWidth: 150},
    {key: 'addr', prop: 'addr', label: '地址'},
    {key: 'ip', prop: 'ip', label: 'IP', minWidth: 130},
    {key: 'operate', prop: 'operate', label: '操作', slot: 'operate', minWidth: 110}
  ]
}
export const modelData = {
  type: 'single',
  title: '',
  params: [],
  list: []
}
