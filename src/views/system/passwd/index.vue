<template>
  <div class="page-login" id="page-login-main">
    <bg title="机场航站楼震动及隔层位移检测系统"></bg>
    <d-back style="z-index: 999"></d-back>
    <div class="page-login--layer">
      <div
        class="page-login--content"
      >
        <div
          class="page-login--content-main"
        >
          <!-- form -->
          <div class="page-login--form1">
            <!-- logo -->
            <div style="width: 350px;margin:10px auto;">
              <el-form ref="form" :model="formLogin" label-width="55px">
                <div>
                  <el-form-item label="手机号" style="position: relative" >
                    <el-input v-model="formLogin.phone"></el-input>
                    <div class="sendCode" style="position: absolute;top: 0;right: -100px">
                      <div>
                        <el-button type="primary" size="mini">发送验证码</el-button>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="验证码">
                    <el-input
                      type="password"
                      v-model="formLogin.code"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码">
                    <el-input v-model="formLogin.password"></el-input>
                  </el-form-item>
                  <el-button
                    size="default"
                    type="primary"
                    class="button-login"
                  >
                    确认
                  </el-button>
                </div>
              </el-form>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <div class="foot-l">
        <d2-icon-svg class="page-login-logo2" name="logoDouble"/>
      </div>
    </div>
  </div>
</template>


<script>
import dayjs from "dayjs";
import {mapActions} from "vuex";
import localeMixin from "@/locales/mixin.js";
import * as dd from "dingtalk-jsapi";
import bg from '../../../components/DHead'
import DBack from '../../../components/DBack'
import logo1 from '../../../assets/svg-icons/icons/logo@column.svg'

export default {
  components: {
    bg,
    DBack,
  },
  mixins: [localeMixin],
  data() {
    return {
      logo:logo1,
      rightCode: "",
      codeList: [],
      isNoPwd: false,
      // 表单
      formLogin: {
        phone:"",
        password: "",
        code: "",
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {

  },
};
</script>


<style lang="scss">
.page-login-logo1{
  height: 100px;
}

.el-form-item__label{
  color: #96b2d4;
}
.foot-l {
  width: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login-footer {
  width: 100vw;
  height: 120px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  //background: url('../../../assets/img/passwd.png') no-repeat;
  //background: url(../../../assets/img/loginBg.svg);
  background-size: 100%;
  height: 100vh;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }

  .page-login--layer-area {
    overflow: hidden;
  }

  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }

  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }


  .page-login--content-main {
    display: flex;
    height: 100vh;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }


  // 登录表单
  .page-login--form1 {
    background: url('../../../assets/img/passwd.png') no-repeat;
    background-size: 100%;
    width: 480px;
    padding: 50px;
    position: relative;
    // 登录按钮
    .button-login {
      width: 100%;
    }

    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }

    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }

    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }

    .page-login--quick {
      width: 100%;
    }
  }

}
</style>
<style>
.el-textarea__inner, .el-input__inner {
  background: transparent;
}

.page-login .page-login--form1 .el-input-group__prepend {
  background: transparent;
}

.el-input__inner {
  color: white;
  font-weight: 600;
}

.passwd {
  display: flex;
  padding: 5px;
  justify-content: flex-end;
}

.passwd > span {
  color: white;
  font-size: 12px;
}
.page-login--logo {
  width: 240px;
  margin-bottom: 2em;
  margin-top: -2em;
}
</style>
