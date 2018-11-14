export default [
  // 已发货列表页面
  {
    path: "/orderManage/allOrderList",
    name: "allOrderList",
    meta: { auth: true, keepAlive: false },
    component: resolve =>
      require(["../pages/orderManage/allOrderList"], resolve)
  },
  // 已发货列表页面
  {
    path: "/orderManage/alreadyShippedList",
    name: "alreadyShippedList",
    meta: { auth: true, keepAlive: false },
    component: resolve =>
      require(["../pages/orderManage/alreadyShipped/list"], resolve)
  },
  // 取消交易列表页面
  {
    path: "/orderManage/cancelPayList",
    name: "cancelPayList",
    meta: { auth: true, keepAlive: false },
    component: resolve =>
      require(["../pages/orderManage/cancelPay/list"], resolve)
  },
  // 已完成列表页面
  {
    path: "/orderManage/overPayList",
    name: "overPayList",
    meta: { auth: true, keepAlive: false },
    component: resolve =>
      require(["../pages/orderManage/overPay/list"], resolve)
  },
  // 等待发货列表页面
  {
    path: "/orderManage/waitingDeliveryList",
    name: "waitingDeliveryList",
    meta: { auth: true, keepAlive: false },
    component: resolve =>
      require(["../pages/orderManage/waitingDelivery/list"], resolve)
  },
  // 等待支付列表页面
  {
    path: "/orderManage/waitingPayList",
    name: "waitingPayList",
    meta: { auth: true, keepAlive: false },
    component: resolve =>
      require(["../pages/orderManage/waitingPay/list"], resolve)
  },
  // 订单详情页面
  {
    path: "/orderManage/details",
    name: "orderDetails",
    meta: { auth: true, keepAlive: false },
    component: resolve =>
      require(["../pages/orderManage/details"], resolve)
  }
];
