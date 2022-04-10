// 尽量放置全局唯一并作用明显数据，方便后面获取
// getters中函数接收state以及自己的getters作为形参
export default {
  sidebar: state => state.app.sidebar,
  permission_routes: state => state.permission.routes,
  tagsList: state => state.tagsView.tagsList,
  viewCache: state => state.tagsView.viewCache,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  name: state => state.user.name,
  introduction: state => state.user.introduction
}
