<!--
  作者：宋佩兰
  创建时间 ：2018-7-11
  描述：商品详情页面
-->
<template>
  <div id='waresDetail' class='container'>
    <subtitle>商品信息页</subtitle>
    <wares pageType="waresDetail" :productDetail="product"></wares>
  </div>
</template>

<script type='text/ecmascript-6'>
  import subtitle from 'components/common/subTitle'
  import wares from 'components/waresManage/wares'
  import Utils from 'utils/utils'
  import api from 'api'
  export default {
    name: 'waresDetail',
    data() {
      return {
        wid: Utils.getQueryStringVue('id'), // 商品id
        product: {}
      };
    },
    components: {
      subtitle,
      wares
    },
    created(){
      this.api_getProductDetail()
    },
    mounted(){

    },
    methods: {
      /*api 得到商品详情数据*/
      async api_getProductDetail(){
        if (!this.wid) {
          return
        }
        let data = await api.getProductById({productId: this.wid}).catch((e) => {
          console.log('[error]editProduct_apply ', e)
          this.$message({
            message: "网络错误，请稍后重试",
            type: 'error'
          })
        });
        if (!data) {
          return
        }
        data = api.parse(data)
        if (data && data.productDetail) {
          this.product = data.productDetail
        }
      },
    },

  };
</script>
