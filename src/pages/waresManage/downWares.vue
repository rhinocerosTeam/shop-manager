<!--
  作者：宋佩兰
  创建时间 ：2018-7-11
  描述：商品下架页面
-->
<template>
  <div id='downWares' class='container'>
    <subtitle>编辑商品</subtitle>
    <wares ref="wares" pageType="downWares" :productDetail="product">
      <el-button slot="btn" @click="save(1)" :disabled="btn_disable" type="primary">保存并申请上架</el-button>
      <el-button slot="btn" @click="save(0)" :disabled="btn_disable" type="primary">保存至下架商品</el-button>
    </wares>
  </div>
</template>

<script type='text/ecmascript-6'>
  import subtitle from 'components/common/subTitle'
  import wares from 'components/waresManage/wares'
  import api from 'api'
  import Utils from 'utils/utils'
  export default {
    data() {
      return {
        wid: Utils.getQueryStringVue('id'), // 商品id
        product: {},
        btn_disable: false
      };
    },
    components: {
      subtitle,
      wares
    },
    created(){
      this.api_getProductDetail()
    },
    methods: {
      /*api 得到商品详情数据*/
      async api_getProductDetail(){
        if (!this.wid) {
          return
        }
        let data = await api.getProductDetail({productId: this.wid}).catch((e) => {
          // 失败
          this.$message({
            message: '网络错误，请稍后再试',
            type: 'error'
          })
          return
        });
        data = api.parse(data)
        if (data && data.productDetail) {
          let proDetail = data.productDetail

          // 整理库存和增加库存
          proDetail.skuList.map(function (pro, index) {
            pro['oldStock'] = pro['stock'];
            pro['oldPrice'] = pro['price'];
            pro['stock'] = 0;
          })
          this.product = proDetail
        } else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      },


      /*保存
       * @param {number} 0表示保存 1表示保存并申请上架 */
      async save(type){
        let _this = this
        if (this.$refs.wares.validate()) {

          this.$refs.wares.priceValidate(async() => {
            this.product.opType = type
            this.btn_disable = true

            let data = await api.editProduct(this.product).catch((e) => {
              console.log('[error]editProduct ', e)
              this.$message({
                message: '网络错误，请稍后再试',
                type: 'error'
              })
            })

            if (!data) {
              this.btn_disable = false
              return
            }
            api.parse(data)
            if (data.code == 1000) {
              if (type == 0) {
                this.$message({
                  message: "保存至下架商品成功",
                  type: 'success'
                })
              } else {
                this.$message({
                  message: "保存成功并提交申请上架",
                  type: 'success'
                })

              }

              setTimeout(function () {
                this.btn_disable = false
                _this.$router.push('/waresManage/applyList')
              }, 1000);
            } else {
              // 失败
              // this.$message({
              //   message: data.msg,
              //   type: 'error'
              // })
              this.btn_disable = false
            }
          })

        }
      },
    }
  };
</script>
