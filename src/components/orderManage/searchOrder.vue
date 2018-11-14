/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 15:06:19
 * @Description: 订单列表查询订单组件
 * @params: get-search-data {function} 查询按钮点击回调函数
 */
<template>
    <div class="search-box">
        <el-row>
            <el-col :span="4">
                <span>订单号:</span>
            </el-col>
            <el-col :span="10">
                <el-input placeholder="请输入订单号" v-model="orderNum"></el-input>
            </el-col>
            <el-col :span="4" class="search-button">
                <el-button type="primary" @click="searchData_clickHandler">查询</el-button>
            </el-col>
        </el-row>

    </div>
</template>
<script>
export default {
    data() {
        return {
            orderNum: "" //搜索的订单单号
        };
    },
    props: [],
    components: {},
    methods: {
        // 搜索按钮 点击回调事件
        searchData_clickHandler() {
            this.$emit("get-search-data", this.orderNum);
        }
    },
    created() {},
    mounted() {},
    destroyed() {},
    watch: {}
};
</script>
<style scoped lang="scss">
$heightBase: 60px;
$bgColorBase: rgb(110, 71, 240);

.search-box {
    height: 50px;
    line-height: 50px;
    margin-bottom: 30px;
    .el-row {
        width: 450px;
        float: right;
        font-size: 14px;
        .search-button {
            margin-left: 30px;
        }
    }
}
</style>

