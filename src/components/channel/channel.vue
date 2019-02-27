<!--
/**
* @Author: user
* @Date:2019/2/1
* @Last Modified time: 2019/2/1
* @Description: 描述
* @Query: 页面参数
* @Props: 组件参数
* @Remark:
    - 备注一
*/
-->
<template>
  <div>
    <div class="box">
      <div class="cont">
          <template-box v-for="(obj,index) in clist" :type="obj.type" :tempdata="obj.data" :index="index" @delete="deleteT"></template-box>
          <div class="addTemplate">
            <el-select v-model="tempDescIndex" placeholder="请选择">
              <el-option v-for="(item,index) in templateDesc" :key="index" :label="item.value" :value="index">
              </el-option>
            </el-select>
            <el-button type="info" @click="addTemplate">添加模板</el-button>
          </div>
          <div>
            <el-button type="success"  style="width:425px" @click="saveTemplate()">保存模板</el-button>
            <el-button type="success"  style="width:425px" @click="closeTemplate()">关闭</el-button>
          </div>
      </div>
    </div>
  </div>



</template>
<script>
  import templateBox from 'components/channel/template'
  import {channel} from "constants/channel";
  export default {
    props:[
        'clist'
    ],
    data() {
      return {
        // list: [
        //   {
        //     type: 'swiper',
        //     data: [
        //       {
        //         imgSrc: "https://bangjism-test.oss-cn-beijing.aliyuncs.com/1548667059601_.png",
        //         location: "1111"
        //       },
        //       {
        //         imgSrc: "https://bangjism-test.oss-cn-beijing.aliyuncs.com/1548667059601_.png",
        //         location: "1111"
        //       },
        //       {
        //         imgSrc: "https://bangjism-test.oss-cn-beijing.aliyuncs.com/1548667059601_.png",
        //         location: "1111"
        //       }
        //     ]
        //   }
        // ],
        templateDesc:channel.templateDesc,
        tempDescIndex:'',
      };
    },
    methods:{
      deleteT(index){
        this.clist.splice(index,1)
      },
      addTemplate(){
          let temp = this.templateDesc[this.tempDescIndex]
          this.clist.push({
              type: temp.label,
              data:temp.default
          })
      },
      closeTemplate(){
        this.$emit("close")
      },
      saveTemplate(){
        let flag = true
        if(this.clist.length == 0){
            this.$alert("请添加模板")
        }
        this.clist.map((obj)=>{
          if(obj.data.some((objdd)=>{return objdd.imgSrc == ''})){
            this.$alert("模板图片不能为空")
            flag = false
            return
          }
        })
        if(flag){
            this.$emit("save")
        }


      }

    },
    components: {
      'template-box': templateBox
    },
  }
</script>
<style>
  .box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(4, 4, 4, 0.5);
    z-index: 100;
    overflow-y: scroll;
  }
  .cont{
    width: 1100px;
    margin: 50px auto;
    padding: 35px 35px;
    min-height: 500px;
    background-color: #fff;
  }
  .addTemplate{
    margin:10px 0px;
    width: 375px;
    padding: 32px 24px;
    border: 1px dotted #dcdfe6;
    border-radius: 14px;
  }
</style>
