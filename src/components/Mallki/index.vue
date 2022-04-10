<template>
  <a class="mallki-container">
    {{text}}
    <span :text="text" class="span-one"></span>
    <span :text="text" class="span-two"></span>
  </a>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style lang="less" scoped>
// 使用container会导致动画效果异常，尽量别使用简单命名类
.mallki-container {
  position: absolute;
  font-family: 'Dosis', sans-serif;
  font-weight: 800;
  line-height: 1;
  color: #4DD9D5;
  transition: color 0.5s 0.25s;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 60%;
    top: 20%;
    left: -100%;
    transition: 0.3s ease-in-out;
    background-color: #1890FF;
  }
  &:hover {
    transition: none;
    color: transparent;
    &::before {
      transform: translateX(201%);
    }
    span::before {
      transition-delay: 0.3s;
    }
    .span-one::before {
      transform: translateY(0);
    }
    .span-two::before {
      transform: translateY(-100%);
    }
  }
  span {
    position: absolute;
    line-height: 1;
    top: 0;
    left: 0;
    height: 50%;
    color: #1890FF;
    overflow: hidden;
  }
  .span-two {
    top: 50%;
  }
  span::before {
    content: attr(text);
    display: inline-block;
    height: 100%;
    transition: transform 0.25s;
  }
  .span-one::before {
    transform: translateY(100%);
  }
  .span-two::before {
    transform: translateY(-200%);
  }
}
</style>
