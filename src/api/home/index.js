/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 15:12:47
 * @Description: 首页以及通知相关接口
 */
import { API_HOST } from "../config";
export default {
  /*
   * 通知-->获取列表
   * */
  getNoticeList(data) {
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/notice/getNoticeList",
        dataType: "json",
        headers:this.setHeaders(),
        data: this.paramFormat({ ...data })
      })
    );
  },
  /**
   *  通知-->标记为已读
   */
  editNotice(data) {
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/notice/editNotice",
        dataType: "json",
        headers:this.setHeaders(),
        data: this.paramFormat({ ...data })
      })
    );
  },
  /**
   *  通知-->获取详情
   */
  getNoticeDetail(data) {
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/notice/getNoticeDetail",
        dataType: "json",
        headers:this.setHeaders(),
        data: this.paramFormat({ ...data })
      })
    );
  },
  /**
   *  通知-->获取首页统计数据
   */
  getCountData(data) {
    return Promise.resolve(
      $.ajax({
        url: API_HOST + "/home/getCountData",
        dataType: "json",
        headers:this.setHeaders(),
        data: this.paramFormat({ ...data })
      })
    );
  }
};
