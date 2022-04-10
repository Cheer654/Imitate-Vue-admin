import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import './permission.js'

import appConfig from './app-config'
import './styles/index.less'

if(process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const app = createApp(App).use(store).use(router).use(ElementPlus)
app.use(appConfig)

app.mount('#app')
