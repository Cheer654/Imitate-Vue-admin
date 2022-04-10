<template>
  <div class="progress-container">
    <div
      v-for="item in progressList"
      :key="item.language"
      class="progress-item"
    >
      <span>{{item.language}}</span>
      <el-progress :percentage="item.progress*100" :status="progressStatus(item.progress)" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  progressList: {
    type: Object,
    required: true
  }
})
function progressStatus(progress) {
  return progress === 1 ? 'success' : ''
}
</script>

<style lang="less" scoped>
.progress-container {
  .progress-item {
    margin-bottom: 10px;
  }
}
</style>
