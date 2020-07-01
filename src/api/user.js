import {post} from './index'

export const login = (data) => post('/admin/login', data, true)

export const getInfo = (data) => post('/admin/loginUserInfo', data)

export const logout = () => post('/admin/user/logout')

export const editPassword = (data) => post('/admin/editPassword', data, true)

