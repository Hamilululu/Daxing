import {Service} from '../../src/api/service'
import Cookies from 'js-cookie'
import * as axios from "core-js";

// 更改数据 用户
export function postChangeUser(url, data) {
  return Service({
    url: url,
    // url: '/api' + url,
    data: data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'x-ss-token': Cookies.get('token'),
    }
  })
}

// 删除 用户，角色 数据
export function postDelUser(url, data) {
  return Service({
    url: url,
    // url: '/api' + url,
    data: data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'x-ss-token': Cookies.get('token'),
    }
  })
}

// 获取 用户，角色 数据列表
export function postUserList(url, data) {
  return Service({
    url: url,
    // url: '/api' + url,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'x-ss-token': Cookies.get('token'),
    }
  })
}

// 新增 用户，角色
export function addUser(url, data) {
  return Service({
    url: url,
    // url: '/api' + url,
    data: data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'x-ss-token': Cookies.get('token'),
    }
  })
}

export function getPointData() {
  return Service({
    method: "",
    url: "",
    data: {}
  })
}


// 登录
export function postRequestLogin(url, data) {
  return Service({
    method: 'post',
    url: url,
    // url: '/api' + url,
    data: {
      username: data.username,
      password: data.password
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'));
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

  }).catch(res => {
    let status = res.response.status
    if (status == 401) {
      this.$router.push({path: '/login'})
    }
    return Promise.reject(error)
  })
}



