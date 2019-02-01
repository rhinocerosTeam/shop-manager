/**
 * Created by songpeilan on 2019/1/11.
 */

export default[
  // 模板管理
  {
    path: '/channelManage/templateManage',
    name: 'templateManage',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/channelManage/template'], resolve),
  },
  // 模板管理
  {
    path: '/channelManage/channelManage',
    name: 'channelManage',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/channelManage/channel'], resolve),
  },
]
