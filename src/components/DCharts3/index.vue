<template>
  <div :id="ids" style="width: 100%;height:100px"></div>
</template>

<script>
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
        if (n !== o) {
          console.log(n);
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
        // console.log(newValue)
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
  beforeMount() {
    this.$nextTick(() => {
      this.newGetMap()
    })
  },
  methods: {
    // 排序
    sortDataChart(val) {
      // console.log(val);
      let value = JSON.parse(JSON.stringify(val))
      let arr = []
      arr = value.sort((a, b) => {
        return a.value[1] - b.value[1]
      })
      this.sortMax = arr[0].value[1]
      this.sortMin = arr[arr.length - 1].value[1]
    },
    // 清理echarts
    deleChart() {
      document.getElementById(this.ids).removeAttribute('_echarts_instance_')
    }
    ,
    // 在data中定义option
    newGetMap() {
      this.dom = this.$echarts.init(document.getElementById(this.ids))
      const  option = {
        series: [
          {
            type: 'gauge',
            startAngle: 150,
            endAngle: 30,
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#FF6E76'],
                  [0.5, '#FDDD60'],
                  [0.75, '#58D9F9'],
                  [1, '#7CFFB2']
                ]
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 6,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 6,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 5
              }
            },
            axisLabel: {
              color: '#464646',
              fontSize: 8,
              distance: -60,
              formatter: function (value) {
                if (value === 0.875) {
                  return 'A';
                } else if (value === 0.625) {
                  return 'B';
                } else if (value === 0.375) {
                  return 'C';
                } else if (value === 0.125) {
                  return 'D';
                }
                return '';
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 10
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function (value) {
                // return Math.round(value * 100) + '分';
              },
              color: 'auto'
            },
            data: [
              {
                value: 0.7,
                name: ''
              }
            ]
          }
        ]
      };
      option && this.dom.setOption(option)
    }
  }
}
</script>
