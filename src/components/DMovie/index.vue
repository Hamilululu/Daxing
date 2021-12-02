<template>
  <div class="move-content" style="position: relative">
    <div class="move" v-for="(item,index) in idList">
      <video
        :id="item"
        ref="videoElement"
        controls
        muted
        width="100%"
        height="100%"
      ></video>
    </div>
  </div>
</template>

<script>
import {postUserList} from '../../api/request'
import flvjs from "flv.js";

export default {
  name: 'index',
  // components:{
  //   postUserList
  // },
  data() {
    return {
      flvPlayer: null,
      idList:[
        "videoElement1",
        "videoElement2",
        "videoElement3",
        "videoElement4",
      ]
    }
  },
  beforeMount() {
    this.init()
  },
  destroyed() {
    this.flv_destroy()
  },
  methods: {
    init(){
      postUserList('/common/monitor/url').then(res => {
        for(let i = 0 ; i < 4;i++){
          this.createFlv(res.data.monitorList[i])
        }
      })
    },
    //销毁flv实例
    flv_destroy() {
      if (this.flvPlayer) {
        this.flvPlayer.pause();
        this.flvPlayer.unload();
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
        this.flvPlayer = null;
      }
    },
//创建flv视频实例
    createFlv(val) {
      let url = val.monitorUrl;
      let name = 'videoElement' + val.monitorId
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById(name);
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false,
          url
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.move-content {
  width: 485px;
  height: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  //background: gainsboro;
  position: absolute;
  top: 40px;
  left: 0px;

}

.move {
  width: 238px;
  height: 165px;
  //background: red;
  border: 1px solid #2a2d2e;
}
</style>
