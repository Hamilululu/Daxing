<template>
  <div :id="ids" style="width: 100%;height:150px;">

  </div>
</template>

<script>
  import highcharts from 'highcharts'
export default {
  props: ['ids', 'options', 'changeIds'],
  data() {
    return {
      dataJson: [],
      dataArr: [],
      dom: null,
      sortMax: 0,
      sortMin: 0,
    }
  },
  computed: {},
  watch: {
    changeIds: {
      handler(n, o) {
        console.log(n, o);
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
      handler(newValue, oldValue) {
        let arr=JSON.parse(JSON.stringify(newValue))
        arr=newValue.map(item=>{
          return item.value
        })
        let show=arr.map(item=>{
          item=item.map(Number)
          return item
        })
        this.newGetMap(show)
        //获取新的数据newValue
        // console.log(newValue);
        // console.log(oldValue);
        //  console.log(newValue,oldValue)
        // this.sortDataChart(newValue)
        // if (this.dom) {
        //   this.setOption(newValue)
        // } else {
        //   this.newGetMap()
        // }
        // this.$emit('changeLoading', false)
      },
      immediate: true,
      deep: true
    },
  },
  beforeMount() {
    this.$nextTick(() => {
      this.newGetMap()
    })
  },
  methods: {
    // 在data中定义option
    newGetMap(arr) {
      console.log(arr);
      highcharts.chart(this.ids,
        {
        chart: {
          zoomType: 'x',
          backgroundColor: 'rgba(0,0,0,0)'
        },

        //隐藏右下角数据
        credits: {
          enabled: false//不显示LOGO
        },

        boost: {
          useGPUTranslations: true
        },
        xAxis: {
          tickWidth: 0,        //设置刻度标签宽度
          lineColor: 'rgba(0,0,0,0)',//设置坐标颜色
          lineWidth: 0,        //设置坐标宽度
          labels: {
            enabled: false
          },
        },

        yAxis: {
          title: '',
          gridLineWidth: 0,    //设置横向分区线宽度
          lineColor:'rgba(0,0,0,0)' ,//设置y轴颜色
          labels: {
            enabled: false
          }
        },
        // 主标题
        title: {
          // text: 'Highcharts drawing ' + n + ' points'
          text: ''
        },
        // 子标题
        // subtitle: {
        //   text: 'Using the Boost module'
        // },
        tooltip: {
          // 鼠标放上去  数据保留的小数 个数
          valueDecimals: 2,
          enabled:false
        },

          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
            series: [{
          showInLegend: false,
          //以下为纵轴数据
          data: arr,
          // color:"red"
        }]
      });
    }
  }
}
</script>
