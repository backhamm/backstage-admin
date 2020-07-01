export const searchParams = {name: ''}
export const searchList = [
  {key: 'name', type: 'input', placeholder: '代理用户名'},
  // { key: 'startTime', type: 'time', title: '开始时间', timeText: '至' },
  // { key: 'endTime', type: 'time', title: '结束时间' },
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
    {key: 'name', prop: 'name', label: '用户名', minWidth: 100, fixed: true, slot: 'name'},
    {key: 'nickName', prop: 'nickName', label: '别名', minWidth: 100},
    {key: 'role', prop: 'role', label: '角色', slot: 'role'},
    {key: 'parentNameTree', prop: 'parentNameTree', label: '代理关系'},
    {key: 'balance', prop: 'balance', label: '余额'},
    {key: 'status', prop: 'status', label: '是否启用', slot: 'status'},
    {key: 'createTime', prop: 'createTime', label: '创建时间', minWidth: 130},
    {key: 'phone', prop: 'phone', label: '联系方式'},
    {key: 'rmk', prop: 'rmk', label: '备注', minWidth: 130},
    {key: 'operate', prop: 'operate', label: '操作', slot: 'operate', minWidth: 230, hideTip: true}
  ]
}

export const userColumns = {
  list: [
    {key: 'name', prop: 'name', label: '用户名', fixed: true},
    {key: 'nickName', prop: 'nickName', label: '别名'},
    {key: 'balance', prop: 'balance', label: '余额'},
    {key: 'role', prop: 'role', label: '角色', slot: 'role'},
    {key: 'phone', prop: 'phone', label: '联系方式'}
  ]
}
export const modelData = {
  title: '',
  params: [],
  list: [

  ]
}
export const addParams = {name: '', nickName: '', passWord: '', role: '', topUserId: '', phone: '', rmk: '', occupyList: []}
export const addList = [
  [{key: 'name', must: true}, {key: 'nickName', must: true}, {key: 'passWord', must: true}, {key: 'phone'}, {key: 'rmk'}], []
]
export const editList = [
  [
    {key: 'name', must: true, disabled: true}, {key: 'nickName', must: true}, {key: 'passWord', placeholder: '6~16位，不修改请留空', reg: /^$|.{6,16}$/}, {key: 'phone'},
    {key: 'rmk'}
  ], []
]
export const transferParams = {money: '', type: 0, userId: ''}
export const transferList = [
  {title: '加减点', key: 'type', type: 'switch', active: '加点', inactive: '减点'},
  {key: 'money', prompt: ''}
]
export const authParams = {menuIdList: [], userId: ''}
export const authList = [{key: 'menuIdList', type: 'tree', treeArr: []}]
