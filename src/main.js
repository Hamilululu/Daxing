// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'

// 核心插件
import bitStackAdmin from '@/plugin/bitStackAdmin'
// store
import store from '@/store/index'
import Axios from "axios"

// 引入
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)
Viewer.setDefaults({
  zIndexInline: 9999
})

// import 'swiper/dist/css/swiper.css';
Vue.prototype.$axios = Axios

Axios.defaults.baseURL = ''
// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'
// Echarts
// import echarts from 'echarts'

// import '@/assets/svg-icons'
// import svg from '@/components/svgIcon/index'// svg组件
// Vue.component('svg-icon', svg)
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video

import * as echarts from 'echarts'
import md5 from 'js-md5';

Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts
// 核心插件
Vue.use(bitStackAdmin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
