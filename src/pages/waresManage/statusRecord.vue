<!--
@author 程海月
@date 2018-7-13
@desc 商品申请记录
-->
<template>
  <div class='container' id="statusRecord" v-loading='loadingFlag'>
    <subtitle v-text='productName'></subtitle>

    <!--列表-->
    <el-table :data="dataList" style="width: 100%">
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 2">
            <i style="color: #009900">已通过</i>
          </div>
          <div v-if="scope.row.status == 1 ">
            <i style="color: #323232;">待审核</i>
          </div>
          <div v-if="scope.row.status == 3">
            <i style="color: #ff3300">已拒绝</i>
          </div>
          <div v-if="scope.row.status == 0">
            <i style="color: #323232;">待提交</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" :formatter="format"></el-table-column>
      <el-table-column prop='reason' align="center" label="失败原因" show-overflow-tooltip></el-table-column>
    </el-table>

    <!--翻页-->
    <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount" style="margin: 30px auto">
    </el-pagination>
  </div>
</template>

<script>
import subtitle from "components/common/subTitle";
import dateUtils from "../../utils/dateUtils";
import api from "api";
export default {
    data() {
        return {
            dataList: [],
            currentPage: 1, //当前页数
            totalCount: 0, //总页数
            pageSize: 10, //每页多少条
            productName: "商品名称啦啦啦", //商品名称
            productId: 0, //商品id
            loadingFlag: true
        };
    },
    components: {
        subtitle
    },
    methods: {
        async initData() {
            let res = await api
                    .getUpStatusLog({
                        pageNo: this.currentPage,
                        pageSize: this.pageSize,
                        productId: this.productId
                    })
                    .catch(err => {
                        this.$message.error("请检查网络");
                    }),
                data;
            if (res) {
                data = api.parse(res);
                if (parseInt(res.code) === 1000) {
                    this.dataList = data.logList;
                    this.totalCount = data.total;

                    this.loadingFlag = false;
                }
            }
        },
        //时间处理
        format(row, column) {
            return new Date(parseInt(row.updateTime)).format(
                "yyyy-MM-dd hh:mm:ss"
            );
        }
    },
    async created() {
        let query = this.$route.query;
        this.productName = query.name;
        this.productId = query.id;

        await this.initData();
    },
    watch: {
        currentPage: {
            handler() {
                this.initData();
            },
            deep: true
        }
    }
};
</script>

<style scoped lang='scss'>
#statusRecord {
    .el-table {
        border: 1px solid #eee;
        .cell {
            b {
                margin: 0 5px;
                font-weight: normal;
                color: #169bd5;
                cursor: pointer;
            }
        }
    }
    .el-pagination {
        text-align: right;
    }
}
</style>
