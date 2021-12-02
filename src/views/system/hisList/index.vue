<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-back style="z-index: 999">
        <!--                      <el-form ref="form" :model="form" inline style="margin-left: 250px;">-->
        <!--                        <el-form-item label="台站">-->
        <!--                          <el-select v-model="form.point" placeholder="请选择台站">-->
        <!--                            <el-option v-for="item in 35" :label="`DX${item>10?item:'0'+item}`"-->
        <!--                                       :value="`DX${item>10?item:'0'+item}`"></el-option>-->

        <!--                          </el-select>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item label="通道">-->
        <!--                          <el-select v-model="form.channel" placeholder="请选择通道">-->
        <!--                            <el-option label="X" value="X"></el-option>-->
        <!--                            <el-option label="Y" value="Y"></el-option>-->
        <!--                            <el-option label="Z" value="Z"></el-option>-->
        <!--                          </el-select>-->
        <!--                        </el-form-item>-->
        <!--                        <el-form-item>-->
        <!--                          <el-button type="primary" @click="preData">预览数据</el-button>-->
        <!--                        </el-form-item>-->

        <!--                      </el-form>-->
    </d-back>
    <div class="user-mid-tab">
      <div class="user-mid-tab-box">
        <el-table
          ref="multipleTable"
          :data="tableData1"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange1">
          <el-table-column
            prop="taskId"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="taskRangeStart"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="taskRangeEnd"
            label="结束时间">
          </el-table-column>
          <el-table-column
            prop="taskType"
            label="类型">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="downLoadList(scope.row)" type="text" size="small">下载</el-button>
              <el-button @click="preData(scope.row)" type="text" size="small">预览</el-button>
              <el-button @click="delHis(scope.row)" type="text" size="small">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="请选择要预览的站台以及对应的通道"
      :visible.sync="centerDialogVisible"
      width="30%"
      center="">
      <el-form ref="form" :model="form" inline style="">
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

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

  </tabMains>
</template>

<script>
  import tabMains from '../../../components/DTabs'
  import DTab from '../../../components/DTabs/info'
  import DPane from '../../../components/DTabs/pane'
  import DBack from '../../../components/DBack'
  import DBg from '@/components/DBackground'
  import DTableWave from '@/components/DTableWave'
  import Cookies from 'js-cookie'
  import { postUserList } from '@/api/request'

  export default {
    data () {
      return {
        centerDialogVisible: false,
        form: {},
        tableData1: []
      }
    },
    methods: {
      submit () {
        this.$router.push({
          path: '/previewDetail',
          query: {
            taskId: this.taskId,
            // point: this.form.point,
            // channel: this.form.channel.toLowerCase()
          }
        })
        // let data = {
        //   'taskId': this.taskId, //任务ID编号
        //   'siteMark': this.form.point, //台站名，DX01到DX35
        //   'channel': this.form.channel.toLowerCase() //通道名，只有x,y,z三种
        // }
        // postUserList('/data/export/history/view', data).then(res => {
        //   if (res.code === '200') {
        //     this.centerDialogVisible = false
        //     this.$router.push({
        //       path: '/previewDetail',
        //       query: {
        //         taskId: this.taskId,
        //         point: this.form.point,
        //         channel: this.form.channel.toLowerCase()
        //       }
        //     })
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: '出错啦!'
        //     })
        //   }
        // })
      },
      preData (row) {
        this.$router.push({
          path: '/previewDetail',
          query: {
            taskId:row.taskId,
            // point: this.form.point,
            // channel: this.form.channel.toLowerCase()
          }
        })
        // let data = {
        //   'taskId': row.taskId, //任务ID编号
        //   'siteMark': this.form.point, //台站名，DX01到DX35
        //   'channel': this.form.channel.toLowerCase() //通道名，只有x,y,z三种
        // }
        // postUserList('/data/export/history/view', data).then(res => {
        //   if (res.code === '200') {
        //     this.$router.push({
        //       path: '/previewDetail',
        //       query: {
        //         taskId: 39793241072,
        //         point: this.form.point,
        //         channel: this.form.channel.toLowerCase()
        //       }
        //     })
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: '出错啦!'
        //     })
        //   }
        // })

      },
      downLoadList (val) {
        let data = {
          'taskId': val.taskId
        }
        postUserList('/data/export/history/download', data).then(res => {
          //console.log(res)
          window.location.href = res.data.addr
        })
      },
      delHis (val) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            'taskId': val.taskId
          }
          postUserList('/data/export/history/delete', data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            this.info()
          })
        }).catch(() => {
        })
      },
      handleSelectionChange1 (val) {
        this.multipleSelection1 = val
      },
      tableRowClassName ({
        row,
        rowIndex
      }) {
        if (rowIndex % 2 === 0) {
          return 'warning-row'
        } else {
          return 'success-row'
        }
        return ''
      },
      // 时间戳转换
      formatDate (value) {
        return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/, ' ')
      },
      info () {
        // this.$route.query.id == 'dis'
        let data = {
          'pageNum': 1,
          'pageSize': 10
        }
        // 获取 楼层数据
        postUserList('/data/export/history', data).then(res => {
          let data1 = {
            'pageNum': 1,
            'pageSize': res.data.pageInfo.list.length
          }
          postUserList('/data/export/history', data1).then(res => {
            for (let i = 0; i < res.data.pageInfo.list.length; i++) {
              res.data.pageInfo.list[i].taskRangeStart = this.formatDate(res.data.pageInfo.list[i].taskRangeStart)
              res.data.pageInfo.list[i].taskRangeEnd = this.formatDate(res.data.pageInfo.list[i].taskRangeEnd)
            }
            this.tableData1 = res.data.pageInfo.list
          })
        })
      },
    },
    beforeMount () {
      this.info()
    },
    components: {
      tabMains,
      DTab,
      DPane,
      DBg,
      DBack,
      DTableWave
    },
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
    width: 200%;
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
</style>

<style scoped>
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
    height: 80vh;
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

  /deep/ .el-dialog__title {

    color: #bcd6ff;
  }

  /deep/ .el-dialog--center .el-dialog__body {
    text-align: center;
  }

  /deep/ .el-dialog {
    margin-top: 15px;
    background-color: transparent;
  }
</style>


