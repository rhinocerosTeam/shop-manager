<template>
  <div class='container' v-loading='loadingFlag'>
    <subTitle>订单详情</subTitle>
    <!-- steps 下单进度条部分 start-->
    <div class="title-box">
      <div class="details-title-box">
        <div class="step-box">
          <el-steps :active="status" align-center finish-status='finish' process-status='finish'
                    v-show='dataInfo.orderStatus != 60 && dataInfo.orderStatus != 70'>
            <el-step title="已下单，待付款" :description="format(dataInfo.createTime)"></el-step>
            <el-step title="已支付，待发货" :description="format(dataInfo.payTime)"></el-step>
            <el-step title="已发货，待收货" :description="format(dataInfo.sendOutTime)"></el-step>
            <el-step title="已完成" :description="format(dataInfo.confirmTime)"></el-step>
          </el-steps>
        </div>
        <div class="step-box" v-show='dataInfo.orderStatus == 60 || dataInfo.orderStatus == 70'>
          <el-steps :active="2" align-center finish-status='finish' process-status='finish'>
            <el-step title="已下单，待付款" :description="format(dataInfo.createTime)"></el-step>
            <el-step title="已关闭" :description="format(dataInfo.updateTime)"></el-step>
          </el-steps>
        </div>
        <div class="btn-box">
          <el-button @click='cancelOrder_clickHandler' v-show='dataInfo.orderStatus == 10'>取消订单</el-button>
          <el-button @click='sendDelivery_cilckHandler'
                     v-show='dataInfo.orderStatus == 20 || dataInfo.orderStatus == 30' type="primary">我要发货
          </el-button>
        </div>
      </div>
    </div>
    <!-- steps 下单进度条部分 end-->
    <!-- 订单信息部分 start -->
    <div class="order-info">
      <div class="details-info-box">
        <div class="details-info-title">订单信息</div>
        <div class="details-info-cont">
          <!-- 订单信息抬头部分 start -->
          <el-row class="order-info-title">
            <el-col :span='8'>
              <el-col :span='12'>订单号：</el-col>
              <el-col :span='12' class="tl" v-text='dataInfo.orderNo'></el-col>
            </el-col>
            <el-col :span='8'>
              <el-col :span='12'>订单总金额:</el-col>
              <el-col :span='12' class="tl">￥{{dataInfo.totalAmount}}</el-col>
            </el-col>
            <el-col :span='8'>
              <el-col :span='12'>运费金额:</el-col>
              <el-col :span='12' class="tl">￥{{dataInfo.deliveryFee}}</el-col>
            </el-col>
            <el-col :span='8'>
              <el-col :span='12'>订单状态:</el-col>
              <el-col :span='12' class="tl" v-text='orderStatus(dataInfo.orderStatus)'></el-col>
            </el-col>
            <el-col :span='8'>
              <el-col :span='12'>应付金额:</el-col>
              <el-col :span='12' class="tl">￥{{dataInfo.payAmount}}</el-col>
            </el-col>
            <el-col :span='8'>
              <el-col :span='12'>用户备注:</el-col>
              <el-col :span='12' class="tl" v-text='dataInfo.remark'></el-col>
            </el-col>
          </el-row>
          <!-- 订单信息抬头部分 end -->
          <!-- 订单信息表格展示部分 start -->
          <div class="details-info-table">
            <el-table :data="dataInfo.items" style="width: 100%">
              <el-table-column prop="date" label="规格名称" width="250" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <img :src="scope.row.itemImg" alt="">
                  <span class='name'>{{ scope.row.itemName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="skuId" label="商品货号" align="center"></el-table-column>
              <el-table-column label="单价" align="center" :formatter="getSkuPrice"></el-table-column>
              <el-table-column prop="itemNum" label="数量" align="center"></el-table-column>
              <el-table-column label="状态" :formatter="getStatus" align="center"></el-table-column>
            </el-table>
            <!-- 订单信息 运费 总金额部分 -->
            <div class="price-info">
              <!--<div class="price-bar">-->
              <!--<span>运费:</span>-->
              <!--<span>¥{{dataInfo.deliveryFee}}</span>-->
              <!--</div>-->
              <div class="price-bar">
                <span>商品总金额:</span>
                <span>¥{{dataInfo.itemTotalAmount}}</span>
              </div>
            </div>
          </div>
          <!-- 订单信息表格展示部分 end -->
        </div>
      </div>
    </div>
    <!-- 订单信息部分 end -->
    <!-- 商家备注 以及 收获 物流信息 start -->
    <div class="order-footer">
      <el-row>
        <el-col :span='12'>
          <h3 style='font-size: 16px;margin-bottom: 10px;'>商家备注</h3>
          <el-col :span='22' class="business-info-show scrollInfo" style='border-right: 1px solid #eee;'>
            <h3>备注记录</h3>
            <ul style='height: 150px;'>
              <li v-for='item in dataInfo.orderRemarks'>
                <el-col :span='12' class="time" v-text='format(item.createTime)'></el-col>
                <el-col :span='12' v-text='item.remark'></el-col>
              </li>
            </ul>
          </el-col>
          <el-col :span='24' class="business-notes">
            <el-input class="business-notes-area" type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea">
            </el-input>
            <el-button @click='addRemarks' size='small'>保存</el-button>
          </el-col>
        </el-col>
        <el-col class="receipt-info" :span='12'>
          <dl>
            <dt>收货信息
              <el-button size='small' @click='changeInfo_clickHandler' style='margin-left: 20px;'
                         v-show='dataInfo.orderStatus == 10 || dataInfo.orderStatus == 20 || dataInfo.orderStatus == 30'>
                更改收货信息
              </el-button>
            </dt>
            <dd>
              <span>收货人姓名:</span>
              <span v-text='dataInfo.receiveName'></span>
            </dd>
            <dd>
              <span>收货人手机:</span>
              <span v-text='dataInfo.receiveMobile'></span>
            </dd>
            <dd>
              <span>收货地址:</span>
              <span v-text='dataInfo.provinceName+dataInfo.cityName+dataInfo.countyName'></span>
            </dd>
            <dd>
              <span>详细地址:</span>
              <span v-text='dataInfo.detailedAddress'></span>
            </dd>
          </dl>
        </el-col>
      </el-row>

      <el-row v-show='dataInfo.orderStatus != 10 && dataInfo.orderStatus != 60 && dataInfo.orderStatus != 70'>
        <h4 style='border-top: 1px solid #eee;padding-top: 20px;'>
          物流信息
          <el-button class="change-info-btn" @click="sendDelivery_cilckHandler" size='small'
                     v-show='dataInfo.orderStatus == 40 '>修改物流信息
          </el-button>
        </h4>
        <el-col :span='12' class="logistics-info">
          <ul>
            <li>
              <span>物流公司:</span>
              <span v-text='dataInfo.deliveryCompanyName'></span>
            </li>
            <li>
              <span>物流单号:</span>
              <span v-text='dataInfo.deliveryNo'></span>
            </li>
          </ul>
        </el-col>
        <el-col :span='12' class="logistics-info-show scrollInfo">
          <h3>物流轨迹</h3>
          <ul>
            <li v-for='item in dataInfo.deliveryInfos'>
              <el-col :span='12' class="time" v-text='item.deliveryDateFmt+" "+item.deliveryTimeFmt'></el-col>
              <el-col :span='12' v-text='item.deliveryContext'></el-col>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <!-- 商家备注 以及 收获 物流信息 end -->
    <!-- 发货 弹出框 start -->
    <sendAlert :companies='companies' :params='dataInfo' :type='sendType' @save-success='initData'
               @close-alert='closeAlert' v-if='showFlag'></sendAlert>
    <!-- 发货 弹出框 end -->
    <!-- 更改发货信息 弹出框 start -->
    <receiptInfo :datas='dataInfo' @save-handler='save_handler' @cancel-handler='cancel_handler'
                 v-if='showReceiptInfo'></receiptInfo>
    <!-- 更改发货信息 弹出框 end -->
  </div>
</template>

<script type='text/ecmascript-6'>
  import subTitle from "components/common/subTitle";
  import {MessageBox} from "element-ui";
  import sendAlert from "components/orderManage/sendAlert";
  import receiptInfo from "components/orderManage/receiptInfo";
  import dateUtils from "../../utils/dateUtils";
  import api from "api";
  export default {
    data() {
      return {
        loadingFlag: true,
        orderNo: "", //订单号
        status: 0, //状态进度  订单状态10、待支付；20、已支付；30、待发货；40、已发货；50、已完成；60、订单取消；70、系统自动取消；80退款中；90、退款完成；100、退款失败
        textarea: "",
        dataInfo: {},
        showFlag: false, // 发货弹出框 控制显示隐藏
        showReceiptInfo: false, // 更改发货信息 出框 控制显示隐藏
        sendType: 1, //1发货 2保存
        companies: []
      };
    },
    components: {
      subTitle,
      receiptInfo,
      sendAlert
    },
    methods: {
      async initData() {
        let res = await api
          .orderDetail({orderNo: parseInt(this.orderNo)})
          .catch(err => {
            this.$message.error("请检查网络");
          }), data;
        if (res) {
          data = api.parse(res)
          if (parseInt(res.code) === 1000) {
            this.dataInfo = data;
            this.dealData(this.dataInfo);

            this.loadingFlag = false;
          }
        }

      },

      dealData(data) {
        switch (data.orderStatus) {
          case 10:
            this.status = 0;
            break;
          case 20:
          case 30:
            this.status = 1;
            this.sendType = 1;
            break;
          case 40:
            this.status = 2;
            this.sendType = 2;
            break;
          case 50:
            this.status = 3;
            break;
          default:
            return false;
        }
      },
      //更改发货信息
      changeInfo_clickHandler() {
        this.showReceiptInfo = true;
      },
      //保存修改收货人信息
      async save_handler(param) {
        let paramObj = {
          receiveName: param.receiveName,
          receiveMobile: param.receiveMobile,
          provinceName: param.provinceName,
          cityName: param.cityName,
          countyName: param.countyName,
          detailedAddress: param.detailedAddress,
          orderNo: this.orderNo
        };
        let res = await api.updateReceiveInfo(paramObj).catch(err => {
          this.$message.error("请检查网络");
        });
        if(res){
          api.parse(res)
          if (parseInt(res.code) === 1000) {
            this.showReceiptInfo = false;
            this.initData();
          }
        }
      },
      //取消修改收货信息弹窗
      cancel_handler() {
        this.showReceiptInfo = false;
      },
      // 取消订单 点击事件
      cancelOrder_clickHandler() {
        MessageBox.confirm("是否取消订单?", "提示", {
          confirmButtonText: "确定",
          // cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(async () => {
            let data = await api
              .cancelOrder({orderNo: this.orderNo})
              .catch(err => {
                this.$message.error("请检查网络");
              });
            if (data && parseInt(data.code) === 1000) {
              this.initData();
              this.$message.success("取消成功");
            }
          })
          .catch(() => {
          });
      },
      // 发货 点击事件
      sendDelivery_cilckHandler() {
        this.showFlag = true;
      },
      closeAlert(data) {
        this.showFlag = false;
      },
      //添加备注
      async addRemarks() {
        let paramObj = {
          remark: this.textarea,
          orderNo: this.orderNo
        };
        if(this.textarea){
          let res = await api.addOrderRemark(paramObj).catch(err => {
            this.$message.error("请检查网络");
          });
          if(res){
            api.parse(res)
            if (parseInt(res.code) === 1000) {
              this.textarea = "";
              this.initData();
            }
          }
        }else {
          this.$message.error("备注内容不能为空");
        }
      },
      //获取订单状态
      orderStatus(status) {
        switch (status) {
          case 10:
            return "待支付";
          case 20:
            return "已支付";
          case 30:
            return "待发货";
          case 40:
            return "已发货";
          case 50:
            return "已完成";
          case 60:
            return "订单取消";
          case 70:
            return "系统自动取消";
          case 80:
            return "退款中";
          case 90:
            return "退款完成";
          case 100:
            return "退款失败";
        }
      },
      //规格订单状态
      getStatus() {
        return this.orderStatus(this.dataInfo.orderStatus);
      },
      //规格单价
      getSkuPrice(param) {
        return "￥" + param.itemPrice;
      },
      //时间处理
      format(time) {
        return time
          ? new Date(parseInt(time)).format("yyyy-MM-dd hh:mm:ss")
          : "";
      },
      //获取物流公司数据
      getCompaniesData() {
        api.deliveryCompany().then(res => {
            if(res){
              let data = api.parse(res)
              if (parseInt(res.code) === 1000) {
                this.companies = data.companies;
              }
            }
        });
      }
    },
    async created() {
      this.orderNo = this.$route.query.orderNo;
      await this.initData();
      this.getCompaniesData();
    }
  };
</script>
<style scoped lang="scss">
  $container-min-width: 500px;
  $order-footer-min-width: 900px;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #dddddd;
    -webkit-border-radius: 4px;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: rgb(169, 169, 183);
  }

  .container {
    min-width: $container-min-width;
    //steps 下单进度条部分
    .details-title-box {
      text-align: center;
      .step-box {
        margin: 30px 0;
      }
      .btn-box {
        margin-bottom: 30px;
      }
    }
    //订单信息部分
    .details-info-box {
      padding: 20px 0 60px 0;
      border-bottom: 1px solid #eee;
      > .details-info-title {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        font-size: 18px;
      }
      > .details-info-cont {
        //订单信息抬头部分 styles
        > .order-info-title {
          text-align: center;
          // height: 20px;
          line-height: 20px;
          margin-bottom: 40px;
          > .el-col {
            margin: 20px 0 0 0;
          }
          .tl {
            text-align: left;
            // padding-left: 20px;
          }
        }
        // 订单信息表格展示部分 styles
        > .details-info-table {
          width: 90%;
          margin: 0 auto;
          .el-table .cell {
            img {
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
          }
          // 订单信息 运费 总金额部分
          .price-info {
            float: right;
            height: 30px;
            line-height: 30px;
            margin: 10px 0;
            .price-bar {
              float: left;
              margin-left: 30px;
              span {
                display: inline-block;
                margin: 0 5px;
              }
            }
          }
        }
      }
    }
    // 商家备注 以及 收获 物流信息 styles
    .order-footer {
      padding: 20px 0;
      text-align: center;
      min-width: $order-footer-min-width;
      > .el-row {
        h4 {
          font-size: 16px;
          margin: 20px 0;
          > .el-button {
            margin-left: 20px;
          }
        }
        margin-bottom: 30px;
      }

      .business-info-show {
        border-right: 1px solid #eee;
      }

      // 商家备注 styles
      .business-notes {
        .business-notes-area {
          width: 92%;
          display: block;
          margin-bottom: 10px;
          margin-top: 10px;
          resize: none;
        }
      }
      // 收货信息 styles
      .receipt-info {
        line-height: 30px;
        display: inline-block;
        position: relative;
        > .change-info-btn {
          position: absolute;
          top: 60px;
          right: 10%;
        }
        > dl {
          > dt {
            margin-bottom: 20px;
            font-size: 16px;
          }
          > dd {
            overflow: hidden;
            padding-left: 80px;
            span {
              display: block;
              float: left;
              text-align: left;
              &:nth-of-type(1) {
                width: 130px;
              }
              &:nth-of-type(2) {
                width: 200px;
              }
              i {
                color: red;
                padding-right: 5px;
              }
            }
          }
        }
      }
      // 物流信息 styles
      .logistics-info {
        margin-top: 20px;
        > ul {
          text-align: left;
          min-width: 300px;
          display: inline-block;
          > li {
            line-height: 35px;
            span {
              display: inline-block;
              &:nth-of-type(1) {
                width: 80px;
              }
            }
          }
        }
      }
      // 物流信息 展示区域 styles
      .logistics-info-show {
      }

      .scrollInfo {
        border: 1px solid #eee;

        h3 {
          margin: 10px;
        }
        > ul {
          height: 200px;
          overflow-y: scroll;
          > li {
            line-height: 35px;
            > .time {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
