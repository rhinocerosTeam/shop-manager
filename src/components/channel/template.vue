<template>
  <div class="templateCont">
    <!--轮播图-->

    <div class="swiper-box templateBOX" v-if="showAll || type ==  templateType.swiper">
      <div class="swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide"  v-for="(obj,index) in swiper" :key="'swiper_1_'+index" @click="openDialog(obj)">
              <img :src="obj.imgSrc" class="fullImg" v-if="obj.imgSrc">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <div class="textDesc">
        <el-button type="danger" plain @click="deleteButton()">删除</el-button>
        图片大小：750*370
        <p v-for="(obj,index) in swiper" :key="'swiper_txt_'+index" >
          图片{{index}}：跳转方式 {{obj.type == 1?"产品":"渠道"}}  {{obj.type == 1?"产品id":"渠道路径"}} {{obj.location}}
        </p>
      </div>
    </div>

    <!--三张图片-->
    <div class="templateBOX" v-if="showAll || type ==  templateType.threePic">
      <div class="threeImg templateBOX">
        <div :class="{'one':index == 0,'two':index == 1,'three':index == 2}" v-for="(obj,index) in threePic" :key="'threePic_1_'+index" @click="openDialog(obj)">
          <img :src="obj.imgSrc" class="fullImg" v-if="obj.imgSrc">
        </div>
      </div>
      <div class="textDesc">
        <el-button type="danger" plain @click="deleteButton()">删除</el-button>
        图片大小：左：370*530 右 ：373*260
        <p v-for="(obj,index) in threePic" :key="'threePic_Txt_'+index">
          图片{{index}}：跳转方式 {{obj.type == 1?"产品":"渠道"}}  {{obj.type == 1?"产品id":"渠道路径"}} {{obj.location}}
        </p>
      </div>
    </div>

    <!--两张图片-->
    <div class="templateBOX" v-if="showAll || type ==  templateType.twoPic">
      <div class="twoImg" >
        <div :class="{'one':index == 0,'two':index == 1}" v-for="(obj,index) in twoPic" :key="'twoPic_1_'+index" @click="openDialog(obj)">
          <img :src="obj.imgSrc" class="fullImg" v-if="obj.imgSrc">
        </div>
        
      </div>
      <div class="textDesc">
        <el-button type="danger" plain @click="deleteButton()">删除</el-button>
        图片大小： 370*530
        <p v-for="(obj,index) in twoPic" :key="'twoPic_TXT_'+index">
          图片{{index}}: 跳转方式 {{obj.type == 1?"产品":"渠道"}}  {{obj.type == 1?"产品id":"渠道路径"}} {{obj.location}}
        </p>
      </div>
    </div>

    <!--一张图片-->
    <div class="templateBOX" v-if="showAll || type ==  templateType.onePic">
      <div class="oneImg" v-for="(obj,index) in onePic" :key="'onePic_1_'+index" @click="openDialog(obj)">
        <img :src="obj.imgSrc" class="autoImg" v-if="obj.imgSrc">
      </div>
      <div class="textDesc">
        <el-button type="danger" plain @click="deleteButton()">删除</el-button>
        图片大小： 750* 200，高度>=200
        <p v-for="(obj,index) in onePic" :key="'onePic_TXT_'+index">
          图片{{index}}：跳转方式 {{obj.type == 1?"产品":"渠道"}}  {{obj.type == 1?"产品id":"渠道路径"}} {{obj.location}}
        </p>
      </div>
    </div>

    <div class="templateBOX" v-if="showAll || type ==  templateType.product">
      <div>
        <ul class="productCont">
          <li v-for="(obj,index) in product" :key="index" @click="openDialog(obj)">
            <img :src="obj.imgSrc" alt="">
            <p class="name">{{obj.name||"名称"}}</p>
            <p class="desc">{{obj.productDesc||'描述'}}</p>
            <span class="price">{{obj.price||"0000"}}元</span><span class="price-old">{{obj.marketPrice||"0000"}}元</span>
          </li>
        </ul>
      </div>
      <div class="textDesc">
          产品格子图：
          <el-button type="danger" plain @click="deleteButton()">删除</el-button>
         
      </div>


    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
          <p>图片路径：</p>
          <el-input v-model="dialogPic.imgSrc" placeholder="请输入内容"></el-input>
          <p>跳转类型：</p>
          <div>
            <el-radio v-model="dialogPic.type" label="1">产品</el-radio>
            <el-radio v-model="dialogPic.type" label="2">频道</el-radio>
          </div>
          <p>跳转链接/产品编号：</p>
          <el-input v-model="dialogPic.location" placeholder="请输入内容"></el-input>
          <template v-if="type ==  templateType.product">
            <p>产品名称：</p>
            <el-input v-model="dialogPic.name" placeholder="请输入内容"></el-input>
            <p>产品描述：</p>
            <el-input v-model="dialogPic.productDesc" placeholder="请输入内容"></el-input>
            <p>产品价格：</p>
            <el-input v-model="dialogPic.price" placeholder="请输入内容"></el-input>
            <p>产品原价：</p>
            <el-input v-model="dialogPic.marketPrice" placeholder="请输入内容"></el-input>
          </template>
          
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClose()">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>
<script>
  import "scss/channel/template.scss"
  import Swiper from "swiper";
  import "swiper/dist/css/swiper.min.css";
  import {channel} from "constants/channel";


  export default {
    data(){
      return {
        templateType: channel.templateType,
        dialogVisible:false,
        dialogPic:{
          obj:{},
          imgSrc: "", // 图片链接
          type:"1", // 1 产品 2 频道
          location: "" // 跳转链接
        },
        swiper: [
     
        ],
        threePic: [
         
        ],
        twoPic: [
         
        ],
        onePic: [
          
        ],
        product: [
        ]
      }
    },

    /**
     * type 指 模板的类型，指定之后，模板只显示此类型的组件
     * tempdata 指 模板的data
     * **/
    props: [
      'type','tempdata','index'
    ],
    computed: {
      showAll(){
        if (!this.type) {

          for(let cobj of channel.templateDesc){
            console.log("---",cobj)

            this[cobj.label] = cobj.default
          }

          return true
        } else {
          return false
        }
      }
    },
    methods:{
      deleteButton(){
        this.$emit("delete",this.index)
      },
      handleClose(){
        this.dialogVisible = false
        // this.dialogPic.obj.imgSrc = this.dialogPic.imgSrc
        // this.dialogPic.obj.type = this.dialogPic.type
        // this.dialogPic.obj.location = this.dialogPic.location
      },
      openDialog(obj){

        // this.dialogPic.imgSrc = obj.imgSrc
        // this.dialogPic.type =obj.type
        // this.dialogPic.location = obj.location
        this.dialogPic = obj

        // this.dialogPic.obj = obj

        this.dialogVisible = true

      }
    },
    mounted(){
      if(this.type){
        this[this.type] = this.tempdata
      }
      if (this.showAll || this.type == this.templateType.swiper) {
          var mySwiper = new Swiper('.swiper-container', {
  //          autoplay: true,
  //          loop: true,
            pagination: {
              el: '.swiper-pagination',
            },
          })
      }

    }
  }
</script>
<style lang="less">
.el-dialog{
  z-index: 2005;
}
.v-modal{
  z-index: 10!important;
}
</style>

