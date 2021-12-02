<template>
  <div>
    <div class="header">
{{title}}
    </div>
    <div class="scroll">
      <div class="item" v-for="(item,index) in data">

        <div  class="left">
          {{item.key}}
          <!--              {{item.key}}-->
        </div>
        <div class="center">
          <d-chart2 v-if="title==='加速度时程'" v-on:changeLoading="loadingType($event)" :ids="`${item.key+item.type}0`" :ref="`${item.key+item.type}`"
                    :options="item.pointData"
                    :changeIds="changeId"
                    :flagLoaing="true">
          </d-chart2>
          <d-chart2 v-if="title==='速度时程'" v-on:changeLoading="loadingType($event)" :ids="`${item.key+item.type}1`" :ref="`${item.key+item.type}`"
                   :options="item.pointData"
                   :changeIds="changeId"
                   :flagLoaing="true">
          </d-chart2>
          <d-chart2 v-if="title==='加速度反应谱'" v-on:changeLoading="loadingType($event)" :ids="`${item.key+item.type}2`" :ref="`${item.key+item.type}`"
                    :options="item.pointData"
                    :changeIds="changeId"
                    :flagLoaing="true">
          </d-chart2 >
          <d-chart2  v-if="title==='加速度傅里叶谱'"     :flag="true" v-on:changeLoading="loadingType($event)" :ids="`${item.key+item.type}4`" :ref="`${item.key+item.type}`"
                    :options="item.pointData"
                    :changeIds="changeId"
                    :flagLoaing="true">
          </d-chart2 >
          <d-chart2  v-if="title==='位移时程'" v-on:changeLoading="loadingType($event)" :ids="`${item.key+item.type}5`" :ref="`${item.key+item.type}`"
                    :options="item.pointData"
                    :changeIds="changeId"
                    :flagLoaing="true">
          </d-chart2 >

        </div>

        <div class="right" @click="ModelWaveDetail(item,index,title)">
          详情
        </div>

      </div>
    </div>
    <div class="footer">
      <div class="left">
       {{title==='加速度傅里叶谱'? '频率:(/Hz)':'时间:(/s)'}}
      </div>

      <div class="right">
        <!--            {{show30}}-->
        <div class="num" v-for="item in 5">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import DBg from '@/components/DBackground'
  import DChart from '@/components/DChart'
  import DChart2 from '@/components/DCharts2'
  import DChart3 from '@/components/DCharts3'
  import DChart4 from '@/components/DCharts4'
  import DChart5 from '@/components/DCharts5'
  import DChart6 from '@/components/DCharts6'
  import DChartTest from '@/components/DChartTest'
  import DChartH from '@/components/DChartH'


  export default {
    props: ['data','title','unit'],
    name: "index",
    data(){
      return{
        loading:'',
        changeId:1,
      }
    },
    methods:{
      loadingType(val) {
        this.loading = val
      },
      ModelWaveDetail(key,index,title){
        console.log(key);
      // if (key.type==='distPt'){
      //
      // }else if(key.type===''){
      //
      // }
        this.$router.push({
          path: 'modelWaveDetail',
          query: {
            key:key,
            title:title
          }
        })
      },
    },
    components:{
      DChart2,
      DChartH,
      DChart3,
      DChart4,
      DChart5,
      DChart6,
      DChart,
      DChartTest
    }
  }
</script>

<style scoped>
  .header{
    text-align: center;
    height: 40px;
    font-size: 22px;
    color:#bcd6ff ;
    border-bottom: 1px solid #ccc;
  }
  /*.scroll {*/
  /*  !*background-color: pink;*!*/
  /*  !*height: 85%;*!*/
  /*  height: 100%;*/
  /*  overflow: scroll;*/
  /*}*/
   .scroll {
    /*background-color: pink;*/
    height: 320px;
    overflow: scroll;
  }
   .scroll .item{
    display: flex;
    margin-top:15px;
     height: 80px;
  }
   .scroll .item .left {
    width: 8%;
    /*padding-top: 3px;*/
    /*box-shadow: 2px 2px 5px #000;*/
    color: #bcd6ff;
    text-align: center;
    height: 28px;
     font-size: 22px;
     margin-top: 34px;
    /*background-color: rgb(2, 37, 59);*/
    border-radius: 2px;
  }

   .scroll .item .center {
     margin-left: 20px;
    width: 85%;
    height: 18px;
    line-height: 18px;
  }
  .scroll .item .right {
    margin-top: 34px;
    cursor: pointer;
    color:#bcd6ff ;
    text-align: center;
    border: 1px solid #ccc;
    width: 7%;
    height: 18px;
    line-height: 18px;
    font-size: 8px;
  }

   .footer {
     z-index: 999;
    height: 30px;
    overflow-x: hidden;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #bcd6ff;
    padding: 1px;
    margin-top: 30px;
  }

   .footer .left {
    width: 15%;
    color: #bcd6ff;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    margin-right: 10px;
    font-size: 14px;
  }
.yibiaopan{

  border: 1px solid #bcd6ff;
}
.yibiaopan-item{
  box-sizing: border-box;
  padding-top: 20px;
}
   .footer .right {
     box-sizing: border-box;
     padding-right: 50px;
     width: 84%;
     display: flex;
    height: 30px;
    line-height: 30px;
     flex-wrap: wrap;
     justify-content: space-between;
  }
  .footer .right .num{
    color:#bcd6ff ;
  }
  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    display: none
  }

</style>
