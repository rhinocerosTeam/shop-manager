/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 15:12:30
 * @Description: 订单相关接口
 */
import {API_HOST} from '../config'
// let API_HOST = "http://apidoc.hefantv.com/mock";
export default {
  orderList(params) {
    return $.ajax({
      url: API_HOST + "/order/orderList",
      dataType: "json",
      headers:this.setHeaders(),
      data: this.paramFormat(params)
    });
  },
  //订单详情
  orderDetail(data) {
    return $.ajax({
      url: API_HOST + "/order/orderDetail",
      dataType: "json",
      headers:this.setHeaders(),
      data: this.paramFormat({...data})
    });
  },
  //取消订单
  cancelOrder(data) {
    return $.ajax({
      url: API_HOST + "/order/cancelOrder",
      dataType: "json",
      headers:this.setHeaders(),
      data: this.paramFormat({...data})
    });
  },
  //更新订单物流信息
  updateOrderDelivery(data) {
    return $.ajax({
      url: API_HOST + "/order/updateOrderDelivery",
      dataType: "json",
      headers:this.setHeaders(),
      data: this.paramFormat({...data})
    });
  },
  //修改收货人信息
  updateReceiveInfo(data) {
    return $.ajax({
      url: API_HOST + "/order/updateReceiveInfo",
      dataType: "json",
      headers:this.setHeaders(),
      data: this.paramFormat({...data})
    });
  },
  //添加订单备注
  addOrderRemark(data) {
    return $.ajax({
      url: API_HOST + "/order/addOrderRemark",
      dataType: "json",
      headers:this.setHeaders(),
      data: this.paramFormat({...data})
    });
  },
  //获取快递公司信息
  deliveryCompany(data) {
    return $.ajax({
      url: API_HOST + "/order/deliveryCompany",
      dataType: "json",
      headers:this.setHeaders(),
      data: this.paramFormat({...data})
    });
  }
};
