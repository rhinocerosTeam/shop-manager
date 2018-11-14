/**
 * Created by hughdai on 16/7/21.
 */
"use strict"

/**
 * 格式化私人手机
 * @param mobile
 * @returns {string}
 */
exports.privacyMobile = (mobile) => {
    if (mobile && mobile.length == 11) return mobile.substr(0, 3) + "****" + mobile.substr(7, 4);
}
/**
 * 格式化身份证号
 * @param id
 * @returns {string}
 */
exports.privacyId = (id) => {
    if (id && id.length == 15) {
        return id.substr(0, 3) + "***********" + id.substr(11, 4);
    } else if (id && id.length == 18) {
        return id.substr(0, 3) + "***********" + id.substr(14, 4);
    }
}
exports.timeFormat = (value) => {
    return value != undefined && value.split(" ")[0];
}
/**
 * 格式化日期为YYYY/MM/DD
 * @param value
 * @returns {string}
 */
exports.dateFormat = (value) => {
    return value !=undefined && (value.substr(0,4)+'-'+value.substr(4,2)+'-'+value.substr(6,2));
}
/**
 * 小数点
 * @param value 值
 * @param n 小数点位数
 * @returns {string}
 */
exports.toFixed = (value,n) => {
	return value!=undefined && Number(value).toFixed(n);
}