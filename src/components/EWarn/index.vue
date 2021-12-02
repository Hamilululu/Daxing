<template>
  <div class="ew-content" style="position:relative;">
    <div style="color: white;width: 90%;margin: 0 auto">
      <div style="display: flex;justify-content: space-between;width: 100%;margin-bottom: 5px">
        <div>点位</div>
        <div>类型</div>
      </div>
      <div v-for="(item, index) in dataList">
        <div v-for="(items, indexs) in item">
          <div v-if="index == 'dis'" style="display: flex;justify-content: space-between;width: 100%;">
            <div style="font-size: 14px;width: 30px;text-align: center">
              {{ items }}
            </div>
            <div style="color: #dcdee1;font-size: 12px">
              位移计
            </div>
          </div>
          <div v-else style="display: flex;justify-content: space-between;width: 100%;">
            <div style="font-size: 14px;width: 30px;text-align: center">
              {{ items }}
            </div>
            <div style="color: #dcdee1;font-size: 12px">
              地震计
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BLine from '@/components/BLine'
import { postUserList } from '@/api/request'

export default {
  name: 'index',
  components: {
    BLine
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      postUserList('/common/log/warn/info').then(res => {
        console.log(res.data.warnInfo)
        this.dataList = res.data.warnInfo
        // this.dataList = {
        //   dis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 23, 44, 5],
        //   sei: [9, 8, 7]
        // }
      })
    }
  },
  data () {
    return {
      dataList: [],
      list: ['地下二层', '地下二层', '地上一层', '地上三层', '地上四层', '地上五层', '楼顶']
    }
  },
}
</script>

<style scoped lang="scss">
.ew-content {
  height: 150px;
  padding-bottom: 10px;
  overflow: auto;
  margin-top: 25px;
}

.ew-content::-webkit-scrollbar {
  display: none;
}

.text {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.item {
  padding: 2px 0;
  border-radius: 2px;
  background: transparent;
}

.text-ew-left {
  .ew-label {
    font-size: 12px;
    color: #f1e5e7;
  }
}

.text-ew-right {
  .text-ew-error {
    font-size: 12px;
    color: red;
  }

  .text-ew-success {
    font-size: 12px;
    color: green;
  }
}
</style>
