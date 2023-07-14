import request from '@/utils/request'


export function userlist(data) {
  return request({
    url: '/users/list',
    method: 'post',
    data
  })
}

export function pushCheck(data) {
  return request({
    url: '/users/userCheck',
    method: 'post',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    params:data
  })
}

export function login(data) {
  return request({
    url: '/admin/adminLogin',
    method: 'post',
    params: data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
