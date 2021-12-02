<template>
  <div :ref="refs" :id="ids" style="width: 100%;height:60px;">
  </div>
</template>
<script>
  export default {
    props: ['ids', 'options', 'changeIds', 'range','refs'],
    data () {

      return {
        range:'',
        dataJson: [],
        dataArr: [],
        dom: null,
        sortMax: 0,
        sortMin: 0,
      }
    },
    computed: {},
    watch: {
      range:{
        handler (n, o) {
          // alert(n)
          this.range=n
        },
        immediate: true,
        deep: true
      },
      changeIds: {
        handler (n, o) {
          if (n !== o) {
            this.$nextTick(() => {
              this.deleChart()
              this.newGetMap()
            })
          }
        },
        immediate: true,
        deep: true
      },
      options: {
        handler (newValue, oldValue) {
          //获取新的数据newValue
          this.sortDataChart(newValue)
          if (this.dom) {
            this.setOption(newValue)
          } else {
            this.newGetMap()
          }
          // this.$emit('changeLoading', false)
        },
        immediate: true,
        deep: true
      },
    },
    beforeMount () {

    },
    mounted () {
      this.$nextTick(() => {
        this.newGetMap()
      })
    },
    methods: {
      // 排序
      sortDataChart (val) {

        let value = JSON.parse(JSON.stringify(val))
        let arr = []
        arr = value.sort((a, b) => {
          return a.value[1] - b.value[1]
        })
        // this.sortMax = arr[0].value[1]
        // this.sortMin = arr[arr.length - 1].value[1]
        this.sortMax = this.range
        this.sortMin = -this.range
      },
      // 清理echarts
      deleChart () {
        document.getElementById(this.ids).removeAttribute('_echarts_instance_')
      }
      ,
      // 更新的echarts数据
      setOption (value) {
        let data = value.map(item => {
          return item.value[1]
        })
        this.dom.setOption({
          series: [{
            data: value
          }],
          yAxis: {
            // data:value.map(item=>{
            //   return item.value[1]
            // }),
            // min: this.sortMin,
            // max: this.sortMax
          }
        })
      }
      ,
      // 在data中定义option
      newGetMap () {
        this.dom = this.$echarts.init(document.getElementById(this.ids))
       // this.dom = this.$echarts.init(this.$refs.ref)
        const option = {
          // tooltip: {
          //   trigger: 'axis',
          //   axisPointer: {
          //     animation: false
          //   }
          // },
          //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
          // grid: {
          //   top: '1%',   // 等价于 y: '16%'
          //   left: '1%',
          //   right: '1%',
          //   bottom: '1%',
          //   height: "10px",
          //   containLabel: true
          // },
          grid: {
            // top: '1%',   // 等价于 y: '16%'
            // left: '1%',
            // right: '1%',
            // bottom: '1%',
            // height: "80px",
            // containLabel: true
            top: 1,   // 等价于 y: '16%'
            left: 1,
            right: 1,
            bottom: 1,
            // height: "80px",
            // containLabel: true
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false// 不显示坐标轴刻度线
            },
            axisLine: {
              show: false// 不显示坐标轴线
            },
            axisLabel: {
              show: false// 不显示坐标轴上的文字
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            },
            axisTick: {
              show: false// 不显示坐标轴刻度线
            },
            axisLine: {
              show: false// 不显示坐标轴线
            },
            axisLabel: {
              show: true// 不显示坐标轴上的文字
            }
          },
          // position: function (point, params, dom, rect, size) {
          //   // 鼠标坐标和提示框位置的参考坐标系是：以外层d  iv的左上角那一点为原点，x轴向右，y轴向下
          //   // 提示框位置
          //   var x = 0 // x坐标位置
          //   var y = 0 // y坐标位置
          //   // 当前鼠标位置
          //   var pointX = point[0]
          //   var pointY = point[1]
          //   // 提示框大小
          //   var boxWidth = size.contentSize[0]
          //   var boxHeight = size.contentSize[1]
          //   // boxWidth > pointX 说明鼠标左边放不下提示框
          //   if (boxWidth > pointX) {
          //     x = 2
          //   } else { // 左边放的下
          //     x = pointX - boxWidth
          //   }
          //   // boxHeight > pointY 说明鼠标上边放不下提示框
          //   if (boxHeight > pointY) {
          //     y = 2
          //   } else { // 上边放得下
          //     y = pointY - boxHeight
          //   }
          //   return [x, y]
          // },
          textStyle: { // 提示框浮层的文本样式。
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 5
          },
          layoutCenter: ['300%', '300%'],
// 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
          layoutSize: 100,
          series: [{
            name: '当前数据',
            type: 'line',
            grid: {
              x: 1,
              y: 1,
              x2: 1,
              y2: 1,
              borderWidth: 1
            },
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 1// 折线宽度
                },
                // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#4C84FF' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#F07AAD' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
          }]
        }
        option && this.dom.setOption(option)
      }
    }
  }
</script>
