/**
 * Created by Administrator on 2017/1/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import state from './state';
import getters from './getters';
import actions from './actions';
import Local from 'utils/local';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
Vue.config.debug = debug;

export default new Vuex.Store({
    state: Local.getJSON('vuex') || state,
    mutations,
    actions,
    getters,
    strict: debug,
})