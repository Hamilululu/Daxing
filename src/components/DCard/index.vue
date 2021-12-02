<!-- 模块的卡片 -->
<template>
  <div class="card-container boxshadow">
    <p v-if="title" class="card-title">{{title}}</p>
    <div v-if="$slots.top" class="card-top">
      <slot name="top"></slot>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () { },

  methods: {}
}

</script>
<style scoped>
.card-container {
  box-sizing: border-box;
  /*background: #ffffff;*/
  /*background: url("../../assets/img/bx-border.png") no-repeat;*/
  /*background-size:100% 100%;*/
  border-radius: 10px;
  /*margin-top: 5px;*/
  flex: auto;
}
.boxshadow {
  box-shadow: 0 2px 14px 0 rgba(39,55,153,0.10);
  border-radius: 10px;
  box-sizing: border-box;
}
.card-title {
  color: #c3def7;
  font-size: 14px;
  font-weight: 800;
  padding: 15px 20px 0px;
  margin: 0;
}
.card-top{
  padding: 3px;
  border-bottom: 1px solid #EEEEEE;
}
.card-content{
  padding:8px 20px 15px;
  /*background:red;*/
}
</style>
