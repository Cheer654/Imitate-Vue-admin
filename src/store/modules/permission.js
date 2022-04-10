import { constantRoutes, asyncRoutes } from '@/router'
function filterAsyncRoutes(routes = [], roles) {
  const newRoutes = []
  routes.forEach(route => {
    if(hasPermission(route, roles)) {
      newRoutes.push(route)
      if(route.children) route.children = filterAsyncRoutes(route.children, roles)
    }
  })
  return newRoutes
}

function hasPermission(route, roles) {
  if(route.meta?.roles?.length > 0) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

const state = () => ({
  // 保留副本
  routes: [],
  addRoutes: []
})

const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = constantRoutes.concat(routes)
    state.addRoutes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    // 不能操作es6的导入值
    // asyncRoutes = asyncRoutes || []
    let routes
    if(roles.includes('admin')) {
      routes = asyncRoutes || []
    } else {
      routes = filterAsyncRoutes(asyncRoutes, roles)
    }
    commit('SET_ROUTES', routes)
    return routes
  }
}

const getters = {
}
export default {
  // 文档显示，不开启默认空间，getter、action以及mutation注册在全局命名空间导致命名冲突
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
