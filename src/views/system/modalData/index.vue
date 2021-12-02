<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-tab defaultKey="1" tabTitle="" tabIcon="">
      <d-pane actKey="1" label="波形">
        <div  class="main-box">
          <div class="content-box">
            <d-item :data="caccPtData" :title="'加速度时程'"></d-item>
          </div>
          <div class="content-box">
            <d-item :data="velPtData" :title="'速度时程'"></d-item>
          </div>
          <div class="content-box">
            <d-item :data="resPtData" :title="'加速度反应谱'"></d-item>
          </div>
          <div class="content-box">
            <d-item :data="frePtData" :title="'加速度傅里叶谱'" :unit="'hz(赫兹)'"></d-item>
          </div>
          <div class="content-box">
            <d-item :data="disPtData" :title="'位移时程'"></d-item>
          </div>
          <div class="content-box">
            <!--        <iframe src="http://123.57.49.125:81" width="100%" height="100.3%" frameborder="0" scrolling="auto"-->
            <!--                id="iframe"></iframe>-->
            <img src="../../../assets/img/model.png" height="100%" width="100%"/><img src="" alt="">
          </div>

        </div>
      </d-pane>
      <d-pane actKey="2" label="图像">
        <div  class="main-box">
          <div class="content-box1" v-for="item in modalVideo">
            <div class="header" style="width: 100%;height: 40px;text-align: center;color: #bcd6ff;line-height: 50px;font-size: 20px">{{item.videoName}}</div>
            <video width="100%" height="89%" id="media" :src="item.videoAddress" controls="controls" autoplay="autoplay"
                   poster=""></video>
          </div>
<!--          <div class="content-box">-->
<!--            <img src="../../../assets/img/model.png" height="100%" width="100%"/><img src="" alt="">-->
<!--          </div>-->
<!--          <div class="content-box">-->
<!--            ><img src="../../../assets/img/model.png" height="100%" width="100%"/><img src="" alt="">-->
<!--          </div>-->
<!--          <div class="content-box">-->
<!--            <img src="../../../assets/img/model.png" height="100%" width="100%"/><img src="" alt="">-->
<!--          </div>-->
<!--          <div class="content-box">-->
<!--            <img src="../../../assets/img/model.png" height="100%" width="100%"/><img src="" alt="">-->
<!--          </div>-->
<!--          <div class="content-box">-->
<!--            &lt;!&ndash;        <iframe src="http://123.57.49.125:81" width="100%" height="100.3%" frameborder="0" scrolling="auto"&ndash;&gt;-->
<!--            &lt;!&ndash;                id="iframe"></iframe>&ndash;&gt;-->
<!--            <img src="../../../assets/img/model.png" height="100%" width="100%"/><img src="" alt="">-->
<!--          </div>-->

        </div>
      </d-pane>
    </d-tab>

  </tabMains>
</template>

