import { createStore } from 'vuex'
// import * as moudles from './modules'
import importAll from '../utils/import-all'
import getters from './getters'

// https://webpack.js.org/guides/dependency-management/#requirecontext
const moduleFiles = require.context('./modules', false, /\.js$/)
const modules = importAll(moduleFiles)
console.log(modules)

export default createStore({
  getters,
  modules: {
    ...modules
  }
})
