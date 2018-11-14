export default[
  // 修改密码页面
  {
    path: '/userManage/modifyPassWord', 
    name: 'modifyPassWord',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/userManage/modifyPassWord'], resolve),
  },
]

