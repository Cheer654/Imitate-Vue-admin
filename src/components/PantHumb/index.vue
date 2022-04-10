<template>
  <!-- 在使用该组件时需要给一个position属性值，非默认值 -->
  <div class="img-container">
    <div v-if="textShow" class="pan-info">
      <slot />
    </div>
    <img :src="avatar" class="pan-img">
  </div>
</template>

<script setup>
const prop = defineProps({
  avatar: {
    type: String,
    required: true
  },
  textShow: {
    type: Boolean,
    defalut: false
  }
})
</script>

<style lang="less" scoped>
@outside-padding: 5px;
// @inset-width = 100% - @outside-padding * 2
@inset-width: calc(100% - 10px);
.img-container {
  padding: @outside-padding;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: white;
  &:hover .pan-img {
    transform: rotate(-125deg);
  }
  .pan-info {
    position: absolute;
    border-radius: 50%;
    width: @inset-width;
    height: @inset-width;
    padding: 11%;
    text-align: center;
    box-sizing: border-box;
    border: 5px solid #EFF1F4;
  }
  .pan-img {
    position: absolute;
    transform-origin: 90% 45%;
    transition: transform 0.3s;
    border-radius: 50%;
    width: @inset-width;
    height: @inset-width;
  }
}
</style>
