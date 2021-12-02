<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-tab defaultKey="1" tabTitle="参数设置" tabIcon="el-icon-s-tools"></d-tab>
    <div class="main-bg-svg-box" style="position: relative">
      <div
        style="width: 100%;height: 650px;display: flex;justify-content: space-around;align-items: center;flex-direction: column">
        <div style="width: 90%;height: 30%;border-bottom: 1px solid #eeeeee59">
          <div style="color: white;text-align: center;">位移计阈值</div>
          <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;height: 80%;">
            <div style="display: flex;">
              <div class="title-bg">横向</div>
              <div class="title-bg">{{ disThreshold.transverse }}</div>
            </div>
            <div style="display: flex;">
              <div class="title-bg">纵向</div>
              <div class="title-bg">{{ disThreshold.portrait }}</div>
            </div>
          </div>
        </div>
        <div style="width: 90%;height: 35%;border-bottom: 1px solid #eeeeee59">
          <div style="color: white;text-align: center;">加速度计阈值</div>
          <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;height: 80%;">
            <div style="display: flex;">
              <div class="title-bg">X</div>
              <div class="title-bg">{{ seiThreshold.x }}</div>
            </div>
            <div style="display: flex;">
              <div class="title-bg">Y</div>
              <div class="title-bg">{{ seiThreshold.y }}</div>
            </div>

            <div style="display: flex;">
              <div class="title-bg">Z</div>
              <div class="title-bg">{{ seiThreshold.z }}</div>
            </div>
          </div>
        </div>
        <div style="width: 90%;height: 25%;">
          <div style="color: white;text-align: center;">报警通知</div>
          <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;height: 80%;">
            <div style="display: flex;">
              <div class="title-bg">通知方式</div>
              <div class="title-bg">{{ radio }}</div>
            </div>
            <div style="display: flex;">
              <div class="title-bg">用户名</div>
              <div class="title-bg">{{ name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="position: absolute;bottom:10%">
        <div style="background: #0c64a2;padding: 5px 8px;border-radius: 3px;color: white;cursor: pointer"
             @click="drawer = true">修改参数
        </div>
      </div>
      <el-drawer
        title="参数列表"
        :visible.sync="drawer">
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-divider content-position="left">位移计阈值</el-divider>
            <el-form-item label="横向" label-width="20%">
              <el-input v-model="form.transverse"></el-input>
            </el-form-item>
            <el-form-item label="纵向" label-width="20%">
              <el-input v-model="form.portrait"></el-input>
            </el-form-item>
            <el-divider content-position="left">加速度计阈值</el-divider>
            <el-form-item label="X" label-width="20%">
              <el-input v-model="form.x"></el-input>
            </el-form-item>
            <el-form-item label="Y" label-width="20%">
              <el-input v-model="form.y"></el-input>
            </el-form-item>
            <el-form-item label="Z" label-width="20%">
              <el-input v-model="form.z"></el-input>
            </el-form-item>
            <el-divider content-position="left">报警通知</el-divider>
            <el-form-item label="通知方式" label-width="20%">
              <el-select v-model="form.warnType" placeholder="请选择通知方式">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" label-width="20%">
              <el-checkbox-group v-model="userListAdd">
                <el-checkbox
                  v-for="item in userList"
                  :label="item.userId"
                  :key="item.userId"
                  name="perms">{{ item.userNickName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <div style="position: absolute;bottom: 0;left: 0;margin: 0 auto;width: 100%;">
          <div style="display: flex;justify-content: space-around;padding: 10px">
            <!--            <el-button @click="resetAddPrem('permdialogAdd')">取 消</el-button>-->
            <el-button type="primary" @click="addPremBtn()">确定修改</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </tabMains>
</template>

<script>
import tabMains from '../../../components/DTabs'
import DTab from '../../../components/DTabs/info'
import DPane from '../../../components/DTabs/pane'
import { postUserList } from '@/api/request'

export default {
  name: 'index',
  components: {
    tabMains,
    DTab,
    DPane
  },
  data () {
    return {
      disThreshold: {},
      seiThreshold: {},
      name: '名称',
      radio: '1',
      drawer: false,
      form: {
        transverse: '',
        portrait: '',
        x: '',
        y: '',
        z: '',
        warnType: '',
        warnPerson: '',
      },
      userList: [],
      userListAdd: [],
      options: [{
        value: 'Message',
        label: '短信'
      }]
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    addPremBtn () {
      let data = {
        // 'warnType': this.changeType(this.form.warnType),
        'warnType': 'Message',
        'disThreshold': {
          'transverse': this.form.transverse,
          'portrait': this.form.portrait
        },
        'seiThreshold': {
          'x': this.form.x,
          'y': this.form.y,
          'z': this.form.z
        },
        'warnPerson': this.userListAdd
      }
      postUserList('/common/setting/update',data).then(res => {
        this.drawer = false
        this.init()
      })
    },
    resetAddPrem (formName) {
      this.permdialogAdd = false
      this.$refs[formName].resetFields()
    },
    init () {
      postUserList('/user/list').then(res => {
        this.userList = res.data.list
        postUserList('/common/setting').then(res => {
          let data = res.data.systemSettings
          this.disThreshold = data.disThreshold
          this.seiThreshold = data.seiThreshold
          this.radio = data.warnType === 'Message' ? '短信' : '其他'
          this.userListAdd = res.data.systemSettings.warnPerson
          this.name = this.changeName(data.warnPerson)
          this.changeList()
        })
      })
    },
    changeList () {
      this.form = {
        transverse: this.disThreshold.transverse,
        portrait: this.disThreshold.portrait,
        x: this.seiThreshold.x,
        y: this.seiThreshold.y,
        z: this.seiThreshold.z,
        warnType: this.radio,
        warnPerson: this.name,
      }
    },
    findName (val) {
      for (let i = 0; i < this.userList.length; i++) {
        if (val === this.userList[i].userId) {
          return this.userList[i].userNickName
        }
      }
    },
    changeType(val){
      if(val === 'Message'){
        return '短信'
      }
      if(val === '短信'){
        return 'Message'
      }
    },
    changeName (val) {
      let str = ''
      for (let i = 0; i < val.length; i++) {
        if (i < val.length - 1) {
          str += this.findName(val[i]) + '、'
        } else {
          str += this.findName(val[i])
        }
      }
      if (str.length > 20) {
        str = str.slice(0, 20) + '...'
      }
      return str
    }
  }
}
</script>

<style scoped>
.el-form-item >>> .el-form-item__label {
  color: #606266;
}

.el-input >>> .el-input__inner {
  color: black !important;
}
.el-select >>> .el-input__inner {
  color: black !important;
}

/*主体*/
.main-border {
  width: 85vw;
  height: 70vh;
  margin: 0 auto;
}

.title-btn {
  background: url('../../../assets/img/bg-sanwei.png') no-repeat;
  background-size: 100%;
  height: 40px;
  width: 80px;
  line-height: 30px;
  text-align: center;
  color: #e1f3ff;
  position: absolute;
  font-size: 12px;
  cursor: pointer;
}

.title-bg-input {
  width: 100%;
  height: 45px;
  background: url('../../../assets/img/btn-bg.png') no-repeat;
  background-size: 100% 100%;
}

.title-bg-input >>> .el-input__inner {
  border: none;
  position: absolute;
  left: 20px;
  top: 0;
  /*background: red;*/
  width: 600px;
  height: 20px;
}

.main-border-bg {
  /*background: url('../../../assets/img/border-sanwei.png') no-repeat;*/
  background-size: 100% 100%;
  height: 100%;
}

.title-bg-mini {
  background: url('../../../assets/img/btn-bg.png') no-repeat;
  background-size: 100% 100%;
  height: 45px;
  width: 500px;
  line-height: 45px;
  text-align: center;
  color: #e1f3ff;
}

.title-bg {
  background: url('../../../assets/img/btn-bg.png') no-repeat;
  background-size: 100%;
  height: 50px;
  width: 300px;
  line-height: 45px;
  text-align: center;
  color: #e1f3ff;
}

.head-title {
  color: #e1f3ff;
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

.main-bg-svg-box {
  min-width: 1000px;
  min-height: 850px;
  margin: 0px;
  background: url('../../../assets/img/bg-sanwei.png') no-repeat;
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  height: 87vh;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}
</style>
