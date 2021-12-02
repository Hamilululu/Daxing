<template>
  <div class="table-content">
    <!--    v-loading="loading"-->
    <!--    :element-loading-text="loadingText"-->
    <!--    element-loading-background="rgba(0, 0, 0, 0.6)"-->

    <!--    class="customer-no-border-table tableBox"-->
    <el-table
      :row-class-name="tableRowClassName"
      ref="singleTable"
      :data="tableDataList"
      highlight-current-row
      :max-height="MH"
      style="width: 100%">
      <el-table-column
        label="点位"
        header-align="center"
        width="130">
        <template slot-scope="scope">
          <div v-if="key">
            <div v-show="scope.row.key===key" style="text-align: center;font-size: 22px;position: fixed;top: 320px;left: 20px;height: 20px;">
              {{ scope.row.key }}-{{ scope.row.sign}}-{{ scope.row.cs}}
            </div>
          </div>
          <div v-else style="text-align: center;font-size: 22px;">
            {{ scope.row.key }}-{{ scope.row.sign}}-{{ scope.row.cs}}
          </div>

        </template>
      </el-table-column>
      :changeIds="changeId"
      <el-table-column
        style="margin: 1px 0"
        header-align="center"
        label="波形">
        <template slot-scope="scope">
          <div v-if="key">
            <div v-show="scope.row.key===key" style="position: fixed;top: 300px;width: 85%;">
              <d-chart v-on:changeLoading="loadingType($event)" :ids="scope.row.key"
                        :options="scope.row.pointData" :scopeData="scope.row.maxValue"
                        :changeIds="changeId"
                        :flagLoaing="loading">
              </d-chart>
            </div>
          </div>
          <div v-else>
            <d-chart :refs="scope.row.key" v-on:changeLoading="loadingType($event)" :ids="scope.row.key"
                      :options="scope.row.pointData" :scopeData="scope.row.maxValue"
                      :changeIds="changeId"
                      :flagLoaing="loading"></d-chart>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="峰值"
        header-align="center"
        width="60">
        <template slot-scope="scope">
          <div v-if="key">
            <div v-show="scope.row.key===key" style="text-align: center;font-size: 12px;overflow: auto;position: fixed;top: 320px;">
              {{ scope.row.maxValue }}
            </div>
          </div>
          <div v-else style="text-align: center;font-size: 12px;overflow: auto">
            {{ scope.row.maxValue }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        property="idStr"
        label="状态"
        width="45">
        <template slot-scope="scope">
          <div v-if="key">
            <div v-show="scope.row.key===key" style="text-align: center;position: fixed;top: 320px;">
              <i v-if="!scope.row.health" style="color: orange;font-size: 12px"
                 class="el-icon-warning"></i>
              <!--            <i v-else-if="scope.row.health === '报警'" style="color: red;font-size: 12px"-->
              <!--               class="el-icon-error"></i>-->
              <i v-else style="color:green;font-size: 12px" class="el-icon-success"></i>
            </div>
          </div>
          <div v-else style="text-align: center">
            <i v-if="!scope.row.health" style="color: orange;font-size: 12px"
               class="el-icon-warning"></i>
            <!--            <i v-else-if="scope.row.health === '报警'" style="color: red;font-size: 12px"-->
            <!--               class="el-icon-error"></i>-->
            <i v-else style="color:green;font-size: 12px" class="el-icon-success"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--    v-show="!loading"-->
    <!--    <div class="page-direction">-->
    <!--      <el-pagination-->
    <!--        small-->
    <!--        @size-change="handleSizeChange"-->
    <!--        @current-change="handleCurrentChange"-->
    <!--        layout="pager"-->
    <!--        :page-size="pageSize"-->
    <!--        :total="total">-->
    <!--      </el-pagination>-->
    <!--    </div>-->
    <div style="position: absolute;top: -35px;right: 35px;color: white;font-size: 12px">
      {{ jsd }}mm
    </div>
  </div>
</template>

<script>
  import DChart from '@/components/DChart'
  import Cookies from 'js-cookie'
  // import { sendWebsocket, closeWebsocket } from '@/libs/util.websocket'

  export default {
    beforeDestroy () {
      // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
      // 在需要主动关闭ws的地方都可以调用该方法
      // closeWebsocket()
      this.over()
    },
    props: ['socketID', 'mHeight', 'sTime', 'eTime', 'form','count'],
    watch: {
      count: {
        handler (n, o) {
          // this.form = n
          if (n !== o) {
            this.globalDataSize=n*100
          }
        },
        immediate: true,
        deep: true
      },
      form: {
        handler (n, o) {
          // this.form = n
          if (n !== o) {
            // alert(1)
            setTimeout(() => {
              this.websocket2()
            })
          }
        },
        immediate: true,
        deep: true
      },
      socketID: {
        handler (n, o) {
          this.id = n
        },
        immediate: true,
        deep: true
      },
      mHeight: {
        handler (n, o) {
          this.MH = n
        },
        immediate: true,
        deep: true
      },
      sTime: {
        handler (n, o) {
          this.startTime = n
        },
        immediate: true,
        deep: true
      },
      eTime: {
        handler (n, o) {
          this.endTime = n
          // this.ws.close()
          // this.websocket2()
        },
        immediate: true,
        deep: true
      }
    },
    data () {
      return {
        key: '',
        globalDataSize: 1000,
        temp: '',
        form: '',
        // DOM结构
        tableDomList: [],
        // DOM填充的数据
        tableDataList: [],
        // 当前分页的数据
        tableDataLimit: [],
        // 当前数据总数
        total: 0,
        // 页面切换的id，通知echarts重绘
        changeId: 1,
        pageSize: 13,
        // 全部数据
        pageAll: [],
        loading: true,
        loadingText: '数据接收中~',
        id: null,
        over: null,
        jsd: '',
        MH: 350,
        startTime: '',
        endTime: '',
        ws: '',
        ws1: ''
      }
    },
    components: {
      DChart
    },
    computed: {},
    beforeMount () {
      this.websocket2()
    },
    mounted () {
      this.$nextTick(() => {
        // this.websocket()
        this.createDom2()
        this.websocket2()

      })
    },
    methods: {
      submit (par) {
        if (this.form.point !== 'All') {
          this.key = this.form.point
          this.websocket2()
        } else {
          this.key = ''
          this.websocket2()
        }
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
      // 提前创建 DOM [位移]
      websocket2 () {
        let ws = this.ws
        this.socket = JSON.parse(Cookies.get('userInfo')).userId
        //位移

        if (!this.startTime && !this.endTime) {
          // ws = new WebSocket('ws://192.168.137.36:8080/waveData/Seismometer/' + this.id + '/' + flag)
          //地震仪
          // ws = new WebSocket('ws://10.160.97.198:8080/waveData/DisplacementData/' +this.socket)
          ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/DisplacementData/' + this.socket)
        } else {
          ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/DisplacementData/range/' + this.socket + '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
        }
        ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          console.log('数据发送中...')
        }
        ws.onmessage = evt => {
          // 接收数据
          this.wsMessage(JSON.parse(evt.data))
        }
        ws.onclose = function () {
          // 关闭 websocket
          // console.log('连接已关闭...')
        }
        // 组件销毁时调用，中断websocket链接
        this.over = () => {
          ws.close()
        }
      },
      // 提前创建 DOM [位移]
      createDom2 () {
        let zmArr = ['A', 'B', 'C', 'D', 'E', 'O']
        let newArr = []
        let newArr1 = []
        let result = []
        while (zmArr.length !== 0) {
          let arr = []
          if (zmArr[0] !== 'B') {
            for (let i = 0; i < 3; i++) {
              let uid = i + 1
              let obj = {
                cycleValue: '--',
                key: '',
                maxValue: '--',
                pointData: [],
                sign: '',
                cs: ''
              }
              let sign = {
                1: 'X',
                2: 'Y',
                3: 'Z'
              }
              let cs = {
                1: '东西',
                2: '南北',
                3: '垂直'
              }
              obj.sign = sign[uid]
              obj.cs = cs[uid]
              obj.key = zmArr[0] + '0' + uid
              arr.push(obj)
            }
            newArr.push(arr)
          } else {
            // let arr = []
            for (let j = 0; j < 5; j++) {
              let obj = {
                cycleValue: '--',
                key: '',
                maxValue: '--',
                pointData: []
              }
              let uid = j + 1
              obj.key = 'B0' + uid
              arr.push(obj)
            }
            newArr.push(arr)
          }
          zmArr.shift()
        }
        //将多维数组拆一维
        newArr1 = newArr.flat()
        // 准备填充数据
        this.tableDataList = newArr1
        // this.total = newArr1.length
        // this.pageSize = newArr1.length
        // for (let i = 0; i < newArr1.length; i += this.pageSize) {
        //   // 将数据以分页的形式分割开
        //   result.push(newArr1.slice(i, i + this.pageSize))
        // }
        // // // 赋值给第一个分页
        // this.tableDataLimit = result[0]
        // // 将DOM结构存储
        // this.tableDomList = result
      },
      createDom1 () {
        let zmArr = ['A', 'B', 'C', 'D', 'E', 'O']
        let newArr = []
        let newArr1 = []
        let result = []
        while (zmArr.length !== 0) {
          let arr = []
          if (zmArr[0] !== 'B') {
            for (let i = 0; i < 3; i++) {
              let obj = {
                cycleValue: '--',
                key: '',
                maxValue: '--',
                pointData: []
              }
              let uid = i + 1
              obj.key = zmArr[0] + '0' + uid
              arr.push(obj)
            }
            newArr.push(arr)
          } else {
            // let arr = []
            for (let j = 0; j < 5; j++) {
              let obj = {
                cycleValue: '--',
                key: '',
                maxValue: '--',
                pointData: []
              }
              let uid = j + 1
              obj.key = 'B0' + uid
              arr.push(obj)
            }
            newArr.push(arr)
          }
          zmArr.shift()
        }
        //将多维数组拆一维
        newArr1 = newArr.flat()
        // 准备填充数据
        this.tableDataList = newArr1
        this.total = newArr1.length
        this.pageSize = newArr1.length
        for (let i = 0; i < newArr1.length; i += this.pageSize) {
          // 将数据以分页的形式分割开
          result.push(newArr1.slice(i, i + this.pageSize))
        }
        // // 赋值给第一个分页
        this.tableDataLimit = result[0]
        // 将DOM结构存储
        this.tableDomList = result
      },
      loadingType (val) {
        this.loading = val
      },
      websocket () {
        let ws = this.ws
        if (this.startTime !== '' && this.eTime !== '') {
          ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/DisplacementData/range/' + this.id + '/' + this.startTime + '/' + this.endTime + this.form.time)
        } else {
          ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/DisplacementData/' + this.id)
        }
        ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          console.log('数据发送中...')
        }
        ws.onmessage = evt => {
          // 接收数据
          this.wsMessage(JSON.parse(evt.data))
        }
        ws.onclose = function () {
          // 关闭 websocket
          // console.log('连接已关闭...')
        }
        // 组件销毁时调用，中断websocket链接
        this.over = () => {
          ws.close()
        }
      },
      eleTableDataLimit (val, pageID) {
        this.tableDataLimit = this.tableDomList[pageID]
      },
      // 将数据填充
      // moveDataList(index, keys, val, cycleValue, maxValue) {
      //   let data = this.tableDataList[index]
      //   for (let i = 0; i < data.length; i++) {
      //     if (data[i].key == keys && val.length > 0) {
      //       this.tableDataList[index][i].sensorData = val
      //       this.tableDataList[index][i].cycleValue = cycleValue
      //       this.tableDataList[index][i].maxValue = maxValue
      //     }
      //   }
      // },
      wsMessage (data) {
        // let result = []
        // // 每条数据的 key
        // let codeKey = Object.keys(data) // 'A'
        // // key 下的数据
        // let codeValueKey = Object.values(data)[0].key  // key ''
        // // 点数据
        // let codeValueSensorData = Object.values(data)[0].pointData  // sensorData []
        // // console.log(codeValueSensorData);
        // let codeValueCycleValueData = Object.values(data)[0].cycleValue  // sensorData []
        // // 最大值
        // let codeValueMaxValueData = Object.values(data)[0].maxValue  // sensorData []
        // // 健康检测
        // let codeValueHealth = Object.values(data)[0].health  // health []
        //
        //
        //
        //设置步长
        let seiWaveDataLength = this.globalDataSize
        //获取新数据(只是其中的一条数据)
        // let newData = data;
        //获取旧数据(需要遍历 )
        // console.log(this.tableDataList)
        let siteMarkIndex = -1
        for (let i = 0; i < this.tableDataList.length; i++) {
          if (this.tableDataList[i].key == Object.keys(data)[0]) {
            siteMarkIndex = i
            break
          }
        }
        let oldData;
        if (this.tableDataList[siteMarkIndex] && this.tableDataList[siteMarkIndex].pointData){
          oldData =this.tableDataList[siteMarkIndex].pointData
        }
        oldData = this.tableDataList[siteMarkIndex]?this.tableDataList[siteMarkIndex].pointData:[]
        let newData = data[Object.keys(data)[0]].pointData
        let newerTimestampIndex = -1
        if (oldData && oldData.length == 0) {
          this.tableDataList[siteMarkIndex]? this.tableDataList[siteMarkIndex].pointData = newData: ''
          return
        }
        for (let i = 0; i < newData.length; i++) {
          if ( oldData && oldData[oldData.length - 1].name < newData[i].name) {
            newerTimestampIndex = i
            break
          }
        }
        for (let i = newerTimestampIndex; i < newData.length; i++) {
          if (this.tableDataList[siteMarkIndex]&& this.tableDataList[siteMarkIndex].pointData.length >= seiWaveDataLength) {
            this.tableDataList[siteMarkIndex].pointData.shift()
          }
          this.tableDataList[siteMarkIndex].pointData.push(newData[i])
        }

        this.temp = this.tableDataList
        // alert('ws'+this.temp.length)

      },
      handleCurrentChange (val) {
        const pageNum = val - 1
        this.eleTableDataLimit(this.tableDataList, pageNum)
        this.changeId = pageNum
      },
      handleSizeChange (val) {
        const pageNum = val - 1
        this.eleTableDataLimit(this.tableDataList, pageNum)
        this.changeId = pageNum
      },
    }
  }
