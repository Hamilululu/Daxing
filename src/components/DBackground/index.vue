<template>
  <div class="db-content" v-if="this.Uid == 3"
        v-bind:style="{backgroundImage:'url(' + bg2 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
  <div class="db-content" v-else-if="this.Uid == 1"
       v-bind:style="{backgroundImage:'url(' + bg4 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
  <div class="db-content" v-else-if="this.Uid == 7"
       v-bind:style="{backgroundImage:'url(' + bg5 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
  <div class="db-content" v-else-if="this.Uid == 4"
       v-bind:style="{backgroundImage:'url(' + bg6 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
  <div class="db-content" v-else-if="this.Uid == 5"
       v-bind:style="{backgroundImage:'url(' + bg7 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
  <div class="db-content" v-else-if="this.Uid == 6"
       v-bind:style="{backgroundImage:'url(' + bg3 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
  <div class="db-content" v-else-if="this.Uid == 8"
       v-bind:style="{backgroundImage:'url(' + bg8 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
  <div class="db-content" v-else-if="this.Uid == 2"
       v-bind:style="{backgroundImage:'url(' + bg9 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
  <div class="db-content" v-else
        v-bind:style="{backgroundImage:'url(' + bg1 + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
    <d-card :title="title">
      <slot></slot>
    </d-card>
  </div>
</template>

<script>
import DCard from '@/components/DCard'


export default {
  components: {
    DCard
  },
  props: ['title', 'uid'],
  data() {
    return {
      bg1: require('@/assets/img/bx-border.png'),
      bg2: require('@/assets/img/m3.png'),
      bg3: require('@/assets/img/border-box-blue.png'),
      bg4: require('@/assets/img/wy.png'),
      bg5: require('@/assets/img/dzj.png'),
      bg6: require('@/assets/img/m6.png'),
      bg7: require('@/assets/img/sbwx.png'),
      bg8: require('@/assets/img/m8.png'),
      bg9: require('@/assets/img/m2.png'),
      Uid: null
    }
  },
  watch: {
    uid: {
      handler(newName, oldName) {
        this.Uid = newName
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.db-content {
  /*flex: 1;*/
  /*background: url('bg1') no-repeat;*/
  background-size: 100% 100%;
}
</style>
