import request from '@/utils/request.js'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: data
  })
}