</script>

<style scoped lang="scss">
  .tableBox {
    th {
      padding: 0 !important;
      height: 10px;
      line-height: 20px;
    }

    td {
      padding: 0 !important;
      height: 10px;
      line-height: 20px;
    }
  }
</style>
<style scoped>
  .el-table >>> .el-table__header {
    background-color: transparent !important;
  }

  .el-table >>> .warning-row {
    background: transparent !important;
    border: none;
  }

  .el-table >>> .success-row {
    background: transparent !important;
    border: none;
  }

  .el-table >>> .cell {
    color: #bcd6ff;
    padding: 0;
  }

  /deep/ .el-table--scrollable-y ::-webkit-scrollbar {
    display: none;
  }

  .el-table--border::after, .el-table--group::after, .el-table::before {
    background: none;
  }

  /*最外层透明*/
  /deep/ .el-table, /deep/ .el-table__expanded-cell {
    background-color: transparent;
  }

  /* 表格内背景颜色 */
  /deep/ .el-table th,
  /deep/ .el-table tr,
  /deep/ .el-table td {
    background-color: transparent !important;
    height: 80px;
    padding: 0;
  }

  .el-table >>> .el-row {

  }

  /deep/ .current-row {
    height: 10px;
    padding: 0;
    background-color: transparent !important;
  }

  /deep/ .el-table__body tr.current-row > td {
    height: 10px;
    padding: 0;
    background-color: transparent !important;
  }

  /deep/ .el-table__body tr:hover > td {
    background-color: transparent !important;
  }

  /deep/ .el-table thead {
    color: #e0e0f7;
    font-weight: 500;
  }

  /deep/ .el-table {
    color: #bcd6ff;
    font-size: 12px;
  }

  /deep/ .el-pagination.el-pagination--small button:disabled {
    background: transparent !important;
  }

  /deep/ .el-pagination.el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext, .el-pagination--small .el-pager li.btn-quickprev, .el-pagination--small .el-pager li:last-child {
    background: transparent;
  }

  /depp/ .el-pagination.el-pagination--small .el-pager li:not(.disabled) {
    background: transparent !important;
  }

  /deep/ .el-pagination.el-pagination--small .el-pager li:not(.disabled).active {
    background-color: transparent;
  }

  /deep/ .el-table td, .el-table th {
    padding: 0 !important;
  }

  /deep/ .el-pagination.el-pagination--small .el-pager li {
    background: transparent !important;
    color: white !important;
  }

  /deep/ .el-pagination.el-pagination--small .el-pager li.active {
    color: #409EFF !important;
  }

  /deep/ .el-pagination.el-pagination--small .el-pager .el-pagination {
    color: white !important;
  }

  /deep/ .el-pagination.el-pagination--small .el-pager .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon {
    color: white !important;
  }

  .table-content {
    min-height: 350px;
    position: relative;
    margin-top: 50px;
  }

  .page-direction {
    padding-top: 10px;
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    margin: 0 auto;
    bottom: 0;
  }

  .el-table >>> .el-table td, .el-table th {
    padding: 4px 0 !important;
  }
