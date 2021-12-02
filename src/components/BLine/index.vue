<template>
  <div class="dl-content">
    <span class="dl-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['title']
}
</script>

<style scoped>
.dl-content {
  width: 100%;
  height: 1px;
  text-align: center;
  background: #C0C4CC;
  position: relative;
  margin-top: 20px;
}

.dl-title {
  color: #C0C4CC;
  font-size: 12px;
  background: white;
  padding: 0 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
