<template>
  <div class="todo-container">
    <header class="todo-header">
      <input
        placeholder="Add Todo In Here"
        @keyup.enter="addTodo"
        type="text"
        class="header-input"
      >
    </header>
    <section>
      <span @click="toggleAll" :class="{'checked-all': checkedAll()}" class="toggle-all">❯</span>
      <ul class="todo-list" ref="todoList">
        <li
          v-for="(todo, index) in filteredTodos"
          :key="index"
          class="todo-item"
          :class="{editing: modifyIndex === index}"
        >
          <div class="view" :class="{checked: todo.done}">
            <div class="todo-check" @click="changeCheck(todo)"></div>
            <div @dblclick="modifyIndex = index" class="todo-name" v-text="todo.text"></div>
            <button class="destory" @click="deleteTodo(todo)">×</button>
          </div>
          <input
            :value="todo.text"
            v-show="modifyIndex === index"
            v-focus
            @blur="doneEdit"
            @keyup.enter="modifyContent($event, todo)"
            class="edit"
            placeholder="Please press 'Enter' to modify content"
          >
        </li>
      </ul>
    </section>
    <footer v-show="defalutList.length" class="todo-footer">
      <span class="todo-count">{{countFormat()}}</span>
      <ul class="todo-filters">
        <li v-for="(value, key) in todoFilters" :key="key" class="todo-filter">
          <button
            @click.prevent="visibility = key"
            class="filter-item"
            :class="{actived: visibility === key}"
          >
            {{capitalize(key)}}
          </button>
        </li>
      </ul>
    </footer>
  </div>
  <teleport to="body">
    <div class="todo-tip" ref="todoTip">双击编辑</div>
  </teleport>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import todoTipSetup from './todo-tip.js'
import { checkContent } from '@/utils'

// directives
const vFocus = async(el) => {
  await nextTick()
  el.focus()
}
const { todoList, todoTip } = todoTipSetup()

const defalutList = ref([
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
])
const modifyIndex = ref(-1)
// computed没有起效？？？
function checkedAll() {
  return defalutList.value.every(todo => todo.done)
}
function addTodo(e) {
  const content = checkContent(e.target.value)
  if(!content) return
  defalutList.value.splice(0, 0, {
    text: content,
    done: false
  })
  e.target.value = ''
}
function toggleAll() {
  const isCheckedAll = checkedAll()
  defalutList.value.forEach(todo => {
    todo.done = !isCheckedAll
  })
}
function deleteTodo(todo) {
  // 此处数据量大时，需要优化
  defalutList.value.splice(defalutList.value.indexOf(todo), 1)
}
function changeCheck(todo) {
  todo.done = !todo.done
}
function doneEdit() {
  modifyIndex.value = -1
}
function modifyContent(e, todo) {
  const content = checkContent(e.target.value)
  if(!content) return
  todo.text = content
  doneEdit()
}
// filter 相关内容
// 静态数据
const todoFilters = {
  all: todoList => todoList,
  active: todoList => todoList.filter(todo => !todo.done),
  completed: todoList => todoList.filter(todo => todo.done)
}
const visibility = ref('all')
let filteredTodoLength = defalutList.value.length
const filteredTodos = computed(() => {
  const filteredTodo = todoFilters[visibility.value](defalutList.value)
  filteredTodoLength = filteredTodo.length
  return filteredTodo
})
function countFormat() {
  return `${filteredTodoLength} item` + (filteredTodoLength !== 1 ? 's' : '')
}
function capitalize(key) {
  return key[0].toLocaleUpperCase() + key.substr(1)
}
</script>

<style lang="less" scoped>
.todo-container {
  position: relative;
  .todo-header {
    margin-bottom: 2px;
    .header-input {
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      line-height: 1;
      padding: 10px 16px 10px 55px;
      border: none;
      outline: none;
    }
  }
  .toggle-all {
    position: absolute;
    width: 41px;
    height: 44px;
    font-size: 26px;
    top: -2px;
    left: 0;
    color: #9b9999;
    text-align: center;
    transform: rotate(90deg);
    cursor: pointer;
    &.checked-all {
      color: black;
    }
  }
  .todo-list {
    .todo-item {
      background-color: white;
      margin-bottom: 1px;
      &.editing {
        .view {
          display: none;
        }
        .edit {
          width: 100%;
          box-sizing: border-box;
          border: none;
          outline: none;
          height:50px;
          font-size: 20px;
          padding: 15px 11px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2) inset;
        }
      }
      .view {
        // height: 40px;
        position: relative;
        &.checked {
          .todo-check {
            background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
          }
          .todo-name {
            color: #D9D9D9;
            text-decoration: line-through;
          }
        }
        .todo-check {
          position: absolute;
          width: 40px;
          height: 100%;
          background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 36px;
        }
        .todo-name {
          line-height: 1;
          font-size: 16px;
          padding: 15px 50px;
          vertical-align: top;
          word-break: break-all;
          transition: all 0.4s;
        }
        .destory {
          display: none;
          border: none;
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 40px;
          padding: 0;
          font-size: 30px;
          vertical-align: top;
          color: #cc9a9a;
          cursor: pointer;
          background-color: transparent;
          &:hover {
            color: #af5b5e;
          }
        }
        &:hover .destory {
          display: block;
        }
      }
    }
  }
  .todo-footer {
    height: 40px;
    padding: 12px 20px;
    box-sizing: border-box;
    background: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2),
                0 8px 0 -3px #F6F6F6,
                0 9px 1px -3px rgba(0, 0, 0, 0.2),
                0 16px 0 -6px #F6F6F6,
                0 17px 1px -6px rgba(0, 0, 0, 0.2);
    .todo-count {
      font-size: 14px;
    }
    .todo-filters {
      float: right;
      .todo-filter {
        float: left;
        font-size: 12px;
        .filter-item {
          padding: 1px 5px;
          background-color: transparent;
          border: 1px solid transparent;
          border-radius: 3px;
          cursor: pointer;
          &:hover {
            border-color: rgba(175, 47, 47, 0.3);
          }
          &.actived {
            border-color: rgba(175, 47, 47, 0.5);
          }
        }
      }
    }
  }
}
</style>
