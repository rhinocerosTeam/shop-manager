/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 18:31:31
 * @Description: 订单列表每一条订单组件
 * @params: datas {string} 订单列表当前订单数据; 
 * @params: cancel-handler {function} 取消订单成功回调函数
 * @params: send-delivery {function} 发货弹出框显示回调函数
 */
<template>
    <div class="order-bar">
        <!-- 订单title 部分 -->
        <el-row class="title">
            <el-col :span="8">
                <div class="time">{{formDate(datas.createTime)}}</div>
            </el-col>
            <el-col :span="6">
                订单号：
                <span> {{datas.orderNo}}</span>
            </el-col>
            <el-col :span="6">
                订单总金额：
                <span class='money'>￥{{datas.totalAmount}}</span>
            </el-col>
            <el-col :span="4">
                状态：
                <span>{{orderStatus(datas.orderStatus)}}</span>
            </el-col>
        </el-row>
        <!-- 订单内容 部分 -->
        <el-row class="cont" type='flex' align='middle'>
            <el-col :span="10" v-for="(item,index) in datas.items" :key='index'>
                <el-row class="shop-img-bar">
                    <el-col :span="8">
                        <picture-card width='80px' class="shop-img" :src="item.itemImg" border="1px dashed #c0ccda"></picture-card>
                    </el-col>
                    <el-col :span="12">
                        <div class="cont-title ellipsis">{{item.itemName}}</div>
                        <div class="cont-title ellipsis">{{item.skuName}}</div>
                        <div class="cont-info">
                            <span class="money">￥{{item.itemPrice}}</span> &times;
                            <span>{{item.itemNum}}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="4">
                <div class="cont-title">
                    <el-row>
                        <el-col :span="8">
                            应付：
                        </el-col>
                        <el-col :span="16" class="money">
                            ￥{{datas.payAmount}}
                        </el-col>
                    </el-row>
                </div>
                <div class="cont-info">
                    <el-row>
                        <el-col :span="8">
                            运费：
                        </el-col>
                        <el-col :span="16">
                            ￥{{datas.deliveryFee}}
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="6" class="tel-box">
                <div class="cont-title">
                    <el-row>
                        <el-col :span="8">
                            用户名:
                        </el-col>
                        <el-col :span="16" class="ellipsis">
                            {{datas.nickName}}
                        </el-col>
                    </el-row>
                </div>
                <div class="cont-info">
                    <el-row>
                        <el-col :span="8">
                            收货人:
                        </el-col>
                        <el-col :span="16" class="ellipsis">
                            {{datas.receiveName}}
                        </el-col>
                    </el-row>
                </div>
                <div class="phone-num">
                    <el-row>
                        <el-col :span="8">
                            手机号:
                        </el-col>
                        <el-col :span="16">
                            {{datas.receiveMobile}}
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="4" class="button-box">
                <div @click="orderDetails_cilckHandler(datas)">订单详情</div>
                <div @click="sendDelivery_cilckHandler(datas)" v-show=" status == 30">发货</div>
                <div @click="cancleOrder_cilckHandler(datas)" v-show="status == 10">取消订单</div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import pictureCard from "components/common/pictureCard";
import moment from "moment";
import api from "api";

export default {
    data() {
        return {
            status: 0
        };
    },
    props: ["datas"],
    components: {
        pictureCard
    },
    methods: {
        // formdate time
        formDate(time) {
            return moment(time).format("YYYY-MM-DD HH:mm");
        },
        // 判断订单状态类型 订单状态码订单状态10、待支付；20、已支付；30、待发货；40、已发货；50、已完成；60、订单取消；70、系统自动取消；80退款中；90、退款完成；100、退款失败
        orderStatus(status) {
            this.status = status;
            switch (status) {
                case 10:
                    return "待支付";
                case 20:
                    return "已支付";
                case 30:
                    return "已付款，请发货";
                case 40:
                    return "已发货";
                case 50:
                    return "已完成";
                default:
                    return "已取消";
            }
        },

        // 进入订单详情页面
        orderDetails_cilckHandler(data) {
            let { orderNo } = data;
            this.$router.push({ name: "orderDetails", query: { orderNo } });
        },
        // 取消订单
        cancleOrder_cilckHandler(data) {
            let { orderNo } = data;
            this.$confirm("是否取消订单?", "提示", {
                confirmButtonText: "确定",
                type: "warning",
                center: true
            }).then(() => {
                /**
                 * 获得通知列表接口
                 * @param {Number} orderNo 取消订单的单号
                 * */
                api.cancelOrder({ orderNo }).then(res => {
                    let data = api.parse(res);
                    if (res.code == 1000) {
                        this.$message({
                            message: "取消成功",
                            type: "success"
                        });
                        this.$emit("cancel-handler");
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                });
            });
        },

        // 发货 弹出框 显示
        sendDelivery_cilckHandler() {
            this.$emit("send-delivery", this.datas);
        },
        //发货保存成功 回调函数
        save_success() {
            this.$message({
                message: "发货成功",
                type: "success"
            });
        }
    },
    created() {},
    mounted() {},
    destroyed() {},
    watch: {}
};
</script>
<style scoped lang="scss">
.order-bar {
    font-size: 15px;
    min-width: 940px;
    text-align: center;
    overflow: hidden;
    border: 1px solid #eee;
    margin-top: 16px;
    .money {
        color: red;
    }
    > .title {
        text-align: left;
        
        // background: #eee;
        border-bottom: 1px solid #eee;
        // box-sizing: border-box;
        height: 50px;
        line-height: 50px;
        // border-radius: 5px 5px 0 0;
        .el-col-6 {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .time {
            padding-left: 100px;
            text-align: left;
        }
    }
    > .cont {
        line-height: 27px;
        box-sizing: border-box;
        // padding: 10px;
        text-align: left;
        .ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .tel-box {
            line-height: 25px !important;
            .phone-num {
                text-align: left;
            }
        }
        .button-box {
            color: #1591ef;
            cursor: pointer;
        }
        .shop-img-bar {
            margin: 10px;
            text-align: center;
            .shop-img {
                padding-left: 20px;
                width: 80px;
                height: 80px;
            }
        }
    }
}
</style>

