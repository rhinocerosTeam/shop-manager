/**
 * Created by Cray on 2017/1/5.
 */
import {API_HOST} from './config';
import Log from 'utils/log';
import Local from 'utils/local';
import $ from 'jquery';
import router from 'router';
import store from 'store';


export default {

  // getInvidata: API_HOST + '/v1/h5/findUserInfoByToken', // 获取分享后页面 头像昵称
  // getInviphone: API_HOST + '/v1/lxActivity/lxSign', // 分享页面提交手机号
  // getVeriphone: API_HOST + '/v1/lxActivity/lxCheckPhone',  // 验证手机号

  /**
   * 登录
   * @param userName
   * @param pwd
   * @returns {*}
   */
  doLogin(loginName, password) {
    return $.ajax({
      url: API_HOST + '/pc/index/login', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat({loginName, password})
    });
  },
  /**
   * 修改密码
   * @param pwd
   * @param code
   * @param phone
   * @returns {*}
   */
  doModifyPwd(id, pwd, newPwd) {
    return $.ajax({
      url: API_HOST + '/pc/index/updatePassWord',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({id: id, password: pwd, newPassWord: newPwd})
    });
  },
  /**

   * oss 接口
   * */
  doSignature(uploadCfg) {
    return $.ajax({ url: API_HOST + '/pub/v1/getAliOssUploadCfg', dataType: 'json', data: this.paramFormat({uploadCfg}) });
  },
  /**
   * 登出
   */
  doLogout() {
    return $.ajax({
      url: API_HOST + '/pc/index/logout',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({})
    });
  },
  /**
   * 管理员添加
   * **/
  adminInsert(params) {
    return $.ajax({
      url: API_HOST + '/pc/smsgManageUser/insert',
      dataType: 'json',
      method:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({objects:[params]})
    });
  },
  /**
   * 查询管理员
   * **/
  adminQueryOne(id) {
    return $.ajax({
      url: API_HOST + '/pc/smsgManageUser/queryOne',
      dataType: 'json',
      method:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({id})
    });
  },
  /**
   * 查询管理员
   * **/
  adminSeeOne(id) {
    return $.ajax({
      url: API_HOST + '/pc/smsgManageUser/seeOne',
      dataType: 'json',
      method:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({id})
    });
  },
  /**
   * 管理员重置密码
   * **/
  resetPassword(id) {
    return $.ajax({
      url: API_HOST + '/pc/smsgManageUser/resetPassword',
      dataType: 'json',
      method:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({id})
    });
  },
  /**
   * 管理员修改
   * **/
  adminUpdate(params) {
    return $.ajax({
      url: API_HOST + '/pc/smsgManageUser/update',
      dataType: 'json',
      method:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({objects:[params]})
    });
  },
  /**
   * 	获取管理员列表
   * **/
  adminList(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgManageUser/query',
      dataType: 'json',
      method:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 管理员删除
   * **/
  adminDel(id) {
    return $.ajax({
      url: API_HOST + '/pc/smsgManageUser/delete',
      dataType: 'json',
      method:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({id})
    });
  },
  /**
   * 管理员冻结解冻
   * **/
  adminFrozen(id,frozenFlag) {
    return $.ajax({
      url: API_HOST + '/pc/smsgManageUser/frozen',
      dataType: 'json',
      method:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat({id,frozenFlag})
    });
  },
  /**
   * 展讯列表数据
   * **/
  getExhibitionData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/exhibitNotices/query',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 添加展讯
   * */
  insertExhibitionData(objects) {
    return $.ajax({
      url: API_HOST + '/pc/exhibitNotices/insert',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(objects)
    });
  },
  /**
   * 修改展讯
   * */
  updateExhibitionData(objects) {
    return $.ajax({
      url: API_HOST + '/pc/exhibitNotices/update',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(objects)
    });
  },
  /**
   * 删除展讯
   * */
  delExhibitionData(objects) {
    return $.ajax({
      url: API_HOST + '/pc/exhibitNotices/delete',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(objects)
    });
  },
  /**
   * 获取新闻列表数据
   * */
  getNewsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgNews/query', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 添加新闻
   * */
  insertNewsData(objects) {
    return $.ajax({
      url: API_HOST + '/pc/smsgNews/insert', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(objects)
    });
  },
  /**
   * 修改新闻
   * */
  updateNewsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgNews/update', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 删除新闻
   * */
  deleteNewsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgNews/delete', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取藏品分类
   * */
  getCollectionClsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgCollectionCls/query',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 添加藏品分类
   * */
  insertCollectionClsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgCollectionCls/insert',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 修改藏品分类
   * */
  updateCollectionClsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgCollectionCls/update',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 删除藏品分类
   * */
  deleteCollectionClsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgCollectionCls/delete',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取藏品列表数据
   * */
  getCollectionInfoData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgCollectionInfo/query',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 添加藏品
   * */
  insertCollectionInfoData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgCollectionInfo/insert',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 修改藏品
   * */
  updateCollectionInfoData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgCollectionInfo/update',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 删除藏品
   * */
  deleteCollectionInfoData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgCollectionInfo/delete',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取影像列表数据
   * */
  getImageVideoData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgImage/query', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 添加影像
   * */
  insertImageVideoData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgImage/insert', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 修改影像
   * */
  updateImageVideoData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgImage/update', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 删除影像
   * */
  deleteImageVideoData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgImage/delete',type:'POST', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取图集详情
   * */
  getImageDetailData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgImageDetail/query',
      dataType: 'json',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 删除图集
   * */
  deleteImageDetailData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgImageDetail/delete',
      dataType: 'json',
      type:'POST',
      xhrFields: {withCredentials: true},
      crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取活动列表
   * */
  getActivityData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/activity/query',type:'POST', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 添加活动
   * */
  insertActivityData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/activity/insert',type:'POST', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 修改活动
   * */
  updateActivityData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/activity/update', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 删除活动
   * */
  deleteActivityData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/activity/delete',type:'POST', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取用户列表
   * */
  getUserData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgUser/query', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 修改用户列表
   * */
  updateUserData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgUser/update',type:'POST', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 查询用户预约列表
   * */
  getUserReserveData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgUser/queryMaa', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 查询用户订单列表
   * */
  getUserOrderData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgUser/queryOrder', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取票面列表
   * */
  getTicketData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketCycle/query', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 修改票面
   * */
  updateTicketData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketCycle/update', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 添加票面
   * */
  insertTicketData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketCycle/insert',type:'POST', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 删除票面
   * */
  deleteTicketData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketCycle/delete',type:'POST', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取购票列表
   * */
  getBuyTicketsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketSaleSrl/query', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取预约列表
   * */
  getOrderMangeData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgActivityMaa/query', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取退票列表
   * */
  getRefundTicketsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketSaleSrl/queryRefundTickets', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 申请退票列表
   * */
  doRefundTicketData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketSaleSrl/refundTicket', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 获取门票列表
   * */
  getAdmissionTicketsData(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketSaleSrl/queryIssueTickets', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
  /**
   * 门票发放
   * */
  doAdmissionTicket(obj) {
    return $.ajax({
      url: API_HOST + '/pc/ticketSaleSrl/issueTickets', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },
/*  /!**
   * 购票导出
   * @param consumerName
   * @param consumerMobile
   * @param startCreateTime
   * @param endCreateTime
   * @param payStatus
   * *!/
  exportOrderExcel(obj) {
    return $.ajax({
      url: API_HOST + '/pc/smsgTicketSaleSrl/exportOrderExcel', type:'POST',dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat(obj)
    });
  },*/
  /**
   * 获取当前系统时间
   * */
  getSystemTime() {
    return $.ajax({
      url: API_HOST + '/pub/v1/getSystemTime', dataType: 'json', xhrFields: {withCredentials: true}, crossDomain: true,
      data: this.paramFormat()
    });
  },
  /**
   * 解析结果
   * @param data
   * @returns {*}
   */
  parse(data) {
    "use strict";
    let result = null;
    if (!_.isObject(data)) {
      data = JSON.parse(data);
    }
    if (data["code"]) {
      if (data["code"] == "200") {
        result = data["data"] || {};
        if (!_.isObject(result)) {
          result = JSON.parse(result);
        }
        // if (data['token']) {
        //   this.token = data['token'];
        // }
      } else if (data["code"] == "1001") {
        store.commit('SET_INVALID_LOGIN');
        Log.error(data["msg"]);
        router.replace({name: 'login'});
      } else {
        Log.error(data["msg"]);
      }
    } else {
      result = data;
    }


    return result;
  },
  /**
   * 格式化参数
   * @param data
   * @returns {{}}
   */
  paramFormat(data) {
    if (this.token || this.consume) {
      data.token = this.token;
      data.consume = this.consume;
    }
    let result = {};
    result.data = JSON.stringify(data);
    return result;
  },

  get token() {
    return Local.getItem('token');
  },

  set token(value) {
    Local.setItem('token', value);
  },

  get consume() {
    return Local.getItem('consume');
  },

  set consume(value) {
    Local.setItem('consume', value);
  }
}
