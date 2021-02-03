import request from "@/utils/request";

export function getBlogger() {
  return request({
    url: '/blogger',
    method: 'post',
  })
}

export function getTypes() {
  return request({
    url: '/blog/type',
    method: 'post'
  })
}

export function blogList(data) {
  return request({
    url: '/blog/list',
    method: 'post',
    data
  })
};

export function getBlog(data) {
  return request({
    url: '/blog/show',
    method: 'post',
    data
  })
}

export function comment(data) {
  return request({
    url: '/blog/comment',
    method: 'post',
    data
  })
}
