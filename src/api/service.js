
import axios from 'axios'
import {Message, Loading} from 'element-ui'
const ConfigBaseURL = 'http://211.71.235.253:80/dx_api_path/' //默认路径，这里也可以使用env来判断环境
// axios.defaults.baseURL = '/api'
let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 10000, // 请求超时时间
  baseURL: ConfigBaseURL,
  withCredentials: true
})


// 添加请求拦截器
Service.interceptors.request.use(config => {
  // loadingInstance = Loading.service({
  //   lock: true,
  //   text: '拼命加载中...',
  //   background:'rgba(0, 0, 0, 0.5)'
  // })
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  // loadingInstance.close()
  return response.data
}, error => {
  let status
  if (error.response && error.response.status){
    status=error.response.status
  }

  if (status == 401) {
    Message({
      message: '用户名或密码错误(或授权过期),请重新登陆',
      type: 'error',
      duration: 3 * 1000
    })
    // loadingInstance.close()
    return Promise.reject(error)
  }
  if (status == 500) {
    // Message({
    //   message: '用户名或密码错误(或授权过期),请重新登陆',
    //   type: 'error',
    //   duration: 3 * 1000
    // })
    // loadingInstance.close()
    // return Promise.reject(error)
    return
  }
  Message({
    message:error.response&& error.response.data.message ? error.response.data.message : '网络错误~',
    type: 'error',
    duration: 3 * 1000
  })
  // loadingInstance.close()
  return Promise.reject(error)
})

// import axios from 'axios'
// import Adapter from 'axios-mock-adapter'
// import { get } from 'lodash'
// import util from '@/libs/util'
// import { errorLog, errorCreate } from './tools'
//
// /**
//  * @description 创建请求实例
//  */
// function createService () {
//   // 创建一个 axios 实例
//   const service = axios.create()
//   // 请求拦截
//   service.interceptors.request.use(
//     config => config,
//     error => {
//       // 发送失败
//       console.log(error)
//       return Promise.reject(error)
//     }
//   )
//   // 响应拦截
//   service.interceptors.response.use(
//     response => {
//       // dataAxios 是 axios 返回数据中的 data
//       const dataAxios = response.data
//       console.log(dataAxios);
//       // 这个状态码是和后端约定的
//       const { code } = dataAxios
//       // 根据 code 进行判断
//       if (code === undefined) {
//         // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
//         return dataAxios
//       } else {
//         // 有 code 代表这是一个后端接口 可以进行进一步的判断
//         switch (code) {
//           case 0:
//             // [ 示例 ] code === 0 代表没有错误
//             return dataAxios.data
//           case 'xxx':
//             // [ 示例 ] 其它和后台约定的 code
//             errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
//             break
//           default:
//             // 不是正确的 code
//             errorCreate(`${dataAxios.msg}: ${response.config.url}`)
//             break
//         }
//       }
//     },
//     error => {
//       const status = get(error, 'response.status')
//       switch (status) {
//         case 400: error.message = '请求错误'; break
//         case 401: error.message = '未授权，请登录'; break
//         case 403: error.message = '拒绝访问'; break
//         case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
//         case 408: error.message = '请求超时'; break
//         case 500: error.message = '服务器内部错误'; break
//         case 501: error.message = '服务未实现'; break
//         case 502: error.message = '网关错误'; break
//         case 503: error.message = '服务不可用'; break
//         case 504: error.message = '网关超时'; break
//         case 505: error.message = 'HTTP版本不受支持'; break
//         default: break
//       }
//       errorLog(error)
//       return Promise.reject(error)
//     }
//   )
//   return service
// }
//
// /**
//  * @description 创建请求方法
//  * @param {Object} service axios 实例
//  */
// function createRequestFunction (service) {
//   return function (config) {
//     const token = util.cookies.get('token')
//     const configDefault = {
//       headers: {
//         Authorization: token,
//         'Content-Type': get(config, 'headers.Content-Type', 'application/json')
//       },
//       timeout: 5000,
//       baseURL: process.env.VUE_APP_API,
//       data: {}
//     }
//     return service(Object.assign(configDefault, config))
//   }
// }
//
// // 用于真实网络请求的实例和请求方法
// export const service = createService()
// export const request = createRequestFunction(service)
//
// // 用于模拟网络请求的实例和请求方法
// export const serviceForMock = createService()
// export const requestForMock = createRequestFunction(serviceForMock)
//
// // 网络请求数据模拟工具
// export const mock = new Adapter(serviceForMock)
