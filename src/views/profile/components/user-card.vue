<template>
  <el-card class="user-card">
    <template #header>
      <div class="card-header">
        About me
      </div>
    </template>
    <div class="card-body">
      <div class="profile-header">
        <PantHumb :avatar="user.avatar" :textShow="true" class="profile-img">
          <div>Hello</div>
          {{user.role}}
        </PantHumb>
        <div class="profile-info">
          <div class="info-text user-name">{{user.name}}</div>
          <div class="info-text user-role">{{uppercaseFirst(user.role)}}</div>
        </div>
      </div>
      <div class="profile-detail">
        <div class="detail-category">
          <div class="category-header">
            <i class="iconfont icon-education" />
            <span class="text">Education</span>
          </div>
          <div class="category-info">
            JS in Computer Science from the University of Technology
          </div>
        </div>
        <div class="detail-category">
          <div class="category-header">
            <i class="iconfont icon-skill" />
            <span class="text">Skills</span>
          </div>
          <div class="category-info">
            <SkillProgress :progressList="progressList" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import PantHumb from '@/components/PantHumb'
import SkillProgress from '@/components/SkillProgress'
// props
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
const progressList = ref([
  {
    language: 'Vue',
    progress: 0.7
  },
  {
    language: 'JavaScript',
    progress: 0.18
  },
  {
    language: 'CSS',
    progress: 0.12
  },
  {
    language: 'ESLint',
    progress: 1
  }
])
</script>

<style lang="less" scoped>
.user-card {
  // :deep(.el-card__header) {
  //   padding: 10px 20px;
  // }
  .card-body {
    .profile-header {
      .profile-img {
        position: relative;
        width: 111px;
        height: 111px;
        margin: 0 auto;
      }
      .profile-info {
        .info-text {
          text-align: center;
          line-height: 2;
        }
        .user-name {
          font-weight: bold;
        }
        .user-role {
          font-size: 14px;
          color: #777777;
        }
      }
    }
    .profile-detail {
      .detail-category {
        margin-top: 20px;
        .category-header {
          font-size: 14px;
          line-height: 2;
          border-bottom: 1px solid #DFE6EC;
          margin-bottom: 10px;
          .text {
            font-weight: bold;
            margin-left: 5px;
          }
        }
        .category-info {
          font-size: 14px;
          color: #777777;
        }
      }
    }
  }
}
</style>
