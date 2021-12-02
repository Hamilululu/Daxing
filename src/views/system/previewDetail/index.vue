<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-back style="z-index: 999">
      <el-form style="margin-top: 15px;" ref="form" :model="form" inline>
        <el-form-item label="台站">
          <el-select v-model="form.point" placeholder="请选择台站">
            <el-option v-for="item in 35" :label="`DX${item>10?item:'0'+item}`"
                       :value="`DX${item>10?item:'0'+item}`"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="通道">
          <el-select v-model="form.channel" placeholder="请选择通道">
            <el-option label="X" value="X"></el-option>
            <el-option label="Y" value="Y"></el-option>
            <el-option label="Z" value="Z"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="preData">预览数据</el-button>
        </el-form-item>

      </el-form>
    </d-back>

    <div class="title" style="color: #bcd6ff;font-size: 22px;padding: 20px;">当前选择的台站为：{{currentPoint}},通道为：{{currentChannel}}
    </div>
    <div class="main-box1">
      <div style="color: white;" class="content-box1" v-for="item in imgList">
        <viewer>
          <img style="cursor: pointer" :src="item" alt="" width="100%" height="100%">
        </viewer>
      </div>

    </div>
  </tabMains>
</template>

<script>
  import tabMains from '../../../components/DTabs'
  import DBack from '../../../components/DBack'
  import DTab from '../../../components/DTabs/info'
  import DPane from '../../../components/DTabs/pane'
  import { postUserList } from '../../../api/request'
  import DChart from '@/components/DCharts'
  import Cookies from 'js-cookie'

  export default {
    name: 'index',
    components: {
      tabMains,
      DTab,
      DPane,
      DChart,
      DBack
    },
    data () {
      return {
        currentPoint: 'DX01',
        currentChannel: 'X',
        imgList: '',
        form: {
          point: 'DX01',
          channel: 'X'
        },
      }
    },
    beforeMount () {
    },
    beforeDestroy () {
    },
    mounted () {
      this.preData()
    },
    methods: {
      preData () {
        let data = {
          'taskId': this.$route.query.taskId, //任务ID编号
          'siteMark': this.form.point, //台站名，DX01到DX35
          'channel': this.form.channel.toLowerCase() //通道名，只有x,y,z三种
        }
        postUserList('/data/export/history/view', data).then(res => {
          if (res.code === '200') {
            this.imgList = res.data.picList
            this.currentPoint = this.form.point
            this.currentChannel = this.form.channel
          }

        })
      },
      // 时间戳转换
      formatDate (value) {
        return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/, ' ')
      },
    }
  }
</script>

