/**
 * Created by Cray on 2017/1/5.
 */

import _ from "lodash";
import {
    API_HOST
} from "./config";

import Local from "utils/local";
import $ from "jquery";
import router from "router";
import store from "store";
import loginApi from "./login";
import waresApi from "./wares";
import homeApi from "./home";
import orderApi from "./order";
import channelApi from "./channel";

export default _.merge({}, homeApi, loginApi, waresApi, orderApi, channelApi, {
    /**
     * 获取当前系统时间
     * */
    getSystemTime() {
        return $.ajax({
            url: API_HOST + "/pub/v1/getSystemTime",
            dataType: "json",
            headers: {
                token: this.getToken()
            },
            data: this.paramFormat()
        });
    },
    /**
     * 解析结果
     * @param data
     * @returns {*}
     */
    parse(data) {
        let result = null;
        if (!_.isObject(data)) {
            data = JSON.parse(data);
        }
        if (data["code"]) {
            if (data["code"] == "200" || data["code"] == "1000") {

                result = data["data"] || {};
                if (!_.isObject(result)) {
                    result = JSON.parse(result);
                }
            } else if (data["code"] == "7100" || data["code"] == "7101" || data["code"] == "7103") {
                store.dispatch("loginOut");
                eleVue.$message.error('用户信息失效');
                router.replace({
                    name: "login"
                });
            } else {
                eleVue.$message.error(data["msg"]);
                console.error(data["msg"]);
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
        let user = store.state.userInfo
        let storeid = this.getStoreId()
        let result = {};
        result.consume = user.consume
        result.token = user.token
        result.data = JSON.stringify(data);
        return result;
    },
    /**
     * @description 设置headers
     * @author DaWei
     * @date 2018-07-23
     * @returns
     */
    setHeaders() {
        return {
            token: this.getToken(),
            storeId: this.getStoreId(),
        }
    },
    /**
     * @description 获取当前storeId
     * @author DaWei
     * @date 2018-07-23
     * @returns
     */
    getStoreId() {
        let storeInfo = store.state.store;
        let _storeId = '';
        if (storeInfo && storeInfo["id"]) _storeId = storeInfo["id"];
        return _storeId
    },
    /**
     * @description 获取当前token
     * @author DaWei
     * @date 2018-07-23
     * @returns
     */
    getToken() {
        let userInfo = store.state.userInfo;

        let _token = "";
        if (userInfo && userInfo["token"]) _token = userInfo["token"];

        return _token;
    }
});