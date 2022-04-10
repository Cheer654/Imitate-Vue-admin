const state = () => ({
  sidebar: {
    isCollapse: false
  }
})

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.isCollapse = !state.sidebar.isCollapse
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
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