<script>
  import tabMains from '../../../components/DTabs'
  import DTab from '../../../components/DTabs/info'
  import DPane from '../../../components/DTabs/pane'
  import DBack from '../../../components/DBack'
  import DBg from '@/components/DBackground'
  import DChart from '@/components/DChart'
  import DChart2 from '@/components/DCharts2'
  import DChart3 from '@/components/DCharts3'
  import DChart4 from '@/components/DCharts4'
  import DChart5 from '@/components/DCharts5'
  import DChart6 from '@/components/DCharts6'
  import DItem from '@/components/DItem'

  import DTable from '@/components/DTable'
  import Cookies from 'js-cookie'
  import { postUserList, postChangeUser } from '@/api/request'

  export default {
    data () {
      return {
        modalVideo:'',
        currentIndex: 0,
        option: ['波形', '图像', '数据'],
        showData: [],
        oldData: [],
        newData: [],
        queue: [],
        form: {},
        time: '30',
        //轴线
        axis: 'X',
        show30: [],
        // show_
        changeId: 1,
        //地震计数据
        tableDataList: [],
        //加速度时程
        caccPtData: [],
        //速度时程数据
        velPtData: '',
        //加速度反应谱数据
        resPtData: '',
        //加速度傅里叶谱数据
        frePtData: '',
        //位移时程数据
        disPtData: '',
        ws: '',
        ws2: '',
        chn: 'x',
        socket: '',
        options: [{
          value: 'F1',
          label: 'F1'
        }, {
          value: 'F2',
          label: 'F2'
        }, {
          value: 'F3',
          label: 'F3'
        }, {
          value: 'F4',
          label: 'F4'
        }, {
          value: 'F5',
          label: 'F5'
        }, {
          value: 'B1',
          label: 'B1'
        }, {
          value: 'B2',
          label: 'B2'
        }],
        value: 'F1',
        imgList: {}
      }
    },
    beforeDestroy () {
      // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
      // 在需要主动关闭ws的地方都可以调用该方法
      // closeWebsocket()
      this.over()
    },
    methods: {
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
        return that.tableDataList
      },
      loadingType (val) {
        this.loading = val
      },
      init () {
        this.socket = JSON.parse(Cookies.get('userInfo')).userId
        // this.getList(this.value)
      },
      changePho (val) {
        // console.log(val)
        this.getList(val)
      },
      getModalVideo(){
        postChangeUser('/data/modal/video').then(res => {
          this.modalVideo=res.data.modalVideo
          //console.log(res)

        })
      },
      getList (val) {
        let data = {
          'floorName': val
        }
        postChangeUser('/data/modal/analysis', data).then(res => {
          // console.log(res.data.imgMap)
          this.imgList = res.data.imgMap
        })
      },
      //地震计
      websocket () {
        this.socket = JSON.parse(Cookies.get('userInfo')).userId
        let ws = this.ws
        // if (this.startTime !== '' && this.eTime !== '') {
        //   ws = new WebSocket('ws://123.57.49.125:80/dx_api_path/waveData/DisplacementData/range/' + this.id + '/' + this.startTime + '/' + this.endTime)
        // } else {
        //
        //   ws = new WebSocket('ws://123.57.49.125:80/dx_api_path/waveData/DisplacementData/' + this.id)
        // }
        // ws = new WebSocket('ws://123.57.49.125:80/dx_api_path/waveData/DisplacementData/range/' + this.id + '/' + this.startTime + '/' + this.endTime)
        // ws://127.0.0.1:8080/waveData/Seismometer/{uid}/{chn}
        //console.log(this.socket)
        //console.log('此时的chn', this.chn)
        // ws = new WebSocket('ws://192.168.137.36:8080/waveData/Seismometer/' + this.socket+'/'+this.chn)
        ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/' + this.socket + '/' + this.chn)
        console.log(ws)
        ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          console.log('数据发送中...')
        }
        ws.onmessage = evt => {
          // 接收数据
          //  console.log(JSON.parse(evt.data));
          this.wsMessage(JSON.parse(evt.data))
        }
        ws.onclose = function () {
          // console.log('连接已关闭...')
        }
        // 组件销毁时调用，中断websocket链接
        this.over = () => {
          ws.close()
        }
      },
      websocket2 () {
        let ws2 = this.ws2
        //ws://127.0.0.1:8080/waveData/modal/{uid}
        this.socket = JSON.parse(Cookies.get('userInfo')).userId
        ws2 = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/modal/' + this.socket)
        ws2.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          //console.log('数据发送中...')
        }
        ws2.onmessage = evt => {
          // 接收数据
          // console.log(JSON.parse(evt.data));
          this.wsMessage2(JSON.parse(evt.data))
        }
        ws2.onclose = function () {
          // console.log('连接已关闭...')
        }
        // 组件销毁时调用，中断websocket链接
        this.over = () => {
          ws2.close()
        }
      },
      //地震计数据
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
        let seiWaveDataLength = 1000
        //获取新数据(只是其中的一条数据)
        // let newData = data;
        //获取旧数据(需要遍历 )
        //console.log(this.tableDataList)
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
          if (this.tableDataList[siteMarkIndex].pointData.length >= seiWaveDataLength) {
            this.tableDataList[siteMarkIndex].pointData.shift()
          }
          this.tableDataList[siteMarkIndex].pointData.push(newData[i])
        }
        //console.log(this.tableDataList[siteMarkIndex].pointData);
      },

      // wsMessage2(data) {
      //   // let result = []
      //   // // 每条数据的 key
      //   // let codeKey = Object.keys(data) // 'A'
      //   // // key 下的数据
      //   // let codeValueKey = Object.values(data)[0].key  // key ''
      //   // // 点数据
      //   // let codeValueSensorData = Object.values(data)[0].pointData  // sensorData []
      //   // // console.log(codeValueSensorData);
      //   // let codeValueCycleValueData = Object.values(data)[0].cycleValue  // sensorData []
      //   // // 最大值
      //   // let codeValueMaxValueData = Object.values(data)[0].maxValue  // sensorData []
      //   // // 健康检测
      //   // let codeValueHealth = Object.values(data)[0].health  // health []
      //   //
      //   //
      //   //
      //   //设置步长
      //   let seiWaveDataLength = 2000;
      //   //获取新数据(只是其中的一条数据)
      //   // let newData = data;
      //   //获取旧数据(需要遍历 )
      //
      //   //   for (let i = 0; i < this.velPtData.length; i++) {
      //   //     //找到对应的位置
      //   //     if (waveType == 'velPt') {
      //   //       if (codeValueKey === this.velPtData[i].key) {
      //   //         this.velPtData[i].pointData = codeValueSensorData
      //   //         this.velPtData[i].type = waveType
      //   //       }
      //   //     }}
      //
      //   console.log(this.velPtData)
      //   let siteMarkIndex = -1;
      //   for(let i = 0; i < this.velPtData.length; i++){
      //     if(this.velPtData[i].key == Object.keys(data)[0]){
      //       siteMarkIndex = i;
      //       break;
      //     }
      //   }
      //   let oldData = this.velPtData[siteMarkIndex].pointData;
      //   let newData = data[Object.keys(data)[0]].pointData
      //   let newerTimestampIndex = -1;
      //   if(oldData.length == 0){
      //     this.velPtData[siteMarkIndex].pointData = newData;
      //     return;
      //   }
      //   for(let i = 0; i < newData.length; i++){
      //     if(oldData[oldData.length - 1].name < newData[i].name){
      //       newerTimestampIndex = i;
      //       break;
      //     }
      //   }
      //   for(let i = newerTimestampIndex; i < newData.length; i++){
      //     if(this.velPtData[siteMarkIndex].pointData.length >= seiWaveDataLength){
      //       this.velPtData[siteMarkIndex].pointData.shift()
      //     }
      //     this.velPtData[siteMarkIndex].pointData.push(newData[i])
      //   }
      //
      //
      // },
      wsMessage2 (data) {
        //console.log(data)
        // 拿到波形的数据    data
        let result = []
        // 每条数据的 key
        let codeKey = Object.keys(data) // 'A'
        // key 下的数据
        let codeValueKey = Object.values(data)[0].key  // key ''
        // console.log(codeValueKey);
        //获取类型
        let waveType = Object.values(data)[1]
        // console.log(waveType);
        // 点数据
        let codeValueSensorData = Object.values(data)[0].pointData  // sensorData []
        // console.log(codeValueSensorData);
        // 当前数据的分页位置
        // console.log(this.resPtData);
        // console.log(this.disPtData)g;
        // console.log(codeValueSensorData);
        for (let i = 0; i < this.velPtData.length; i++) {
          //找到对应的位置
          if (waveType == 'velPt') {
            if (codeValueKey === this.velPtData[i].key) {
              this.velPtData[i].pointData = codeValueSensorData
              this.velPtData[i].type = waveType
            }
          }
          if (waveType == 'frePt') {
            if (codeValueKey === this.frePtData[i].key) {
              this.frePtData[i].pointData = codeValueSensorData
              this.frePtData[i].type = waveType
            }
          }
          // console.log(this.frePtData);
          if (waveType == 'disPt') {
            if (codeValueKey === this.disPtData[i].key) {
              this.disPtData[i].pointData = codeValueSensorData
              this.disPtData[i].type = waveType
            }
          }

          if (waveType == 'resPt') {
            if (codeValueKey === this.resPtData[i].key) {
              this.resPtData[i].pointData = codeValueSensorData
              this.resPtData[i].type = waveType
            }
          }

          if (waveType == 'caccPt') {
            if (codeValueKey === this.caccPtData[i].key) {
              this.caccPtData[i].pointData = codeValueSensorData
              this.caccPtData[i].type = waveType
            }
          }
        }

        // 将DOM结构存储
        // console.log(this.tableDomList)

        // console.log(codeValueSensorData);
        // console.log(result);
        // console.log(this.tableDataList);
      },
      //提前创建 DOM [位移]
      //地震计数据
      createDom2 () {
        let zmArr = ['D']
        let newArr = []
        let newArr1 = []
        let result = []
        while (zmArr.length !== 0) {
          let arr = []
          if (zmArr[0] !== 'B') {
            for (let i = 0; i < 35; i++) {
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
                X: '东西',
                Y: '南北',
                Z: '垂直'
              }
              if (this.axis == 'X') {
                obj.sign = 'X'

              } else if (this.axis == 'Y') {
                obj.sign = 'Y'
              } else {
                obj.sign = 'Z'
              }
              if (uid < 10) {
                obj.key = zmArr[0] + obj.sign + +'0' + uid
              } else {
                obj.key = zmArr[0] + obj.sign + uid

              }
              obj.cs = cs[obj.sign]

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
       // console.log(newArr)
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
      createDom1 () {
        let zmArr = ['D']
        // let zmArr = ['A', 'B', 'C', 'D', 'E', 'O']
        let newArr = []
        let newArr2 = []
        let result = []
        while (zmArr.length !== 0) {
          let arr = []
          if (zmArr[0] !== 'B') {
            for (let i = 0; i < 35; i++) {
              let obj = {
                key: '',
                pointData: [],
                type: ''
              }
              let uid = i + 1
              if (uid < 10) {
                obj.key = zmArr[0] + 'X0' + uid
              } else {
                obj.key = zmArr[0] + 'X' + uid
              }
              // if (this.chn === 'X') {
              //   // x坐标
              //   if (uid < 10) {
              //     obj.key = zmArr[0] + 'X0' + uid
              //   } else {
              //     obj.key = zmArr[0] + 'X' + uid
              //   }
              // } else if (this.chn === 'Y') {
              //   // y坐标
              //   if (uid < 10) {
              //     obj.key = zmArr[0] + 'Y0' + uid
              //   } else {
              //     obj.key = zmArr[0] + 'Y' + uid
              //   }
              // } else {
              //   // Z坐标
              //   if (uid < 10) {
              //     obj.key = zmArr[0] + 'Z0' + uid
              //   } else {
              //     obj.key = zmArr[0] + 'Z' + uid
              //   }
              // }

              arr.push(obj)
            }
            newArr.push(arr)
          } else {
            // let arr = []
            for (let j = 0; j < 5; j++) {
              let obj = {
                key: '',
                pointData: [],
                type: '',
              }
              let uid = j + 1
              obj.key = 'B0' + uid
              arr.push(obj)
            }
            newArr.push(arr)
          }
          zmArr.shift()
        }

        //console.log(newArr)
        //将多维数组拆一维
        newArr2 = newArr.flat()

        this.velPtData = JSON.parse(JSON.stringify(newArr2))
        this.resPtData = JSON.parse(JSON.stringify(newArr2))
        this.frePtData = JSON.parse(JSON.stringify(newArr2))
        this.disPtData = JSON.parse(JSON.stringify(newArr2))
        this.caccPtData = JSON.parse(JSON.stringify(newArr2))
        // // 赋值给第一个分页
        this.tableDataLimit = result[0]
        // 将DOM结构存储
        this.tableDomList = result
      },
      subGroup (arr, len) {
        var newArr = []
        for (var i = 0; i < arr.length; i += len) {
          newArr.push(arr.slice(i, i + len))
        }
        return newArr
      },
      submit () {
        // console.log(this.axis);
        this.chn = this.axis.toLowerCase()
        //console.log(this.chn)
        this.websocket()
      },
    },
    beforeMount () {
      this.websocket2()
      this.websocket()
      this.init()
    },
    mounted () {
      this.$nextTick(() => {
        this.getModalVideo()
        this.createDom1()
        this.createDom2()
        let arr = []
        for (let i = 0; i < 30; i++) {
          arr.push(i)
        }
        arr.push(30)
        this.show30 = this.subGroup(arr, 3).map((item) => {
          return item[0]
        })
      })
    },
    components: {
      tabMains,
      DTab,
      DPane,
      DBg,
      DBack,
      DTable,
      DChart,
      DChart2,
      DChart3,
      DChart4,
      DChart5,
      DChart6,
      DItem
    },
  }
</script>

<style scoped>
  el-option {
    background-color: transparent;
  }

  .main-box {
    width: 100%;
    height: 850px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  /*.content-box:first-child {*/
  /*  position: relative;*/
  /*  box-sizing: border-box;*/
  /*  padding: 20px;*/
  /*  border: 1px solid #ccc;*/
  /*  width: 32%;*/
  /*  height: 49%;*/
  /*  !*background: green;*!*/
  /*  margin: 5px;*/
  /*  !*overflow: scroll;*!*/
  /*}*/
  .content-box1 {
    margin: 20px 5px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #bcd6ff;
    width: 32%;
    height: 46%;
    /*background: green;*/
    /*overflow: scroll;*/
  }
  .content-box {
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #bcd6ff;
    width: 32%;
    height: 49%;
    /*background: green;*/
    margin: 5px;
    /*overflow: scroll;*/
  }

  .content-box:last-child {
    width: 32%;
    height: 49%;
    padding: 0;
    /*background: green;*/
    margin: 5px;
    overflow: hidden;
  }

  .content-box .scroll {
    /*background-color: pink;*/
    height: 85%;
    overflow: scroll;
  }

  .content-box .scroll .item {
    display: flex;
    margin-top: 15px;
  }

  .content-box .scroll .item .left {
    width: 22%;
    padding-top: 5px;
    box-shadow: 2px 2px 5px #000;
    color: #bcd6ff;
    text-align: center;
    height: 20px;
    background-color: rgb(2, 37, 59);
    border-radius: 2px;
    font-size: 10px
  }

  .content-box .scroll .item .right {
    width: 78%;
    height: 18px;
    line-height: 18px;
  }

  .content-box .footer {
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

  .content-box .footer .left {
    width: 140px;
    color: #bcd6ff;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    margin-right: 10px;
    font-size: 14px;
  }

  .content-box .footer .right {
    height: 30px;
    line-height: 30px;
    display: flex;
  }

  .header {
    text-align: center;
    height: 40px;
    font-size: 18px;
    color: #bcd6ff;
    border-bottom: 1px solid #ccc;
  }

  .content-box .footer .right .num {
    margin-right: 20px;
    color: #bcd6ff;
    font-size: 14px
  }

  /*.item {*/
  /*  display: flex;*/
  /*  height: 40px;*/
  /*  margin-top: 20px;*/
  /*  width: 100%;*/
  /*}*/

  el-form {
    height: 60px;
  }

  .dashboard {
    width: 100%;
    height: 100%;
  }

  .active {
    background-color: rgba(255, 255, 255, .2);
  }

  .area span {
    line-height: 25px;
    text-align: center;
    display: inline-block;
    width: 80px;
    height: 25px;
    box-shadow: 1px 1px 3px;
    cursor: pointer;
    margin-right: 50px;
    font-size: 18px;
    color: #bcd6ff;
    border-radius: 3px;
  }

  .el-select-dropdown__item {
    background-color: transparent !important;
  }


  /* CSS Document */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  }

  /*滚动条的滑轨背景颜色*/
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(75, 75, 75, 0.58);
  }

  /*滑块颜色*/
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(48, 48, 48, 0.92);
  }

  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    display: none
  }

  /* 滑块整体设置*/
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 5px solid transparent;
  }

  ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .2) inset;
  }

  ::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, .5) inset;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
