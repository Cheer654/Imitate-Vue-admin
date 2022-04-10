<template>
  <div>
    <ul class="options-button">
      <li class="option-item" v-for="(option,propKey) in options" :key="propKey">
        <el-button @click="handleOption(propKey)" :type="activeType(propKey)">{{propKey}}</el-button>
      </li>
    </ul>
    <!-- <el-button @click="restore" type="primary">重置</el-button> -->
    <div ref="echartContainer1" class="echarts-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

import * as options from './options.js'

const echartContainer1 = ref(null)
const currentKey = ref('')
let echartsInstance
onMounted(() => {
  echartsInstance = echarts.init(echartContainer1.value, null, {
    width: 'auto',
    height: 'auto'
  })
  // echartsInstance.setOption(options.option1)
  // 有BUG，restore无法使用
  // 点击事件的过滤条件不会使用
  handleOption(Object.keys(options)[0])
})
onBeforeUnmount(() => {
  echarts.dispose(echartContainer1.value)
})
function handleOption(key) {
  if(currentKey.value === key) return
  currentKey.value = key
  echartsInstance.clear()
  echartsInstance.setOption(options[key])
}
function activeType(ownKey) {
  return currentKey.value === ownKey ? 'success' : 'primary'
}
function restore() {
  console.log(echartsInstance)
}
</script>

<style lang="less" scoped>
.options-button {
  display: flex;
  flex-flow: row nowrap;
  .option-item {
    margin: 10px;
  }
}
.echarts-container {
  width: 800px;
  height: 400px;
}
</style>
