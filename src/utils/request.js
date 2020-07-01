import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/api' // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 6000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // do something before request is sent
  if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  // do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(response => {
  const res = response.data
  store.state.common.isRequest && store.dispatch('common/setState', ['isRequest', false])
  if (res.status !== 10000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 4 * 1000
    })
    if (res.status === 24000) {
      removeToken()
      window.location.reload()
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, error => {
  store.state.common.isRequest && store.dispatch('common/setState', ['isRequest', false])
  console.log('err' + error) // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 4 * 1000
  })
  return Promise.reject(error)
})

export default service
