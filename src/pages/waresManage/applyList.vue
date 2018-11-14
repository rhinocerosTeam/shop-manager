<!--
@author 程海月
@date 2018-7-13
@desc 申请列表：可查找申请记录，申请上架商品，撤销审核
-->
<template>
  <div class='container' id="applyList" v-loading='loadingFlag'>
    <subtitle>申请列表</subtitle>

    <!--查找及条件-->
    <el-row style="margin: 30px auto;">
      <el-col :span="6">
        <el-col :span="8" style="text-align: center;line-height: 40px;">
          <label>商品名称：</label>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="请输入内容" v-model="productName" clearable>
          </el-input>
        </el-col>
      </el-col>
      <el-col :span="6">
        <el-col :span="8" style="text-align: center;line-height: 40px;">
          <label>商品编号：</label>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="请输入内容" v-model="productNo" clearable>
          </el-input>
        </el-col>
      </el-col>
      <el-col :span="6">
        <el-col :span="8" style="text-align: center;line-height: 40px;">
          <label>申请状态：</label>
        </el-col>
        <el-col :span="16">
          <el-select v-model="productStatus" clearable placeholder="请选择">
            <el-option v-for="item in productStatusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="6" style="text-align: center;line-height: 40px;">
        <el-button type="primary" @click="initData">查询</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table :data="dataList" style="width: 100%" @cell-click='toProductInfo'>
      <el-table-column align="center" label="商品" width="260" show-overflow-tooltip>
        <template slot-scope="scope">
          <picture-card width='80px' class="shop-img" :src="scope.row.coverImgUrl" border="1px dashed #c0ccda"></picture-card>
          <span class='name'>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sourceProductId" align="center" label="商品编号" width="120">
      </el-table-column>
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
      <el-table-column align="center" label="最后更改时间" :formatter="format">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 2">
            <b @click='enterStatusRecord(scope.row.productId,scope.row.name)'>查看记录</b>
          </div>
          <div v-if="scope.row.status == 0 || scope.row.status == 3">
            <b @click='handleApplyOrRevokeExamine(scope.row.productId,1)'>申请上架</b>
            <b @click='enterStatusRecord(scope.row.productId,scope.row.name)'>查看记录</b>
            <b v-if="!scope.row.sourceProductId" @click='enterEdit(scope.row)'>编辑</b>
          </div>
          <div v-if="scope.row.status == 1">
            <b @click='handleApplyOrRevokeExamine(scope.row.productId,0)'>撤销审核</b>
            <b @click='enterStatusRecord(scope.row.productId,scope.row.name)'>查看记录</b>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--翻页-->
    <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount" style="margin: 30px auto">
    </el-pagination>
  </div>
</template>

<script>
import subtitle from "components/common/subTitle";
import pictureCard from "components/common/pictureCard";
import dateUtils from "../../utils/dateUtils";
import api from "api";

export default {
    data() {
        return {
            loadingFlag: true,
            dataList: [],
            currentPage: 1, //当前页数
            totalCount: 0, //总页数
            pageSize: 10, //每页多少条
            productName: "", //商品名称
            productNo: "", //商品编码
            productStatus: "", //申请状态 0：待提交 1：待审核 2：已通过 3：已拒绝
            productStatusList: [
                {
                    value: "",
                    label: "全部"
                },
                {
                    value: 1,
                    label: "待审核"
                },
                {
                    value: 2,
                    label: "已通过"
                },
                {
                    value: 3,
                    label: "已拒绝"
                },
                {
                    value: 0,
                    label: "待提交"
                }
            ] //申请状态数组
        };
    },
    components: {
        subtitle,
        pictureCard
    },
    methods: {
        async initData() {
            let res = await api
                    .getApplyList({
                        pageNo: this.currentPage,
                        pageSize: this.pageSize,
                        name: this.productName,
                        sourceProductId: this.productNo,
                        status: this.productStatus + ""
                    })
                    .catch(err => {
                        this.$message.error("请检查网络");
                    }),
                data;

            if (res) {
                data = api.parse(res);
                if (parseInt(res.code) === 1000) {
                    this.dataList = data.productApplyList;
                    this.totalCount = data.total;
                    this.loadingFlag = false;
                }
            }
        },
        //撤销审核/申请上架
        handleApplyOrRevokeExamine(id, status) {
            let text = "是否上架此商品？";
            if (status === 0) text = "是否撤销审核？";
            this.$confirm(text, {
                showClose: false
            })
                .then(async () => {
                    let res = await api.upStatus({
                        productId: id,
                        status
                    });
                    if (res) {
                        api.parse(res);
                        if (parseInt(res.code) === 1000) {
                            this.$message.success("操作成功");
                            this.initData();
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                })
                .catch(err => {});
        },
        //时间处理
        format(row, column) {
            return new Date(parseInt(row.createTime)).format(
                "yyyy-MM-dd hh:mm:ss"
            );
        },
        //进入状态变更记录
        enterStatusRecord(id, name) {
            this.$router.push({
                name: "statusRecord",
                query: {
                    id,
                    name
                }
            });
        },
        //进入编辑页面
        enterEdit(param) {
            this.$router.push({
                name: "publishWares",
                query: {
                    id: param.productId
                }
            });
        },
        //进入商品详情页
        toProductInfo(row, column) {
            if (column.label == "商品") {
                this.$router.push({
                    name: "waresDetail",
                    query: {
                        id: row.productId
                    }
                });
            }
        }
    },
    async created() {
        let filter = this.$route.query.type;

        if (filter != null) {
            this.productStatus = filter;
        }

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
#applyList {
    .el-table {
        border: 1px solid #eee;
        .cell {
            .shop-img {
                display: block;
                float: left;
                width: 80px;
                height: 80px;
                cursor: pointer;
            }
            .name {
                float: left;
                display: block;
                margin-top: 28px;
                margin-left: 10px;
                width: 120px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                cursor: pointer;
            }
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
