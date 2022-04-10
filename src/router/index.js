import { createRouter, createWebHashHistory } from 'vue-router'
import qs from 'qs'

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          title: 'Dashboard',
          isAffix: true,
          icon: {
            type: 'el-icon',
            name: 'Grid'
          }
        }
        // 使用别名加path：''也能实现path:'/'重定向效果，
        // alias: '/dashboard'
      }
    ]
    // redirect: '/login'
    // 重定向赋值函数
    // path: '/login/:searchText',
    // redirect: to => {
    //   return { name: 'login', query: { searchText: to.params.searchText } }
    // }
  },
  {
    path: '/login',
    hidden: true,
    // 动态导入,减少加载负担
    component: () => import('@/views/login/index.vue')
  }
]

export const asyncRoutes = [
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'Profile',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        path: '',
        name: 'guide',
        component: () => import('@/views/guide/index.vue'),
        meta: {
          title: 'Guide',
          icon: {
            type: 'iconfont',
            name: 'icon-paper-plane'
          }
        }
      }
    ]
  },
  {
    path: '/echarts-view',
    component: Layout,
    redirect: '/echarts-view/echarts',
    meta: {
      title: 'Echarts',
      icon: {
        type: 'iconfont',
        name: 'icon-size'
      }
    },
    children: [
      {
        path: 'echarts',
        name: 'echarts',
        component: () => import('@/views/echarts/echarts-view.vue'),
        meta: {
          title: 'echarts'
        }
      },
      {
        path: 'echarts1',
        name: 'echarts1',
        component: () => import('@/views/echarts/echarts-view1.vue'),
        meta: {
          title: 'echarts1'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '',
        name: 'test',
        component: () => import('@/views/test/index.vue'),
        meta: {
          title: 'Test',
          icon: {
            type: 'iconfont',
            name: 'icon-size'
          }
        }
      }
    ]
  }
]

// 切换路由滚动行为,仅支持pushState浏览器也就是有历史记录(回滚行为)
// 需要不同路由有不同滚动起点，需要设置元信息
const scrollBehavior = (to, from, savedPosition) => {
  if(savedPosition) {
    return savedPosition
  } else {
    return { top: 0 }
  }
}

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),  // require serivce support
  history: createWebHashHistory(process.env.BASE_URL),
  scrollBehavior,
  // 解析qs.stringify格式化的字符串(vue自带解析能处理大部分字符串，但没有正确解析qs.stringify格式化的数组)
  parseQuery: qs.parse,
  // 将对象格式化字符串(&=形式，JSON是以对象格式进行格式化)，同时将特殊字符串转义
  stringifyQuery: qs.stringify,
  routes: constantRoutes
})

export default router
