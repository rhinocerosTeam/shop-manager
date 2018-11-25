import {
  API_HOST

} from '../config';
export default {


  stsAuth(param){
    return Promise.resolve($.ajax({
      url: API_HOST + '/api/sts-auth',
      type: 'get',
      dataType: 'json',
      data: {...param}
    }))

  },


  /** 验证码登录 **/
  loginByCrod(param) {
    return Promise.resolve($.ajax({
      url: API_HOST + '/login/mobileLogin',
      type: 'POST',
      dataType: 'json',
      data: this.paramFormat({
        ...param
      })
    }))
  },
  /** 密码登录 **/
  loginByPassword(param) {
    return Promise.resolve($.ajax({
      url: API_HOST + '/web/pwdLogin',
      dataType: 'json',
      data: this.paramFormat({
        ...param
      })
    }))
  },
  /** 登出 **/
  loginOut(param) {

    return Promise.resolve($.ajax({
      url: API_HOST + "/v1/user/logout",
      dataType: 'json',
      headers: {
        token: this.getToken()
      },
      data: this.paramFormat({
        ...param
      })
    }))
  },
  /** 发送验证码 **/
  sendCrod(param) {
    return Promise.resolve($.ajax({
      url: API_HOST + "/login/sendMsg",
      dataType: 'json',
      type: 'POST',
      // headers: {
      //   token: this.getToken()
      // },
      data: this.paramFormat({ ...param
      })
    }))
  },
  /** 设置密码 **/
  setPassword(param) {
    return Promise.resolve($.ajax({
      url: API_HOST + '/user/setPwd',
      dataType: 'json',
      type: 'POST',
      headers: {
        token: this.getToken()
      },
      data: this.paramFormat({
        ...param
      })
    }))
  },
  /** 获取用户信息 **/
  getUser(param) {

    return Promise.resolve($.ajax({
      url: API_HOST + "/user/getUser",
      dataType: 'json',
      type: 'POST',
      headers: {
        token: this.getToken()
      },
      data: this.paramFormat({
        ...param
      })
    }))
  },
  /** 通过传参获取用户信息获取用户信息 **/
  getUserByParam(token) {

    return Promise.resolve($.ajax({
      url: API_HOST + "/user/getUser",
      dataType: 'json',
      type: 'POST',
      data: {
        token
      }
    }))
  },
  /** 重置密码 **/
  resetPassword(param) {

    return Promise.resolve($.ajax({
      url: API_HOST + "/login/loginAndResetPwd",
      dataType: 'json',
      type: 'POST',
      // headers: {
      //   token: this.getToken()
      // },
      data: this.paramFormat({
        ...param
      })
    }))

  },
   /** 修改密码 **/
   modifiyPassword(param) {

     return Promise.resolve($.ajax({
       url: API_HOST + "/user/modifyPwd",
       dataType: 'json',
       type: 'POST',
       headers: {
         token: this.getToken()
       },
       data: this.paramFormat({
         ...param
       })
     }))

   },
  /** 获取商铺列表 **/
  getMailList(param) {

    return Promise.resolve($.ajax({
      url: API_HOST + "/user/getStoreList",
      dataType: 'json',
      type: 'POST',
      headers: {
        token: this.getToken()
      },
      data: this.paramFormat({
        ...param
      })
    }))

  }
}
