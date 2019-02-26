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
     * 增加频道
     * */
    addChannel(data) {
        return Promise.resolve(
            $.ajax({
                url: API_HOST + "/web/addChannel",
                dataType: "json",
                headers: this.setHeaders(),
                data: this.paramFormat({...data })
            })
        );
    },
    /*
     * 编辑频道
     * */
    eidtChannel(data) {
        return Promise.resolve(
            $.ajax({
                url: API_HOST + "/web/editChannel",
                dataType: "json",
                headers: this.setHeaders(),
                data: this.paramFormat({...data })
            })
        );
    },
    /*
     * 删除频道
     * */
    deleteChannel(data) {
        return Promise.resolve(
            $.ajax({
                url: API_HOST + "/web/deleteChannel",
                dataType: "json",
                headers: this.setHeaders(),
                data: this.paramFormat({...data })
            })
        );
    },
    /*
     * 得到频道列表
     * */
    getChannelList(data) {
        return Promise.resolve(
            $.ajax({
                url: API_HOST + "/web/getChannelList",
                dataType: "json",
                headers: this.setHeaders(),
                data: this.paramFormat({...data })
            })
        );
    },
    /*
     * 根据id得到频道信息
     * */
    getChannel(data) {
        return Promise.resolve(
            $.ajax({
                url: API_HOST + "/web/queryChannel",
                dataType: "json",
                headers: this.setHeaders(),
                data: this.paramFormat({...data })
            })
        );
    },
};