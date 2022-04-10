<template>
  <!--
    别直接使用component来加载el-icon组件，不然会有BUG
    而el-icon进行嵌套导致侧边栏icon抖动主要是vertical-align属性导致
  -->
  <el-icon v-if="icon.type === 'el-icon'"><component :is="icon.name" /></el-icon>
  <i v-else class="iconfont" :class="icon.name" />
</template>

<script setup>
const props = defineProps({
  icon: Object
})
</script>
