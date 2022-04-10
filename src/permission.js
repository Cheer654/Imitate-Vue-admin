import router from '@/router'
// import { ElMessage } from 'element-plus'
// 导入导航条以及样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'

import store from '@/store'

import { getToken } from './utils/auth.js'
import getPageTitle from './utils/page-title.js'

// 关闭右上旋转圈
NProgress.configure({ showSpinner: false })

// 可以使用constantRoutes作为白名单
const whiteList = ['/login']

// next()后面的程序可继续执行，尽量next后面不加代码
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()
  const hasToken = getToken()
  if(hasToken) {
    if(to.path === '/login') {
      next('/') // 拥有token且想进入login页面，直接重定向首页，触发else条件
      NProgress.done()
    } else {
      // 根据store的roles判断是否初次登录，权限数组必须大于0
      const hasRoles = store.getters.roles?.length > 0
      if(hasRoles) {
        next()
      } else {
        // 第一次登录需要获取用户权限
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          accessRoutes.forEach(router.addRoute)
          // 此处不可使用next(),会出现路由报错
          // 可考虑在登录后将个人信息保存在localstorage中
          next({ ...to, replace: true })
          NProgress.done()
        } catch (error) {
          ElMessage({
            message: error.message || error || 'Unknown Error',
            type: 'error'
          })
          store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 二进制取反: 负数取反从0开始，正数取反从-1开始
    if(~whiteList.indexOf(to.path)) {
      // 白名单直接跳过
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      // 关闭当前进度条，重新跳转
      NProgress.done()
    }
  }
})
router.afterEach((to, from, next) => {
  // 页面标题
  document.title = getPageTitle(to.meta.title)
  // 关闭进度条
  NProgress.done()
})
