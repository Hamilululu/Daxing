<template>
  <div class="page-login" id="page-login-main">
    <bg title="机场航站楼震动及隔层位移检测系统"></bg>
    <div class="page-login--layer">
      <div
        class="page-login--content"
      >
        <div
          class="page-login--content-main"
        >
          <!-- form -->
          <div class="page-login--form">
            <!-- logo -->
            <p class="login-title"></p>
            <div>
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
              >
                <div v-if="!isNoPwd">
                  <el-form-item prop="username">
                    <el-input
                      type="text"
                      v-model="formLogin.username"
                      placeholder="用户名"
                    >
                      <i slot="prepend" class="el-icon-user-solid"
                         style="color: #4394d6;font-size: 20px;font-weight: 600"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      type="password"
                      v-model="formLogin.password"
                      placeholder="密码"
                    >
                      <i slot="prepend" class="el-icon-lock"
                         style="color: #4394d6;font-size: 20px;font-weight: 600"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input
                      type="text"
                      v-model="formLogin.code"
                      placeholder="验证码"
                    >
                      <template slot="append">
                        <div @click="refreshCode">
                          <span
                            v-for="(item, index) in codeList"
                            :key="index"
                            :style="getStyle(item)"
                          >{{ item.code }}</span
                          >
                        </div>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>

                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-login"
                  style="font-size: 22px;font-weight: 400"
                >
                  登      录
                </el-button>
                <div class='passwd'>
                  <span @click="passwd" style="font-size: 13px">忘记密码</span>
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
import {postRequestLogin} from '../../../api/request'
import Cookies from 'js-cookie'

export default {
  components: {
    bg
  },
  mixins: [localeMixin],
  data() {
    return {
      name: require("../../../assets/svgFile/svglogo1.js"),
      rightCode: "",
      codeList: [],
      isNoPwd: false,
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      users: [
        {
          name: "Admin",
          username: "admin",
          password: "admin",
        },
        {
          name: "Editor",
          username: "editor",
          password: "editor",
        },
        {
          name: "User1",
          username: "user1",
          password: "user1",
        },
      ],
      // 表单
      formLogin: {
        username: "sysadmin",
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
    this.refreshCode();
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
    if (dd.env.platform != "notInDingTalk") {
      this.isNoPwd = true;
    }
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    // ...mapActions("d2admin/account", ["login"]),
    passwd() {
      this.$router.push({
        path: '/passwd'
      })
    },
    refreshTime() {
      this.time = dayjs().format("HH:mm:ss");
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      // if (this.isNoPwd) {
      //     dd.ready(() => {
      //         dd.runtime.permission.requestAuthCode({
      //             corpId: "ding16123431d2b5d95b35c2f4657eb6378f", // 企业id
      //             onSuccess: function (info) {
      //                 console.log(info.code);
      //             },
      //         });
      //     });
      // } else {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.formLogin.code.toUpperCase() != this.rightCode) {
            this.$message.error("验证码错误");
            this.refreshCode()
            return
          }
          const dataJson = {
            'username': this.formLogin.username,
            'password': this.$md5(this.formLogin.password)
          }
          postRequestLogin('/login/web', dataJson).then(res => {
            // console.log(res);
            Cookies.set('token', res.data.token, {expires: 7});
            Cookies.set('userInfo', res.data.user, {expires: 7});
            this.$router.push({
              path: '/index'
            })
          }).catch()
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
      // }
    },
    refreshCode() {
      this.createdCode();
      let code = "";
      for (let i = 0; i < 4; i++) {
        code += this.codeList[i].code;
      }
      this.rightCode = code.toUpperCase();
    },
    createdCode() {
      let len = 4,
        codeList = [],
        chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
        charsLen = chars.length;
      // 生成
      for (let i = 0; i < len; i++) {
        let rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200),
        ];
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)), // 随机码
          color: `rgb(${rgb})`, // 随机颜色
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`, // 随机字号
          padding: `${[Math.floor(Math.random() * 10)]}px`, // 随机内边距
          transform: `rotate(${
            Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)
          }deg)`, // 随机旋转角度
        });
      }
      // 指向
      this.codeList = codeList;
      // 将当前数据派发出去
      this.$emit("update:value", codeList.map((item) => item.code).join(""));
    },
    // 动态绑定样式
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`;
    },
  },
};
</script>

<style lang="scss">
.page-login-logo1 {
  height: 100px;
}

.page-login-logo2 {
  height: 200px;
  width: 300px;
}

.foot-l {
  width: 25%;
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
  background: url('../../../assets/img/login-page.png') no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  overflow: hidden;
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
  .page-login--form {
    background: url('../../../assets/img/loginUser.png') no-repeat;
    background-size: 100%;
    width: 520px;
    padding: 50px;
    position: relative;
    // 登录按钮
    .button-login {
      width: 100%;
      height: 40px;
      line-height: 20px;
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

  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;

    &:hover {
      background-color: $color-bg;

      i {
        color: $color-text-normal;
      }

      span {
        color: $color-text-normal;
      }
    }

    i {
      font-size: 36px;
      color: $color-text-sub;
    }

    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }

  // footer
  .page-login--content-footer {
    padding: 1em 0;

    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;

      a {
        color: $color-text-normal;
        margin: 0 0.5em;

        &:hover {
          color: $color-text-main;
        }
      }
    }

    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;

      a {
        color: $color-text-normal;
      }
    }

    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;

      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }

  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;

    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }

      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }

      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }

      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }

      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }

      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }

      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }

      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }

      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }

      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }

      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}


</style>
<style>
.el-textarea__inner, .el-input__inner {
  background: transparent;
}

.page-login .page-login--form .el-input-group__prepend {
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
</style>
