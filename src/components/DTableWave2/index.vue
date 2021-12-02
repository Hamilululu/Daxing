<template>
  <div class="table-content">
    <!--        v-loading="loading"-->
    <!--        :element-loading-text="loadingText"-->
    <!--        element-loading-background="rgba(0, 0, 0, 0.6)"-->
    <!--    class="customer-no-border-table"-->
    <div style="font-size: 18px;color: #bcd6ff;">当前方向为:{{mark}}</div>
    <el-table
      :row-class-name="tableRowClassName"
      ref="singleTable"
      :data="tableDataList"
      highlight-current-row
      :max-height="MH"
      style="width: 100%;position: relative">
      <el-table-column
        property="key"
        label="点位"
        header-align="center"
        width="100">
        <template slot-scope="scope">
          <div v-if="key">
            <div v-show="scope.row.key===key"
                 style="text-align: center;font-size: 22px;position: fixed;top: 320px;left: 20px;">
              {{ scope.row.key }}
            </div>
          </div>
          <div v-else style="text-align: center;font-size: 22px;">
            {{ scope.row.key }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="波形">
        <template slot-scope="scope">
          <div v-if="key">
            <div v-show="scope.row.key===key" style="position: fixed;top: 300px;width: 85%;">
              <d-chart1 v-on:changeLoading="loadingType($event)" :ids="scope.row.key"
                        :options="scope.row.pointData" :scopeData="scope.row.maxValue"
                        :changeIds="changeId"
                        :flagLoaing="loading"></d-chart1>
            </div>
          </div>
          <div v-else>
            <d-chart1 v-on:changeLoading="loadingType($event)" :ids="scope.row.key"
                      :options="scope.row.pointData" :scopeData="scope.row.maxValue"
                      :changeIds="changeId"
                      :flagLoaing="loading"></d-chart1>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="峰值"
        header-align="center"
        width="60">
        <template slot-scope="scope">
          <div v-if="key">
            <div v-show="scope.row.key===key"
                 style="text-align: center;font-size: 12px;overflow: auto;position: fixed;top: 320px;">
              {{ scope.row.maxValue }}
            </div>
          </div>
          <div v-else style="text-align: center;font-size: 12px;overflow: auto">
            {{ scope.row.maxValue }}
          </div>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        header-align="center"-->
      <!--        property="cycleValue"-->
      <!--        label="周期"-->
      <!--        width="48">-->
      <!--      </el-table-column>-->
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
    <!--    <div-->
    <!--      style="position: absolute;top: -35px;left: 10px;display: flex;flex-direction: row;width: 120px;justify-content: space-between">-->
    <!--      <div v-for="(item, index) in coordList">-->
    <!--        <div @click="coord(item)"-->
    <!--             style="width: 25px;height: 25px;background: #5584ca;line-height: 25px;text-align: center;color: white;cursor: pointer"-->
    <!--             :class="coordFlag == item ? 'active' : 'noActive'">-->
    <!--          {{ index }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div style="position: absolute;top: -35px;right: 35px;color: white;font-size: 12px">
      {{ jsd }}cm/s^2
    </div>
  </div>
</template>
<script>
  import DChart from '@/components/DChart'
  import DChart1 from '@/components/DChart1'
  export default {
    beforeDestroy () {
      // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
      // 在需要主动关闭ws的地方都可以调用该方法
      // closeWebsocket()
      this.over()
    },
    props: ['socketID', 'mHeight', 'sTime', 'eTime', 'form', 'sign', 'count'],
    watch: {
      count: {
        handler (n, o) {
          // this.form = n
          // console.log(this.form);
          if (n !== o) {
            this.over()
            this.globalDataSize=n *100
            //this.flushWaveDataTimer = null
            //this.seiTime = n
            this.createDom1()
            // this.flushWaveDataTimer = setInterval(this.setDataPoint, 10)

              this.websocket(this.form.axis.toLowerCase())


          }
          // this.websocket(this.form.axis.toLowerCase())
        },
        immediate: true,
        deep: true
      },
      form: {
        handler (n, o) {
          if (n !== o) {
            // alert(1)

          }
        },
        immediate: true,
        deep: true
      },
      socketID: {
        handler (n, o) {
          console.log(n, o)
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
          // console.log(n)

        },
        immediate: true,
        deep: true
      },
      eTime: {
        handler (n, o) {

          this.endTime = n
          // this.createDom1()
          // this.over()

        },
        immediate: true,
        deep: true
      }
    },

    data () {
      return {
        tempId: '',

        seiDt: 0.01,
        seiHz: 0,
        seiTime: 10,
        pointDataLen: 0,
        currPt: [],
        flushWaveDataTimer: null,

        key: '',
        temp: '',
        currentIndex: -1,//默认显示所有的
        globalDataSize: 1000,
        mark: 'X',
        form: {},
        pageSize: 13,
        // DOM结构
        tableDomList: [],
        // DOM填充的数据
        tableDataList: [],
        // 当前分页的数据
        tableDataLimit: [],
        // 当前数据总数
        total: 35,
        // 页面切换的id，通知echarts重绘
        changeId: 1,
        // 全部数据
        pageAll: [],
        loading: true,
        loadingText: '数据接收中~',
        id: null,
        over: null,
        coordList: {
          X: 'x',
          Y: 'y',
          Z: 'z'
        },
        coordFlag: 'x',
        jsd: '',
        MH: '370',
        startTime: '',
        endTime: '',
        ws: ''
      }
    },
    components: {
      DChart,
      DChart1
    },

    computed: {},
    beforeMount () {
      this.createDom1()
      this.websocket('x')
    },
    mounted () {

      this.$nextTick(() => {

        // this.websocket('x')
        //this.createCurrentPt()
       // this.flushWaveDataTimer = setInterval(this.setDataPoint, 10)
      })
    },
    methods: {
      submit (par) {
        this.mark = this.form.axis
        // let data = this.form.point.split('D')[1] > 10 ? this.form.point.split('D')[1] : '0' + this.form.point.split('D')[1]
        // if (this.form.point !== 'All') {
        //   this.key = 'D' + this.mark + data
        //   this.websocket(this.form.axis.toLowerCase())
        // } else {
        //   this.key = ''
        //   this.websocket(this.form.axis.toLowerCase())
        // }






        // this.websocket(this.form.axis.toLowerCase())
        // if (this.form.point && this.form.point !== 'All') {
        //   //遍历获取对应的点位
        //   let index = this.form.point.split('D')[1] * 1
        //   for (let i = 0; i < this.temp.length; i++) {
        //     let tableIndex = this.temp[i].key.split('DX')[1] * 1
        //     if (index === tableIndex) {
        //       this.tableDataList = [this.temp[i]]
        //     }
        //   }
        // } else {
        //   //查询所有的
        //   this.websocket(this.form.axis.toLowerCase())
        //   this.tableDataList = this.temp
        // }
      },
      // coord (flag) {
      //   //flag 为 x y z
      //   this.over()
      //   this.websocket(flag)
      //   this.coordFlag = flag
      // },
      tableRowClassName ({ row, rowIndex }) {
        if (rowIndex % 2 === 0) {
          return 'warning-row'
        } else {
          return 'success-row'
        }
        return ''
      },
      // 提前创建 DOM [DX_DX22_00]
      createDom1 () {
        let arr = []
        let result = []
        let len = 0
        // let pointDataInit = []
        // for (let i = 0; i < this.globalDataSize; i++) {
        //   let setData = {
        //     name: null,
        //     value: new Array(2)
        //   }
        //   pointDataInit.push(setData)
        // }
        let pointData = []
        this.seiHz = 1 / this.seiDt
        // 获取步长
        this.pointDataLen = this.seiTime * this.seiHz
        //  console.log(this.pointDataLen);
        for (let i = 0; i < this.pointDataLen; i++) {
          let key = (i + 1)
          //开辟 步长个空间
          pointData.push({
            name: i,
            value: [i, null]
          })
        }
        while (len !== this.total) {
          let obj = {
            cycleValue: '--',
            key: '',
            maxValue: '--',
            // pointData: pointDataInit
            pointData: [],
            sign: '',
            cs: ''
          }

          let uid = len + 1
          obj.key = uid < 10 ? 'DX0' + uid : 'DX' + uid

          arr.push(obj)
          len++
        }
        result = arr.flat()
        // this.pageSize = arr.length
        // for (let i = 0; i < arr.length; i += this.pageSize) {
        //   result.push(arr.slice(i, i + this.pageSize));
        // }
        // // // 赋值给第一个分页
        // this.tableDataLimit = result[0]
        // // 将DOM结构存储
        // this.tableDomList = result
        // 准备填充数据
        this.tableDataList = result
        // console.log(this.tableDataList);
      },
      createCurrentPt () {
        let obj = {}
        let len = 1
        while (len != this.total + 1) {
          let key = len < 10 ? 'DX0' + (len * 1) : 'DX' + (len * 1)
          let value = 0
          obj[key] = value
          len++
        }
        this.currPt = obj
      },
      setDataPoint () {
        let that = this
        for (let i = 0; i < that.tableDataList.length; i++) {
          // 获取key  DX01 DX02
          let siteMarkStr = that.tableDataList[i].key
          // 找到当前的索引      从0开始

          // 从vuex中 获取数据
          that.$store.dispatch('d2admin/waveBuffer/getSeiWaveSingleData', {
            siteMark: siteMarkStr,
            channel: 'x'
          }).then(res => {

            // 每次调用此函数时都会把所有的数据返回来
            if (typeof (res) != 'undefined') {
              // console.log(res)
              //先将空值保存起来
              //10
              for (let j = 0; j < res.length; j++) {
                if (res[j]) {
                  let currDataIndex = that.currPt[siteMarkStr]
                  let arrayStr = JSON.stringify(that.tableDataList[i].pointData)
                  let arrayObj = JSON.parse(arrayStr)
                  // 拿到vuex的值
                  let temp = res[j][1]
                  let temp1 = temp + ' '
                  let obj = {
                    name: currDataIndex,
                    value: [currDataIndex, temp1 * 1]
                  }
                  arrayObj[currDataIndex] = obj
                  that.tableDataList[i].pointData = arrayObj

                  for (let k = 1; k < 11; k++) {
                    let afterIndex = currDataIndex +k
                    if (afterIndex< this.pointDataLen){
                      that.tableDataList[i].pointData[afterIndex] = {
                        name: afterIndex,
                          value: [afterIndex, null]
                      }
                    }
                  }

                  if (that.currPt[siteMarkStr] >= that.pointDataLen - 1) {
                    that.currPt[siteMarkStr] = 0
                  } else {
                    that.currPt[siteMarkStr] += 1
                  }
                }

              }
              // console.log(that.tableDataList)

              // that.$set( arrayObj, currDataIndex, {
              //   name: currDataIndex,
              //   value: [currDataIndex, temp1*1]
              // })

              // 添加空隙

            }
          })

        }

      },
      loadingType (val) {
        this.loading = val
      },
      websocket (flag) {
        let ws = this.ws
        // flag = this.coordFlag
        // console.log(this.startTime)
        // console.log(this.endTime)
        if (!this.startTime && !this.endTime) {
          // ws = new WebSocket('ws://192.168.137.36:8080/waveData/Seismometer/' + this.id + '/' + flag)
          //地震仪
          ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/' + this.id + '/' + flag)
          // ws = new WebSocket('ws://10.160.97.198:8080/waveData/Seismometer/' + this.id + '/' + flag)
          console.log(ws)
        } else {
          // ws = new WebSocket('ws://192.168.137.36:8080/waveData/Seismometer/range/' + this.id + '/' + flag +'/'+ this.startTime +'/' + this.endTime)
          ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/range/' + this.id + '/' + flag + '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
          // ws = new WebSocket('ws://10.160.97.198:8080/waveData/Seismometer/range/' + this.id + '/' + flag + '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
          console.log(ws)
        }
        // console.log(ws)
        ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          console.log('数据发送中...')
        }
        ws.onmessage = evt => {
          this.wsMessage(JSON.parse(evt.data))
        }
        ws.onclose = function () {
          // 关闭 websocket
          console.log('连接已关闭...')
        }
        // 组件销毁时调用，中断websocket链接
        this.over = () => {
          ws.close()
        }
      },
      eleTableDataLimit (val, pageID) {
        this.tableDataLimit = this.tableDataList[pageID]
      },
      // 将数据填充
      // let codeValueHealth = Object.values(data)[0].health  // health []
      // moveDataList(index, keys, val, cycleValue, maxValue, health) {
      //   // console.log('进来了');
      //   let data = this.tableDataList[index]
      //   for (let i = 0; i < data.length; i++) {
      //     if (data[i].key == keys && val.length > 0) {
      //       this.tableDataList[index][i].pointData = val
      //       this.tableDataList[index][i].cycleValue = cycleValue
      //       this.tableDataList[index][i].maxValue = maxValue
      //       this.tableDataList[index][i].health = health
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
        // let seiWaveDataLength = this.globalDataSize
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
        let oldData = this.tableDataList[siteMarkIndex].pointData
        let newData = data[Object.keys(data)[0]].pointData
        let newerTimestampIndex = -1
        if (oldData.length == 0) {
          this.tableDataList[siteMarkIndex].pointData = newData
          return
        }
        for (let i = 0; i < newData.length; i++) {
          if (oldData[oldData.length - 1].name < newData[i].name) {
            newerTimestampIndex = i
            break
          }
        }
        for (let i = newerTimestampIndex; i < newData.length; i++) {
          if (this.tableDataList[siteMarkIndex].pointData.length >= this.globalDataSize) {
            this.tableDataList[siteMarkIndex].pointData.shift()
          }
          this.tableDataList[siteMarkIndex].pointData.push(newData[i])
        }
        console.log(this.tableDataList)

      },
      // wsMessage(data) {
      //   // console.log(data);
      //   // 每条数据的 key
      //   let codeKey = Object.keys(data) // 'A'
      //   // key 下的数据
      //   let codeValueKey = Object.values(data)[0].key  // key ''
      //   let codeValuePointData = Object.values(data)[0].pointData  // sensorData []
      //   let codeValueCycleValueData = Object.values(data)[0].cycleValue  // sensorData []
      //   let codeValueMaxValueData = Object.values(data)[0].maxValue  // sensorData []
      //   let codeValueHealth = Object.values(data)[0].health
      //   this.jsd = Object.values(data)[0].allMaxValue
      //   // 将数据分组
      //   let num = parseInt(codeKey[0].split('DX')[1])
      //   let numCode = this.pageSize
      //
      //   switch (true) {
      //     case num > numCode * 7:
      //       this.moveDataList(7, codeValueKey, codeValuePointData, codeValueCycleValueData, codeValueMaxValueData, codeValueHealth)
      //       break;
      //     case num > numCode * 6:
      //       this.moveDataList(6, codeValueKey, codeValuePointData, codeValueCycleValueData, codeValueMaxValueData, codeValueHealth)
      //       break;
      //     case num > numCode * 5:
      //       this.moveDataList(5, codeValueKey, codeValuePointData, codeValueCycleValueData, codeValueMaxValueData, codeValueHealth)
      //       break;
      //     case num > numCode * 4:
      //       this.moveDataList(4, codeValueKey, codeValuePointData, codeValueCycleValueData, codeValueMaxValueData, codeValueHealth)
      //       break;
      //     case num > numCode * 3:
      //       this.moveDataList(3, codeValueKey, codeValuePointData, codeValueCycleValueData, codeValueMaxValueData, codeValueHealth)
      //       break;
      //     case num > numCode * 2:
      //       this.moveDataList(2, codeValueKey, codeValuePointData, codeValueCycleValueData, codeValueMaxValueData, codeValueHealth)
      //       break;
      //     case num > numCode:
      //       this.moveDataList(1, codeValueKey, codeValuePointData, codeValueCycleValueData, codeValueMaxValueData, codeValueHealth)
      //       break;
      //     case num > 0:
      //       this.moveDataList(0, codeValueKey, codeValuePointData, codeValueCycleValueData, codeValueMaxValueData, codeValueHealth)
      //       break;
      //     default:
      //       break;
      //   }
      // },
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
  .noActive {
    border: 1px solid #2a2d2e;
  }

  .active {
    border: 1px solid white;
    background: #306ac1 !important;
  }

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
    height: 50px;
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
    min-height: 360px;
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
