export const searchParams = {username: '', fatherId: ''}
export const searchList = [
  {key: 'username', type: 'input', placeholder: '子账户名'},
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
    {key: 'name', prop: 'name', label: '子账户名', minWidth: 100, fixed: true},
    {key: 'nickName', prop: 'nickName', label: '别名'},
    {key: 'status', prop: 'status', label: '是否启用', slot: 'status'},
    {key: 'createTime', prop: 'createTime', label: '创建时间', minWidth: 130},
    {key: 'rmk', prop: 'rmk', label: '备注', minWidth: 150},
    {key: 'operate', prop: 'operate', label: '操作', slot: 'operate', minWidth: 150}
  ]
}
export const modelData = {
  type: 'single',
  title: '',
  params: [],
  list: []
}
export const addParams = {name: '', nickName: '', passWord: '', rmk: ''}
export const addList = [{key: 'name', must: true}, {key: 'nickName', must: true}, {key: 'passWord', must: true}, {key: 'rmk'}]
export const editParams = {nickName: '', passWord: '', rmk: '', userId: ''}
export const editList = [{key: 'name', must: true, disabled: true}, {key: 'nickName', must: true}, {key: 'passWord', placeholder: '6~16位，不修改请留空', reg: /^$|.{6,16}$/}, {key: 'rmk'}]
export const authParams = {menuIdList: [], userId: ''}
export const authList = [{key: 'menuIdList', type: 'tree', treeArr: []}]
