import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      }, {
        path: 'passwd',
        name: 'passwd',
        meta: {
          auth: true
        },
        component: _import('system/passwd')
      },
      // 演示页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '哈拉少',
          auth: true
        },
        component: _import('demo/page1')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '页面 2',
          auth: true
        },
        component: _import('demo/page2')
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '页面 3',
          auth: true
        },
        component: _import('demo/page3')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '系统日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  },
  {
    path: '/dataSetting',
    name: 'dataSetting',
    component: _import('system/dataSetting')
  },
  {
    path: '/modalData',
    name: 'modalData',
    component: _import('system/modalData')
  },
  {
    path: '/detectionDetail',
    name: 'detectionDetail',
    component: _import('system/detectionDetail')
  },
  {
    path: '/user',
    name: 'user',
    component: _import('system/user')
  },
  {
    path: '/tabMain',
    name: 'tabMain',
    component: _import('system/tabMain')
  },{
    path: '/bxtDisplacementData',
    name: 'bxtDisplacementData',
    component: _import('system/bxtDisplacementData')
  },{
    path: '/bxtSeismometer',
    name: 'bxtSeismometer',
    component: _import('system/bxtSeismometer')
  },{
    path: '/hisList',
    name: 'hisList',
    component: _import('system/hisList')
  }
  ,{
    path: '/setZero',
    name: 'setZero',
    component: _import('system/setZero')
  }
  ,{
    path: '/modelWaveDetail',
    name: 'modelWaveDetail',
    component: _import('system/modelWaveDetail')
  }
  ,{
    path: '/previewDetail',
    name: 'previewDetail',
    component: _import('system/previewDetail')
  }
  ,{
    path: '/hisData',
    name: 'hisData',
    component: _import('system/hisData')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
