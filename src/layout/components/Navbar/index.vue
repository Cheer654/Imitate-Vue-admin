<template>
  <div class="topbar">
    <div class="topbar-left">
      <Hamurger :isCollapse="isCollapse"  @click="changeCollapse" id="hamburger-container" />
      <Breadcrumb id="breadcrumb-container" />
    </div>
    <div class="topbar-right">
      <template v-if="true">
        <HeaderSearch class="topbar-right-item" id="header-search" />
        <Screenfull class="topbar-right-item" id="screenfull" />
        <SizeSelect class="topbar-right-item" id="size-select" />
      </template>
      <Avatar class="topbar-right-item avatar-container" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
// 导入组件
import { Hamurger, HeaderSearch, Screenfull, SizeSelect, Avatar, Breadcrumb } from './navbar.js'
// 导入setup函数
import handleCollapseSetup from './handleCollapse.js'
// setup组件
const {
  changeCollapse
} = handleCollapseSetup()

const store = useStore()
// 计算属性
const isCollapse = computed(() => store.state.app.sidebar.isCollapse)
</script>

<style lang="less" scoped>
@topbar-height: 50px;

.topbar{
  height: @topbar-height;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  // box-shadow: 0 1px 5px rgba(0, 0, 0, .3);
  background-color: white;
  .topbar-left {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .topbar-right {
    display: flex;
    align-items: center;
    .topbar-right-item {
      width: 19px;
      padding: 0 5px;
      &:hover {
        cursor: pointer;
      }
      &#screenfull {
        line-height: 1;
      }
      &#size-select {
        margin-top: -3px;
      }
    }
    .show {
      // headerSearch的级联优先级不够，也不想使用important
      width: 216px;
    }
    .avatar-container {
      width: 60px;
      padding-right: 10px;
      align-items: center;
    }
  }
}
</style>
