/**
 * @Author: user
 * @Date:2019/1/28
 * @Last Modified time: 2019/1/28
 * @Description: 描述
 * @Query: 页面参数
 * @Props: 组件参数
 * @Remark:
 - 备注一
 */
export default [
  // 已发货列表页面
  {
    path: "/templateManage/list",
    name: "allOrderList",
    meta: { auth: true, keepAlive: false },
    component: resolve =>
      require(["../pages/orderManage/allOrderList"], resolve)
  },
]
