/**
 * Created by Cray on 2017/1/4.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import phoneRouter from './phoneRouter';

Vue.use(VueRouter);

const router = new VueRouter({
  routes:[...phoneRouter]
});

export default router;
