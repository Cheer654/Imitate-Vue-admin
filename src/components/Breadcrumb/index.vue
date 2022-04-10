<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(route, index) in breadcrumbRoutes"
        :key="route"
      >
        <span v-if="isCurrentRoute(index)" class="breadcrumb-text current-route">{{route.meta.title}}</span>
        <a v-else @click="routeLink(route.path)" class="breadcrumb-text link-item">{{route.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const breadcrumbRoutes = ref(null)
watch(() => route.path, () => {
  breadcrumbRoutes.value = route.matched.filter(item => item.meta?.title)
}, {
  immediate: true
})
function isCurrentRoute(index) {
  return breadcrumbRoutes.value.length - 1 === index
}
function routeLink(path) {
  router.push(path)
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  display: inline-block;
  .breadcrumb-text {
    &.current-route {
      color: #97A8C4;
    }
    &.link-item {
      font-weight: normal;
    }
  }
}
</style>
