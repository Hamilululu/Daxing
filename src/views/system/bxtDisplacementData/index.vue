<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-back style="z-index: 999">
      <div class="zero" style="font-size: 18px;margin: 0 auto;" slot="left">
        <!--              <el-button  size="mini" round plain @click="SeismometerSetZero">-->
        <!--                <i class="el-icon-setting"></i>-->
        <!--                地震计调零</el-button>-->
        <!--        <div class="btn-search" style="margin: 0 auto">-->
        <!--          <el-button round plain @click="hisList">导出历史</el-button>-->
        <!--        </div>-->
      </div>
      <div class="form">
        <!--        <Dform :sign="'1'">-->

        <!--        </Dform>-->
        <el-form ref="form" :model="form" label-width="70px" inline>
          <!--          <el-form-item label="轴线" label-width="45px">-->
          <!--            <el-select :popper-append-to-body="false" style="width: 85px;margin-right: 10px;" size="mini"-->
          <!--                       v-model="form.axis" placeholder="请选择">-->
          <!--              <el-option label="全部" value="ALL"></el-option>-->
          <!--              <el-option label="X" value="X"></el-option>-->
          <!--              <el-option label="Y" value="Y"></el-option>-->
          <!--              <el-option label="Z" value="Z"></el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
<!--          <el-form-item style="" label="点位" label-width="48px">-->
<!--            <el-select :popper-append-to-body="false" style="width: 85px;margin-right: 8px;"-->
<!--                       v-model="form.point" placeholder="选择">-->
<!--              &lt;!&ndash;              <el-option label="24" value="24"></el-option>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-option label="30" value="30"></el-option>&ndash;&gt;-->
<!--              <el-option v-for="item in pointData"-->
<!--                         :label="item.label" :value="item.value"-->
<!--              ></el-option>-->

<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item style="" label="时间" label-width="48px">
            <el-select :popper-append-to-body="false" style="width: 85px;margin-right: 7px;"
                       v-model="form.time" placeholder="选择">
              <!--              <el-option label="24" value="24"></el-option>-->
              <!--              <el-option label="30" value="30"></el-option>-->
              <el-option v-for="item in timeList"
                         :label="item.label" :value="item.value"
              ></el-option>

            </el-select>
          </el-form-item>
<!--          <el-form-item>-->
<!--            <div class="time">-->
<!--              <el-date-picker-->
<!--                @change="handelTime"-->
<!--                v-model="time"-->
<!--                type="datetimerange"-->
<!--                range-separator="至"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期">-->
<!--              </el-date-picker>-->
<!--            </div>-->
<!--          </el-form-item>-->

          <el-form-item>
            <el-button type="primary" @click="submit">确定</el-button>
          </el-form-item>

        </el-form>
      </div>

    </d-back>
    <d-table :count="form.time" ref="wave" :form="form" :sTime="stime" :eTime="eTime" :socketID="socket" mHeight="800"/>
    <div class="footer"
         style="display: flex;border-top: 1px solid #bcd6ff;position: fixed;bottom: 0;left: 0;right: 0;background-color: rgb(13,33,66);">
      <div class="f-l"
           style="text-align: center;width: 120px;height: 30px;line-height: 30px;border-right: 1px solid #bcd6ff;color: #bcd6ff;margin-right: 2px;">
        时间(/s)
      </div>
      <div class="f-r"
           style="width: 87%;color: #bcd6ff;line-height: 30px;display: flex;flex-wrap: wrap; justify-content: space-between;">
        <!--        <div v-for="item in form.time*1"  v-if="form.time*1<=20">-->
        <!--          {{item}}-->
        <!--        </div>-->
        <!--        <div v-else v-for="item in form.time*1">-->
        <!--          {{item%4==0?item:''}}-->
        <!--        </div>-->
        <div v-for="item in form.time*1">{{item}}</div>
<!--        <div v-for="item in form.time*1">{{form.time*1}}</div>-->
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
  import Dform from '@/components/Dform'

  import DTable from '@/components/DTable'
  import Cookies from 'js-cookie'
  import { postUserList } from '../../../api/request'

  export default {
    data () {
      return {
        form: {
          time: '10',
          point: '',
          axis: 'X',
        },
        pointData: [
          {
            label: 'All',
            value: 'All'
          },
          {
            label: 'A01',
            value: 'A01'
          },
          {
            label: 'A02',
            value: 'A02'
          },
          {
            label: 'A03',
            value: 'A03'
          },
          {
            label: 'B01',
            value: 'B01'
          },
          {
            label: 'B02',
            value: 'B02'
          },
          {
            label: 'B03',
            value: 'B03'
          },
          {
            label: 'B04',
            value: 'B04'
          },
          {
            label: 'B05',
            value: 'B05'
          },
          {
            label: 'C01',
            value: 'C01'
          },
          {
            label: 'C02',
            value: 'C02'
          },
          {
            label: 'C03',
            value: 'C03'
          },
          {
            label: 'D01',
            value: 'D01'
          },
          {
            label: 'D02',
            value: 'D02'
          },
          {
            label: 'D03',
            value: 'D03'
          },
          {
            label: 'E01',
            value: 'E01'
          },
          {
            label: 'E02',
            value: 'E02'
          },
          {
            label: 'E03',
            value: 'E03'
          },
          {
            label: 'O01',
            value: 'O01'
          },
          {
            label: 'O02',
            value: 'O02'
          },
          {
            label: 'O03',
            value: 'O03'
          },

        ],

        timeList: [

          {
            label: '10s',
            value: '10',
            sign: '1000'
          },
          {
            label: '25s',
            value: '25',
            sign: '2500'
          },
          {
            label: '30s',
            value: '30',
            sign: '3000'
          }
        ],
        socket: '',
        time: '',
        stime: '',
        eTime: '',
        displayBtn: true
      }
    },
    methods: {
      submit () {
        this.$refs.wave.submit('xxx')
      },
      hisList () {
        this.$router.push({
          path: 'hisList',
          query: {
            id: 'dis'
          }
        })
      },
      exportList () {
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
      init () {
        this.socket = JSON.parse(Cookies.get('userInfo')).userId
      },
      handelTime (val) {
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
      dateFormat (dateData) {
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
    beforeMount () {
      this.init()
    },
    components: {
      tabMains,
      DTab,
      DPane,
      DBg,
      DBack,
      DTable,
      Dform
    },
  }
</script>

<style scoped>
  .time {
    display: flex;
  }

  .time >>> .el-range-input {
    background: transparent;
    color: white;
  }

  .btn-search >>> .el-button {
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

  .form {
    height: 50px;
    box-sizing: border-box;
    padding-top: 6px;
  }
</style>
