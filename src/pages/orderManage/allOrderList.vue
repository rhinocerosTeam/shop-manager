/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 18:47:32
 * @Description: 全部订单页面
 */
<template>
    <div id='allOrderList' class='container' v-loading='loadingFlag'>
        <!-- 页面title 组件 -->
        <subTitle>全部订单</subTitle>
        <div class="order-main">
            <!-- 搜索组件 -->
            <searchOrder @get-search-data="getSearchData"></searchOrder>
            <div class="order-table">
                <template v-for="(items,index) in orderList">
                    <!-- 每条订单 组件 -->
                    <orderBar @send-delivery='send_delivery' @cancel-handler='cancel_handler' :datas='items' :key="index"></orderBar>
                </template>
            </div>
            <div class="pagination-box" v-show="total!==0">
                <!-- 分页组件 -->
                <el-pagination @current-change='pageChange' background layout="total,prev, pager, next" :page-size="10" :total="total">
                </el-pagination>
            </div>
        </div>
        <sendAlert :params='params' :companies='companies' :type='1' @save-success='save_success' v-if='showFlag' @close-alert='closeAlert'></sendAlert>
    </div>
</template>

<script type='text/ecmascript-6'>
import sendAlert from "components/orderManage/sendAlert";
import orderBar from "components/orderManage/orderBar";
import searchOrder from "components/orderManage/searchOrder";
import subTitle from "components/common/subTitle";
import api from "api";

export default {
    data() {
        return {
            orderList: "", //订单列表数据
            orderNum: "", //订单号 搜索用
            total: 0, //总页码
            pageNo: 0, //当前页码
            loadingFlag: true,
            showFlag: false, //发货弹出框显示隐藏状态
            companies: [], //物流公司数据
            params: {} //物流公司数据
        };
    },
    components: {
        orderBar,
        subTitle,
        sendAlert,
        searchOrder
    },
    methods: {
        //搜索按钮组件 回调事件
        getSearchData(data) {
            this.orderNum = data;
            this.getOrderList(this.pageNo);
        },
        //获得订单列表 数据请求
        getOrderList(pageNo) {
            let type = 0, //0全部 1待支付 2已支付 3已取消 4待收货 5已完成
                { orderNum } = this;
            api.orderList({ type, orderNo: orderNum, pageNo }).then(res => {
                let data = api.parse(res);
                if (res.code == 1000) {
                    this.orderList = data.orderList;
                    this.total = data.total;
                } else {
                    // this.$message({
                    //     message: res.msg,
                    //     type: "error"
                    // });
                }
                if (this.loadingFlag) this.loadingFlag = false;
            });
        },
        //分页页码改变
        pageChange(pageNo) {
            this.pageNo = pageNo;
            // this.getNoticeList(pageNo);
        },
        //取消订单 回调函数
        cancel_handler() {
            this.getOrderList(this.pageNo);
        },
        // 发货 弹出框 显示
        send_delivery(data) {
            this.params = data;
            this.showFlag = true;
        },
        // 发货 弹出框 关闭
        closeAlert(data) {
            this.showFlag = data;
        },
        //发货保存成功 回调函数
        save_success() {
            this.$message({
                message: "发货成功",
                type: "success"
            });
            this.getOrderList(this.pageNo);
            //  this.$emit("save-success");
        },
        //获取物流公司数据
        getCompaniesData() {
            api.deliveryCompany().then(data => {
                if (data && parseInt(data.code) === 1000) {
                    this.companies = api.parse(data).companies;
                }
            });
        }
    },
    watch: {
        pageNo(val) {
            console.log(val, "pages");

            this.getOrderList(val);
        }
    },
    created() {
        this.pageNo = 1;
        //获取物流数据
        this.getCompaniesData();
    }
};
</script>
<style scoped lang="scss">
$heightBase: 60px;
$bgColorBase: rgb(110, 71, 240);
.pagination-box {
    margin-top: 20px;
    text-align: center;
}
</style>
