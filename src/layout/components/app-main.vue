<template>
  <div class="main-container">
    <!-- 子级导入 -->
    <router-view v-slot="{ Component }">
      <transition name="components-fade">
        <keep-alive :include="viewCache">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import storeMapper from '@/utils/store-mapper.js'
const { viewCache } = storeMapper(['viewCache'], 'mapGetters')
</script>

<style lang="less" scoped>
@container-height: calc(100vh - 84px);
.main-container {
  // 由于动画跳转时添加absolute值导致页面会有变形，需要添加该属性作为所有子容器的父级
  // 其余变形情况只要在子容器添加width以及box-sizing属性即可。
  position: relative;
  min-height: @container-height;
  width: 100%;
}
</style>
