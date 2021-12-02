<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-tab defaultKey="1" tabTitle="机场监测点数据详情展示及数据分析" tabIcon="el-icon-s-tools">
      <d-pane actKey="1" label="环境信息及传感器数据">
        <div class="main-border">
          <div class="main-border-bg" style="display: flex">
            <div class="search-box-left">
              <div class="search-box-left-title"><span>监测点</span></div>


              <!--           树形图     -->
              <div class="tree-box">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </div>
            </div>


            <div class="search-box-right">


              <div class="search-box-right-head"
                   style="display: flex;justify-content: flex-end;flex-direction: row-reverse">
                <el-button v-show="isPlc" style="margin-left: auto;" type="primary" @click="historyData">历史环境数据
                </el-button>

                <div style="padding: 5px;display: flex;align-items: center">

                  <div style="margin-right: 20px;color: white">
                    {{ titleStr }}
                  </div>

                  <el-button type="danger" @click="closeDoor">断电重启</el-button>
                </div>
                <div style="width: 55%;height: 50%;display: flex;flex-direction: row;margin: 0 auto;"></div>
              </div>
              <div class="search-box-right-content" style="display: flex;justify-content: space-between">
                <div v-if="showBox" style="width: 48%;height: 80%;">
                  <div style="width: 90%;height: 100%;margin: 30px auto">
                    <img src="../../../assets/img/demo-img.png" alt="" style="width: 100%;height: 100%;">
                  </div>
                  <div style="width: 100%;padding-top: 10px;display: flex;margin-left: 10px">
                    <div class="title-bg" style="display: inline-block;flex: 1">{{ plcData.doorStatus }}</div>
                    <div class="title-bg" style="display: inline-block;flex: 1">{{ plcData.envInfo }}</div>
                  </div>
                </div>
                <div style="flex: 1;width: 100%;overflow: hidden">
                  <div
                    style="display: flex;flex-direction: row;width: 120px;justify-content: space-between;padding: 20px 0">
                    <div v-for="(item, index) in coordList">
                      <div @click="coord(item)"
                           style="width: 25px;height: 25px;background: #5584ca;line-height: 25px;text-align: center;color: white;cursor: pointer"
                           :class="coordFlag == item ? 'active' : 'noActive'">
                        {{ index }}
                      </div>
                    </div>
                  </div>
                  <div
                    style="width: 100%;
                    margin: 0 auto;">
                    <div style="border: 1px solid #EEEEEE;padding: 5px 0 40px"
                         v-if="hasDis == 1">
                      <span style="color:white;text-align: center;padding-bottom: 10px">位移计</span>

                      <d-chart v-on:changeLoading="loadingType($event)"
                               :ids="'dis' + dis.key"
                               :options="dis.pointData">

                      </d-chart>
                    </div>
                    <div style="border: 1px solid #EEEEEE;padding: 5px 0 40px;margin-top: 30px">
                      <span style="color:white;text-align: center;margin-bottom: 10px">地震计</span>
                      <d-chart1 v-on:changeLoading="loadingType($event)"
                               :ids="'sei' + sei.key"
                               :options="sei.pointData"></d-chart1>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </d-pane>
      <d-pane actKey="2" label="地震事件检索">
        <div class="main-border">
          <div class="main-border-bg">
            <!--  搜索            -->
            <div

              style="width: 80%;height:50px;display: flex;margin-bottom: 20px;">
              <!-- 搜索框             -->
              <div class="block" style="margin: 0 auto;text-align: center">
                <!--                <el-form ref="form" :model="form" inline style="margin-left: 250px;">-->
                <!--                  <el-form-item label="台站">-->
                <!--                    <el-select v-model="form.point" placeholder="请选择台站">-->
                <!--                      <el-option v-for="item in 35" :label="`DX${item>10?item:'0'+item}`"-->
                <!--                                 :value="`DX${item>10?item:'0'+item}`"></el-option>-->

                <!--                    </el-select>-->
                <!--                  </el-form-item>-->
                <!--                  <el-form-item label="通道">-->
                <!--                    <el-select v-model="form.channel" placeholder="请选择通道">-->
                <!--                      <el-option label="X" value="X"></el-option>-->
                <!--                      <el-option label="Y" value="Y"></el-option>-->
                <!--                      <el-option label="Z" value="Z"></el-option>-->
                <!--                    </el-select>-->
                <!--                  </el-form-item>-->
                <!--                  <el-form-item>-->
                <!--                    <el-button type="primary" @click="preData">预览数据</el-button>-->
                <!--                  </el-form-item>-->

                <!--                </el-form>-->
                <div class="btn-search" style="display: flex;">
                  <!--                  <el-button round plain @click="hisList('dis')">导出位移计历史</el-button>-->
                  <el-button round plain @click="hisList('sei')">历史分析</el-button>
                  <div class="picker-search" style="display: flex;margin-left: 160px;">
                    <el-date-picker
                      v-model="value1"
                      value-format="timestamp"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                    <div class="btn-search" style="">
                      <el-button round plain @click="showSearchFlag">搜索</el-button>
                    </div>
                  </div>
                </div>


                <!--                <el-date-picker-->
                <!--                  v-model="value1"-->
                <!--                  type="daterange"-->
                <!--                  range-separator="至"-->
                <!--                  start-placeholder="开始日期"-->
                <!--                  end-placeholder="结束日期">-->
                <!--                </el-date-picker>-->
                <!--               搜索按钮-->

                <div>


                </div>
              </div>


            </div>
            <!--            -->
            <div class="search-box">
              <div v-if="tableShow" style="display: flex;flex-direction: column;width: 100%;height: 100%">
                <!--        顶部搜索-->
                <!--                <div style="width: 100%;height: 80px;display: flex;flex-direction: row;align-items: center">-->
                <!--                  <div class="user-search" style="padding-left:0">-->
                <!--                    <el-input v-model="input" placeholder="请输入内容"></el-input>-->
                <!--                    <div class="user-btn">-->
                <!--                    </div>-->
                <!--                  </div>-->
                <!--                </div>-->
                <!--            表格数据-->
                <div class="user-mid-tab">
                  <div class="user-mid-tab-box">
                    <el-table
                      ref="multipleTable"
                      :data="tableData1"
                      style="width: 100%"
                      :row-class-name="tableRowClassName"
                      @selection-change="handleSelectionChange1">
                      <el-table-column
                        prop="eventId"
                        label="ID"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="StartTime"
                        label="开始时间"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="EndTime"
                        label="结束时间"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="eventSite"
                        label="事件名称"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                          <!--                          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>-->
                          <!--                          <el-button @click="downfile(scope.row,'dis')" type="text" size="small">导出位移数据</el-button>-->
                          <!--                          <el-button @click="downfile(scope.row,'sei')" type="text" size="small">导出加速度数据</el-button>-->
                          <el-button @click="downfile(scope.row,'sei')" type="text" size="small">生成分析数据</el-button>
                          <!--                          <el-button type="text" size="small">导出分析普数据</el-button>-->
                          <!--                          <el-button @click="previewDetail(scope.row)" type="text" size="small">预览数据</el-button>-->
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
              <div v-else style="display: flex;flex-direction: column;width: 100%;height: 100%;">
                <div style="height: 45px;width: 100%;color: white;line-height: 45px">
                  <i class="el-icon-back"
                     style="font-weight: 700;cursor:pointer"
                     @click="backOne()">返回上一层</i>
                </div>
                <div style="flex:1;">
                  <img style="width: 100%" src="../../../assets/img/bxt.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>

      </d-pane>
    </d-tab>
    <el-dialog
      title="请选择导出的时间范围"
      :visible.sync="centerDialogVisible"
      width="30%"
      center="">
      <el-date-picker
        align="center"
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <div style="padding: 10px;">
             <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
      </div>

    </el-dialog>
  </tabMains>
