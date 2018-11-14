<!--
@author 程海月
@date 2018-7-13
@desc 商品列表：可查找或筛选所显示商品，更改商品排序，下架商品
-->
<template>
  <div class='container' id="waresList" v-loading='loadingFlag'>
    <subtitle>商品列表</subtitle>

    <!--查找条件-->
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
      <el-col :span="6" style="text-align: center;line-height: 40px;">
        <el-button type="primary" @click='initData'>查询</el-button>
      </el-col>
    </el-row>

    <!--筛选条件 及 下架按钮-->
    <el-row style="margin: 30px auto;">
      <el-col :span="18">
        <el-radio-group v-model="filterValue" size="medium" @change='initData'>
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">上架中</el-radio-button>
          <el-radio-button label="0">下架中</el-radio-button>
          <!--<el-radio-button label="3">库存报警</el-radio-button>-->
        </el-radio-group>
      </el-col>
      <!--<el-col :span="6" style="text-align: right;line-height: 40px;">-->
      <!--<el-button type="danger" @click="handleLowerGoods">下架</el-button>-->
      <!--</el-col>-->
    </el-row>

    <!--表格-->
    <el-table :data="dataList" style="width: 100%" ref="waresList" @selection-change="handleSelectionChange">
      <!--<el-table-column :selectable="canSelectFun" type="selection" width="55">-->
      <!--</el-table-column>-->
      <el-table-column type="expand">
        <!--内嵌表格-->
        <template slot-scope="scope">
          <el-row>
            <el-col :span="18" :offset="3">
              <el-table :data="scope.row.skuList" border style="width: 100%">
                <el-table-column prop="skuName" align="center" label="规格名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="skuId" align="center" label="商品货号">
                </el-table-column>
                <el-table-column prop="marketPrice" align="center" label="市场价">
                </el-table-column>
                <el-table-column prop="price" align="center" label="销售价">
                </el-table-column>
                <el-table-column prop="stock" align="center" label="库存">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品" width="250" show-overflow-tooltip>
        <template slot-scope="scope">
          <picture-card width='80px' class="shop-img" :src="scope.row.coverImgUrl" border="1px dashed #c0ccda"></picture-card>
          <span class='name'>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品编号" prop="productId" width="150">
      </el-table-column>
      <el-table-column align="center" label="库存" prop="stock">
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">
            <i>已上架</i>
          </div>
          <div v-if="scope.row.status == 0 ">
            <i>已下架</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" prop="sort">
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="180" :formatter="format">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">
            <b @click='handleLowerGoodsOk(scope.row)'>下架</b>
            <b @click='handleSortChange(scope.row)'>更改排序</b>
            <b @click='enterEdit(scope.row)'>编辑</b>
          </div>
          <div v-if="scope.row.status == 0">
            <b @click='handleSortChange(scope.row)'>更改排序</b>
            <b @click='enterEdit(scope.row)'>编辑</b>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--翻页-->
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount" style="margin: 30px auto">
    </el-pagination>

    <!--更改排序弹窗-->
    <el-dialog title="更改排序" :visible.sync="changeSortDialog" width="30%">
      <el-row>
        <el-col :span="24">
          <el-col :span="8" style="text-align: center;line-height: 40px;">
            <label>更改排序位置：</label>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="请输入内容" v-model='sortVal' clearable>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeSortDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSortChangeOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import subtitle from "components/common/subTitle";
import pictureCard from "components/common/pictureCard";
import dateUtils from "../../utils/dateUtils";
import _ from "lodash";
import api from "api";
export default {
    data() {
        return {
            dataList: [],
            multipleSelection: [], //下架多个的多选数组
            currentPage: 1, //当前页数
            totalCount: 0, //总页数
            pageSize: 10, //每页多少条
            productName: "", //商品名称
            productNo: "", //商品编码
            filterValue: "", //筛选条件  ''全部 1上架 0下架 3库存报警
            changeSortDialog: false, //排序弹窗显隐
            sortVal: 0, //排序val
            sortId: 0, //排序id
            loadingFlag: true
        };
    },
    components: {
        subtitle,
        pictureCard
    },
    methods: {
        async initData() {
            let res = await api
                    .getProductList({
                        pageNo: this.currentPage,
                        pageSize: this.pageSize,
                        name: this.productName,
                        productId: this.productNo,
                        status: this.filterValue + ""
                    })
                    .catch(err => {
                        this.$message.error("请检查网络");
                    }),
                data;
            if (res) {
                data = api.parse(res);
                if (parseInt(res.code) === 1000) {
                    this.dataList = data.productList;
                    this.totalCount = data.total;
                    this.loadingFlag = false;
                }
            }
        },
        //多选赋值
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //当前页码
        handleCurrentChange(val) {
            console.log(`当前页: ${this.currentPage}`);
        },
        //下架
        handleLowerGoods(param) {
            //        if (param && param.productId) {
            //          this.handleLowerGoodsOk(param, async () => {
            //            _.find(this.dataList, {id: param.productId}).status = 0
            //            this.$refs.waresList.toggleRowSelection(param, false);
            //          })
            //        } else {
            //          if (this.multipleSelection.length == 0) {
            //            this.$message.error('您还没有选中任何商品');
            //          } else {
            //            this.handleLowerGoodsOk(param, () => {
            //              this.$refs.waresList.clearSelection();
            //            })
            //          }
            //        }
        },
        //更改排序
        handleSortChange(param) {
            this.sortVal = param.sort;
            this.sortId = param.productId;
            this.changeSortDialog = true;
        },
        //更改排序确认
        async handleSortChangeOk() {
            let res = await api.sortProduct({
                productId: this.sortId,
                sort: this.sortVal
            });
            if (res) {
                api.parse(res);
                if (parseInt(res.code) === 1000) {
                    //          this.initData()
                    _.find(this.dataList, {
                        productId: this.sortId
                    }).sort = this.sortVal;
                    this.changeSortDialog = false;
                    this.$message.success("更改排序成功");
                } else {
                    this.$message.success(res.msg);
                }
            }
        },
        //是否可以选中
        canSelectFun(param, index) {
            return parseInt(param.status) === 1 ? true : false;
        },
        //下架商品确认
        handleLowerGoodsOk(param, fun) {
            this.$confirm("是否要对已选定商品进行下架", {
                showClose: false
            })
                .then(async () => {
                    let res = await api.shelfProduct({
                        productId: param.productId,
                        status: 0
                    });
                    if (res) {
                        api.parse(res);
                        if (parseInt(res.code) === 1000) {
                            this.initData();
                            this.$message.success("下架成功");
                        } else {
                            this.$message.success(res.msg);
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
        //去编辑页面
        enterEdit(param) {
            let name = "";
            if (parseInt(param.status) === 1) {
                //上架
                name = "upWares";
            } else {
                name = "downWares";
            }
            this.$router.push({
                name,
                query: {
                    id: param.productId
                }
            });
        }
    },
    async created() {
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
#waresList {
    .el-table {
        border: 1px solid #eee;
        .cell {
            .shop-img {
                display: block;
                float: left;
                width: 80px;
                height: 80px;
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
