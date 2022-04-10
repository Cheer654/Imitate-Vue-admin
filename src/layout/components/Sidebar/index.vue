<template>
  <el-scrollbar class="sidebar-container" :class="{ 'sidebar-collapse': isCollapse }">
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      text-color="#fff"
      background-color="#304156"
      :collapse-transition="false"
    >
      <!-- v-for以及v-if不建议使用在同一元素或组件上，具体优先级看文档 -->
      <template v-for="item in permission_routes">
        <SidebarItem
          v-if="!item.hidden"
          :item="item"
          :basePath="item.path"
          :key="item.path"
        />
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import SidebarItem from './sidebar-item.vue'
import useMapper from '@/utils/store-mapper.js'

const route = useRoute()
// 设置侧边栏的活跃栏目
const defaultActive = ref(null)
watchEffect(() => {
  defaultActive.value = route.path
})
// 不能使用useRouter().getRoutes()进行遍历
const { sidebar, permission_routes } = useMapper(['sidebar', 'permission_routes'], 'mapGetters')
const isCollapse = computed(() => sidebar.value.isCollapse)
function handleOpen(key, keyPath) {
  // console.log(key, keyPath)
}
function handleClose(key, keyPath) {
  // console.log(key, keyPath)
}
</script>

<style lang="less">
// 注意标注: 此处不加scoped相等于写在全局有可能导致命名冲突,
// 如果项目太大还是写在全局样式文件好点
@sidebar-expand-width: 200px;
// 2 * sidebar-collapse-margin + el-menu-icon-size = sidebar-collapse-width
@sidebar-collapse-width: 50px;
@sidebar-collapse-padding: 16px;
@el-menu-icon-size: 18px;
@el-menu-inline-color: #1F2D3D;

.sidebar-container {
  position: fixed;
  width: @sidebar-expand-width;
  height: 100%;
  transition: width .5s;
  background-color: #304156;
  &.sidebar-collapse {
    width: @sidebar-collapse-width;
  }
  .el-scrollbar__bar {
    width: 4px;
  }
  // el-menu根元素
  .el-menu[role="menubar"] {
    border: none;
    width: 100%;
    & > .el-sub-menu > .el-sub-menu__title,
    & > .app-link > .el-menu-item,
    & > .app-link > .el-menu-item > .el-tooltip__trigger {
      padding: 0 !important;
      & > .icon {
        // 有些icon宽度和边距不相等，需要显示设置宽度
        width: @sidebar-collapse-width;
        font-size: @el-menu-icon-size;
        padding: 0 @sidebar-collapse-padding;
        box-sizing: border-box;
        // el-icon margin影响
        margin: 0;
        // 防止el-icon抖动
        height: 56px;
        vertical-align: baseline;
      }
    }
    // 不能优化
    .el-menu--inline {
      background-color: @el-menu-inline-color;
      .el-sub-menu__title {
        background-color: @el-menu-inline-color !important;
      }
    }
    .el-sub-menu__title:hover {
      background-color: var(--el-menu-hover-bg-color) !important;
    }
  }
}
</style>
