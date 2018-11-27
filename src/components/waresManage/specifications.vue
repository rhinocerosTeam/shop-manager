<!--
  作者：宋佩兰
  创建时间 ：2018-7-11
  描述：商品规格组件
-->
<template>
  <div class="specificationsContainer">

    <el-form ref="specificationsform" :model="product" label-width="130px">

      <el-row class="specificationsBox" v-for="sku,index in product.skuList " :key="'skuList_'+index">
        <el-col :span="4">
          <el-form-item label="商品图片" label-width="79px" :prop="'skuList.' + index + '.coverImg'"
                        :rules="rules.coverImg">

            <div class="productPictureCont">
              <uploadOss :index="index" @success="handleSuccess"
                         v-if="!disabled"></uploadOss>
              <picture-card class="showPictrue"
                            :src="sku.coverImg+'@148w'" v-if="sku.coverImg"></picture-card>
            </div>

          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-row>
            <el-form-item label="规格名称"
                          :prop="'skuList.' + index + '.name'"
                          :rules="rules.name"
            >
              <el-input v-model="sku.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-row>

          <el-row v-if="pageType=='publishWares'||pageType=='waresDetail'">
            <el-form-item label="库存"
                          :prop="'skuList.' + index + '.stockNum'"
                          :rules="rules.stockNum">
              <el-input v-model.number="sku.stockNum" :disabled="disabled"></el-input>
            </el-form-item>

          </el-row>
          <el-row v-else>
            <el-form-item label="库存"
            >
              出库数量:{{sku.stockOut}}
              {{sku.oldStock>-1?sku.oldStock:0}}
              <span class="item">
                <el-tooltip class="item" effect="dark"
                            content="库存只可进行加减操作，正数为加库存，负数为减库存，加减库存数在输入框输入。"
                            placement="top-start">
                  <i class="el-icon-question"></i>
                </el-tooltip>增减库存
              </span>
              <el-input-number v-model.number="sku.stockNum" :precision="0" :min="-sku.oldStock" :max="999999999"
                               :disabled="num_disabled()"
                               label=""></el-input-number>

            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="UPC码" prop="barcode">
              <el-input v-model="sku.barcode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-row>
        </el-col>
        <el-col :span="9">
          <el-form-item label="规格排序" :prop="'skuList.' + index + '.sort'"
                        :rules="rules.sort">
            <el-input v-model.number="sku.sort" :disabled="num_disabled()"></el-input>
          </el-form-item>
          <el-form-item label="销售价" :prop="'skuList.' + index + '.price'"
                        :rules="rules.price">
            <el-input-number :style='{width:"100%"}' v-model.number="sku.price" :controls='false' :precision="2" :min="0" :max="999999999"
                             :disabled="num_disabled()"
                             class='lf-specification'
                             label=""></el-input-number>
            <!--<el-input ></el-input>-->
          </el-form-item>
          <el-form-item label="市场价" :prop="'skuList.' + index + '.oldPrice'" :rules="rules.oldPrice">
            <el-input v-model.number="sku.oldPrice" :disabled="num_disabled()"></el-input>
          </el-form-item>

        </el-col>
        <el-col :span="2" justify="center" align="middle">
          <span class="deleteBtn" @click="delete_handler(index)"
                v-if="sku.isNew || pageType=='publishWares'&&product.skuList.length>1">删除</span>
        </el-col>
      </el-row>
    </el-form>

    <div class="operateBox" v-if="!disabled">
      <el-button class="addBtn" :disabled="disabled" plain type="primary" @click="addSpecifications()">新增规格</el-button>
    </div>

  </div>