<style scoped>
  /*标题*/
  .user-btn {
    padding-left: 20px;
  }

  /*搜索*/
  .user-search {
    display: flex;
    flex-direction: row;
    padding-left: 200px;
  }

  .user-search >>> .el-input__inner {
    border-radius: 15px;
    width: 400px;
  }

  /*按钮样式*/
  .user-btn >>> .el-button {
    background: transparent;
    color: white;
  }

  .user-btn >>> .title-btn-left {
    margin: 0;
    border-radius: 0;
  }

  /*表格外部样式*/
  .user-mid-tab {
    flex: 1;
    width: 100%;
    overflow: scroll;
    background: url("../../../assets/img/search-right.png") no-repeat;
    background-size: 100% 100%;
    padding: 10px;
  }

  .user-mid-tab::-webkit-scrollbar {
    display: none;
  }

  .user-mid-tab-box {
    width: 100%;
    /*background: red;*/
    height: 530px;
    overflow: scroll;
  }

  .user-mid-tab-box2 {
    width: 100%;
    /*background: red;*/
    height: 605px;
    overflow: scroll;
    min-width: 900px;
  }

  .user-mid-tab-box::-webkit-scrollbar {
    display: none;
  }

  /*底部按钮*/
  .title-btn {
    background: url('../../../assets/img/title-bg.png') no-repeat;
    background-size: 100% 100%;
    height: 35px;
    width: 100px;
    line-height: 35px;
    text-align: center;
    color: #e1f3ff;
    /*position: absolute;*/
    font-size: 12px;
    cursor: pointer;
    margin: 20px 10px;
  }

  .el-table >>> .el-table__header {
    background-color: #0e2047 !important;
  }

  .el-table >>> .warning-row {
    background: #1a3f5e !important;
  }

  .el-table >>> .success-row {
    background: #0e2047 !important;
  }

  .el-table >>> .cell {
    color: #62acc2;
  }

  .search-box-right-content1 {
    width: 100%;
  }

  .search-box-right-content {
    /*background: green;*/
    width: 99%;
    height: 650px;
    overflow: scroll;
  }

  .search-box-right-content::-webkit-scrollbar {
    display: none;
  }

  .search-box-right-head-title {
    cursor: pointer;
  }

  .search-box-right-head {
    width: 100%;
    background: #0d2246;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0;
  }

  .search-box-right-head >>> .el-button {
    border: none;
  }

  /*搜索结果页面*/
  .search-box {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    align-items: center
  }

  .search-box-left-title {
    width: 100%;
    height: 50px;
    background: #0d2246;
    line-height: 50px;
    color: #c4f7ff;
    text-align: center;
    font-weight: 600;
  }

  .search-box-left {
    width: 20%;
    height: 90%;
    /*background: url("../../../assets/img/search-left.png") no-repeat;*/
    background-size: 100% 100%;
    margin-right: 15px;
    overflow: scroll;
    position: relative;
    background: #e4e4e429;
    min-width: 300px;
  }

  .search-box-left::-webkit-scrollbar {
    display: none;
  }

  .tree-box {
    /*background: red;*/
    position: absolute;
    top: 55px;
    left: 30px;
  }

  .search-box-left >>> .el-tree {
    background: transparent;
    color: #7396c3;
  }

  .search-box-left >>> .el-tree:hover {
    background: transparent;
  }

  .search-box-left >>> .el-tree-node:focus > .el-tree-node__content {
    background: transparent;
  }

  .search-box-right {
    /*background: green;*/
    min-width: 900px;
    /*min-height: 700px;*/
    flex: 1;
    height: 90%;
    background: url("../../../assets/img/search-right.png") no-repeat;
    background-size: 100% 100%;
  }

  /*搜索页面*/
  .block >>> .el-range-editor.el-input__inner {
    width: 180%;
    border: none;
    padding: 0;
  }

  .block >>> .el-range-separator {
    color: white;
  }

  .block >>> .el-range-input {
    background: transparent;
    border: 1px solid #EEEEEE;
    border-radius: 15px;
    color: white;
  }

  .btn-search >>> .el-button {
    background: transparent;
    color: white;
  }

  /*主体*/
  .main-border {
    width: 85vw;
    height: 70vh;
    margin: 0 auto;
    /*background: red;*/
    min-height: 800px;
    min-width: 900px;
  }

  .main-border-bg {
    /*background: url('../../../assets/img/search-right.png') no-repeat;*/
    /*background-size: 100% 100%;*/
    height: 100%;
    /*background: red;*/
    min-height: 800px;
    min-width: 900px;
  }

  .title-bg {
    background: url('../../../assets/img/btn-bg.png') no-repeat;
    background-size: 100% 100%;
    height: 50px;
    width: 300px;
    line-height: 45px;
    text-align: center;
    color: #e1f3ff;
  }

  .head-title {
    color: #e1f3ff;
    margin-bottom: 10px;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row > td, .el-table__body tr.hover-row.current-row > td, .el-table__body tr.hover-row.el-table__row--striped.current-row > td, .el-table__body tr.hover-row.el-table__row--striped > td, .el-table__body tr.hover-row > td {
    background-color: #60c4ff;
    color: white;
  }

  .title-btn {
    background: url('../../../assets/img/title-bg.png') no-repeat;
    background-size: 100%;
    height: 40px;
    width: 80px;
    line-height: 28px;
    text-align: center;
    color: #e1f3ff;
    position: absolute;
    font-size: 12px;
    cursor: pointer;
  }

  .noActive {
    border: 1px solid #2a2d2e;
  }

  .active {
    border: 1px solid white;
    background: #306ac1 !important;
  }
</style>
<style>
  .el-tree-node__label {
    width: auto;
    /*margin-top: 12px;*/
    float: right;
    font-family: “Trebuchet MS”, Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: #999999;
    line-height: 25px;
    letter-spacing: 1px;
  }

  .el-input__inner {
    background-color: transparent;
  }

  .content-box1 {
    margin: 30px 5px;
    position: relative;
    /*box-sizing: border-box;*/
    /*border: 1px solid #bcd6ff;*/
    width: 480px;
    height: 350px;
    /*height: 40%;*/
    /*background: green;*/
    /*overflow: scroll;*/
  }

  .main-box1 {
    width: 100%;
    height: 800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
</style>
