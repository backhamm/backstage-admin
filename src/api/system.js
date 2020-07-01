import {post} from './index'

/**
 * 系统日志
 * @param data
 * @returns {*}
 */

// 系统日志
export const getLogList = (data) => post('/admin/operatorLog/listPage', data)

// 系统日志类型
export const getLogType = (data) => post('/admin/sysDic/selectLogType', data)

/**
 * 数据字典
 */

// 数据字典
export const getDataDictionary = () => post('/admin/sysDic/selectGameType')

// 游戏类型
export const getGameType = () => post('/admin/gameReport/getHistoryReportGameType')

/**
 * 补单查询
 */

// 补单列表
export const getOrderFormList = (data) => post('/admin/transformFaild/listPage', data)

// 第三方订单
export const getOtherOrder = (data) => post('/admin/transformFaild/queryOrder', data)
