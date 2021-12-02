<template>
  <div class="dr-content">
    <div class="dr-text-content" v-for="item in list">
<!--      <div class="label-dr">时间：<span class="text-dr">{{ item.instant.epochSecond }}</span></div>-->
      <div class="label-dr">时间：<span class="text-dr">{{ item.eventTime}}</span></div>
<!--      <div class="label-dr">类型：<span class="text-dr">{{ item.level === 'ACTION_LEVEL' ? '操作日志' : '系统日志' }}</span></div>-->
      <div class="label-dr">日志名称：<span class="text-dr">{{ item.message }}</span></div>
<!--      <div class="label-dr">所属控制器：<span class="text-dr">{{ item.loggerName }}</span></div>-->
<!--      <div class="label-dr">所属服务：<span class="text-dr">{{ item.serviceName }}</span></div>-->
    </div>
    <!--      <BLine title="已经到底了"/>-->
  </div>
</template>

<script>
import BLine from "@/components/BLine"
import {postUserList} from "@/api/request";

export default {
  props:['listLog'],
  watch:{
    listLog:{
      handler(newData, oldData){
        this.list = newData
        this.changeData()
      },
      immediate: true
    }
  },
  components: {
    BLine
  },
  data() {
    return {
      list: []
    }
  },
  beforeMount() {
    // this.changeData()
  },
  methods: {
    changeData(){
      let data = this.list
      for(let i = 0; i< data.length;i++){
        // console.log(this.formatDate(data[i].instant.epochSecond));
        data[i].instant.epochSecond =  this.formatDate(data[i].instant.epochSecond)
      }
    },
    formatDate(value) {
      return new Date(parseInt(value) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    }
  }
}
</script>

<style scoped lang="scss">
.dr-content {
  height: 130px;
  padding-bottom: 10px;
  overflow: scroll;
  width: 570px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.dr-content::-webkit-scrollbar {
  display: none;
}

.dr-text-content {
  display: flex;
  flex-direction: row;
  color: white;
  font-size: 12px;
  justify-content: flex-start;
  //min-width: 1200px;

  .label-dr {
    color: #C0C4CC;
    padding: 1px 0;
    margin-right: 5px;

    .text-dr {
      font-size: 12px;
      color: #909399;
    }
  }
}
</style>
