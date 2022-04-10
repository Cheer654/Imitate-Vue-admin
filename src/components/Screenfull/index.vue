<template>
  <div @click="handleScreenfull">
    <i class="iconfont" :class="iconType"  />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import screenfull from 'screenfull'

// screenfull
const isFullscreen = ref(false)
const iconType = computed(() => ({
  'icon-compress-arrows': isFullscreen.value,
  'icon-expand-arrows-alt': !isFullscreen.value
}))
function screenfullchange() {
  isFullscreen.value = screenfull.isFullscreen
}
// 监听与关闭资源
onMounted(() => {
  if(screenfull.isEnabled) {
    screenfull.on('change', screenfullchange)
  }
})
onBeforeUnmount(() => {
  if(screenfull.isEnabled) {
    screenfull.off('change', screenfullchange)
  }
})
function handleScreenfull() {
  if(screenfull.isEnabled) {
    // 默认Element为HTML，toggle(element, options?)
    screenfull.toggle()
  } else {
    console.log('该浏览器不支持全屏')
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 19px;
}
</style>
