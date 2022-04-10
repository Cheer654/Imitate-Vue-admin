<template>
  <div>
    <el-tooltip
      effect="dark"
      content="Global Size"
      placement="bottom"
    >
      <el-dropdown
        trigger="click"
        placement="bottom-end"
        @command="handleSetSzie"
      >
        <div>
          <i class="iconfont icon-size"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script setup>
// global-size
function handleSetSzie(size) {
  console.log(size)
}
</script>

<style lang="less" scoped>
.icon-size {
  font-size: 19px;
}
</style>
