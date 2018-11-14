/**
 * Created by Administrator on 2017/1/12.
 */

export default {
  //用户信息getters
  getUserInfo: state => {
    return state.userInfo;
  },
  //设置登陆状态getters
  getLoginStatus: state => {
    return state.isLogin;
  },
  //商铺 ID getters
  getStores: state => {
    return state.store || {};
  },
  //商铺个数  用于header隐藏按钮 getters
  getStoreLen: state => {
    return state.storeLen;
  },
  //全局非缓存变量 getters
  getNocache: state => {
    return state.nocache;
  }
};


