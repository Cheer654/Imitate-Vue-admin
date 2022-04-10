import { ref, onBeforeUnmount, onDeactivated, onActivated } from 'vue'
export default function() {
  const todoList = ref(null)
  const todoTip = ref(null)
  let timer = null
  onBeforeUnmount(removeTodoTip)
  onActivated(addTodoTip)
  onDeactivated(removeTodoTip)
  function addTodoTip() {
    todoList.value.addEventListener('mousemove', todoTipMouseover)
    todoList.value.addEventListener('mouseout', todoTipMouseout)
  }
  function removeTodoTip() {
    todoList.value.removeEventListener('mousemove', todoTipMouseover)
    todoList.value.removeEventListener('mouseout', todoTipMouseout)
  }
  function todoTipMouseover(e) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // 鼠标在目标元素期间内只触发一次提示框
      if(~e.target.className.indexOf('todo-name') && todoTip.value.style.display === 'none') {
        todoTip.value.style.display = 'block'
        todoTip.value.style.left = e.pageX + 15 + 'px'
        todoTip.value.style.top = e.pageY + 10 + 'px'
      }
    }, 1000)
  }
  function todoTipMouseout(e) {
    if(~e.target.className.indexOf('todo-name')) {
      clearTimeout(timer)
      todoTip.value.style.display = 'none'
    }
  }
  return {
    todoList,
    todoTip
  }
}
