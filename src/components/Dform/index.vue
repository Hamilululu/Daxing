<template>
  <div>
    <el-form ref="form" :model="form" label-width="70px" inline>
      <el-form-item label="轴线" label-width="45px">
        <el-select :popper-append-to-body="false" style="width: 85px;margin-right: 10px;" size="mini"
                   v-model="form.axis" placeholder="请选择">
          <el-option label="全部" value="ALL"></el-option>
          <el-option label="X" value="X"></el-option>
          <el-option label="Y" value="Y"></el-option>
          <el-option label="Z" value="Z"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="" label="时间" label-width="45px">
        <el-select :popper-append-to-body="false" style="width: 85px;margin-right: 10px;" size="mini"
                   v-model="form.time" placeholder="请选择">
          <el-option label="24" value="24"></el-option>
          <el-option label="30" value="30"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="submit(sign)">确定</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    props: ['sign'],
    name: "index",
    data(){
      return{
        form:{
          axis:'X',
          time:'30'
        }
      }
    },
    methods:{
      submit(sign){
          if(sign==='1'){
            alert('位移')
          }else {
            alert('地震计')
          }
      }
    }
  }
</script>

<style scoped>

</style>
