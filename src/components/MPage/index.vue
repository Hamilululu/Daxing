<template>
  <!--  @click="changeShow" style="padding: 10px;cursor:pointer;"-->
  <!--  style="padding: 10px;"-->
  <div>
    <div class="img-content">
      <div
        v-show="isshowF"
        style="width: 52px;height: 187px;background: #1d4880;position: absolute;top:32px;left:36px;display:flex;flex-direction: column;justify-content: center;align-items: center"
      >
        <button
          v-for="item in btnImg"
          class="btn-floor"
          @click="changeShow(item.uid)"
          :class="[isShow == item.uid? 'active-btn-floor' : 'btn-floor-no']"
        >{{ item.item }}
        </button>
      </div>
      <!--      控制按钮展示-->
      <div style="position: absolute;top: 500px;left: 36px;background: #1d4880;padding: 10px 15px;cursor: pointer"
           :class="[ isClick ? '' : 'active-floor' ]"
           @click="isshowFloor"
      >
        <img src="../../assets/img/floor.png" alt="" style="width: 20px;height: 20px;">
      </div>
      <!--对应楼层展示-->
      <div style="position: absolute;top: 19.98px;left:115.13px;"
           v-for="item in fixFloorList"
           v-if="initP">
        <img class="img-main" :src="item.floorImg" alt="" v-show="item.uid === isShow">
        <!--        icon-->
      </div>
      <!--默认图展示-->
      <div v-else
           style="position: absolute;top: 19.98px;left:115.13px;">
        <img class="img-main" :src="initUrl" alt="">
      </div>
      <!--   每个楼层对应的按钮图标  -->
      {{uid}}
      <div v-for="(items, indexs) in fixIconList[isShow]" :style="items.isStyle">
        <img :src="items.urlImg" alt="" style="width: 20px;height: 20px;  cursor: pointer;" @click="goDetail(items)">
      </div>
    </div>
  </div>
</template>

