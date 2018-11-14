/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 15:07:07
 * @Description: 已完成订单页面
 */
<template>
    <div id='allOrderList' class='container' v-loading='loadingFlag'>
        <!-- 页面title 组件 -->
        <subTitle>已完成</subTitle>
        <div class="order-main">
            <!-- 搜索组件 -->
            <searchOrder @get-search-data="getSearchData"></searchOrder>
            <div class="order-table">
                <template v-for="(items,index) in orderList">
                    <!-- 每条订单 组件 -->
                    <orderBar :datas='items' :key="index"></orderBar>
                </template>
            </div>
            <div class="pagination-box" v-show="total!==0">
                <!-- 分页组件 -->
                <el-pagination background @current-change='pageChange' layout="total,prev, pager, next" :page-size="10" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
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
            loadingFlag: true
        };
    },
    components: {
        orderBar,
        subTitle,
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
            let type = 5, //0全部 1待支付 2已支付 3已取消 4待收货 5已完成
                { orderNum } = this;
            api.orderList({ type,  orderNo:orderNum, pageNo }).then(res => {
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
        }
    },
    watch: {
        pageNo(val) {
            this.getOrderList(val);
        }
    },
    created() {
        this.pageNo = 1;
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
