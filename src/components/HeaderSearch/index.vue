<template>
  <div class="topbar-search-select" :class="{ 'show': showSearch }">
    <search :style="searchStyle" @click.stop="handleSearch" />
    <el-select
      filterable
      remote
      placeholder="Search"
      :remote-method="querySearch"
      :loading="loading"
      v-show="showSearch"
      ref="topbarSearch"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchStyle = 'width: 19px; height: 19px;'
// topbar search segment
const topbarSearch = ref(null)
const value = ref('')
const options = ref([])
const loading = ref(false)
const showSearch = ref(false)
function handleSearch() {
  showSearch.value = !showSearch.value
  if(showSearch.value && topbarSearch.value) topbarSearch.value.focus()
}
function querySearch(query) {
  console.log('功能没有完成：' + query)
}
watch(() => showSearch.value, (newValue) => {
  if(newValue) {
    // 关闭事件监听
    document.body.addEventListener('click', handleSearch)
  } else {
    document.body.removeEventListener('click', handleSearch)
  }
})
</script>

<style lang="less" scoped>
.topbar-search-select {
  transition: width .5s;
  display: flex;
  align-items: center;
  :deep(.el-select) {
    flex-grow: 1;
    .el-input__inner {
      padding: 0;
      border: 0;
      border-radius: 0;
      height: 36px;
      margin-left: 10px;
      border-bottom: 1px solid #d9d9d9;
    }
  }
}
</style>
