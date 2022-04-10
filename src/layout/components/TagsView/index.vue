<template>
  <div class="tag-views-container">
    <el-scrollbar ref="tagScrollbar" @mousewheel.prevent="handleScroll" class="scrollbar-wrapper">
      <span
        v-for="(tag, index) in tagsList"
        :ref="setTagRef"
        @click="routeLink(tag)"
        :key="tag.path"
        :data-index="index"
        class="tag-btn"
        :class="{active: tag.path === currentRoute}"
      >
        {{ tag.meta.title }}
        <span v-if="!tag.meta.isAffix" @click.stop="tagClose(tag, index)" class="tag-close"></span>
      </span>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import tagScrollbarSetup from './tag-scrollbar.js'

const {
  tagsList,
  tagScrollbar,
  scrollToTag,
  setTagRef,
  handleScroll
} = tagScrollbarSetup()

const route = useRoute()
const router = useRouter()
const store = useStore()

const currentRoute = ref('')

// watch参数属性immediate在mounted前运行一次，不能使用该属性操作模板
watch(() => route.path, newPath => {
  addRouteTag()
  scrollToTag(newPath)
})

onMounted(() => {
  // 初始化固定tag列表
  store.dispatch('tagsView/addAffixTags', router.getRoutes())
  addRouteTag()
  scrollToTag(route.path)
})

function addRouteTag() {
  currentRoute.value = route.path
  store.dispatch('tagsView/addTag', route)
}
function routeLink(tag) {
  router.push(tag)
}
function tagClose(tag, index) {
  store.dispatch('tagsView/delTagAndCache', { tag, index }).then(res => {
    if(tag.path === currentRoute.value) {
      if(res < tagsList.value.length - 1) {
        routeLink(tagsList.value[res])
      } else if(tagsList.value.length > 0) {
        routeLink(tagsList.value[tagsList.value.length - 1])
      } else {
        routeLink({ path: '/' })
      }
    }
  })
}
</script>

<style lang="less" scoped>
.tag-views-container {
  width: 100%;
  height: 34px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 0 3px rgba(0, 0, 0, .04);
  background-color: white;
  .scrollbar-wrapper {
    white-space: nowrap;
    padding-top: 4px;
    .tag-btn {
      display: inline-block;
      text-align: center;
      line-height: 24px;
      font-size: 12px;
      padding: 0 10px;
      border: 1px solid #D8DCE5;
      margin-right: 5px;
      cursor: pointer;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42B983;
        &::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: white;
          margin-right: 8px;
        }
      }
      .tag-close {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        vertical-align: -4px;
        &::before {
          content: '×';
          display: inline-block;
          text-align: center;
          line-height: 1;
          text-indent: -1px;
          vertical-align: 3px;
          transform: scale(0.8);
          color: #72AFE1;
        }
        &:hover {
          background-color: #B4BCCC;
          &::before {
            color: white;
          }
        }
      }
    }
  }
}
</style>
