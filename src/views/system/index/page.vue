<template>
  <d2-container class="page" style="position: relative">
    <j-module title="机场航站楼震动及隔层位移检测系统">
      <div class="Main">
        <div class="page-left">

          <d-bg style="position: absolute;top: 119px;left: 20px;width: 522px;height: 475px" uid="1">
            <div style="position: absolute;top: 20px;left: 25px;color: white;font-size: 12px">
              当前量程: -{{range}} ~ {{range}}
            </div>
            <div style="position: absolute;top: 32px;left: 90px;color: white;font-size: 16px">
              <el-button style="line-height: 5px;" type="text" @click="updateRange('+')">+</el-button>
              <el-button style="margin-left: 20px;line-height: 5px;" type="text"
                         @click="updateRange('-')">-
              </el-button>
            </div>
            <div @click="handel(1)">
              <d-table2 :range="range" :eTime="eTime" :socketID="socket1" mHeight="340"/>
            </div>

            <div class="footer" style="height: 30px;display: flex;border-top: 1px solid #bcd6ff;margin-top: -12px;">
              <div class="f-l"
                   style="text-align: center;width: 60px;height: 30px;line-height: 30px;color: #bcd6ff;margin-right: 2px;">
                时间(/s)
              </div>
              <div class="f-r"
                   style="width: 80%;color: #bcd6ff;line-height: 30px;display: flex;flex-wrap: wrap; justify-content: space-between;">
                <div v-for="item in 10">
                  {{item}}
                </div>
                <div class="f-r-button">
                  <el-button style="line-height: 5px;" type="text">+</el-button>
                  <el-button style="margin-left: 20px;line-height: 5px;" type="text">-</el-button>
                </div>

              </div>
            </div>
            <!--            <div style="position:absolute;right: 85px;bottom: 15px">-->
            <!--              <div style="border: 1px solid #255097;width: 50px;height: 20px;line-height: 15px;text-align: center">-->
            <!--                <span style="color: white;font-size: 12px;cursor: pointer" >详情</span>-->
            <!--              </div>-->
            <!--            </div>-->
          </d-bg>


          <d-bg style="position: absolute;top: 647px;left: 20px;width: 522px;height: 403px" uid="2">
            <d-movie></d-movie>
          </d-bg>
        </div>
        <div class="page-main">
          <d-bg style="position: absolute;top: 99px;left: 579px;width: 761px;height: 641px" title=" " uid="3">
            <m-page></m-page>
          </d-bg>


          <div class="page-main-mid">
            <d-bg style="position: absolute;top: 773px;left: 564px;width: 166px;height: 219px" uid="4">
              <e-warn/>
              <!--              <div style="position:absolute;right: 15px;bottom: 15px">-->
              <!--                <div style="border: 1px solid #255097;width: 50px;height: 20px;line-height: 15px;text-align: center">-->
              <!--&lt;!&ndash;                  <span style="color: white;font-size: 12px;">详情</span>&ndash;&gt;-->
              <!--                </div>-->
              <!--              </div>-->
            </d-bg>


            <d-bg style="position: absolute;top: 774px;left: 745px;width: 609px;height: 218px" uid="5">
              <d-repair :listLog=listLog></d-repair>
              <div style="position:absolute;right: 25px;bottom: 20px">
                <div style="border: 1px solid #255097;width: 50px;height: 20px;line-height: 15px;text-align: center">
                  <span style="color: white;font-size: 12px;cursor: pointer" @click="handel(4)">详情</span>
                </div>
              </div>
            </d-bg>
          </div>
          <d-bg uid="6" style="position: absolute;top: 1006px;left: 565px;width: 788px;height: 44px">
            <m-user/>
          </d-bg>
        </div>
        <div class="page-right">
          <d-bg uid="7" style="position: absolute;top: 119px;left: 1375px;width: 522px;height: 476px;">
            <div style="position: absolute;top: 20px;left: 20px;color: white;font-size: 12px">
              当前高度: {{height}}cm
            </div>
            <div style="position: absolute;top: 32px;left: 85px;color: white;font-size: 16px">
              <el-button style="line-height: 5px;" type="text" @click="updateHeight('+')">+</el-button>
              <el-button style="margin-left: 20px;line-height: 5px;" type="text"
                         @click="updateHeight('-')">-
              </el-button>
            </div>
            <div @click="handel(7)">
              <d-table-wave :height="height" :socketID="socket2" mHeight="350"></d-table-wave>
            </div>
            <div class="footer" style="height: 30px;display: flex;border-top: 1px solid #bcd6ff;padding: 0 15px 0 0;">
              <div class="f-l"
                   style="text-align: center;width: 60px;height: 30px;line-height: 30px;color: #bcd6ff;margin-right: 2px">
                时间(/s)
              </div>
              <div class="f-r"
                   style="width: 65%;color: #bcd6ff;line-height: 30px;display: flex;flex-wrap: wrap; justify-content: space-between;">
                <div v-for="item in 5">
                  {{item}}
                </div>

              </div>

            </div>
            <!--            <div style="position:absolute;right: 85px;bottom: 15px">-->
            <!--              <div style="border: 1px solid #255097;width: 50px;height: 20px;line-height: 15px;text-align: center">-->
            <!--                <span style="color: white;font-size: 12px;cursor: pointer" >详情</span>-->
            <!--              </div>-->
            <!--            </div>-->

          </d-bg>
        </div>

        <d-bg uid="8"
              style="position: absolute;
                top: 647px;
                left: 1375px;
                width: 515px;
                height: 403px;
                display: flex;
                justify-content: center;
                align-items: center">
          <div style=";margin-top: 40px">
            <div id="main" style="width: 100%;height: 300px"></div>
            <!--              <video width="515" height="354" id="media" :src="videoUrl" controls="controls" autoplay="autoplay"-->
            <!--                      poster=""></video>-->

            <!--              <img src="../../../assets/img/model.png" height="100%" width="100%"/>-->
            <!--            <img src="../../../assets/img/4.png" width="100%" style="background-color: transparent;"/>-->
          </div>
          <div v-for="(item, index) in stringData"
               v-show=" item.item!= '屋顶网架' && item.item!= '室外自由场' "

               style="display: flex;">
            <!--            <div style="width: 150px;height: 20px;line-height: 20px;color: #bcd6ff;font-size: 22px"-->
            <!--                 :style="`${'position:absolute;top:'+(index*40+20)+'px;left:150px'}`">{{item.item}}-->
            <!--            </div>-->
            <!--            <img :src="item.urlImg" alt=""-->
            <!--                 :>-->
            <!--            <div :id="`floor${index}`" :style="`${'position:absolute;top:'+(index*40+20)+'px;left:'+item.left}`"-->
            <!--                 style="width: 10px;height: 10px;  cursor: pointer;border-radius: 50%;margin-top: 3px;background-color: red;"></div>-->

          </div>
          <div>
          </div>
        </d-bg>
      </div>
      </div>
    </j-module>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <d-bg uid="9">
        <d-earthquake/>
      </d-bg>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--    <el-button type="primary" @click="dialogVisible = false">我已收到</el-button>-->
  </span>
    </el-dialog>
  </d2-container>
