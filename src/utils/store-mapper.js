import { computed } from 'vue'
import vuex, { mapState, mapGetters, createNamespacedHelpers } from 'vuex'
// 全局store使用这个store实例
import store from '@/store'

// 对mapState等mapper进行封装方便使用组合式computed
function proMapper(mapArr, mapperFn) {
  const mappers = mapperFn(mapArr)
  const newMappers = {}
  Object.keys(mappers).forEach(propKey => {
    // vue2写法computed(){...mapState([])}，mapper是一个函数的集合
    // 底层调用this.$store，this以前指向当前component
    // vue3通过node子节点向父节点获取globalProperties(vue2是通过原型获取)
    const mapper = mappers[propKey].bind({ $store: store })
    newMappers[propKey] = computed(mapper)
  })
  return newMappers
}

export function useState(mapArr, namespaced) {
  const mapperFn = namespaced ? createNamespacedHelpers(namespaced).mapState : mapState
  return proMapper(mapArr, mapperFn)
}

// 这种需要手写mapper名字,不过不需要重新写其它mapper
const mapperArr = ['mapState', 'mapMutations', 'mapGetters', 'mapActions']
export default function(mapArr, mapperName, namespaced) {
  if(typeof mapperName !== 'string') {
    console.warn(`mapperName type must be string: ${typeof mapperName}`)
    return
  } else if(!mapperArr.includes(mapperName)) {
    console.warn(`mapperName is not exist: ${mapperName}`)
    return
  }
  const mapperFn = namespaced ? vuex.createNamespacedHelpers(namespaced)[mapperName] : vuex[mapperName]
  const mappers = mapperFn(mapArr)
  const newMappers = {}
  Object.keys(mappers).forEach(propKey => {
    const mapper = mappers[propKey].bind({ $store: store })
    newMappers[propKey] = computed(mapper)
  })
  return newMappers
}
