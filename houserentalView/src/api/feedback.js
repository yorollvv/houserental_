import request from '@/utils/request'

export function list(data) {
  return request({url: 'feedBack/list',method: 'post',params:data})
}

export function pushCheck(data) {
  return request({
    url: 'feedBack/repFeedBack',
    method: 'post',
    params:data
  })
}