</template>

<script>
  import DCard from '@/components/DCard'
  import JModule from '@/components/DModule'
  import DTable from '@/components/DTable'
  import DTable2 from '@/components/DTable2'
  import DTableWave from '@/components/DTableWave'
  import EWarn from '@/components/EWarn'
  import DRepair from '@/components/DRepair'
  import MUser from '@/components/MUser'
  import DEarthquake from '@/components/DEarthquake'
  import TEcharts from '@/components/TEcharts'
  import MPage from '@/components/MPage'
  import DMovie from '@/components/DMovie'
  import DBg from '@/components/DBackground'
  import DVideo from './video'
  import Cookies from 'js-cookie'

  // import Swiper from 'swiper';
  // import "swiper/dist/css/swiper.css"

  import { postUserList } from '../../../api/request'

  export default {
    components: {
      DVideo,
      DCard,
      JModule,
      DTable,
      EWarn,
      DRepair,
      MUser,
      DEarthquake,
      TEcharts,
      MPage,
      DMovie,
      DBg,
      DTableWave,
      DTable2
    },
    data () {
      return {
        flag:0,
        height: 60,
        ws: null,

        range: '0.1',
        iconList: [
          {
            urlImg: 'https://img0.baidu.com/it/u=327044208,2985464425&fm=26&fmt=auto',
            style: {
              position: 'absolute',
              left: 250 + 'px',
              top: 190 + 'px'
            }

          },
          {
            urlImg: 'https://img0.baidu.com/it/u=327044208,2985464425&fm=26&fmt=auto',
            style: {
              position: 'absolute',
              left: 250 + 'px',
              top: 160 + 'px'
            }

          },
          {
            urlImg: 'https://img0.baidu.com/it/u=327044208,2985464425&fm=26&fmt=auto',
            style: {
              position: 'absolute',
              left: 250 + 'px',
              top: 220 + 'px'
            }

          },
          {
            urlImg: 'https://img0.baidu.com/it/u=327044208,2985464425&fm=26&fmt=auto',
            style: {
              position: 'absolute',
              left: 250 + 'px',
              top: 320 + 'px'
            }

          },
          {
            urlImg: 'https://img0.baidu.com/it/u=327044208,2985464425&fm=26&fmt=auto',
            style: {
              position: 'absolute',
              left: 250 + 'px',
              top: 120 + 'px'
            }

          },
          {
            urlImg: 'https://img0.baidu.com/it/u=327044208,2985464425&fm=26&fmt=auto',
            style: {
              position: 'absolute',
              left: 250 + 'px',
              top: 250 + 'px'
            }

          },
          {
            urlImg: 'https://img0.baidu.com/it/u=327044208,2985464425&fm=26&fmt=auto',
            style: {
              position: 'absolute',
              left: 250 + 'px',
              top: 290 + 'px'
            }

          },
        ],
        floorPoint: [],
        floorData: [],
        stringData: [],
        dialogVisible: false,
        socket1: '',
        socket2: '',
        listLog: [],
        eTime: '',
        movieList: [],
        videoUrl: '',
        curron: 0,
      }
    },
    beforeMount () {

      this.info()
      // console.log(JSON.parse(Cookies.get('userInfo')));
      this.socket1 = JSON.parse(Cookies.get('userInfo')).userId
      this.socket2 = JSON.parse(Cookies.get('userInfo')).userId
      this.initM()
      this.websocket()

    },
    mounted () {
      var that = this
      // // 监听视频是否播放完毕
      // if (!this.state) {
      //   document.getElementById('media').loop = false // 不设置视频循环播放
      //   document.getElementById('media').addEventListener('ended', () => { //该视频播放是否已结束
      //     this.time = !this.time
      //     this.state = true
      //   }, false)
      // }
      // console.log('吾问无为谓无无无无无无无无无无无无')
      let video = document.getElementById('media')
      let curr = 0
      let vLen = that.movieList.length
      video.addEventListener('play', function () {
        // console.log(that.movieList)
        // console.log(that.movieList.length)
        // console.log(vLen)
        // console.log(curr)
      })
      video.addEventListener('pause', function () {
        // console.log('暂停')
      })
      video.addEventListener('ended', function () {

        if (that.movieList.length - 1 > curr) {
          // console.log('下一个')
          //  继续播放
          curr++
          that.videoUrl = that.movieList[curr].videoAddress
          video.play()
        } else {
          //  从头播放
          // console.log('循环')
          curr = 0
          that.videoUrl = that.movieList[curr].videoAddress
          video.play()
        }
        // console.log('结束')
        // if(this.data())
      })
    },
    methods: {
      updateHeight (type) {
        if (type === '+') {
          if (this.height <= 90) {
            this.height += 10
          }
        } else {
          if (this.height > 10) {
            this.height -= 10
          }

        }
      },
      updateRange (type) {
        if (type === '+') {
          if (this.range <= 100) {
            this.range *= 10
          }
        } else {
          if (this.range >= 0.01) {
            this.range /= 10
          }

        }
      },
      isStyle (val) {
        return {
          position: 'absolute',
          left: val.pos_x + 'px',
          top: val.pos_y + 'px',
        }
      },
      // 添加图片和样式
      isIcon (val) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].hasDis && !val[i].hasSei) {
            val[i].urlImg = this.imgList.hasDisImg
          }
          if (!val[i].hasDis && val[i].hasSei) {
            val[i].urlImg = this.imgList.hasSeiImg
          }
          if (val[i].hasDis && val[i].hasSei) {
            val[i].urlImg = this.imgList.hasSeiAll
          }
          val[i].isStyle = this.isStyle(val[i])
        }
        return val
      },
      initM () {
        postUserList('/data/modal/video').then(res => {
          this.movieList = res.data.modalVideo
          this.videoUrl = res.data.modalVideo[0].videoAddress
        })
      },
      info () {
        let sendData = {
          'pageSize': 10,
          'pageNo': 1
        }
        postUserList('/common/log/system', sendData).then(res => {
          // console.log(res)
          this.listLog = res.data.systemLog.list
        })
      },
      handel (id) {
        if (id === 1) {
          this.$router.push({
            path: 'bxtDisplacementData',
            query: {
              id: id
            }
          })
        }
        if (id === 7) {
          this.$router.push({
            path: 'bxtSeismometer',
            query: {
              id: id
            }
          })
        }
        if (id === 4) {
          this.$router.push({
            path: 'user',
            query: {
              id: id
            }
          })
        }
      },
      handleClose (done) {
        done()
      },
      websocket () {
        let ws = this.ws
        ws = new WebSocket('ws://211.71.235.253:80/dx_api_path/waveData/modal/floor/dis/' + this.socket1)

        ws.onopen = () => {
          // console.log('数据发送中...')
        }
        ws.onmessage = evt => {
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
      wsMessage (data) {
        // console.log(data)
        let arr1 = JSON.parse(JSON.stringify(Object.keys(data)))
        // console.log(arr1)
        let newArr1 = []
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== '屋顶网架' && arr1[i] !== '室外自由场') {
            newArr1.push(arr1[i])
          }
        }
        this.floorPoint = newArr1

        let arr2 = JSON.parse(JSON.stringify(Object.values(data)))
        let newArr2 = []
        for (let i = 0; i < arr2.length; i++) {
          if (i !== 0 && i !== 4) {
            newArr2.push(arr2[i])
          }
        }
        for (let i = 0; i < newArr2.length; i++) {
          if (newArr2[i].length !== 1) {
            // 摇晃
            let flag = newArr2[i][0]     //xxx
            if (flag === this.flag) {
            } else {
              // 获取第一个值
              newArr2[i] = newArr2[i][0]
            }
            this.flag = newArr2[i]
          }
        }
        newArr2= newArr2.map(item=>{
          return item[0]?item[0]:0
        })
        this.floorData = newArr2

        this.draw()
        this.floorPoint = []
        this.floorData = []
        // for (let key in data) {
        //   let o = {}
        //   if (key!== '屋顶网架'&&key!=='室外自由场'){
        //     o['name'] = key
        //     o['offset'] = data[key]
        //   }
        //
        //   this.stringData.push(o)
        // }
      },
      draw () {
        //console.log(this.floorPoint)
        //console.log(this.floorData)
        var chartDom = document.getElementById('main')
        var myChart = this.$echarts.init(chartDom)
        var option

        option = {
          // color:'red',
          legend: {
            data: ['航站楼偏移量'],
            textStyle: {
              fontSize: 15,
              color: '#bcd6ff'
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} <br/>偏移量 : {c}cm'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} cm',
              textStyle: {
                color: '#bcd6ff',
              },
            },
          },
          yAxis: {
            type: 'category',
            axisLine: { onZero: false },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#bcd6ff',
              },
            },
            boundaryGap: false,
            data: this.floorPoint
          },
          series: [
            {
              name: '航站楼偏移量',
              type: 'line',
              symbolSize: 10,
              symbol: 'circle',
              smooth: true,
              lineStyle: {
                width: 3,
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowBlur: 10,
                shadowOffsetY: 8
              },
              data: this.floorData
            }
          ]
        }

        option && myChart.setOption(option)

      }

    }
  }
</script>

<style lang="scss" scoped>
  .video-title {
    //background-image: url("");
  }

  //.el-table >>> th {
  //  background: none;
  //}
  //.el-table >>> tr{
  //  background: none ;
  //}
  .page {
    min-width: 1920px;
    min-height: 1080px;
    width: 1920px;
    height: 1080px;
    background: url("../../../assets/img/page-main.png");
    background-size: 100% 100%;

    .Main {

      //background: red;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      //height: 88vh;
      overflow: scroll;
      // 注释
      //min-width: 1780px;
      //overflow: hidden;
      //height: 88vh;
      .page-left {
        width: 28%;
        padding-bottom: 10px;
      }

      .page-main {
        width: 40%;
        padding-bottom: 10px;

        .page-main-mid {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 235px;
          overflow: auto;
        }
      }

      .page-right {
        width: 28%;
        padding-bottom: 10px;
      }
    }

    .Main::-webkit-scrollbar {
      display: none;
    }

  }


</style>
<style>
  .el-dialog, .el-pager li {
    background: #132139 !important;
    /*background: url("./src/assets/img/bx-border.png");*/
  }

  .el-dialog__footer, .el-dialog__header {
    padding: 0;
  }

</style>
