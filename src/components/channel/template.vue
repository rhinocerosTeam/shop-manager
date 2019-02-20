<template>
  <div class="templateCont">
    <!--轮播图-->

    <div class="swiper-box templateBOX" v-if="showAll || type ==  templateType.swiper">
      <div class="swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" @click="openDialog(swiper[0])">
              <img :src="swiper[0].imgSrc" class="fullImg" v-if="swiper[0].imgSrc">
            </div>
            <div class="swiper-slide" @click="openDialog(swiper[1])">
              <img :src="swiper[1].imgSrc" class="fullImg" v-if="swiper[1].imgSrc">
            </div>
            <div class="swiper-slide" @click="openDialog(swiper[2])">
              <img :src="swiper[2].imgSrc" class="fullImg" v-if="swiper[2].imgSrc">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <div class="textDesc">
        <el-button type="danger" plain @click="deleteButton()">删除</el-button>
        图片大小：750*370
      </div>
    </div>

    <!--三张图片-->
    <div class="templateBOX" v-if="showAll || type ==  templateType.threePic">
      <div class="threeImg templateBOX">
        <div class="one" @click="openDialog(threePic[0])">
          <img :src="threePic[0].imgSrc" class="fullImg" v-if="threePic[0].imgSrc">
        </div>
        <div class="two" @click="openDialog(threePic[1])">
          <img :src="threePic[1].imgSrc" class="fullImg" v-if="threePic[1].imgSrc">
        </div>
        <div class="three" @click="openDialog(threePic[2])">
          <img :src="threePic[2].imgSrc" class="fullImg" v-if="threePic[2].imgSrc">
        </div>
      </div>
      <div class="textDesc">
        <el-button type="danger" plain @click="deleteButton()">删除</el-button>
        图片大小：左：370*530 右 ：373*260
      </div>
    </div>

    <!--两张图片-->
    <div class="templateBOX" v-if="showAll || type ==  templateType.twoPic">
      <div class="twoImg">
        <div class="one" @click="openDialog(twoPic[0])">
          <img :src="twoPic[0].imgSrc" class="fullImg" v-if="twoPic[0].imgSrc">
        </div>
        <div class="two" @click="openDialog(twoPic[1])">
          <img :src="twoPic[1].imgSrc" class="fullImg" v-if="twoPic[1].imgSrc">
        </div>
      </div>
      <div class="textDesc">
        <el-button type="danger" plain @click="deleteButton()">删除</el-button>
        图片大小： 370*530
      </div>
    </div>

    <!--一张图片-->
    <div class="templateBOX" v-if="showAll || type ==  templateType.onePic">
      <div class="oneImg" @click="openDialog(onePic[0])">
        <img :src="onePic[0].imgSrc" class="autoImg" v-if="onePic[0].imgSrc">
      </div>
      <div class="textDesc">
        <el-button type="danger" plain @click="deleteButton()">删除</el-button>
        图片大小： 750* 200，高度>=200
      </div>
    </div>

    <div class="templateBOX" v-if="showAll || type ==  templateType.product">
      <div>
        <ul class="productCont">
          <li>
            <img src="" alt="">
            <p class="name">小米8 清楚本</p>
            <p class="desc">小米8 清楚本</p>
            <span class="price">1339元</span><span class="price-old">339元</span>
          </li>
          <li>
            <img src="" alt="">
            <p class="name">小米8 清楚本</p>
            <p class="desc">小米8 清楚本</p>
            <span class="price">1339元</span><span class="price-old">339元</span>
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
        <p>跳转链接：</p>
        <el-input v-model="dialogPic.location" placeholder="请输入内容"></el-input>
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
          location: "" // 跳转链接
        },
        swiper: [
          {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          },
          {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          },
          {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          }
        ],
        threePic: [
          {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          },
          {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          },
          {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          }
        ],
        twoPic: [
          {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          }, {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          }
        ],
        onePic: [
          {
            imgSrc: "", // 图片链接
            location: "" // 跳转链接
          }
        ],
        product: {}
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
        this.dialogPic.obj.imgSrc = this.dialogPic.imgSrc
        this.dialogPic.obj.location = this.dialogPic.location
      },
      openDialog(obj){

        this.dialogPic.imgSrc = obj.imgSrc
        this.dialogPic.location = obj.location
        this.dialogPic.obj = obj

        this.dialogVisible = true

      }
    },
    mounted(){
      if(this.type){
          if(this.tempdata.length == 0){
            this.tempdata = this[this.type]
          }else{
            this[this.type] = this.tempdata
          }

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

