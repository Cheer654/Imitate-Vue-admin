<template>
  <button class="collapse-btn">
    <fold :style="iconStyle" :class="{ 'is-active': isCollapse }" />
  </button>
</template>

<script setup>
import { defineProps } from 'vue'
const iconStyle = 'width: 1.8em; height: 1.8em;'
// props
const props = defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="less" scoped>
@topbar-height: 50px;

.collapse-btn {
  width: @topbar-height;
  height: 100%;
  padding: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
  .is-active {
    transform: rotate(180deg);
  }
}
</style>
