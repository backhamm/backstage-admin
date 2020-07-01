export const searchParams = {username: '', operator: '', cascader: [], modelName: '', functionName: '', ip: '', startTime: '', endTime: ''}
export const searchList = [
  {key: 'username', type: 'input', placeholder: '用户名'},
  {key: 'cascader', type: 'cascader', placeholder: '模块名/功能名', options: []},
  {key: 'operator', type: 'input', placeholder: '操作人'},
  {key: 'startTime', type: 'time', title: '开始时间', timeText: '至'},
  {key: 'endTime', type: 'time', title: '结束时间'},
  {key: 'ip', type: 'input', placeholder: 'IP'},
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
    {key: 'functionName', prop: 'functionName', label: '功能名'},
    {key: 'modelName', prop: 'modelName', label: '模块名'},
    {key: 'operator', prop: 'operator', label: '操作人'},
    {key: 'createTime', prop: 'createTime', label: '操作时间', minWidth: 130},
    {key: 'msg', prop: 'msg', label: '备注', minWidth: 130},
    {key: 'addr', prop: 'addr', label: '地址'},
    {key: 'ip', prop: 'ip', label: 'IP', minWidth: 130}
  ]
}
