/**
 * Created by Administrator on 2017/1/11.
 */

import api from 'api';

let noop = () => {
};

export default {
  showAlert: ({commit}, data = {}) => {
    data.type = 'alert';
    if (typeof data.onCancel != 'function') {
      data.onCancel = noop
    }
    if (!data.title) {
      data.title = '提示';
    }

    commit('SHOW_ALERT', data);
  },
  hideAlert: ({commit}) => {
    commit('HIDE_ALERT');
  },
  showConfirm: ({commit}, data = {}) => {
    if (!data.message) {
      return false
    }
    data.type = 'confirm';
    if (typeof data.onCancel != 'function') {
      data.onCancel = noop
    }
    if (typeof data.onOk != 'function') {
      data.onOk = noop
    }

    commit('SHOW_ALERT', data);
  },
  login: ({commit}, data) => {
    return new Promise(function (resolve, reject) {
      let username = data["username"];
      let password = data["password"];
      if (username && password) {
        api.doLogin(username, password).done(res => {
          let data = api.parse(res);
          if (data) {
            console.log(data);
            commit('SET_LOGGED_IN', true);
            commit('SET_USER_INFO', data);
            commit('SET_APPCLASS', 'box');
            resolve(data);
          } else {
            commit('SET_INVALID_LOGIN');
            commit('SHOW_ALERT', {
              message: res,
              canlBtnText: '关 闭',
              type: 'alert',
              onCancel: noop,
              cancelStyle: {background: '#fccc27'}
            });
            reject(res.msg);
          }

        }).fail(error => {
          commit('SET_INVALID_LOGIN');
          commit('SHOW_ALERT', {
            message: 'login fail',
            canlBtnText: '关 闭',
            type: 'alert',
            onCancel: noop,
            cancelStyle: {background: '#fccc27'}
          });
          reject('net request error');
        })
      } else {
        reject();
      }
    });

  },
  logout: ({commit}) => {
    return new Promise(function (resolve, reject) {
      api.doLogout().done(res => {
        commit('SET_INVALID_LOGIN');
        commit('SET_APPCLASS', 'box sigin-box');
        resolve(res);
      }).fail(error => {
        commit('SET_INVALID_LOGIN');
        commit('SHOW_ALERT', {
          message: 'login fail',
          canlBtnText: '关 闭',
          type: 'alert',
          onCancel: noop,
          cancelStyle: {background: '#fccc27'}
        });
        reject('net request error');
      })

    });
  },
  setAppClass: ({commit}, className = 'box') => {
    commit('SET_APPCLASS', className);
  },
  setNavMod: ({commit}, data) => {
    commit('SET_NAVMOD', data);
  },
  setUserNav: ({commit}, data) => {
    commit('SET_USERNAV', data);
  },
  setMenuItems: ({commit}, data) => {
    commit('SET_MENUITEMS', data);
  },
  setUEditor: ({commit}, data) => {
    commit('SET_UEDITOR', data);
  },
}



