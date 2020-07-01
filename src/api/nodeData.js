import {post} from './index'

/**
 * 注单汇总
 * @param data
 * @returns {*}
 */

// 历史注单汇总
export const getUserNode = (data) => post('/admin/gameReport/memberHistoryReport', data)

// 大唐棋牌
export const getDtChess = (data) => post('/admin/gameReport/listPage', data)