</template>

<script>
  import tabMains from '../../../components/DTabs'
  import DTab from '../../../components/DTabs/info'
  import DPane from '../../../components/DTabs/pane'
  import { postUserList } from '../../../api/request'
  import DChart from '@/components/DCharts'
  import DChart1 from '@/components/DCharts1'
  import Cookies from 'js-cookie'

  export default {
    name: 'index',
    components: {
      tabMains,
      DTab,
      DPane,
      DChart,
      DChart1
    },
    data () {
      return {
        currPt: [],
        flushWaveDataTimer: null,
        seiDt: 0.01,
        seiHz: 0,
        seiTime: 5,
        pointDataLen: 0,
        currentPointNo: '',
        currentPointId: '',
        form: {},
        centerDialogVisible: false,
        // 设备信息 -tree
        defaultProps: {
          children: 'children',
          label: 'pointName'
        },
        // tree
        data: [],
        // PLC参数信息
        plcInfoData: [],
        // PLC传感器数据
        plcData: [],
        //
        tableShow: true,
        input: '',
        multipleSelection1: [],
        tableData1: [],
        activeKey: 'second', // 设备信息，传感器数据 - tabs
        showBox: false, // 设备信息，传感器数据 - 页面
        // 当前节点是否有 isPlc
        isPlc: false,
        showSearch: false,
        // 日期
        value1: '',
        value2: '',
        // 树形控件
        titleStr: '',
        socket: '',
        ws1: '',
        sei: {},
        dis: {},
        coordList: {
          X: 'x',
          Y: 'y',
          Z: 'z'
        },
        hasDis: 0,
        coordFlag: 'x',
      }
    },
    beforeMount () {
      this.info()
      this.websocket1('x')
      this.createDom1()
      this.createCurrentPt()

    },
    mounted () {
      // this.flushWaveDataTimer = setInterval( this.getPointData,10);

    },

    beforeDestroy () {
      // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
      // 在需要主动关闭ws的地方都可以调用该方法
      // closeWebsocket()
      this.over()
    },
    methods: {
      createCurrentPt() {
        let obj = {}
          let key = this.currentPointNo
          let value = 0
          obj[key] = value
        this.currPt = obj
      },
      createDom1 () {
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
        //创建 globalDataSize个对象
        let obj = {
          key: '',
          pointData: pointData,
        }
        this.sei = obj
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
              this.$nextTick(() => {
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
              });
              // console.log(res)
              //先将空值保存起来
              //10

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

      getPointData () {
        let that = this
        // 获取当前的siteMark      DX01  DX02...
        let currentSiteMarkStr = that.currentPointNo   //DX11
        // 找到当前的索引      从0开始
        let currDataIndex = that.currPt[currentSiteMarkStr]
        // console.log(that.currPt)
        // alert(this.coordFlag)           //xx
        // alert(currentSiteMarkStr)       //DX11
        // alert(currDataIndex)
        // 从vuex中 获取数据
        that.$store.dispatch('d2admin/waveBuffer/getSeiWaveSingleData', {
          siteMark: currentSiteMarkStr,
          channel: this.coordFlag
        }).then(res => {
          // 每次调用此函数时都会把所有的数据返回来
          this.$nextTick(() => {
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
          });
          if (typeof (res) != 'undefined') {
            // 拿到vuex的值
            for (let i = 0; i <res.length ; i++) {
              if (res[i]){
                let temp = res[i][1]
                let temp1 = temp + ' '
                //先将空值保存起来
                let arrayStr = JSON.stringify(that.sei.pointData)
                let arrayObj = JSON.parse(arrayStr)
                let obj = {
                  name: currDataIndex,
                  value: [currDataIndex, temp1 * 1]
                }
                arrayObj[currDataIndex] = obj
                that.sei.pointData = arrayObj
                that.sei.key = currentSiteMarkStr
                for (let j = 1; j < 11; j++) {
                  let afterIndex = currDataIndex + j
                  if (afterIndex < this.pointDataLen) {
                    this.sei.pointData[afterIndex] = {
                      name: afterIndex,
                      value: [afterIndex, null]
                    }
                  }
                }
                if (that.currPt[currentSiteMarkStr] >= that.pointDataLen - 1) {
                  that.currPt[currentSiteMarkStr] = 0
                } else {
                  that.currPt[currentSiteMarkStr] += 1
                }
              }
              }
            }






            // that.$set( arrayObj, currDataIndex, {
            //   name: currDataIndex,
            //   value: [currDataIndex, temp1*1]
            // })

            // 添加空隙




        })
        // console.log(this.sei)
      },
      historyData () {
        this.$router.push({
          path: 'hisData',
          query: {
            pointId: this.currentPointId
          }
        })

      },
      hisList (type) {
        this.$router.push({
          path: 'hisList',
          query: {
            id: type
          }
        })
      },
      preData () {
        let data = {
          'taskId': 39793241072, //任务ID编号
          'siteMark': this.form.point, //台站名，DX01到DX35
          'channel': this.form.channel.toLowerCase() //通道名，只有x,y,z三种
        }
        postUserList('/data/export/history/view', data).then(res => {
          if (res.code === '200') {
            this.$router.push({
              path: '/previewDetail',
              query: {
                taskId: 39793241072,
                point: this.form.point,
                channel: this.form.channel.toLowerCase()
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '出错啦!'
            })
          }
        })

      },
      getExportWave () {
        // postUserList('/data/retrieval/time/export/sei/')
      },
      previewDetail (row) {

      },
      downfile (val, type) {
        // this.centerDialogVisible=true
        let data = {
          'startTimestamp': this.value1[0],
          'endTimestamp': this.value1[1]
        }
        postUserList('/data/retrieval/time/export/' + type, data).then(res => {
          //console.log(res)
          // window.location.href = res.data.addr
          if (res.code == 200) {
            this.$notify({
              title: '成功',
              message: '任务创建成功，请等待系统生成',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '异常',
              message: '生成异常，请联系系统管理员',
              type: 'warning'
            })
          }
        })

      },
      coord (flag) {
        this.over()
        this.websocket1(flag)

        this.coordFlag = flag
        this.getPointData()
      },
      loadingType () {
      },
      websocket1 (flag) {
        // flag = flag ? flag : 'x'
        //211.71.235.253
        let ws = this.ws1
        ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/point/' + this.socket + '/' + this.$route.query.pointId + '/' + flag)
        ws.onopen = () => {
        }
        ws.onmessage = evt => {
          this.wsMessage(JSON.parse(evt.data))
        }
        ws.onclose = function () {
          console.log(1)
        }
        this.over = () => {
          ws.close()
        }
      },
      wsMessage (data) {
        // console.log(data)
        this.dis = data.dis
        this.sei = data.sei
        // console.log(data)
      },
      info () {
        this.socket = JSON.parse(Cookies.get('userInfo')).userId
        // 获取 楼层数据
        postUserList('/common/point/list').then(res => {
          this.data = res.data.pointList
          let dataList = res.data.pointList
          let point = this.$route.query.pointId
          let postData = {}
          let fData = {}
          for (let i = 0; i < dataList.length; i++) {
            if (point == dataList[i].pointId) {
              postData = dataList[i]
            }
            if (point != dataList[i].pointId && dataList[i].children.length != 0) {

              for (let j = 0; j < dataList[i].children.length; j++) {
                if (point == dataList[i].children[j].pointId) {
                  postData = dataList[i].children[j]
                  fData = dataList[i]
                }
              }
            }
          }
          this.handleNodeClick(postData)
        })
        let data = {
          'pageSize': 10,
          'pageNum': 1
        }
        postUserList('/data/event/list', data).then(res => {
          let data1 = {
            'pageSize': res.data.pageInfo.list.length,
            'pageNum': 1,
            'data': {
              'startTime': this.value1[0],
              'endTime': this.value1[1]
            }
          }
          postUserList('/data/event/list', data1).then(res => {
            for (let i = 0; i < res.data.pageInfo.list.length; i++) {
              res.data.pageInfo.list[i].EndTime = this.formatDate(res.data.pageInfo.list[i].eventEndTime)
              res.data.pageInfo.list[i].StartTime = this.formatDate(res.data.pageInfo.list[i].eventStartTime)
            }
            this.tableData1 = res.data.pageInfo.list
          })
        })
      },
      // 时间戳转换
      formatDate (value) {
        return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/, ' ')
      },
      findNode (point) {
        let dataList = this.data
        let postData = {}
        let fData = {}
        for (let i = 0; i < dataList.length; i++) {
          if (point == dataList[i].pointId) {
            postData = dataList[i]
          }
          if (point != dataList[i].pointId && dataList[i].children.length != 0) {

            for (let j = 0; j < dataList[i].children.length; j++) {
              if (point == dataList[i].children[j].pointId) {
                postData = dataList[i].children[j]
                fData = dataList[i]
              }
            }
          }
        }
        this.titleStr = fData.pointName + '-' + postData.pointName // postData.pointNo + '-'

      },
      // 获取 对应的点击的 楼层
      handleNodeClick (data) {
        // alert(data.pointId)
        if (data.pointId < 500) {
          this.over()
           this.websocket1('x')
          // this.ws1.close()
          this.sei = []
          this.dis = []
          this.currentPointNo = data.pointNo
          this.currentPointId = data.pointId
          this.plcPoint(data.pointId)
          // 通过 hasPlc 过滤显示页面
          this.isPlc = data.hasPlc === 1
          this.activeKey = this.isPlc ? 'first' : 'second'
          this.showBox = this.isPlc
          this.hasDis = data.hasDis
          // console.log(data)
          this.findNode(data.pointId)
          this.createCurrentPt()
          this.createDom1()
          // this.getPointData()
        }
      },
      // PLC参数信息
      plcPoint (pointId) {
        let dataJson = {
          'pointId': pointId
        }
        postUserList('/common/point/plc', dataJson).then(res => {
          if (res.data.plcInfo){
            this.plcInfoData = res.data.plcInfo
            this.plcPointSensor(res.data.plcInfo.terminalVirtualIp)
          }

        })
      },
      // PLC传感器数据
      plcPointSensor (terminalVirtualIp) {
        /*  "10.16.44.1" */
        let dataJson = {
          'terminalVirtualIp': terminalVirtualIp
        }
        postUserList('/common/point/plc/data', dataJson).then(res => {
          // console.log(res)
          this.plcData = res.data.data
        })
      },
      // 关闭节点电源
      closeDoor () {
        this.$confirm('是否确定关闭该设备?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let dataJdon = {
            'terminalVirtualIp': this.plcInfoData.terminalIp,// terminalIp
            'terminalName': this.plcInfoData.terminalName // terminalName
          }
          postUserList('/common/point/plc/power/off', dataJdon).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.successTitle()
            } else {
              this.errorTitle(res.msg)
            }
          })
        })

      },
      // 获取数据后的提示
      errorTitle (val) {
        this.$notify({
          title: '警告',
          message: val,
          type: 'warning'
        })
      },
      successTitle () {
        this.$notify({
          title: '通知',
          message: '正在关闭重启',
          type: 'success'
        })
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
      showSearchFlag () {
        this.info()
        this.showSearch = !this.showSearch
      },

      changeTab (val) {
        if (val !== this.activeKey) {
          this.showBox = !this.showBox
        }
        this.activeKey = val
      },
      handleClick (row) {
        // console.log(row)
        this.tableShow = !this.tableShow
      },
      // 角色管理
      handleSelectionChange1 (val) {
        this.multipleSelection1 = val
      },
      // 返回上一层
      backOne () {
        this.tableShow = true
      }
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

  .el-input__inner {
    background-color: transparent;
  }
</style>
<style scoped>
  /deep/ .el-table th {
    background-color: transparent;
  }

  /* 表尾 */
  /deep/ .el-table .el-table__footer-wrapper tbody td {
    background-color: transparent;
  }

  /* 表头 */
  /deep/ .el-table__header-wrapper thead div {
    background-color: transparent;
  }

  /* hover效果 */
  /deep/ .el-table tbody tr:hover > td {
    background-color: transparent;
  }

  /deep/ .el-tree-node__label {
    width: auto;
    float: right;
    font-family: “Trebuchet MS”, Arial, Helvetica, sans-serif;
    font-size: 25px;
    color: #999999;
    height: 20px;
    letter-spacing: 5px;
  }

  /deep/ .el-tree-node__label:hover {
    color: #bcd6ff;
  }

  /deep/ .el-tree-node__content {
    height: 36px;
  }

  /deep/ .el-tree-node__content:hover {
    background-color: transparent;
  }

  /deep/ .el-dialog__title {
    color: #bcd6ff;
  }

  /deep/ .el-dialog--center .el-dialog__body {
    text-align: center;
  }

  /deep/ .el-dialog {
    background-color: transparent;
  }
</style>


