/**
 * Created by Administrator on 2017/1/12.
 */

export default {
  getUserInfo: state => {
    return state.userInfo;
  },
  isLogin: state => {
    return state.userInfo.isLogin;
  },
  getAlert: state => {
    return state.alert;
  },
  getApp: state => {
    return state.app;
  },
  getNavMod: state => {
    return state.app.menuItem;
  },
  getUserNav: state => {
    return state.userMenu.userNav;
  },
  getMenuItems:state=>{
    return state.menuItems
  },
  getUEditor: state => {
    return state.UEditor.container;
  },

}
