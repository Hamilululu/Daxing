<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import util from '@/libs/util'
  export default {
    name: 'app',
    data() {
      return {
        seiSocketIns: [{
          chn: 'x',
          ins: null
        }, {
          chn: 'y',
          ins: null
        }, {
          chn: 'z',
          ins: null
        }],
        tempId: '',
        total: 35,
        tableDataList: [],
        seiDt: 0.01,
        seiHz: 0,
        seiTime: 10,
        pointDataLen: 0,
        currPt: {

        },
        flushWaveDataTimer: null,
        waveTableBuf: {

        },
        waveTable: [{
          siteMark: 'DX01',
          ref: 'SeisWaveData-DX01',
          chartOptions: {
            animation: false,
            title: {
              text: null
            },
            dataZoom: [{
              type: 'inside',
              xAxisIndex: null,
              filterMode: 'empty',
            },
              {
                type: 'slider',
                yAxisIndex: 0,
                filterMode: 'empty'
              }
            ],
            series: [{
              data: [],
              showInLegend: false,
              connectNulls: false
            }]
          }
        },
          {
            siteMark: 'DX02',
            ref: 'SeisWaveData-DX02',
            chartOptions: {
              title: {
                text: null
              },
              series: [{
                data: [],
                showInLegend: false,
                connectNulls: true
              }],
              dataZoom: [{
                type: 'inside',
                xAxisIndex: null,
                filterMode: 'empty',
              },
                {
                  type: 'slider',
                  yAxisIndex: 0,
                  filterMode: 'empty'
                }
              ],
            }
          }
        ]
      }
    },
    watch: {
      '$i18n.locale': 'i18nHandle'
    },
    created() {
      this.i18nHandle(this.$i18n.locale)

    },
    beforeMount() {
      // this.getSnowflakeId()
      // this.createDom()
      // this.createBufferDom()
      // this.initSeiWaveComp()
      // this.createCurrentPt()
      // this.websocketX()
      // this.websocketY()
      // this.websocketZ()
      // console.log(this.getStoreWaveBufferData);
    },
    mounted() {

    },
    computed: {
      // 获取store的数据
      getStoreWaveBufferData() {
        return this.$store.state.d2admin.waveBuffer;
      },
    },
    methods: {
      i18nHandle(val, oldVal) {
        util.cookies.set('lang', val)
        document.querySelector('html').setAttribute('lang', val)
      },
      // 雪花算法
      // 获取id
      getSnowflakeId() {
        var Snowflake = (function() {
          function Snowflake(_workerId, _dataCenterId, _sequence) {
            this.twepoch = 1288834974657n;
            //this.twepoch = 0n;
            this.workerIdBits = 5n;
            this.dataCenterIdBits = 5n;
            this.maxWrokerId = -1n ^ (-1n << this.workerIdBits); // 值为：31
            this.maxDataCenterId = -1n ^ (-1n << this.dataCenterIdBits); // 值为：31
            this.sequenceBits = 12n;
            this.workerIdShift = this.sequenceBits; // 值为：12
            this.dataCenterIdShift = this.sequenceBits + this.workerIdBits; // 值为：17
            this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits; // 值为：22
            this.sequenceMask = -1n ^ (-1n << this.sequenceBits); // 值为：4095
            this.lastTimestamp = -1n;
            //设置默认值,从环境变量取
            this.workerId = 1n;
            this.dataCenterId = 1n;
            this.sequence = 0n;
            if (this.workerId > this.maxWrokerId || this.workerId < 0) {
              throw new Error('_workerId must max than 0 and small than maxWrokerId-[' + this.maxWrokerId + ']');
            }
            if (this.dataCenterId > this.maxDataCenterId || this.dataCenterId < 0) {
              throw new Error('_dataCenterId must max than 0 and small than maxDataCenterId-[' + this
                .maxDataCenterId + ']');
            }

            this.workerId = BigInt(_workerId);
            this.dataCenterId = BigInt(_dataCenterId);
            this.sequence = BigInt(_sequence);
          }
          Snowflake.prototype.tilNextMillis = function(lastTimestamp) {
            var timestamp = this.timeGen();
            while (timestamp <= lastTimestamp) {
              timestamp = this.timeGen();
            }
            return BigInt(timestamp);
          };
          Snowflake.prototype.timeGen = function() {
            return BigInt(Date.now());
          };
          Snowflake.prototype.nextId = function() {
            var timestamp = this.timeGen();
            if (timestamp < this.lastTimestamp) {
              throw new Error('Clock moved backwards. Refusing to generate id for ' +
                (this.lastTimestamp - timestamp));
            }
            if (this.lastTimestamp === timestamp) {
              this.sequence = (this.sequence + 1n) & this.sequenceMask;
              if (this.sequence === 0n) {
                timestamp = this.tilNextMillis(this.lastTimestamp);
              }
            } else {
              this.sequence = 0n;
            }
            this.lastTimestamp = timestamp;
            return ((timestamp - this.twepoch) << this.timestampLeftShift) |
              (this.dataCenterId << this.dataCenterIdShift) |
              (this.workerId << this.workerIdShift) |
              this.sequence;
          };
          return Snowflake;
        }());
        //console.time();
        var tempSnowflake = new Snowflake(1n, 1n, 0n);
        var tempId = tempSnowflake.nextId();
        this.tempId = tempId
        //console.timeEnd();
        Cookies.set('tempId', tempId, {
          expires: 7
        });
      },
      //设置数据格式
      createDom() {
        let arr = []
        let result = []
        let len = 0

        //初始化数据
        let pointData = []
        this.seiHz = 1 / this.seiDt
        // 获取步长
        this.pointDataLen = this.seiTime * this.seiHz
        for (let i = 0; i < this.pointDataLen; i++) {
          let key = (i + 1)
          //开辟 步长个空间
          pointData.push(null)
        }

        //创建globalDataSize个对象

        while (len !== this.total) {
          let obj = {
            cycleValue: '--',
            key: '',
            maxValue: '--',
            //pointData: [],
            pointData: pointData,
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
        //console.log(this.tableDataList);
      },
      createBufferDom() {
        let obj = {}
        let len = 1
        while (len != this.total + 1) {
          let key = len < 10 ? 'DX0' + (len * 1) : 'DX' + (len * 1)
          let keyObj = {
            x: [],
            y: [],
            z: []
          }
          obj[key] = keyObj
          len++
        }
        this.waveTableBuf = obj
      },
      createCurrentPt() {
        let obj = {}
        let len = 1
        while (len != this.total + 1) {
          let key = len < 10 ? 'DX0' + (len * 1) : 'DX' + (len * 1)
          let value = 1
          obj[key] = value
          len++
        }
        this.currPt = obj
      },
      initSeiWaveComp(){
        this.$store.dispatch('d2admin/waveBuffer/initSeiWaveBuffer', {})
        this.createSeiSocket()
        this.registerSocketMsg()
      },

      createSeiSocket() {
        let tempId=Cookies.get('tempId')
        for (let i = 0; i < 3; i++) {
          // let snowflakeIns = new Snowflake(i, i, 0n);
          let wsInstanse = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/' + tempId +
            '/' + this.seiSocketIns[i].chn)
          this.seiSocketIns[i].ins = wsInstanse
        }
      },
      registerSocketMsg() {
        let that = this
        for (let i = 0; i < 3; i++) {
          // wsInstanse  x  y  z
          let wsInstanse = this.seiSocketIns[i].ins
          wsInstanse.onmessage = e => {
            let msgObj = JSON.parse(e.data)
            // console.log(msgObj)
            // 获取对应的key     DX01  DX02 ....
            let siteMarkStr = Object.keys(msgObj)[0]
            // 获取对应的通道  x y z
            let channelStr = that.seiSocketIns[i].chn
            // 获取数据
            let pointData = msgObj[siteMarkStr].pointData
            // 存到vuex
            that.$store.dispatch('d2admin/waveBuffer/setSeiWaveBuffer', {
              siteMark: siteMarkStr,
              channel: channelStr,
              waveDataArray: pointData
            })
          }
        }
      },
      websocketX() {

        let ws = this.tempId
        // flag = this.coordFlag
        // console.log(this.startTime)
        // console.log(this.endTime)
        if (!this.startTime && !this.endTime) {
          // ws = new WebSocket('ws://192.168.137.36:8080/waveData/Seismometer/' + this.id + '/' + flag)
          //地震仪
          ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/' + this.id + '/' + 'x')
          // ws = new WebSocket('ws://10.160.97.198:8080/waveData/Seismometer/' + this.id + '/' + flag)
          console.log(ws)
        } else {
          // ws = new WebSocket('ws://192.168.13this.id 7.36:8080/waveData/Seismometer/range/' + this.id + '/' + flag +'/'+ this.startTime +'/' + this.endTime)
          ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/range/' + this.id + '/' + flag +
            '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
          // ws = new WebSocket('ws://10.160.97.198:8080/waveData/Seismometer/range/' + this.id + '/' + flag + '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
          console.log(ws)
        }
        // console.log(ws)
        ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          console.log('数据发送中...')
        }
        ws.onmessage = evt => {
          this.wsMessageX(JSON.parse(evt.data))
        }
        ws.onclose = function() {
          // 关闭 websocket
          console.log('连接已关闭...')
        }
        // 组件销毁时调用，中断websocket链接
        this.over = () => {
          ws.close()
        }
      },
      wsMessageX(data) {
        // 获取到对应的点位
        let siteMark = Object.keys(data)[0]
        //为了防止溢出写的判断，实际上没有用
        //拿到对应点位的data
        let newPointData = data[siteMark].pointData
        //循环遍历新data的长度
        for (let i = 0; i < newPointData.length; i++) {
          //查看缓冲区的对应通道的最后一个索引
          let bufferdataLastIndex = this.waveTableBuf[siteMark].x.length - 1
          //如果 缓冲区长度为0，或者 新data的时间>缓冲区的最后一个值的时间
          if (bufferdataLastIndex < 0 || newPointData[i].name > this.waveTableBuf[siteMark].x[
            bufferdataLastIndex].name) {
            // 向缓冲区中 添加数据
            this.waveTableBuf[siteMark].x.push(...newPointData)
          }
        }
        //存储到 vuex中
        this.$store.dispatch('d2admin/waveBuffer/set', this.waveTableBuf)
        if (this.waveTableBuf[siteMark].x.length != 0) {
          this.waveTableBuf[siteMark].x.shift()
        }
      }
    },
    websocketY() {
      let ws = this.tempId
      // flag = this.coordFlag
      // console.log(this.startTime)
      // console.log(this.endTime)
      if (!this.startTime && !this.endTime) {
        // ws = new WebSocket('ws://192.168.137.36:8080/waveData/Seismometer/' + this.id + '/' + flag)
        //地震仪
        ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/' + this.id + '/' + 'y')
        // ws = new WebSocket('ws://10.160.97.198:8080/waveData/Seismometer/' + this.id + '/' + flag)
        console.log(ws)
      } else {
        // ws = new WebSocket('ws://192.168.13this.id 7.36:8080/waveData/Seismometer/range/' + this.id + '/' + flag +'/'+ this.startTime +'/' + this.endTime)
        ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/range/' + this.id + '/' + flag +
          '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
        // ws = new WebSocket('ws://10.160.97.198:8080/waveData/Seismometer/range/' + this.id + '/' + flag + '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
        console.log(ws)
      }
      // console.log(ws)
      ws.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        console.log('数据发送中...')
      }
      ws.onmessage = evt => {
        this.wsMessageY(JSON.parse(evt.data))
      }
      ws.onclose = function() {
        // 关闭 websocket
        console.log('连接已关闭...')
      }
      // 组件销毁时调用，中断websocket链接
      this.over = () => {
        ws.close()
      }
    },
    wsMessageY(data) {
      // 获取到对应的点位
      let siteMark = Object.keys(data)[0]
      //为了防止溢出写的判断，实际上没有用
      //拿到对应点位的data
      let newPointData = data[siteMark].pointData
      //循环遍历新data的长度
      for (let i = 0; i < newPointData.length; i++) {
        //查看缓冲区的对应通道的最后一个索引
        let bufferdataLastIndex = this.waveTableBuf[siteMark].y.length - 1
        //如果 缓冲区长度为0，或者 新data的时间>缓冲区的最后一个值的时间
        if (bufferdataLastIndex < 0 || newPointData[i].name > this.waveTableBuf[siteMark].y[
          bufferdataLastIndex].name) {
          // 向缓冲区中 添加数据
          this.waveTableBuf[siteMark].y.push(...newPointData)
        }
      }
      // console.log(this.waveTableBuf);

    },
    websocketZ() {

      let ws = this.tempId
      // flag = this.coordFlag
      // console.log(this.startTime)
      // console.log(this.endTime)
      if (!this.startTime && !this.endTime) {
        // ws = new WebSocket('ws://192.168.137.36:8080/waveData/Seismometer/' + this.id + '/' + flag)
        //地震仪
        ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/' + this.id + '/' + 'z')
        // ws = new WebSocket('ws://10.160.97.198:8080/waveData/Seismometer/' + this.id + '/' + flag)
        console.log(ws)
      } else {
        // ws = new WebSocket('ws://192.168.13this.id 7.36:8080/waveData/Seismometer/range/' + this.id + '/' + flag +'/'+ this.startTime +'/' + this.endTime)
        ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/Seismometer/range/' + this.id + '/' + flag +
          '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
        // ws = new WebSocket('ws://10.160.97.198:8080/waveData/Seismometer/range/' + this.id + '/' + flag + '/' + this.startTime + '/' + this.endTime + '/' + this.form.time)
        console.log(ws)
      }
      // console.log(ws)
      ws.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        console.log('数据发送中...')
      }
      ws.onmessage = evt => {
        this.wsMessageZ(JSON.parse(evt.data))
      }
      ws.onclose = function() {
        // 关闭 websocket
        console.log('连接已关闭...')
      }
      // 组件销毁时调用，中断websocket链接
      this.over = () => {
        ws.close()
      }
    },
    wsMessageZ(data) {
      // 获取到对应的点位
      let siteMark = Object.keys(data)[0]
      //为了防止溢出写的判断，实际上没有用
      //拿到对应点位的data
      let newPointData = data[siteMark].pointData
      //循环遍历新data的长度
      for (let i = 0; i < newPointData.length; i++) {
        //查看缓冲区的对应通道的最后一个索引
        let bufferdataLastIndex = this.waveTableBuf[siteMark].z.length - 1
        //如果 缓冲区长度为0，或者 新data的时间>缓冲区的最后一个值的时间
        if (bufferdataLastIndex < 0 || newPointData[i].name > this.waveTableBuf[siteMark].z[
          bufferdataLastIndex].name) {
          // 向缓冲区中 添加数据
          this.waveTableBuf[siteMark].z.push(...newPointData)
        }
      }
      // console.log(this.waveTableBuf);

    },
    setDataPoint() {
      let seiDt = 0.01
      let seiHz = 1 / seiDt
      let seiTime = 10
      let pointDataLen = 10 * seiHz
      let currPt = 0.01
      // init PointData Object
      let pointData = []
      for (let i = 0; i < pointDataLen; i++) {
        // key即为值
        let key = seiDt * (i + 1)
        pointData.push({
          name: key,
          value: [key, null]
        })
      }
      // init PointData Object End
      pointData[(currPt * 1 / seiPt) - 1].value[1] = socketRecvDataValue
      currPt = pointData[((currPt + seiDt) * 1 / seiPt) - 1].name
    },


  }
</script>
<style lang="scss">
  @import '~@/assets/style/public-class.scss';

  #app {
    //background: #112344;
    min-width: 1920px;
    min-height: 1000px;
    //
    ////min-width: 1920px;
    ////min-height: 1080px;
    //width: 1920px;
    //height: 1080px;
    padding: 0;
    margin: 0;
    background: url("./assets/img/page-main.png");
    background-size: 100% 100%;
  }
</style>
