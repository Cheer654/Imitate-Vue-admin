<template>
  <div class="profile-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="6">
        <UserCard :user="user" />
      </el-col>
      <el-col :xs="24" :sm="18" class="profile-items">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Activity" name="activity">
            <Activity />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="timeline">
            <Timeline />
          </el-tab-pane>
          <el-tab-pane label="Account" name="account">
            <Account :user="user" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './components/user-card.vue'
import Activity from './components/activity.vue'
import Timeline from './components/time-line.vue'
import Account from './components/account.vue'
import storeMapper from '@/utils/store-mapper.js'

const { name, roles, avatar } = storeMapper(['name', 'roles', 'avatar'], 'mapGetters')
const user = ref({
  name: name.value,
  avatar: avatar.value,
  role: roles.value.join(' | '),
  email: 'admin@test.com'
})

const activeName = ref('activity')
</script>

<style lang="less" scoped>
.profile-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  .profile-items {
    padding: 0 20px 20px!important;
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-card-border-radius);
    border: 1px solid var(--el-card-border-color);
    background-color: var(--el-card-bg-color);
    :deep(.el-tabs__item) {
      height: auto;
      line-height: 1.2;
      font-size: 18px;
      padding-top: 18px;
      padding-bottom: 18px;
    }
  }
}
</style>
