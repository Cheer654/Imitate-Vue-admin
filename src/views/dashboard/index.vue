<template>
  <div class="dashboard-container">
    <DashboardTable />
    <el-row :gutter="16">
      <!-- :xs="8" :sm="6" :md="4" :lg="3" :xl="1" -->
      <el-col :span="12">
        <TodoList />
      </el-col>
      <el-col :span="12">
        <DoxCard />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import DashboardTable from './components/dashboard-table'
import TodoList from './components/todo-list'
import DoxCard from './components/box-card'
</script>

<style lang="less" scoped>
.dashboard-container {
  padding: 32px;
  background-color: #EFF1F4;
}
</style>
