/**
 * Created by Administrator on 2017/1/11.
 */
import Local from 'utils/local';

export default {
  SHOW_ALERT (state, options){
    options.show = true;
    state.alert = options;
  },

  HIDE_ALERT(state) {
    state.alert.show = false;
  },

  /**
   * 设置登录信息
   * @param state
   * @param data
   * @constructor
   */
  SET_USER_INFO (state, data) {
    state.userInfo.username = data.loginName;
    state.userInfo.id = data.id;
    state.userInfo.firstLogin = data.firstLogin == "0" ? true : false;
    Local.setItem('vuex', state);
  },
  /**
   * 设置登录成功状态
   * @param state
   * @param isLogin
   * @constructor
   */
  SET_LOGGED_IN (state, isLogin) {
    state.userInfo.isLogin = isLogin;
    Local.setItem('vuex', state);
  },
  /**
   * 设置登录失效状态
   * @param state
   * @constructor
   */
  SET_INVALID_LOGIN (state) {
    state.app.menuItem = '0-0';
    state.userInfo.isLogin = false;
    Local.setItem('vuex', state);
  },

  SET_APPCLASS (state, className) {
    state.app.boxClass = className;
    Local.setItem('vuex', state);
  },

  SET_NAVMOD (state, value){
    state.app.menuItem = value;
    Local.setItem('vuex', state);
  },

  SET_USERNAV (state, value){
    state.userMenu.userNav  = value;
    Local.setItem('vuex', state);
  },
  SET_MENUITEMS (state, value){
    state.menuItems = value;
    Local.setItem('vuex', state);
  },

  SET_UEDITOR (state, value){
    state.UEditor.container = value;
    Local.setItem('UEditor', state);
  }
}
