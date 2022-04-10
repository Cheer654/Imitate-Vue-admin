import { useStore } from 'vuex'

export default function() {
  let handleClick = true
  const store = useStore()
  function changeCollapse() {
    // 防抖
    if(handleClick) {
      handleClick = false
      store.dispatch('app/toggleSideBar')
      setTimeout(() => {
        handleClick = true
      }, 500)
    }
  }
  return {
    changeCollapse
  }
}
