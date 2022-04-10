<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
      </div>
    </template>
    <div class="card-body">
      <PanThumb :avatar="avatar" class="pan-thumb" />
      <Mallki :text="mallkiText" class="mallki-text" />
      <SkillProgress :progressList="progressList" />
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import PanThumb from '@/components/PantHumb'
import Mallki from '@/components/Mallki'
import SkillProgress from '@/components/SkillProgress'
import storeMapper from '@/utils/store-mapper.js'
const { avatar } = storeMapper(['avatar'], 'mapGetters')

const mallkiText = ref('vue-element-admin')
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
.box-card {
  width: 100%;
  :deep(.el-card__header) {
    padding: 0;
    border: none;
  }
  :deep(.el-card__body) {
    padding: 0;
  }
  .card-header {
    height: 220px;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1, 1.1);
      filter: brightness(110%);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .card-body {
    position: relative;
    padding: 50px 20px 25px;
    .pan-thumb {
      position: absolute;
      width: 70px;
      height: 70px;
      // 231 - 220 - 35
      top: -24px;
      left: 20px;
    }
    .mallki-text {
      top: 20px;
      right: 20px;
      font-size: 20px;
    }
  }
}
</style>
