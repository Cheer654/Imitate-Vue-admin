<template>
  <div class="login-container clearfix">
    <el-form class="login-form"
      :model="userForm"
      :rules="rules"
      ref="ruleFormRef"
    >
      <h3 class="login-form-title">Login Form</h3>
      <el-form-item prop="username">
        <el-input
          v-model="userForm.username"
          placeholder="Username"
          autocomplete="on"
          clearable
        >
          <template #prefix>
            <UserFilled :style="iconStyle" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="userForm.password"
          type="password"
          placeholder="Password"
          show-password
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <Lock :style="iconStyle" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="last-item">
        <el-button :loading="loading" type="primary" @click="handleLogin"
          >Login</el-button
        >
      </el-form-item>
      <div class="login-tip">
        <div class="login-tip-left">
          Username : admin&#12288;Password : any<br>
          Username : editor&#12288;Password : any
        </div>
        <div class="login-tip-right">
          <el-button type="primary" @click="dialogVisible = true"
            >{{title}}</el-button
          >
        </div>
      </div>
    </el-form>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="50%"
    >
      <!-- :before-close="handleClose" -->
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
// 页面部分样式或者静态数据
const iconStyle = 'width:1.5em;height:1.5em;'
const title = 'Or connect with'
const rules = {
  username: [{ required: true, trigger: 'blur', validator }],
  password: [{ required: true, trigger: 'blur', validator }]
}
// 第三方数据
const router = useRouter()
const route = useRoute()
const store = useStore()
// 页面响应数据
const userForm = reactive({ username: 'admin', password: '111111' })
const dialogVisible = ref(false)
const ruleFormRef = ref(null)
const loading = ref(false)
// 计算属性
// 生命周期
// 当前页面方法
function validator(rule, value, callback) {
  if(value.length < 5) {
    callback(new Error('The content can not be less than 6 digits'))
  } else {
    callback()
  }
}
function handleLogin() {
  // element-plus loading状态点击事件不会触发
  ruleFormRef.value.validate((valid) => {
    if(valid) {
      loading.value = true
      store.dispatch('user/login', userForm).then(response => {
        router.push(route.query.redirect || '/')
      }).catch(error => {
        // 异步操作不处理错误，交给真正使用地方处理
        console.log(error.message)
      }).finally(() => {
        loading.value = false
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style lang="less">
@input-height: 47px;
@button-height: 36px;
@button-backgroundColor: #409EFF;

.login-container {
  .login-form {
    .el-input {
      .el-input__inner {
        height: @input-height;
        padding: 12px 50px;
        color: white;
        background-color: #283443;
        border: 1px solid #3E4957;
      }
      &__suffix,
      &__prefix {
        align-items: center;
      }
    }
    .el-button {
      flex-grow: 1;
      height: @button-height;
    }
  }
}
</style>
<style lang="less" scoped>
@line-height: 18px;
.login-container {
  width: 100%;
  height: 100%;
  background-color: #2D3A4B;
  .login-form {
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    box-sizing: border-box;
    &-title {
      color: white;
      font-size: 25px;
      text-align: center;
    }
    .last-item {
      margin-bottom: 30px;
    }
    .login-tip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-flow: row nowrap;
      .login-tip-left {
        color: white;
        line-height: @line-height;
      }
    }
  }
}
</style>