<style lang="scss" scoped>
  .searchBox {
    position: absolute;
    top: 40px;
    right: 50px;
  }
</style>
<style lang="scss">
  .el-select {
    width: 115px;
  }

  .input-with-select .el-input-group__prepend {
    background: rgba(10, 30, 55, 0.7);
    box-shadow: 0px 4px 4px rgba(49, 49, 49, 0.5);
  }

  .el-input-group {
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    // height: 46px;
    .el-input-group__append,
    .el-input-group__prepend {
      background-color: rgba(10, 30, 55, 0.7);
    }
  }

  .el-input__inner {
    background: rgba(10, 30, 55, 0.7);
  }

  // 修改下拉菜单背景颜色
  .el-scrollbar {
    background: #1d2f46;
    border-radius: 6px;
  }

  //下拉背景
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover,
  .el-color-picker__panel,
  .el-menu--popup,
  .el-message-box,
  .el-picker-panel .el-time-panel,
  .el-picker__popper.el-popper[role='tooltip'],
  .el-popover.el-popper,
  .el-select-v2__popper.el-popper[role='tooltip'],
  .el-select__popper.el-popper[role='tooltip'],
  .el-table-filter {
    opacity: 0.8;
    border-radius: 6px;
  }

  .el-popper__arrow {
    display: none;
  }

  .el-select-dropdown__item {
    color: #fff;
  }

  //修改输入框背景颜色
  .el-input-group > .el-input__inner {
    box-shadow: 0px 4px 4px rgba(49, 49, 49, 0.5);
    background: rgba(10, 30, 55, 0.7);
    // width: 260px;
    // height: 46px;
    border-left: 0;
    border-right: 0;
    font-size: 14px;
  }

  .el-input-group--prepend .el-input__inner,
  .el-input-group__append {
    background: rgba(10, 30, 55, 0.7);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .el-input-group__append {
    border-left: 0;
  }

  .el-select-dropdown__wrap,
  .el-scrollbar__wrap,
  .el-scrollbar__wrap--hidden-default {
    background: rgba(10, 30, 55, 0.7);
  }

  //修改输入框字体
  .el-input-group--append .el-input__inner,
  .el-input-group__prepend {
    font-size: 14px;
    color: #ffff;
  }

  .left-dashboard {
    width: 120px;
    padding-top: 5px;
    box-shadow: 2px 2px 5px #000;
    color: #bcd6ff;
    text-align: center;
    height: 120px;
    /*background-color: red;*/
    /*background-color: rgb(2, 37, 59);*/
    border-radius: 2px;
    font-size: 10px
  }

  // 修改搜索按钮icon
  .el-icon-my-export {
    /*background: url('./img/search.png') center no-repeat;*/
    background-size: cover;
  }

  // 修改搜索按钮icon
  .el-icon-my-export:before {
    content: '替';
    font-size: 25px;
    visibility: hidden;
  }

  //修改下拉框的字体
  .el-select-dropdown__list {
    padding: 5px;
    text-align: center;
    //修改单个的选项的样式
    .el-select-dropdown__item {
      padding: 0 0.2rem 0 0.2rem;
      color: #ffff;
      font-size: 16px;
    }

    .el-select-dropdown__item.selected {
      color: #ffff;
    }

    //item选项的hover样式
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      background-color: #67b784;
    }
  }

  // 修改下拉箭头左侧字体大小颜色
  .el-input-group__append button.el-button,
  .el-input-group__append div.el-select .el-input__inner,
  .el-input-group__append div.el-select:hover .el-input__inner,
  .el-input-group__prepend button.el-button,
  .el-input-group__prepend div.el-select .el-input__inner,
  .el-input-group__prepend div.el-select:hover .el-input__inner {
    color: #ffff !important;
    font-size: 16px;
  }

  // 修改鼠标选中输入框时输入框的颜色
  input.el-input__inner:focus {
    border-color: #fff;
  }

  /*body::-webkit-scrollbar {*/
  /*  display: none;*/
  /*}*/
</style>
