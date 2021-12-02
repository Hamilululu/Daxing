<template>
  <div>
    <button @click="requstWs">点击发起websocket请求</button>
  </div>
</template>
<script>
import { sendWebsocket, closeWebsocket } from '@/libs/util.websocket'

export default {
  beforeDestroy () {
    // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
    // 在需要主动关闭ws的地方都可以调用该方法
    closeWebsocket()
  },
  methods: {
    // ws连接成功，后台返回的ws数据，组件要拿数据渲染页面等操作
    wsMessage (data) {
      const dataJson = data
      console.log(dataJson)
    },
    // ws连接失败，组件要执行的代码
    wsError () {
      // 比如取消页面的loading
    },
    requstWs () {
      // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
      closeWebsocket()
      // 跟后端协商，需要什么参数数据给后台
      const obj = {
        monitorUrl: 'xxxxxxxxxxxxx',
        userName: 'xxxxxxxxxx'
      }
      // 发起ws请求
      sendWebsocket('ws://47.93.113.219:8080/waveData/DisplacementData/1', obj, this.wsMessage, this.wsError)
    }
  }
}
</script>

