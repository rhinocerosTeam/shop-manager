<template>
  <div>
    <p>
      频道管理
    </p>

    <el-table  :data="channelData" style="width: 100%">
      <el-table-column prop="name" label="名称"  >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        >
      </el-table-column>
      <el-table-column
        prop="isHome"
        label="是否为主页"
       >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button @click="openTemplateDialog(scope.row)" type="text" size="small">查看模板</el-button>
          <el-button @click="goEdit_handler(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  <!--翻页-->
    <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount" style="margin: 30px auto">
    </el-pagination>

    <div v-if="showTemplateDialog" >
      <channel-box :clist="templateData" @close="closeTemplateDialog" @save="saveTemplateDialog"></channel-box>
    </div>

  </div>
</template>
<script>
  import channelBox from "components/channel/channel";
  import api from 'api';
  export default {
    data() {
      return {
        showTemplateDialog:false,
        templateData:{},
        currentPage: 1, //当前页数
        totalCount: 0, //总页数
        pageSize: 10, //每页多少条
        channelData:[
          {
              id:1,
              name:"aaa", // 名称
              path:"/channel/11111", // 路径
              isHome:"true",
              templates:"<>"
          }
        ],

      };
    },
    watch: {
        currentPage: {
            handler() {
                this.getChannelList();
            },
            deep: true
        }
    },
    methods:{
      /** 
       * 去编辑页面
       * */ 
        goEdit_handler(row){
          this.$router.push({
              name: "addChannel",
              query: {
                  id:row.id
              }
          });
        },
        /**
         * 打开模板的对话框
         *  */
        openTemplateDialog(row){
            if(!row.templates){
              row.templates = []
            }
            this.templateData = row.templates
            this.showTemplateDialog = true
        },
        closeTemplateDialog(){
            this.showTemplateDialog = false
        },
        saveTemplateDialog(){
          this.showTemplateDialog = false
        },
        api_getChannel(){
            api.getChannelList({
              pageSize:this.pageSize,
              pageNo:this.currentPage,
            }).then(res=>{
                let data = api.parse(res);
                if (res.code == 1000) {
                    this.channelData = data.list
                    this.totalCount = data.total;
                }
            })
        },
    },
    mounted(){
      this.api_getChannel()
    },
    components: {
      'channel-box':channelBox
    },
  }
</script>
