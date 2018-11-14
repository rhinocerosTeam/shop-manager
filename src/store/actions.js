/**
 * Created by Administrator on 2017/1/11.
 */

import api from 'api';

let noop = () => {};

export default {
  loginIn: ({
    commit
  }, data) => {
    commit('SET_LOGININ', data);
  },
  loginOut: ({
    commit
  }, data) => {
    commit('SET_LOGINOUT');
  },
  setStore: ({
    commit
  }, data) => {
    commit('SET_STORE', data);
  },
  setStoreLen: ({
    commit
  }, data) => {
    commit('SET_STORELEN', data);
  },
  setNocache: ({
    commit
  }, data) => {
    commit('SET_NOCACHE', data);
  }

}