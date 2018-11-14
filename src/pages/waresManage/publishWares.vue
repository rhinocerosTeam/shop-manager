<!--
  作者：宋佩兰
  创建时间 ：2018-7-11
  描述：发布商品页面
-->
<template>
  <div id='publishWares' class='container'>
    <subtitle>发布商品</subtitle>
    <wares ref="wares" pageType="publishWares" :productDetail="product">
      <el-button slot="btn" @click="save(1)" type="primary" :disabled="btn_disable">保存并申请上架</el-button>
      <el-button slot="btn" @click="save(0)" type="primary" :disabled="btn_disable">保存</el-button>
    </wares>
  </div>
</template>

<script type='text/ecmascript-6'>
  import subtitle from 'components/common/subTitle'
  import wares from 'components/waresManage/wares'
  import Utils from 'utils/utils'
  import api from 'api'

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
        let data = await api.getProductById({productId: this.wid});
        data = api.parse(data)
        if (data && data.productDetail) {
          this.product = data.productDetail
        }
      },
      /*保存
       * @param {number} 0表示保存 1表示保存并申请上架
       **/
      async save(type){

        if (this.$refs.wares.validate()) {
          this.product = this.$refs.wares.product
          this.product.opType = type
          this.btn_disable = true
          let data = null

          if (this.wid) {
            data = await api.editProduct_apply(this.product).catch((e) => {
              console.log('[error]editProduct_apply', e)
              this.$message({
                message: "网络错误，请稍后重试",
                type: 'error'
              })
              return
            })
          } else {
            data = await api.addProduct_apply(this.product).catch((e) => {
              console.log('[error]addProduct_apply', e)
              this.$message({
                message: "网络错误，请稍后重试",
                type: 'error'
              })
              return
            })
          }

          if (!data) {
            this.btn_disable = false
            return
          }
          api.parse(data)
          // 成功
          if (data.code == 1000) {
            if (type == 0) {
              this.$message({
                message: "保存成功",
                type: 'success'
              })
            } else {
              this.$message({
                message: "保存成功并提交申请上架",
                type: 'success'
              })
            }
            setTimeout(() => {
              this.btn_disable = false
              this.$router.push('/waresManage/applyList')
            }, 1000);
          } else {
            // 失败
            // this.$message({
            //   message: data.msg,
            //   type: 'error'
            // })
            this.btn_disable = false

          }


        }
      },

    }
  };
</script>
