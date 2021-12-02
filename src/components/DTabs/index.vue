<template>
  <div style="width: 100vw;  min-width: 1500px;">
    <!--    头部背景.标题-->
    <bg :title="bgTitle"/>
    <!--    组件主体-->
    <div style="min-width: 800px">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import bg from '../../components/DHead'
import DTab from './info'
import DPane from './pane'

export default {
  name: "index",
  props: ['bgTitle'],
  components: {
    bg,
    DTab,
    DPane
  }
}
</script>

<style scoped>

</style>
