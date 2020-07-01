const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userData: state => state.user.userData,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  currentUserInfo: state => state.common.currentUserInfo,
  isMB: state => state.common.isMB,
  gameTypeList: state => state.common.gameTypeList,
  cardObj: state => state.common.cardObj
}
export default getters
