<template>
  <div class="tabHead">
    <!--    图标-->
    <div class="tab-left">
      <i :class="tabIcon"><span style="font-size: 20px;padding-left: 5px">{{ tabTitle }}</span></i>
    </div>
    <!--    tab页-->
    <div class="tabs">
      <div ref="line" class="tab-line"></div>
      <div :class="[activeKey == item.actKey? 'active-tab' : 'tab']" @click="changeTab($event,item,index)"
           v-for="(item,index) in childList">{{ item.label }}
      </div>
      <!--      展示-->
      <div class="show-content">
        <slot></slot>
      </div>
    </div>
    <!--    返回-->
    <div class="tab-right" @click="back">
      <img style="width: 40px" src="../../assets/img/back.png" alt=""><span style="font-size: 20px;padding-left: 5px">返回</span>
    </div>
  </div>
</template>
<script>
let self;
export default {
  data() {
    return {
      childList: [],
      activeKey: this.defaultKey,//将初始化tab赋值给activeKey
      slideWidth: 0
    }
  },
  //获取子组件传过来的激活tab
  props: {
    defaultKey: {
      // type: String,
      default: "1"
    },
    tabTitle: {
      type: String,
    },
    tabIcon: {
      type: String,
    }
  },
  created() {
    self = this;
  },
  mounted() {
    //循环tab标签
    this.childList = this.$children;
    //设置滑动距离。平分设备宽度
    this.slideWidth = window.innerWidth / this.childList.length;
    //设置状态线初始化滑动位置
    // this.$refs.line.style.width = this.slideWidth+"px";
  },
  methods: {
    //切换tab触发事件
    changeTab: (event, item, index) => {
      self.activeKey = item.actKey;
      self.$refs.line.style.transform = "translateX(" + self.slideWidth * index + "px)";
      self.$refs.line.style.transition = "transform .3s";
      self.$emit('on-click', item, index);//将切换tab的事件暴露给父组件
    },
    //初始化时tab状态设置与相应内容显示
    updateNav: () => {
      self.$children.map((item, index) => {
        if (item.actKey == self.activeKey) {
          item.show = true;
          self.$nextTick(function () {
            self.$refs.line.style.transform = "translateX(" + self.slideWidth * index + "px)";
            self.$refs.line.style.transition = "transform 0s";
          });
        } else {
          item.show = false;
        }
      })
    },
    back() {
      this.$router.back(-1)
    },
  },
  watch: {
    //监听当前tab,显示相应内容
    activeKey() {
      self.$children.map((item) => {
        if (item.actKey == self.activeKey) {
          item.show = true;
        } else {
          item.show = false;
        }
      })
    }
  }
}
</script>
<style>
.active-tab, .tab {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding: 0 20px;
  cursor: pointer;
  background: #0d2246;
}

.active-tab {
  color: #62acc2;
  font-weight: bold;
  background: #1a3f5e;
}

.tab {
  color: #c4f7ff;
}

.show-content {
  position: absolute;
  width: 100vw;
  background: white;
  top: 55px;
  left: 0px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  /*border-bottom: 1px solid #f6f6f6;*/

}

.tab-line {
  position: absolute;
  left: 0;
  border-bottom: 2px solid #158ef3;
  height: 50px;
}

.tabHead {
  min-width: 1500px;
  position: relative;
  width: 100vw;
  /*height: 45px;*/
  background: #0d2246;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.tab-left {
  color: #c4f7ff;
  padding-left: 10px;
  font-size: 25px;
  width: 25%;
}

.tab-right {
  cursor: pointer;
  color: #c4f7ff;
  padding-right: 10px;
  font-size: 25px;
  width: 25%;
  text-align: right;
}
</style>