</template>
<script>
  import {Form, formItem, tooltip} from "element-ui"
  import Vue from "vue";
  import pictureCard from 'components/common/pictureCard'
  import uploadOss from 'components/common/upload'
  import {waresPattern} from 'constants/wares'

  Vue.use(Form)
  Vue.use(formItem)
  Vue.use(tooltip)
  export default {
    name: 'specifications',
    components: {
      pictureCard,
      uploadOss
    },
    props: ['pattern', 'pageType', 'skuList', 'product'],
    data() {
      var validatePrice = (rule, value, callback) => {
        console.log(value,'value')

          console.log((value && (String(value).length - (String(value).indexOf(".") + 1) > 2)),(String(value).length - (String(value).indexOf(".") + 1) > 2),!/^\d+(\.\d{1,2})?$/.test(value) )

        let s =String(value).split('.')
        s = s.length>1?s[1]:''

        if (!/^\d+(\.\d{1,2})?$/.test(value) || s.length>2) {
          callback(new Error('请保留两位小数'));
        } else {
          callback();
        }
      };
      var validatePriceNumLimit = (rule, value, callback) => {
        if (value <= 0) {
          callback(new Error('请输入大于0的数字'));
        } else {
          callback();
        }
      };
      var validateNumber = (rule, value, callback) => {
        if (!/^\d+$/.test(value)) {
          callback(new Error('请输入整数'));
        } else {
          callback();
        }
      };
      var validateMarketPrice = (rule, value, callback) => {
        if (value == '') {
          callback();
        } else if (value != '' && !/^\d+(\.\d{1,2})?$/.test(value)) {
          callback(new Error('请输入大于等于0的数字，数字可保留两位小数'));
        } else {
          callback();
        }
      };

      return {
        disabled: this.pattern == waresPattern.show || this.pattern == waresPattern.upWares,
        rules: {
          coverImg: [
            {required: true, message: '请输入商品图'},
          ],
          name: [
            {required: true, message: '请输入规格名称'},
          ],
          stockNum: [
            {required: true, message: '请输入库存'},
            {type: 'number', message: '库存必须为数字'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          sort: [
            {required: true, message: '请输入规格排序'},
            {type: 'number', message: '规格排序必须为数'},
            {validator: validateNumber, trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请输入销售价'},
            {type: 'number', message: '销售价必须为数字'},
            {validator: validatePrice, trigger: 'blur'},
            {validator: validatePriceNumLimit, trigger: 'blur'},
          ],
          oldPrice: [
            // {type: 'number', message: '市场价必须为数字', trigger: 'blur'},
            {validator: validateMarketPrice, trigger: 'blur'},

          ]
        },
      }
    },
    created(){


    },
    methods: {
      /**
       * 增加销售规格
       * **/
      addSpecifications(){
        this.skuList.push({
          barcode: '',
          oldPrice: 0,
          price: 0,
          productId: 0,
          coverImg: "",
          name: "",
          stockNum: 0,
          stockOut:0,
          sort: 0,
          isNew: true
        })
      },
      onSubmit() {
        console.log('submit!');
      },
      num_disabled(){
        return this.pattern == waresPattern.show
      },

      handleSuccess(imgObj, index){
        console.log('规格：handleSuccess', imgObj, index)
        this.product.skuList[index].coverImg = imgObj.imgUrl
        console.log('规格：handleSuccess', imgObj, index, this.product.skuList[index])
        this.$refs['specificationsform'].clearValidate(['skuList.' + index + '.coverImg'])
      },

      delete_handler(index){
        this.skuList.splice(index, 1)
      },
      validate(){
        let flag = false;
        this.$refs['specificationsform'].validate((valid) => {
          if (valid) {
            console.log('specificationsform success submit!!');
            flag = true
          } else {
            console.log('specificationsform error submit!!');
            flag = false
          }
        });
        return flag
      }
    }

  }
</script>
<style>
  .lf-specification .el-input input{
    text-align: left !important;
  }
</style>
<style scoped lang="scss">
  .specificationsContainer {

  }

  .specificationsContainer .specificationsBox {
    margin-top: 5px;
    margin: 10px;
    border-bottom: 1px solid #cccccc;

  }

  .specificationsContainer .specificationsBox:last-of-type {

    border-bottom: 0;

  }
  .lf .el-input input{
    text-align: left !important;
    color: red;
  }
  .specificationsContainer .addBtn {
    width: 500px;
    margin: 0 auto;
  }

  .operateBox {
    padding: 20px 0;
    margin: 0 10px;
    text-align: center;
    border-top: 1px solid #cccccc;
  }

  .productPictureCont {
    position: relative;

  }

  .showPictrue {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .deleteBtn {
    line-height: 160px;
    color: #c29df6;
    cursor: pointer;
  }

  .item {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 14px;
    color: #606266;
  }
</style>
