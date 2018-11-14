/**
 * Created by Administrator on 2017/1/11.
 */

export default {

  //设置登陆信息
  SET_LOGININ(state, data) {
    state.userInfo = _.merge({}, state.userInfo, data)
    state.isLogin = true
  },
  //登出
  SET_LOGINOUT(state) {
    state.userInfo = {
      userId: '',
      token: ''
    }
    state.store = {}
    state.isLogin = false
  },
  //设置storeid
  SET_STORE(state, data) {
    state.store = _.merge({}, state.store, data)
  },
  //设置商城个数
  SET_STORELEN(state, data) {
    state.storeLen = data
  },
  //设置
  SET_NOCACHE(state, data) {
    state.nocache = _.merge({}, state.nocache, data)
  },
}

