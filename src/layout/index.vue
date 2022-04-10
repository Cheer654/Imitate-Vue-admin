<template>
  <Sidebar />
  <div class="app-container">
    <Navbar />
    <TagsView id="tags-view-container" />
    <AppMain />
  </div>
</template>

<script setup>

// 组件导入
import { Navbar, Sidebar, TagsView, AppMain } from './components'
import { useRouter } from 'vue-router'
// 响应数据
console.log(useRouter().getRoutes())
</script>

<style lang="less" scoped>
.app-container {
  margin-left: 200px;
  min-height: 100%;
}
</style>
