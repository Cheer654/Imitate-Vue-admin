import * as Icons from '@element-plus/icons-vue'
import * as filters from '@/filters/index.js'
export default {
  install(app) {
    // icon
    for(const propKey of Reflect.ownKeys(Icons)) {
      if(typeof propKey === 'string') {
        app.component(propKey, Icons[propKey])
      }
    }
    // filters
    for(const propKey in filters) {
      app.config.globalProperties[propKey] = filters[propKey]
    }
  }
}
