<template>
  <div class="send-box">
    <div class="send-cont">
      <div class="select-box">
        <h3>请选择发货方式</h3>
        <el-row>
          <el-select v-model="sendCode" placeholder="请选择">
            <el-option label="无需物流" value=""></el-option>
            <el-option v-for="item in companies" :key="item.companyCode" :label="item.companyName"
                       :value="item.companyCode">
            </el-option>
          </el-select>
        </el-row>
      </div>
      <div class="input-order-box" v-show="sendCode">
        <h4>请输入快递单号</h4>
        <el-input :style="{width:'200px'}" v-model="orderNum" placeholder="请输入快递单号"></el-input>
      </div>
      <div class="send-button-box">
        <el-button v-if='type==1' @click='sendThings_clickHandler'>发&nbsp;&nbsp;&nbsp;&nbsp;货</el-button>
        <el-button v-if='type==2' @click='sendThings_clickHandler'>保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
      </div>
      <i class="el-icon-circle-close" @click="close_clickHandler"></i>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import _ from 'lodash'
  import api from 'api'

  export default {
    data() {
      return {
        sendCode: '',
        orderNum: "",
        orderNo: ''
      };
    },
    props: ['companies', 'params', 'type'],
    components: {},
    methods: {
      //取消
      close_clickHandler() {
        this.$emit("close-alert", false);
      },
      //保存 发货 数据处理
      sendThings_clickHandler(){
        let deliveryCompanyName = ''
        if (this.sendCode) {
          deliveryCompanyName = _.find(this.companies, {'companyCode': this.sendCode}).companyName;
        } else {
          this.orderNum = ''
        }

        if (this.sendCode) {
          if (this.orderNum) {
            if (!/^\d+$/.test(this.orderNum)) {
              this.$message.error('请输入数字');
            } else {
              this.saveDelivery_handler(deliveryCompanyName)
            }
          } else {
            this.$message.error('快递单号不能为空');
          }
        } else {
          this.saveDelivery_handler(deliveryCompanyName)
        }
      },
      //保存 发货
      async saveDelivery_handler(name){
        let paramObj = {
          deliveryCompanyCode: this.sendCode,
          deliveryNo: this.orderNum,
          deliveryCompanyName: name,
          orderNo: this.orderNo,
        }

        let res = await api.updateOrderDelivery(paramObj).catch((err) => {
          this.$message.error('请检查网络');
        });
        if (res) {
          api.parse(res)
          if (parseInt(res.code) === 1000) {
            this.close_clickHandler()
            this.$emit("save-success");
          }
        }
      }

    },
    created() {
      if (this.params) {
        this.orderNum = this.params.deliveryNo ? this.params.deliveryNo : ''
        this.orderNo = this.params.orderNo ? this.params.orderNo : ''
        this.sendCode = this.params.deliveryCompanyCode ? this.params.deliveryCompanyCode : ''
      }
    },
    mounted() {

    },
    destroyed() {
    },
    watch: {}
  };
</script>
<style scoped lang='scss'>
  .send-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    .send-cont {
      width: 400px;
      height: 300px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
      border-radius: 10px;
      padding-top: 20px;
      box-sizing: border-box;
      .select-box {
        min-height: 100px;
        > h3 {
          margin: 20px 0;
          font-size: 18px;
        }
      }
      h4 {
        margin-bottom: 10px;
        font-size: 16px;
      }
      .send-button-box {
        margin-top: 10px;
      }
      .el-icon-circle-close {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 25px;
        color: #999;
        cursor: pointer;
      }
    }
  }
</style>
