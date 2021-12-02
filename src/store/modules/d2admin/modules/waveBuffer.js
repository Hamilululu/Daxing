export default {
  namespaced: true,
  state: {
    seiWaveBuffer: {
      DX01: {
        x: [],
        y: [],
        z: []
      }
    },
    disWaveBuffer: {
      DX01: {
        x: [],
        y: [],
        z: []
      }
    }
  },
  actions: {
    async initSeiWaveBuffer ({
      state,
      dispatch
    }, {}) {
      for (let i = 1; i <= 35; i++) {
        let key = i < 10 ? 'DX0' + i : 'DX' + i
        state.seiWaveBuffer[key] = {
          x: [],
          y: [],
          z: []
        }
      }
    },
    async setSeiWaveBuffer ({
      state,
      dispatch
    }, {
      siteMark,
      channel,
      waveDataArray
    }) {
      for (let i = 0; i < waveDataArray.length; i++) {
        let newTime = waveDataArray[i].name
        let oldTimeIndex = state.seiWaveBuffer[siteMark][channel].length - 1
        let oldTime = state.seiWaveBuffer[siteMark][channel][oldTimeIndex]
        if ((oldTimeIndex < 0) || (newTime > oldTime[0])) {
          state.seiWaveBuffer[siteMark][channel].push(waveDataArray[i].value)
        }
      }
    },
    async getSeiWaveSingleData ({
      state,
      dispatch
    }, {
      siteMark,
      channel
    }) {

      // 返回给
      let singleWaveData = []
      let returnWaveDataCount =100
      for (let i = 0; i < returnWaveDataCount; i++) {
        if (state.seiWaveBuffer[siteMark][channel].length != 0) {
          //console.log(state.seiWaveBuffer[siteMark][channel]+'id'+i)
          singleWaveData.push(state.seiWaveBuffer[siteMark][channel][0])
          state.seiWaveBuffer[siteMark][channel].shift()
        }
      }
      return singleWaveData
    }
  }
}