</style>
<style>
  .el-table td, .el-table th.is-leaf {
    border: none;
  }

  /*.el-dialog, .el-pager li{*/
  /*  background: transparent !important;*/
  /*}*/
  /*去掉表格单元格边框*/
  .customer-no-border-table th {
    border: none;
  }

  .customer-no-border-table td, .customer-no-border-table th.is-leaf {
    border: none;
  }

  /*表格最外边框*/
  .customer-no-border-table .el-table--border, .el-table--group {
    border: none;
  }

  /*头部边框*/
  .customer-no-border-table thead tr th.is-leaf {
    border: none;
  }

  .customer-no-border-table thead tr th:nth-last-of-type(2) {
    border-right: none;
  }

  /*表格最外层边框-底部边框*/
  .customer-no-border-table .el-table--border::after, .customer-no-border-table .el-table--group::after {
    width: 0;
  }

  .customer-no-border-table::before {
    width: 0;
  }

  .customer-no-border-table .el-table__fixed-right::before, .el-table__fixed::before {
    width: 0;
  }

  .customer-no-border-table .el-table__header tr th {
    /*background: #fff;*/
    /*color: #333333 ;*/
    /*padding: 3px ;*/
    /*fontWeight: 550 ;*/
    /*height: 36px ;*/
    /*border: 0px;*/
    /*font-size: 15px;*/
  }

</style>
