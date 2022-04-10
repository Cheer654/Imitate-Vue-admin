import { ref, onMounted, nextTick, watch } from 'vue'
import storeMapper from '@/utils/store-mapper.js'
export default function() {
  // 初始化内部变量
  let $setScrollLeft = null
  let $scrollWarp = null
  let $scrollEl = null
  const tagScrollbar = ref(null)
  // 模板中tag标签列表
  const tags = []
  const { tagsList } = storeMapper(['tagsList'], 'mapGetters')
  // 钩子hook给变量赋值
  onMounted(() => {
    $setScrollLeft = tagScrollbar.value.setScrollLeft
    $scrollWarp = tagScrollbar.value.$refs.wrap$
    $scrollEl = tagScrollbar.value.$el
  })
  const scrollToTag = async(path) => {
    // 由于tags标签是tagsList循环获取，操作tagsList即可
    const index = tagsList.value.findIndex(tag => tag.path === path)
    await nextTick()
    // 判断必须使用tagsList长度
    if(index === 0) {
      // setScrollLeft设置滚动条左侧隐藏的长度
      $setScrollLeft(tags[index].offsetLeft - 5)
    } else if(index === tagsList.value.length - 1) {
      $setScrollLeft(tags[index].offsetLeft + 5 + tags[index].offsetWidth - $scrollEl.clientWidth)
    } else {
      // 其余情况：预留至容器边一个tag的距离
      if(tags[index - 1].offsetLeft - 5 < $scrollWarp.scrollLeft) {
        $setScrollLeft(tags[index - 1].offsetLeft - 5)
      } else if(tags[index + 1].offsetLeft + 5 + tags[index + 1].offsetWidth > $scrollWarp.scrollLeft + $scrollEl.clientWidth) {
        // 往右滚动时，后面预留一个标签 + 5px的距离，也就是
        // 下个tag宽度 + 该tag的offsetLeft + 5 - 滚动条的视宽
        $setScrollLeft(tags[index + 1].offsetLeft + 5 + tags[index + 1].offsetWidth - $scrollEl.clientWidth)
      }
    }
  }
  // vue3中获取ref列表
  function setTagRef(el) {
    if(el) {
      tags[+el.dataset.index] = el
    }
  }
  function handleScroll(e) {
    const eventDelta = -e.wheelDelta || e.deltaY * 40
    $scrollWarp.scrollLeft = $scrollWarp.scrollLeft + eventDelta / 4
  }
  return {
    tagsList,
    tagScrollbar,
    scrollToTag,
    setTagRef,
    handleScroll
  }
}
