<template>
  <template v-if="isMenuItem()">
    <a class="app-link" @click.prevent.stop="hrefLink(onlyChildRoute.path, basePath)">
      <el-menu-item :index="resolvePath(onlyChildRoute.path, basePath)">
        <IconItem v-if="onlyChildRoute.meta.icon" :icon="onlyChildRoute.meta.icon" class="icon" />
        <template #title>{{onlyChildRoute.meta.title}}</template>
      </el-menu-item>
    </a>
  </template>
  <el-sub-menu :index="basePath" v-else>
    <template #title>
      <IconItem v-if="item.meta.icon" :icon="item.meta.icon" class="icon" />
      <span>{{item.meta.title}}</span>
    </template>
    <SidebarItem
      v-for="route in filterRoutes"
      :item="route"
      :basePath="resolvePath(route.path, basePath)"
      :key="resolvePath(route.path, basePath)"
    />
  </el-sub-menu>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import path from 'path'

import IconItem from '@/components/IconItem'
import { isExternal } from '@/utils/validate.js'

const router = useRouter()

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    required: true
  }
})
const { item, basePath } = toRefs(props)
const onlyChildRoute = ref(null)
// filterRoutes在作为筛选子路由，不给予具有hidden属性子路由显示
// 用于判断是否单个子路由以及后面的迭代
const filterRoutes = item.value.children?.filter?.(route => {
  if(route.hidden) {
    return false
  } else {
    onlyChildRoute.value = route
    return true
  }
}) || []
// method
function haveOnlyChild() {
  if(filterRoutes.length === 1) return true
  if(filterRoutes.length === 0) {
    // 如果filterRoutes为0,加入onlyRoute属性以及path属性
    // onlyRoute属性是为了防止特殊情况使onlyChildRoute.value.children误判，
    // 特殊情况：当前路由没有hidden属性，含有多个子路由且子路由都具有hidden属性
    // path属性则是使用当前路由作为menu-item，而basePath则是当前路由path
    onlyChildRoute.value = { ...item.value, path: '', onlyRoute: true }
    return true
  }
  return false
}
function isMenuItem() {
  return !item.value.alwayShow && haveOnlyChild() && (!onlyChildRoute.value.children || onlyChildRoute.value.onlyRoute)
}
function resolvePath(childRoute, parentRoute) {
  if(isExternal(childRoute)) {
    return childRoute
  }
  if(isExternal(parentRoute)) {
    return parentRoute
  }
  return path.join(parentRoute, childRoute)
}
function hrefLink(routePath, basePath) {
  const link = resolvePath(routePath, basePath)
  if(isExternal(link)) {
    window.open(link)
  } else {
    router.push(link)
  }
}
</script>
