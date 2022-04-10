<template>
  <el-dropdown trigger="click" placement="bottom-end">
    <div>
      <img :src="avatar+'?imageView2/1/w/80/h/80'" class="topbar-avatar-img">
      <caret-bottom :style="caretBottomStyle" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <a
          v-for="(link, index) in links"
          @click.prevent="hrefLink(link)"
          :key="index"
        >
          <el-dropdown-item>{{link.name}}</el-dropdown-item>
        </a>
        <el-dropdown-item @click="logout" divided>
          <span>Log Out</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

// 静态数据
const caretBottomStyle = 'width: 12px; height: 12px;'
// 头像
const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
const links = [
  {
    name: 'Profile',
    href: '/profile'
  },
  {
    name: 'Dashboard',
    href: '/'
  },
  {
    name: 'Github',
    href: 'https://github.com/PanJiaChen/vue-element-admin/',
    target: '_blank'
  },
  {
    name: 'Docs',
    href: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    target: '_blank'
  }
]

// 第三方数据
const router = useRouter()
const route = useRoute()
const store = useStore()

function hrefLink(link) {
  if(link.target) {
    window.open(link.href)
  } else {
    router.push(link.href)
  }
}
function logout() {
  store.dispatch('user/logout').then(result => {
    // query字段自动转义不支持直接push字符串
    // router.push(`/login?${qs.stringify({ redirect: route.fullPath })}`)
    router.push({ path: '/login', query: { redirect: route.fullPath } })
  }).catch(console.log)
}
</script>

<style lang="less" scoped>
.topbar-avatar-img {
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border-radius: 10px;
}
</style>
