<template>
  <div class="mailList">
    <subTitle>选择进入商家店铺</subTitle>
    <el-row :gutter="10" type='flex' align='middle' justify='center' class="box">
      <template>
        <el-col :span='18' v-if='mailList.length'>
          <!-- <router-link :to='{path:"/home",query:{id:item.id}}'> -->
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class='mailItem' v-for='item in mailList' :key='item.fanClubId'>
            <div class='mailInner' @click='selectMial(item)'>
              <div class='mailImg'>
                <!-- <img :src="item.coverImgUrl" alt=""> -->
                <div class='mailImgBox' :style='{background:"url("+item.coverImgUrl+") center center no-repeat"}' v-if='item.coverImgUrl'></div>
                <i class="el-icon-picture" v-else></i>

              </div>
              <div class='mailName' v-text='item.name'></div>
            </div>


          </el-card>
          <!-- </router-link> -->
        </el-col>
        <el-col :span='18' class='noData' v-else>
          <i class="el-icon-warning" style='marign-right:15px;'></i>暂无店铺！ </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
  import api from "api";
  import subTitle from "components/common/subTitle";
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    data() {
      return {
        mailList: [],
        currentDate: new Date()
      }
    },
    props: [],
    components: {
      subTitle
    },

    computed: { ...mapGetters({
        userInfo: 'getUserInfo',
        storeInfo: 'getStores'
      })
    },
    methods: {
      ...mapActions({
        setStoreInfo: 'setStore',
        delUser: "loginOut",
        setStoreLen: 'setStoreLen'
      }),
      selectMial(item) {
        item.storeId = item.fanClubId
        this.setStoreInfo(item)
        this.$router.push('/home');
      },
      async getMailList() {
        let data = await api.getMailList({}).catch((err) => {
          this.$message.success('请检查网络');
        });
        if (data) {
          if (data.code == 1000) {
            let storeList = data.data.fanClubList.map(val => val.store)
            this.setStoreLen(storeList.length)
            if (storeList.length < 1) {
              this.mailList = []
            } else if (storeList.length == 1) {
              this.setStoreInfo(storeList[0]);
              this.$router.push('/home');
            } else {
              this.mailList = storeList
            }

          } else if (data["code"] == "7100" || data["code"] == "7101" || data["code"] == "7103") {
            this.$message.error('用户信息失效');
            this.delUser()
            this.$router.replace({
              name: "login"
            });
          } else {
            this.$message.error(data['msg']);
          }
        }
      }
    },
    created() {},
    mounted() {
      this.getMailList()
    },
    destroyed() {},
    watch: {}
  };
</script>
<style>
  .mailList .box .el-col {
    width: 900px;
    margin: auto 0;
  }
</style>
<style scoped lang='scss'>
  .mailList {
    padding: 30px;
    .noData {
      text-align: center;
      color: #909399;
      .el-icon-warning {
        margin-right: 6px;
      }
    }
    .mailItem {
      cursor: pointer;
      float: left;
      margin-left: 20px;
      margin-bottom: 20px;
      width: 200px;
      height: 260px;
      .mailImgBox {
        width: 160px;
        height: 160px;
        background-size: cover !important;
      }
      .mailInner {
        width: 100%;
        height: 300px;
      }
      .mailImg {
        padding: 20px;
        width: 160px;
        padding: 20px;
        width: 160px;
        font-size: 150px;
        text-align: center;
        color: #909399;
        img {
          width: 100%;
        }
      }
      .mailName {
        text-align: center;
      }
    }
  }
</style>