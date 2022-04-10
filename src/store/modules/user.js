import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { login, logout, getInfo } from '@/api/user.js'
const state = () => ({
  token: getToken() || '',
  roles: [],
  name: '',
  avatar: '',
  introduction: ''
})

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_INTRODUCTION(state, introduction) {
    state.introduction = introduction
  }
}

const actions = {
  login({ commit }, user) {
    const { username, password } = user
    return new Promise((resolve, reject) => {
      login({ username, password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ state, commit }) {
    return new Promise((resolve, reject) => {
      logout({ token: state.token }).then(response => {
        if(response.data === 'success') {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ state, commit }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token }).then(({ data }) => {
        if(!data) {
          reject(new Error('Verification failed, please Login again.'))
        }
        const { roles, name, avatar, introduction } = data
        // roles must be a non-empty array
        if(!roles || roles.length <= 0) {
          reject(new Error('getInfo: roles must be a non-null array!'))
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        // do something
        reject(error)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLES', [])
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
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
