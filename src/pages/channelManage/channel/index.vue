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
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="tabPosition == 'home'" >
      <channel-box></channel-box>
    </div>





  </div>
</template>
<script>
  import channelBox from "components/channel/channel";
  export default {
    data() {
      return {
        tabPosition:'home1',
        channelData:[
          {
              id:1,
              name:"aaa", // 名称
              path:"/channel/11111", // 路径
              isHome:"true",
              templates:"<>"

          }
        ]
      };
    },
    components: {
      'channel-box':channelBox
    },
  }
</script>
