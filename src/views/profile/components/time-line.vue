<template>
  <el-timeline>
    <el-timeline-item
      v-for="(item, index) in timeline"
      :timestamp="item.timestamp"
      placement="top"
      :key="index"
    >
      <el-card>
        <h4>{{item.title}}</h4>
        <p>{{item.content}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { ref } from 'vue'
const timeline = ref([
  {
    timestamp: '2019/4/20',
    title: 'Update Github template',
    content: 'PanJiaChen committed 2019/4/20 20:46'
  },
  {
    timestamp: '2019/4/21',
    title: 'Update Github template',
    content: 'PanJiaChen committed 2019/4/21 20:46'
  },
  {
    timestamp: '2019/4/22',
    title: 'Build Template',
    content: 'PanJiaChen committed 2019/4/22 20:46'
  },
  {
    timestamp: '2019/4/23',
    title: 'Release New Version',
    content: 'PanJiaChen committed 2019/4/23 20:46'
  }
])
</script>
