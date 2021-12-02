<template>
  <div id="main" style="width: 100%;height:378px;"></div>
</template>

<script>
import 'echarts-gl'

export default {
  name: 'index',
  data () {
    return {
      dom: null
    }
  },
  components: {},
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

      var chartDom = document.getElementById('main');
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        backgroundColor: '#000',
        grid: {
          top: '1%',   // 等价于 y: '16%'
          left: '1%',
          right: '1%',
          bottom: '1%',
          height: '200px',
          containLabel: true
        },
        globe: {
          baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
          heightTexture: ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',

          displacementScale: 0.1,

          shading: 'lambert',

          environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',

          light: {
            ambient: {
              intensity: 0.1
            },
            main: {
              intensity: 1.5
            }
          },

          layers: [{
            type: 'blend',
            blendTo: 'emission',
            texture: ROOT_PATH + '/data-gl/asset/night.jpg'
          }, {
            type: 'overlay',
            texture: ROOT_PATH + '/data-gl/asset/clouds.png',
            shading: 'lambert',
            distance: 5
          }]
        },
        series: []
      }

      option && myChart.setOption(option);
    }
  }
}
</script>

<style scoped>

</style>
