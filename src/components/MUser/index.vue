<template>
  <div class="mu-content" style="padding: 0;margin: 0">
    <!--   用户管理-->
    <div class="manage-user" @click="goUserManage()">
      <span class="mu-icon">
        <i class="el-icon-user-solid"></i>
      </span>
      <span class="mu-title">用户管理</span>
    </div>
    <!--  模态分析  -->
    <div class="manage-user" @click="goModalAnaly()">
          <span class="mu-icon">
            <i class="el-icon-data-line"></i>
          </span>
      <span class="mu-title">模态分析</span>
    </div>
    <!--    参数设置-->
    <div class="manage-user" @click="goDataSetting()">
      <span class="mu-icon">
        <i class="el-icon-s-tools"></i>
      </span>
      <span class="mu-title">参数设置</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    goDataSetting() {
      this.$router.push({
        path: '/dataSetting'
      })
    },
    goModalAnaly() {
      this.$router.push({
        path: '/modalData'
      })
    },
    goUserManage() {
      this.$router.push({
        path: '/user'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mu-content {
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .manage-user {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    .mu-icon, .mu-title {
      font-size: 18px;
      color: #c3def7;
    }

    .mu-icon {
      font-size: 25px;
    }
  }
}

</style>