<script>
  import { postUserList } from '../../api/request'

  export default {
    name: 'index',
    data () {
      return {
        isshowF: false,
        initP: false,
        initUrl: require('../../assets/img/initUrl.jpg'),
        isShow: 7,
        floorId: '',
        btnImg: [{
          uid: 0,
          item: '5'
        }, {
          uid: 1,
          item: '4'
        }, {
          uid: 2,
          item: '3'
        }, {
          uid: 3,
          item: '2'
        }, {
          uid: 4,
          item: '1'
        }, {
          uid: 5,
          item: '-1'
        }, {
          uid: 6,
          item: '-2'
        }],
        floorList: [],
        fixFloorList: [],
        imgList: {
          //位移计
          hasDisImg: require('../../assets/img/hasdis.png'),
          hasSeiImg: require('../../assets/img/hassei.png'),
          hasSeiAll: require('../../assets/img/hassei.png')
        },
        iconList: [],

        fixIconList: {  },
        isClick: true
      }
    },
    beforeMount () {
      this.init()
    },
    mounted () {
      this.initFixIconList()
      this.initFixFloorList()
    },
    methods: {
      initFixFloorList () {
        let data = [
          {
            floorId: 35829907001,
            floorImg: require('../../assets/img/F5@300x.png'),
            floorName: '航站楼F5',
            uid: 0,
          },
          {
            floorId: 35829907002,
            floorImg: require('../../assets/img/F4@300x.png'),
            floorName: '航站楼F4',
            uid: 1,
          },
          {
            floorId: 35829907003,
            floorImg: require('../../assets/img/F3@300x.png'),
            floorName: '航站楼F3',
            uid: 2,
          },
          {
            floorId: 35829907004,
            floorImg: require('../../assets/img/F2@300x.png'),
            floorName: '航站楼F2',
            uid: 3,
          },
          {
            floorId: 35829907005,
            floorImg: require('../../assets/img/F1@300x.png'),
            floorName: '航站楼F1',
            uid: 4,
          },
          {
            floorId: 35829907006,
            floorImg: require('../../assets/img/B1@300x.png'),
            floorName: '航站楼B1',
            uid: 5,
          },
          {
            floorId: 35829907007,
            floorImg: require('../../assets/img/B2@300x.png'),
            floorName: '航站楼B2',
            uid: 6,
          },
        ]
        this.fixFloorList = data
      },
      initFixIconList () {
        let obj={
          0:[
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 27,
              isStyle: {
                left: '317px',
                position: 'absolute',
                top: '220px',
              },
              urlImg: 'data:image/png;base64,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'
            },
         {
              hasDis: 1,
              hasSei: 1,
              pointId: 12,
              isStyle: {
                left: '390px',
                position: 'absolute',
                top: '130px',
              },
           urlImg: 'data:image/png;base64,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'
         },

          ],
          1:[
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 25,
              isStyle: {
                left: '320px',
                position: 'absolute',
                top: '220px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 26,
              isStyle: {
                left: '440px',
                position: 'absolute',
                top: '220px',
              },
              urlImg: 'data:image/png;base64,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'
            },

          ],
          2:[
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 19,
              isStyle: {
                left: '317px',
                position: 'absolute',
                top: '200px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 20,
              isStyle: {
                left: '325px',
                position: 'absolute',
                top: '280px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 21,
              isStyle: {
                left: '450px',
                position: 'absolute',
                top: '280px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 22,
              isStyle: {
                left: '460px',
                position: 'absolute',
                top: '200px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId:23,
              isStyle: {
                left: '380px',
                position: 'absolute',
                top: '300px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 24,
              isStyle: {
                left: '390px',
                position: 'absolute',
                top: '80px',
              },
              urlImg: 'data:image/png;base64,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'
            },
              ],
          3:[
          ],
          4:[],
          5:[
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 3,
              isStyle: {
                left: '317px',
                position: 'absolute',
                top: '200px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 20,
              isStyle: {
                left: '325px',
                position: 'absolute',
                top: '280px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 21,
              isStyle: {
                left: '450px',
                position: 'absolute',
                top: '280px',
              },
              urlImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAACXBIWXMAAC4jAAAuIwF4pT92AAAIs0lEQVR4nO1dW2wUVRj+1bVGKbCBB6jEFOUSSAjd8IAoCWyiyIMmLfWZi0/EgpFIRMQEqIlIMGqJ2IQnKTxTSiIPUI2WBEEeSEtIMEBNN3KRB0hr1weaGMw3nNnMnPnPXM+Z3dn2SzZ7m53Z/fY//+385z9PPX78mGoEeSIqiBsezxc3FQaJaJSIRsTt11r5IdUkFYQVHbdmDeccEmSD4D5BeupIm1QQ2UZEW4ioJYXrDRDRsbQJTotUm8jWNC6mQI8g2LiaME0qiNwfdWhfvXfZuh8U9zIaG2bQwtlLaNpzM2jBrCVRv9OA+E7GyDVFalFIRSCZww//oKG7l2no3u80/PA6/T1+J/LFFsxeSgtnL6WWppXU0vQqzWl8MczHQO4OoYO1Qjep0JldQcMcRJ670UsXSj/FIjEIc6fPo9XNb1L7si1hCD4sJFebztVJ6g7x5WZyb/47MW6RePzKd0aIVAHSu35xO721aIPfYSWhqrSoBB2k5sVQZ6UTZJ681kO913qoPPFP0mvFBqR304oPgsg9LIQjEZKSWhDuCqs7z908Rd0XD1SVTBkgd9eag7S8aaXqkCFhE2KrgySktgkJ9Qx36MxDA7tp+MH1uOc2DujcXWsP0rSG6dylSuL3xTJicUmF/vmBe+P4lSOW3swC4JqB2Neb3+C+7ZiQ2MjExiGVJRS6c29/Bw0pfMtaxrvLNtP7q/Zw3zAWsVFJZQnNwnAPAnzdb94+wamDyMRGIRUn/kV+EYTu/HFjTRmjuNBFbFhSC8KHcxmleiLUBvTs1++c4MLf0F7B0yGuk+esfD0SCuD37OvvsGyEhBbBQyDCkNolp+nqlVAbiPg+OrORI7ZVRI2+CCIVvtpm5wu4EIxSvRJqA0YXv5PBPqEOlfAjNc+Je9atfBQ8yVUc4T7hqwb8SO2S9WjvtePWhSYTEMhc9freLX5qQGX9Pe7T/fJd2trbWvfDngPyBUc3nJZdrTGR6vR4AypS4T6tdb6w88zGxNES3JWX8q9QwzMNic6jQnlinP4a/ZMm/nuk/dyKqKtHBEQucKR6pBTZJoXSDo15M5qpu+2kKoGhDTCkW0+1GsnZHm0/zfmvL4sp8go4nerRFToSJEgUmyYUwDWQNzWB7otfcGf18CWTWpSHPaRUx7/+/LMvGPmhHOY2zjNyXqg/xmi1CU+pAplUj37IShovLfR4+Zgp8+YkNS87+rqktJ4AaYUnJME1BeMktU0+8uyN3snOIQtm9DY7oywlqfg3sphwTgMXRtgAqKICnKS6ZkMVH8wEyt5EiFYgAPqt9LN8yqL9ICfuvUP/ZjaGPkbU/fHbledlkfAxDYTr0txWi4iwRmxSi8534UBnIWlSzdAZZUoMrHIne/gX3B/Ihi6FhFYrFwGvCHllCRaPNqkuh1/xL0xBAjOaK6R6SsBvZThfiqRNi7r6RCsYUi3hzHGkZmX4n715yvOaXRwBfYs6BJO2QSF8+ZysT5l5mVSBRHgYPQmy5IQ5pphti4wSyqMb+oxWzAw/8OhUoJCTkwHVtPogtPsSmwkKhUYmC7ZpxXYqNK2kQ+d3aw+5VX9+mNnU1GDKkqPCD5l7FKXpBjOyC6xOrTYwfTEnRvoOpekqIM/aue577eWdGNlSWWbeQ6pq8UKaCKgfTQQU/ZYfjSdSM0GoqeGfFlbP168GnPCQiqFXbdzirao2KKZFtCEnz5yamoqIAgzNOMMThgh6UwX4rocGPtHqh2Mtl4xc0IeyBD/jg1SdiXIlZnZ10DP8OebTAnQdwkydgMuzr3+bFV2llHwZzcmFrDGWJWoDro25dWd+VIUyUyiHCAck2lPhmPk04fTbQATHwCLVU7YCY1WtCT+ElyGXQVpxPiTQBgjuvnSAFsxaSvfLt631WyahsD+DOW6VG75UFmZRubA0zclKRlKxVKjiUpUCDp4Cg4I3QBl0kurSq8zBUwgnqS5SXSoAIaJuK2wCy8Vi3moAhDK1YRaPOecTJ+DeZKGY4uM1X1o3G7D+qNc3ncJcv4j9My0encPfpVdNpMnSAKRnG796TyuY/MFp+4HT+e9zHoEMehZUQDWAoc+4fRX+nKR6FgesX+y7Nn7SAlXVDFhSPSoA7TKm4AZGL9OIoccZRMmxf5fzCUS8Wta1VtHOS6lrlMukHhOrLipQnGRSAlLKDP2S7D3JpI7K0ookhw5pvTNWCnGUHpha6wUBY3zTwJp/EqS6pBULE5J6AqgiPMcUP+gGprlNJFKeNLbZLr9c4gy8ah3VfrEGs4IstfEwAfQBYCYj3+NIVU38MdK6fdImWqBHGUIHVGtUVaSOcitVPl/XPekCArufFQNl/yq/Keo+8W9UABcLieHJAghQ57puzjh1+rX+CLPe36UGEL4qIoq6Q8dre1RtP3wbKQSRyqoBLHyt96CgY9VnXOQ0xvEhI0yFSp/ogecC0m31Six+V/uyTdxboVqDRmmh1Mc1Sfzq/Kd1tYgNhDrzsw6Ebq4YhdS8CMc8vaTrhVgYYUXXSnZdvwpRO6gpiU1asFtNBPT8i0Qoxez1pyQWxQt7+7dlqiUIAhoQqigiiUwoJehKqSTWbrGUhQY2cA3h2CuaO8QilBL2T82LcJZ1WlEQBnVQi0UZkE7MY/kUFneGaeqlgo72ybCI33Jv1ErrZBshWijbfmif6oAw0NXo27cFfbXJDdmPekhEkCN+B4WBzu7peTFkPvQ7CDlVuF9pLIDDNDv8ToVVdyLRcJdhYvOEItd0UQaqmtFTAOtgdRk1ewkl5uRBaIjuQgNiuCeWTidMbvMRaYsPuGOo9UcJJJYnlgOWx8PYoOoPy3wwvPE8Qm2t0a0+0tiQJtb+KYZgfN8USnnrpKIgOO284Ziw5l0m9knhUI1NvvLCyhbFPbstSEKUHBt9JXKP4qAWtqMrCIILYvXh2hCfcWJMSOCgY9c0rYYnKmppjz8Z9l5/KiCBnspwjgQi+h+RUrgkjzM1wwAAAABJRU5ErkJggg=='
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 22,
              isStyle: {
                left: '460px',
                position: 'absolute',
                top: '200px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId:23,
              isStyle: {
                left: '380px',
                position: 'absolute',
                top: '300px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 24,
              isStyle: {
                left: '390px',
                position: 'absolute',
                top: '80px',
              },
              urlImg: 'data:image/png;base64,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'
            },
          ],
          6:[
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 1,
              isStyle: {
                left: '330px',
                position: 'absolute',
                top: '160px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 2,
              isStyle: {
                left: '330px',
                position: 'absolute',
                top: '200px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 33,
              isStyle: {
                left: '420px',
                position: 'absolute',
                top: '120px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 34,
              isStyle: {
                left: '420px',
                position: 'absolute',
                top: '190px',
              },
              urlImg: 'data:image/png;base64,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'
            },

          ],
          7:[
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 29,
              isStyle: {
                left: '260px',
                position: 'absolute',
                top: '220px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 30,
              isStyle: {
                left: '280px',
                position: 'absolute',
                top: '325px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 31,
              isStyle: {
                left: '470px',
                position: 'absolute',
                top: '330px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId: 32,
              isStyle: {
                left: '480px',
                position: 'absolute',
                top: '225px',
              },
              urlImg: 'data:image/png;base64,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'
            },
            {
              hasDis: 1,
              hasSei: 0,
              pointId:15,
              isStyle: {
                left: '375px',
                position: 'absolute',
                top: '370px',
              },
              urlImg: 'data:image/png;base64,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'
            },
          ],
        }
        this.fixIconList = obj
      },
      // 过滤样式
      isStyle (val) {
        return {
          position: 'absolute',
          left: val.pos_x + 'px',
          top: val.pos_y + 'px',
        }
      },
      // 添加图片和样式
      isIcon (val) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].hasDis && !val[i].hasSei) {
            val[i].urlImg = this.imgList.hasDisImg
          }
          if (!val[i].hasDis && val[i].hasSei) {
            val[i].urlImg = this.imgList.hasSeiImg
          }
          if (val[i].hasDis && val[i].hasSei) {
            val[i].urlImg = this.imgList.hasSeiAll
          }
          val[i].isStyle = this.isStyle(val[i])
        }
        return val
      },
      isshowFloor () {
        this.isshowF = !this.isshowF
        this.isClick = !this.isClick
      },
      showFloor () {
        let data = {
          'floorId': this.floorId
        }
        postUserList('/common/floor/icon', data).then(res => {
          console.log(res)
          let data = this.isIcon(res.data.sensorPosList)
          // console.log(data);
          this.iconList = data
          console.log(this.iconList)
        })
      },
      init () {
        if (this.isShow == 7) {

        }
        postUserList('/common/floor').then(res => {
          for (let i = 0; i < res.data.floorList.length; i++) {
            res.data.floorList[i].uid = i
          }
          this.floorList = res.data.floorList
          // this.floorId = this.floorList[this.isShow].floorId
          // console.log(this.floorList)
          // this.changeShow(this.isShow)
        })
      },
      changeShow (uid) {
        this.iconList = []
        this.initP = true
        this.isShow = uid
        for (let i = 0; i < this.floorList.length; i++) {
          if (this.floorList[i].uid == uid) {
            this.floorId = this.floorList[i].floorId
          }
        }
        this.showFloor()
      },
      goDetail (val) {
        // console.log(val)
        // return
        this.$router.push({
          path: '/detectionDetail',
          query: {
            pointId: val.pointId,
            floor: this.isShow
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  //.svg-main{
  //  height: 513.07px;
  //  width: 574.87px;
  //}

  .img-main {
    //height: 513.07px;
    //width: 574.87px;
    height: 613.07px;
    width: 674.87px;

  }

  .btn-floor {
    width: 20px;
    padding: 1px 4px;
    margin: 2px 0;
    border: 1px solid #0f2850;
    cursor: pointer;
    color: white;
  }

  .active-btn-floor {
    background: #002253;
  }

  .btn-floor-no {
    background: #1e51a8;
  }

  .btn-floor:hover {
    background: #002253;
  }

  .img-content {
    width: 100%;
    position: relative;

    .page-mid {
      width: 100%;
      height: 480px;
    }

    img {
      //width: 100%;
      height: 550px;
      width: 550px;
    }
  }

  .active-floor {
    background: #002253 !important;
  }
</style>
