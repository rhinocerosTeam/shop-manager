<!--
@author 宋佩兰
@date 2018-7-11
@desc 商品组件 包括商品查看，编辑，发布，上架下架功能
-->
<template>
  <div class="waresContainer">
    <!--基本内容  :uploadconfig="uploadConfig"-->
    <el-row>
      <el-col :span="24">
        <div class="box">
          <p>基本信息</p>
          <div class="content">
            <base-info ref="baseInfo" :product="product" :pattern="pattern"></base-info>
          </div>
        </div>
      </el-col>
    </el-row>


    <!--销售规格-->
    <div class="box">
      <p>销售规格</p>
      <div class="content">
        <specifications ref="specifications" :product="product" :skuList="product.skuList" :pattern="pattern"
                        :pageType="pageType"
                        @add="addSpecifications()"></specifications>
      </div>
    </div>

    <!--商品描述-->
    <div class="box">
      <p><span style="color:red;margin-right: 5px;">*</span>商品描述</p>
      <div class="content">
        <quill-editor v-model="product.productDesc" :product="product" :pattern="pattern"
        ></quill-editor>
      </div>
    </div>
    <!--按钮-->
    <el-row>
      <el-col align="middle">
        <div class="btnBox">
          <el-button @click="preview()" v-if="product.productId">页面预览</el-button>
          <slot name="btn"></slot>
        </div>
      </el-col>
    </el-row>

  </div>


</template>
<script>

  import 'scss/waresManage/wares.scss'
  import BaseInfo from 'components/waresManage/baseInfo'
  import specifications from 'components/waresManage/specifications'
  import quillEditor from 'components/common/quillEditor'
  import api from 'api'
  import {MALL_HTML_LINK} from "api/config";
  import UploadOss from 'utils/uploadOSS'
  import {waresPattern} from 'constants/wares'
  import Utils from 'utils/utils'
  let uploadOss = new UploadOss()
  export default {
    data(){
      return {
        pattern: this.getWaresPattern(), // 页面模式
        product: {
//          productId: '',
          name: '', //商品名称
          coverImg: "",//'http://h5activestatic.hefantv.com/testFileResource/1532509428891_3061_QQ截图20180723183710.png', //封面图
          dayLimitNum: 5, //单日限购数量
          peopleLimitNum: 5, //单人限购数量
          productDesc: ``, //商品详情
          productType: '4', //0应援，1星币，2商城，3官方，4第三方
          status: '0', //0：下架（前台可见）；1：上架
          swiper: [
            /*{
             imgHeight: 805,
             imgSort: 0,
             imgUrl: "http://img1.hefantv.com/20180726/d3b7939c2448428697741708660929ee1532607756126_3069_QQ截图20180710111129.png",
             imgWidth: 330
             }*/
          ], //单日限购数量
          skuList: [
            {
              barcode: '',
              oldPrice: 0,
              price: 0,
              productId: 0,
              coverImg: "http://img1.hefantv.com/20180726/d3b7939c2448428697741708660929ee1532607756126_3069_QQ截图20180710111129.png",
              name: "",
              stockNum: 0,
              stockOut:0,
              sort: 0,
            },

          ], //单日限购数量
        }
      }
    },
    props: ['pageType', 'productDetail'],
    components: {
      'base-info': BaseInfo,
      specifications,
      quillEditor
    },
    created(){

    },
    updated(){

    },
    beforeDestoryed(){

    },
    methods: {
      /*
       * 得到页面的是否禁用的类型
       * @return {string}  eidt 编辑 show 查看 upWares 上架
       * */
      getWaresPattern(){
        let pageType = this.pageType
        // 发布和下架商品
        if (pageType == 'publishWares' || pageType == 'downWares') {
          return waresPattern.edit;

          //上架商品
        } else if (pageType == 'upWares') {
          return waresPattern.upWares;

          //商品详情
        } else if (pageType == 'waresDetail') {
          return waresPattern.show
        }
      },
      /**
       * 验证
       * **/
      validate(){
        let bFlag = this.$refs['baseInfo'].validate()
        let sFlag = this.$refs['specifications'].validate()
        let quillEditor = this.product.productDesc
        if(!quillEditor){
          this.$message({
            message: "请输入商品描述",
            type: 'error'
          })
        }
        if (bFlag && sFlag && quillEditor) {
          return true
        }
        return false
      },
      /**
       * 页面预览
       * **/
      preview(){
        let header = api.setHeaders()
        let pageType = this.pageType
        let from = 'product'
        if (pageType == 'upWares' || pageType == 'downWares') {
          from = 'product'
        } else {
          from = 'apply'
        }

        let link = `${MALL_HTML_LINK}/funClubGoodsDetailPreview.html?productId=${this.product.productId}&cont=${header.token}&scont=${header.storeId}&from=${from}`
        window.open(link);
      },
      /**验证价格是否波动太大**/
      priceValidate(callback){
        let tip = ""
        this.product.skuList.map(function (obj, index) {
          let diff = Math.abs(obj.price - obj.oldPrice)
          if (obj.oldPrice && (diff > 200 || diff / obj.oldPrice > 0.2)) {
            tip += `${obj.skuName}`
          }
        })

        if (tip) {
          this.$confirm('价格修改波动过大，确认是否修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            callback()
          }).catch(() => {
          });
        } else {
          callback()
        }

      },

    },
    watch: {
      productDetail: {
        handler(curVal, oldVal){
          if (Utils.isNotEmptyObject(curVal)) {
            this.product = curVal
          }
        },
        deep: true
      }
    },


  }
</script>
<style>
  .btnBox {
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 40px;
  }
</style>
