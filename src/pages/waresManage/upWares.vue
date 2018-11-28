<!--
  作者：宋佩兰
  创建时间 ：2018-7-11
  描述：商品上架页面
-->
<template>
  <div id='upWares' class='container'>
    <subtitle>编辑商品</subtitle>
    <wares ref="wares" pageType="upWares" :productDetail="product">
      <el-button slot="btn" @click="save(0)" type="primary" :disabled="btn_disable">保存并提交</el-button>
      <el-button slot="btn" @click="deleteProduct()" type="primary" :disabled="btn_disable">删除商品</el-button>
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
        wid: parseInt(Utils.getQueryStringVue('id')), // 商品id
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
          console.log('[error]getProductDetail ', e)
          this.$message({
            message: "网络错误，请稍后重试",
            type: 'error'
          })
        });
        if (!data) {
          return
        }
        data = api.parse(data)
        if (data) {
          let proDetail = data

          console.log('------------------------->', proDetail)

          // 整理库存和增加库存
          proDetail.skuList && proDetail.skuList.map((obj, index) => {
            obj['oldStock'] = obj['stock']
            obj['oldPrice'] = obj['price'];
            obj['stock'] = 0
          })

          this.product = proDetail

        }
      },
      /*保存
       * @param {number} 0表示保存 1表示保存并申请上架
       * */
      async save(type){
        if (this.$refs.wares.validate()) {

          this.$refs.wares.priceValidate(async() => {
            this.product.opType = type
            this.btn_disable = true

            let data = await api.editProduct(this.product).catch((e) => {
              console.log('[error]getProductDetail ', e)
            });
            api.parse(data)

            if (!data) {
              this.btn_disable = false
              return
            }
            if (data.code == 1000) {
              this.$message({
                message: "保存成功",
                type: 'success'
              })
              setTimeout(() => {
                this.btn_disable = false
                this.$router.push('/waresManage/applyList')
              }, 1000);
            } else {
              // 失败
              this.$message({
                message: data.msg,
                type: 'error'
              })
              this.btn_disable = false
            }
          })


        }
      },

      async deleteProduct(){

        this.$confirm("确定要删除该商品", {
          showClose: false
        }).then(async() => {
            let data = await api.deleteProduct({productId:this.product.id}).catch((e) => {
              console.log('[error]getProductDetail ', e)
            });
            api.parse(data)
            if (data.code == 1000) {
              this.$message({
                message: "删除成功",
                type: 'success'
              })
              setTimeout(() => {
                this.btn_disable = false
                this.$router.push('/waresManage/waresList')
              }, 1000);
            } else {
              // 失败
              this.$message({
                message: data.msg,
                type: 'error'
              })
              this.btn_disable = false
            }
        }).catch(err => {
        });


      }
    }
  };
</script>
