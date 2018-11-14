export default[
  {
    path: '/home', //首页
    name: 'home',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/home/'], resolve),
    query: {},
    alias: '/index'
  },
  
  {
    path: '*', //其他页面，强制跳转到登录页面
    name: '*',
    redirect: '/home'
  }

]

