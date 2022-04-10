<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg'+avatarPrefix">
        <span class="username text-muted">Iron Man</span>
        <span class="description">Shared publicly - 7:30 PM today</span>
      </div>
      <p class="detail">
        Lorem ipsum represents a long-held tradition for designers,
        typographers and the like. Some people hate it and argue for
        its demise, but others ignore the hate as they create awesome
        tools to help create filler text for everyone from bacon lovers
        to Charlie Sheen fans.
      </p>
      <ul class="list-inline clearfix">
        <li class="list-item">
          <i class="iconfont icon-share" />
          <span>Share</span>
        </li>
        <li class="list-item">
          <!-- <span @click="show = !show">
            <transition name="toggle-icon">
              <i v-if="show" class="iconfont icon-love" />
            </transition>
          </span> -->
          <i class="iconfont icon-aixin-xian" />
          <span>Like</span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg'+avatarPrefix">
        <span class="username text-muted">Spider Man</span>
        <span class="description">Posted 4 photos - 2 days ago</span>
      </div>
      <p class="detail">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="img in carouselImages" :key="img">
            <img :src="img+carouselPrefix" class="carousel-img">
          </el-carousel-item>
        </el-carousel>
      </p>
      <ul class="list-inline clearfix">
        <li class="list-item">
          <i class="iconfont icon-share" />
          <span>Share</span>
        </li>
        <li class="list-item">
          <!-- <span @click="show = !show">
            <transition name="toggle-icon">
              <i v-if="show" class="iconfont icon-love" />
            </transition>
          </span> -->
          <i class="iconfont icon-aixin-xian" />
          <span>Like</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
const show = ref(false)
const carouselImages = ref([
  'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
  'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
  'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
  'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
])
</script>

<style lang="less" scoped>
.user-activity {
  .post {
    position: relative;
    padding-bottom: 30px;
    margin-bottom: 15px;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 2px;
      width: 100%;
      background-color: var(--el-border-color-light);
    }
    .user-block {
      .img-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        float: left;
      }
      .username,
      .description {
        display: block;
        margin-left: 50px;
        line-height: 20px;
      }
      .description {
        color: #666666;
        font-size: 12px;
      }
    }
    .detail {
      color: #666666;
      font-size: 14px;
      .carousel-img {
        width: 100%;
        height: 100%;
      }
    }
    .list-inline {
      .list-item {
        float: left;
        font-size: 14px;
        color: #666666;
        margin-right: 10px;
        .iconfont {
          display: inline-block;
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
