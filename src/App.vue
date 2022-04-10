<template>
  <router-view />
</template>

<script>
export default {
  beforeCreated() {
    // this.$store.dispatch('user/getInfo').then(({ roles }) => {
    //   return store.dispatch('permission/generateRoutes', roles)
    // }).then(accessRoutes => {
    //   localStorage.setItem()
    // })
  }
}
</script>
