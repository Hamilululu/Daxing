<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-back style="z-index: 999"></d-back>
    <div class="user-mid-tab">
      <div class="user-mid-tab-box">
        <el-table
          ref="multipleTable"
          :data="tableData1"
          style="width: 80%;margin: 0 auto;"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange1">
          <el-table-column
            prop="point"
            label="点位"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="offset"
            label="偏移量"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sensitivity"
            label="灵敏度"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button @click="setZero(scope.row)" type="text" size="small">调零</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
  import {getPointData} from '@/api/request'
  export default {
    data() {
      return {
        tableData1: []
      }
    },
    methods: {
      getPointData() {
        getPointData().then(res => {
         // console.log(res);
        })
      },
      setZero(row) {
      },
      handleSelectionChange1(val) {
        this.multipleSelection1 = val
      },
      tableRowClassName({
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
      formatDate(value) {
        return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/, ' ')
      },
    },
    beforeMount() {
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
  /*最外层透明*/
  /deep/ .el-table, /deep/ .el-table__expanded-cell {
    border-bottom: none;
    background-color: transparent;
  }
  /* 表格内背景颜色 */
  /deep/ .el-table th,
  /deep/ .el-table tr,
  /deep/ .el-table td {
    color: rgb(188, 214, 255);
    border-bottom: none;
    background-color: transparent;
  }
  .el-table .el-table__body-wrapper /deep/ .hover-row {
    background-color: red;
  }
  /deep/ .el-table tbody tr {
    pointer-events: none;
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
</style>



