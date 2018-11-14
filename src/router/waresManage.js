export default[
  // 申请列表页面
  {
    path: '/waresManage/applyList',
    name: 'applyList',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/waresManage/applyList'], resolve),
  },
  // 发布商品页面
  {
    path: '/waresManage/publishWares',
    name: 'publishWares',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/waresManage/publishWares'], resolve),
  },
  // 商品详情页
  {
    path: '/waresManage/waresDetail',
    name: 'waresDetail',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/waresManage/waresDetail'], resolve),
  },
  // 上架商品
  {
    path: '/waresManage/upWares',
    name: 'upWares',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/waresManage/upWares'], resolve),
  },
  // 下架商品
  {
    path: '/waresManage/downWares',
    name: 'downWares',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/waresManage/downWares'], resolve)
  },
  // 状态变更记录页面
  {
    path: '/waresManage/statusRecord',
    name: 'statusRecord',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/waresManage/statusRecord'], resolve),
  },
  // 商品列表页面
  {
    path: '/waresManage/waresList',
    name: 'waresList',
    meta: {auth: true, keepAlive: false},
    component: resolve => require(['../pages/waresManage/waresList'], resolve),
  },
]

