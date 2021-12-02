<!-- 页面模块组件 -->
<template>
  <div class="module-container">
    <p v-if="title" class="m-title"  @click="handleFullScreen">{{title}}</p>
    <template v-else>
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      fullscreen: false
    }
  },

  components: {},

  computed: {},

  mounted () { },

  methods: {
    handleFullScreen(){
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  }
}

</script>
<style scoped lang="scss" >
.module-container {
  .m-title {
    cursor: pointer;
    margin: 0;
    padding: 20px;
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    font-weight: 300;
    height: 40px;
    line-height: 50px;
    color: #c3def7;
    text-align: center;
    background: url("../../assets/img/top-bg.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
