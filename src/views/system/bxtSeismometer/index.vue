<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-back style="z-index: 999">

            <div class="zero" style="font-size: 18px;margin: 0 auto;" slot="left">
<!--              <el-button  size="mini" round plain @click="SeismometerSetZero">-->
<!--                <i class="el-icon-setting"></i>-->
<!--                地震计调零</el-button>-->
<!--              <div class="btn-search" style="margin: 0 auto">-->
<!--                <el-button round plain @click="hisList">导出历史</el-button>-->
<!--              </div>-->
              </div>
      <div class="form"  >

        <!--        <Dform :sign="'2'">-->
        <!--        </Dform>-->
        <el-form ref="form" :model="form" label-width="70px"  inline>
<!--          <el-form-item style="" label="点位" label-width="45px">-->
<!--            <el-select :popper-append-to-body="false" style="width: 85px;margin-right: 10px;"-->
<!--                       v-model="form.point" placeholder="选择">-->
<!--              &lt;!&ndash;              <el-option label="24" value="24"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="30" value="30"></el-option>&ndash;&gt;-->
<!--              <el-option-->
<!--                         label="所有" value="All"-->
<!--              ></el-option>-->
<!--              <el-option v-for="item in 35"-->
<!--                         :label="`D${item<0?'0'+item:item}`" :value="`D${item<0?'0'+item:item}`"-->
<!--              ></el-option>-->

<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="方向" label-width="45px">-->
<!--            <el-select :popper-append-to-body="false" style="width: 60px;margin-right: 10px;"-->
<!--                       v-model="form.axis" placeholder="选择">-->
<!--              <el-option label="X" value="X"></el-option>-->
<!--              <el-option label="Y" value="Y"></el-option>-->
<!--              <el-option label="Z" value="Z"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        -->
          <el-form-item style="" label="时间" label-width="45px">
            <el-select :popper-append-to-body="false" style="width: 85px;margin-right: 10px;"
                       v-model="form.time" placeholder="选择">
              <!--              <el-option label="24" value="24"></el-option>-->
              <!--              <el-option label="30" value="30"></el-option>-->
              <el-option v-for="item in timeList"
                         :label="item.label" :value="item.value"
              ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item>
<!--              <div class="time">-->
<!--                <el-date-picker-->
<!--                  @change="handelTime"-->
<!--                  v-model="time"-->
<!--                  type="datetimerange"-->
<!--                  range-separator="至"-->
<!--                  start-placeholder="开始日期"-->
<!--                  end-placeholder="结束日期">-->
<!--                </el-date-picker>-->
<!--              </div>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
<!--        <div class="btn-search" style="margin: 0 auto">-->
<!--          <el-button round plain @click="exportList" :disabled="displayBtn">导出</el-button>-->
<!--        </div>-->
<!--        <div class="btn-search" style="margin: 0 auto">-->
<!--          <el-button round plain @click="hisList">导出历史</el-button>-->
<!--        </div>-->

    </d-back>

    <div class="body">
      <d-table-wave2 :count="form.time"  ref="wave" :form="form" :sTime="stime" :eTime="eTime" :socketID="socket" mHeight="780"></d-table-wave2>
      <div class="footer" style="border-top: 1px solid #bcd6ff;height: 30px;display: flex;position: fixed;bottom: 0;left: 0;right: 0;margin-top: 50px;background-color: rgb(13,33,66);width: 100%;">
        <div class="f-l"
             style="text-align: center;width: 5%;height: 30px;line-height: 30px;border-right: 1px solid #bcd6ff;color: #bcd6ff;margin-right: 2px;">
          时间(/s)
        </div>
        <div class="f-r"
             style="width: 89%;color: #bcd6ff;line-height: 30px;display: flex;justify-content: space-between;padding-right: 40px;padding-left: 15px;">
          <div v-for="item in form.time*1">{{item}}</div>

        </div>
      </div>
    </div>

  </tabMains>
</template>

<script>
  import tabMains from '../../../components/DTabs'
  import DTab from '../../../components/DTabs/info'
  import DPane from '../../../components/DTabs/pane'
  import DBack from '../../../components/DBack'
  import DBg from '@/components/DBackground'
  import DTableWave from '@/components/DTableWave'
  import DTableWave2 from '@/components/DTableWave2'
  import Dform from '@/components/Dform'
  import Cookies from 'js-cookie'
  import {postUserList} from '@/api/request'

  export default {
    data() {
      return {
        sign: false,
        timeList: [

          {
            label: '10s',
            value: '10',
            sign:'1000'
          },
          {
            label: '25s',
            value: '25',
            sign:'2500'
          },
          {
            label: '30s',
            value: '30',
            sign:'3000'
          }
        ],
        form: {
          time: '10',
          point:'',
          axis: 'X',
        },
        count: '',
        socket: '',
        time: '',
        stime: '',
        eTime: '',
        displayBtn: true
      }
    },
    methods: {
      submit() {
        this.$refs.wave.submit('xxx')
      },
      SeismometerSetZero() {
        this.$router.push({
          path: 'setZero',
          // query: {
          //   id: 'sei'
          // }
        })
      },
      hisList() {
        this.$router.push({
          path: 'hisList',
          query: {
            id: 'sei'
          }
        })
      },
      exportList() {
        let data = {
          startTimestamp: this.stime,
          endTimestamp: this.eTime,
        }
        postUserList('/data/retrieval/time/export/dis', data).then(res => {
          this.$notify({
            title: '成功',
            message: '导出创建成功，请稍后于到【导出历史】查看',
            type: 'success'
          })
        })
      },
      init() {
        this.socket = JSON.parse(Cookies.get('userInfo')).userId
      },
      handelTime(val) {
        // console.log(val)
        let sTime = String(val[0]).split(' ')[2]
        let eTime = String(val[1]).split(' ')[2]
        if (sTime !== eTime) {
          this.$notify({
            title: '警告',
            message: '仅可查询相同日期的数据',
            type: 'warning'
          })
          return
        }
        this.displayBtn = false
        this.stime = this.dateFormat(this.time[0])
        this.eTime = this.dateFormat(this.time[1])
      },
      // 把获取到的日期传进来
      dateFormat(dateData) {
        let date = new Date(dateData)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = date.getHours()
        let mm = date.getMinutes()
        let s = date.getSeconds()
        const time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
        let date1 = new Date(time)
        let time1 = date1.getTime()
        return time1
      }
    },
    beforeMount() {
      this.init()
    },
    components: {
      tabMains,
      DTab,
      DPane,
      DBg,
      DBack,
      DTableWave,
      Dform,
      DTableWave2
    },
  }
</script>


<style scoped>
  .time {
    display: flex;
  }

  .btn-search >>> .el-button {
    background: transparent;
    color: white;
    margin-left: 10px;
  }

  .time >>> .el-range-input {
    background: transparent;
    color: white;
  }

  .zero >>> .el-button {
    background: transparent;
    color: white;
    margin-left: 10px;
  }

</style>
<style>
  .el-date-range-picker__time-header, .el-picker-panel__body-wrapper, .el-picker-panel__footer {
    background: #0c2346 !important
  }

  .el-picker-panel__icon-btn {
    color: white;
  }
  .el-picker-panel {
    color: #409EFF;
  }
  .el-date-table td.next-month, .el-date-table td.prev-month {
    color: #545454;
  }
</style>

