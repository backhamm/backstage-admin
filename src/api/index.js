import axios from '@/utils/request'
import {Message} from 'element-ui'

export const post = (url, data = {}, showMsg = false) => axios.post(url, data, showMsg).then(res => {
  showMsg && res.status === 10000 && Message({
    message: res.message,
    type: 'success',
    duration: 3 * 1000
  })
  return res
})
