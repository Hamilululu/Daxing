<template>
  <div class="head-content">{{ title }}</div>
</template>

<script>
export default {
  name: "index",
  props:['title']
}
</script>

<style scoped>
.head-content {
  width: 98.9%;
  padding: 10px;
  font-family: PingFangSC-Semibold;
  font-size: 30px;
  font-weight: 300;
  height: 50px;
  line-height: 55px;
  color: #c3def7;
  text-align: center;
  background: url("../../assets/img/top-bg.png") no-repeat;
  background-size: 100% 100%;

  min-width: 1500px;
}
</style>
