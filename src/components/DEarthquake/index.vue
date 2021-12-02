<template>
    <div style="padding-top: 20px">
      <el-empty v-if="!flag">
        <el-button description="暂无数据" type="primary" @click="yc">按钮</el-button>
      </el-empty>
      <div v-else>
        <d-win/>
      </div>
    </div>
</template>

<script>
import DWin from './../DEwin'
export default {
  name: 'index',
  components:{
    DWin
  },
  data(){
    return {
      flag: true
    }
  },
  methods:{
    yc(){
      this.flag = !this.flag
    }
  }
}
</script>

<style scoped>

</style>
