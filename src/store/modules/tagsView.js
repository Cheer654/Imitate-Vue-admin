const state = () => ({
  // tags标签组的列表
  tagsList: [],
  // view页面是否keep-alive
  viewCache: [],
  temp: 0
})

const mutations = {
  CHANGE_TEMP(state, index) {
    state.temp = index
  },
  TAG_ADD(state, route) {
    state.tagsList.push({
      path: route.path,
      query: route.query,
      name: route.name,
      meta: { ...route.meta }
    })
  },
  TAG_UPDATE(state, payload) {
    state.tagsList[payload.tagIndex].query = payload.route.query
  },
  TAG_DEL(state, index) {
    state.tagsList.splice(index, 1)
  },
  CACHE_ADD(state, cache) {
    state.viewCache.push(cache)
  },
  CACHE_DEL(state, cache) {
    state.viewCache.splice(state.viewCache.indexOf(cache), 1)
  }
}

const actions = {
  addAffixTags({ dispatch, commit }, routes) {
    routes.forEach(route => {
      if(route.meta?.isAffix) {
        commit('TAG_ADD', route)
        dispatch('addCache', route)
      }
    })
  },
  addTag({ dispatch, commit, state }, route) {
    for(let index = 0; index < state.tagsList.length; index++) {
      if(route.path === state.tagsList[index].path) {
        if(route.query !== state.tagsList[index].query) {
          commit('TAG_UPDATE', { route, tagIndex: index })
        }
        return
      }
    }
    // 逻辑部分放在actions，操作数据则放在mutations
    commit('TAG_ADD', route)
    dispatch('addCache', route)
  },
  delTagAndCache({ commit, state }, payload) {
    return new Promise(resolve => {
      commit('TAG_DEL', payload.index)
      if(!payload.tag.meta.noCache) {
        commit('CACHE_DEL', payload.tag)
      }
      resolve(payload.index)
    })
  },
  addCache({ commit, state }, route) {
    // 是否缓存当前组件，路由需要name属性
    if(!route.meta.noCache && !~state.viewCache.indexOf(route.name)) {
      commit('CACHE_ADD', route.name)
    }
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
