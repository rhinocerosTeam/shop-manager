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
      <template-box v-for="obj in list" :type="obj.type" :tempdata="obj.data"></template-box>
      <div class="addTemplate">
        <el-select v-model="tempDescIndex" placeholder="请选择">
          <el-option
            v-for="item,index in templateDesc"
            :key="index"
            :label="item.value"
            :value="index">
          </el-option>
        </el-select>
        <el-button type="info" @click="addTemplate">添加模板</el-button>
      </div>
      <div>
        <el-button type="success"  style="width:425px" @click="saveTemplate">保存模板</el-button>
      </div>
    </div>

  </div>



</template>
<script>
  import templateBox from 'components/channel/template'
  import {channel} from "constants/channel";
  export default {
    data() {
      return {
        list: [
          {
            type: 'swiper',
            data: [
              {
                imgSrc: "https://bangjism-test.oss-cn-beijing.aliyuncs.com/1548667059601_.png",
                location: "1111"
              },
              {
                imgSrc: "https://bangjism-test.oss-cn-beijing.aliyuncs.com/1548667059601_.png",
                location: "1111"
              },
              {
                imgSrc: "https://bangjism-test.oss-cn-beijing.aliyuncs.com/1548667059601_.png",
                location: "1111"
              }
            ]
          }
        ],
        templateDesc:channel.templateDesc,
        tempDescIndex:'',
      };
    },
    methods:{
      addTemplate(){
          let temp = this.templateDesc[this.tempDescIndex]
          this.list.push({
              type: temp.label,
              data:temp.default
          })
      },
      saveTemplate(){
          if(this.list.length == 0){
              this.$alert("请添加模板")
          }

      }

    },
    components: {
      'template-box': templateBox
    },
  }
</script>
<style>
  .addTemplate{
    margin:10px 0px;
    width: 375px;
    padding: 32px 24px;
    border: 1px dotted #dcdfe6;
    border-radius: 14px;
  }
</style>
