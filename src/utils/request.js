import axios from 'axios'
// import store from '@/store'
import { ElMessage } from 'element-plus'

const serivce = axios.create({
  // request URL = baseURL + url
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

serivce.interceptors.request.use(config => {
  // 根据是否含有token数据自定义头部字段
  // if(store.getters.token) {
  //   config.headers['X-Token'] = getToken()
  // }
  return config
}, error => {
  return Promise.reject(error)
})

serivce.interceptors.response.use(response => {
  const res = response.data
  if(res.code !== 20000) {
    ElMessage({
      type: 'error',
      message: res.message || '未知错误'
    })
    return Promise.reject(res)
  } else {
    return res
  }
}, error => {
  console.log('response error: ' + error)
  ElMessage({
    type: 'error',
    message: error.message || '未知错误'
  })
  return Promise.reject(error)
})

export default serivce
