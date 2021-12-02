<template>
  <div class="de-content">
    <div class="de-box">
      <div class="de-top">
        <div><span class="de-title"><i class="el-icon-warning-outline"></i>地震预警</span></div>
      </div>
      <div class="de-mid">
        <p class="da-mid-content">{{ daContent }}</p>
        <span class="count-down">{{ !times ? 0 : times }}S</span>
      </div>
      <div class="de-bottom">
        <span>{{ office }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      daContent: 'xx地区正在发生地震，某某地震感强烈，请合理避震地震横波',
      office: 'xx地震局',
      times: 3,
      show: true
    }
  },
  created () {
    this.init()
  },
  destroyed () {
    clearInterval(this.timer)
    this.beginCountDown = null
  },
  methods: {
    init () {
      this.show = false
      this.timer = setInterval(() => {
        this.times--
        if (this.times === 0) {
          this.show = true
          clearInterval(this.timer)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.de-content {
  display: flex;
  align-items: center;
  justify-content: center;

  .de-box {
    height: 170px;
    border: 1px solid #EEEEEE;
    width: 90%;

    .de-top {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 10px;
      border-bottom: 1px solid #EEEEEE;

      .de-label, .de-title {
        font-size: 18px;
      }

      .de-title {
        display: flex;
        align-items: center;
        color: darkred;
        font-weight: 900;

        i {
          font-size: 30px;
          font-weight: 900;
        }
      }
    }

    .de-mid {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      .da-mid-content {
        width: 90%;
        color: #c3def7;
      }

      .count-down {
        color: darkred;
        font-weight: 800;
      }
    }

    .de-bottom {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      //padding-top: 20px;
      padding-right: 10px;
      color: #c3def7;
    }
  }
}
</style>
