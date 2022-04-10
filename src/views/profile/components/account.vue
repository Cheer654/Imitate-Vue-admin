<template>
  <el-form label-position="top">
    <el-form-item label="Name">
      <el-input v-model.trim="userName" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
const email = ref(props.user.email)
const userName = ref(props.user.name)
function submit() {
  this.$message({
    message: 'User information has been updated successfully',
    type: 'success',
    duration: 5 * 1000
  })
}
</script>
