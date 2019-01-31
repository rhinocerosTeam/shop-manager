/**
 * Created by Cray on 2017/1/4.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import userManage from "./userManage";
import orderManage from "./orderManage";
import waresManage from "./waresManage";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    //首页
    {
      path: "/home",
      name: "home",
      meta: {
        auth: true,
        keepAlive: false
      },
      component: resolve => require(["../pages/home/"], resolve)
    },
    //首页
    {
      path: "/template",
      name: "template",
      meta: {
        auth: true,
        keepAlive: false
      },
      component: resolve => require(["../pages/template/"], resolve)
    },
    //通知页面
    {
      path: "/notice/noticeList",
      name: "noticeList",
      meta: {
        auth: true,
        keepAlive: false
      },
      component: resolve => require(["../pages/notice/list"], resolve)
    },
    //通知详情
    {
      path: "/notice/details",
      name: "noticeDetails",
      meta: {
        auth: true,
        keepAlive: false
      },
      component: resolve => require(["../pages/notice/details"], resolve)
    },
    //mailList

    {
      path: "/mailList",
      name: "mailList",
      meta: {
        auth: true,
        keepAlive: false,
        noSide: true
      },
      component: resolve => require(["../pages/mailList/"], resolve)
    },
    //login

    {
      path: "/login",
      name: "login",
      meta: {
        auth: true,
        keepAlive: false,
        noSide: true
      },
      component: resolve => require(["../pages/login/"], resolve)
    },
    //protocol
    {
      path: "/dianprotocol",
      name: "dianprotocol",
      meta: {
        auth: true,
        keepAlive: false,
        noSide: true
      },
      component: resolve => require(["../pages/protocol/"], resolve)
    },
    {
      path: "*", //其他页面，强制跳转到登录页面
      name: "*",
      redirect: "/home"
    },

    ...userManage,
    ...orderManage,
    ...waresManage
  ],
  // 每次进入组件 滚动到顶部
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
});

export default router;
