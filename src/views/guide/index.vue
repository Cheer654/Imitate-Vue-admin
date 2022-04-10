<template>
  <div class="guide-container">
    <div class="guide-tip">
      This page for learn <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a> how to use !!!
    </div>
    <el-button @click.stop="guideStart" type="primary">
      <i class="iconfont icon-question-mark" />Show Guide
    </el-button>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps.js'
const driver = new Driver()
function guideStart() {
  driver.defineSteps(steps)
  driver.start()
}
</script>

<style lang="less" scoped>
.guide-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .guide-tip {
    line-height: 1.5;
    padding: 8px 24px;
    margin-bottom: 20px;
    background-color: #EFF1F4;
  }
  .iconfont {
    font-size: 12px;
    margin-right: 8px;
  }
}
</style>
