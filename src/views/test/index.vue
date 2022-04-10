<template>
  <div class="test-container">
    <span
      v-for="item in 50"
      @click="moveToTag(item)"
      :key="item"
      class="scrollbar-demo-item"
    >
      {{ item }}
    </span>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import storeMapper from '@/utils/store-mapper.js'
const $store = useStore()
// tagsList viewCache
const { tagsList, viewCache } = storeMapper(['tagsList', 'viewCache'], 'mapGetters')
const { temp } = storeMapper(['temp'], 'mapState', 'tagsView')
// console.log(tagsList, viewCache)
// console.log(temp)
function moveToTag(index) {
  $store.commit('tagsView/CHANGE_TEMP', index - 1)
}
</script>

<style lang="less" scoped>
.test-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100%;
  .scrollbar-demo-item {
    display: inline-block;
    text-align: center;
    line-height: 24px;
    padding: 0 10px;
    border: 1px solid #D8DCE5;
    margin: 0 5px;
    cursor: pointer;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
  }
}
</style>
