import {post} from './index'

/**
 * 下线管理
 * @param data
 * @returns {*}
 */

// 获取当前上线用户信息
export const getUserInfo = (data) => post('/admin/subordinate/getUserInfo', data)

// 获取下线用户列表
export const getSubUserList = (data) => post('/admin/subordinate/userListPage', data)

// 修改状态
export const changeUserStatus = (data) => post('/admin/subordinate/editUserStatus', data, true)

// 添加下线
export const getAddSubUser = (data) => post('/admin/subordinate/addUser', data, true)

// 编辑下线
export const editSubUser = (data) => post('/admin/subordinate/editUser', data, true)

// 校验用户名
export const validUsername = (data) => post('/admin/subordinate/validUsername', data)

// 加减点
export const transferCount = (data) => post('/admin/subordinate/transfer', data, true)

// 获取用户权限
export const getUserAuth = (data) => post('/admin/subordinate/getUserAuth', data)

// 修改用户权限
export const editUserAuth = (data) => post('/admin/subordinate/editUserAuth', data, true)

// 会员游戏厅余额
export const getGameBalance = (data) => post('/admin/subordinate/getGameBalance', data)

// 转出游戏厅余额
export const rollOutGameBalance = (data) => post('/admin/subordinate/rollOutGameBalance', data, true)

/**
 * 额度管理
 * @param data
 * @returns {*}
 */

// 会员额度记录
export const getMemberQuotaRecord = (data) => post('/admin/transform/memberListPage', data)

// 代理额度记录
export const getProxyQuotaRecord = (data) => post('/admin/transform/proxyListPage', data)

/**
 * 子账号管理
 */

// table列表
export const getSubAccountList = (data) => post('/admin/userSub/listPage', data)

// 添加子账号
export const addSubAccount = (data) => post('/admin/userSub/userSubAdd', data, true)

// 编辑子账号
export const editSubAccount = (data) => post('/admin/userSub/userSubEdit', data, true)

// 修改子账号状态
export const changeSubAccount = (data) => post('/admin/userSub/userSubEditStatus', data, true)

// 当前子账号用户信息
export const getSubUserInfo = (data) => post('/admin/userSub/getSubUserInfo', data)

// 获取子账号权限
export const getSubUserAuth = (data) => post('/admin/userSub/getSubUserAuth', data)

// 修改子账号权限
export const editSubUserAuth = (data) => post('/admin/userSub/editSubUserAuth', data, true)
