<template>
  <div v-if="show" class="main-bg-svg">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data(){
    return {
      show: false //初始时将所有内容隐藏
    }
  },
  props:{
    actKey:{
      type: String,
      default: "1"
    }, label:{
      type: String,
      default: ""
    },
  },
  mounted(){
    this.$parent.updateNav();
  },
}
</script>
<style>
.main-bg-svg {
  min-width: 1000px;
  min-height: 850px;
  margin:0px;
  background: url("../../assets/img/bg-sanwei.png") no-repeat;
  background-size: cover;
  background-attachment:fixed;
  width: 100%;
  height: 87vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
