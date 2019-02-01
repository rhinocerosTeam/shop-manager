<template>
  <div>
    频道管理





    <!--表格-->
    <el-table :data="dataList" style="width: 100%" @cell-click=''>
      <el-table-column align="center" label="频道编号" width="260" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sourceProductId" align="center" label="频道名称" width="120"></el-table-column>
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
  export default {
    data() {
      return {
        key:"111",
        dataList:[],
      };
    },
  }
</script>
