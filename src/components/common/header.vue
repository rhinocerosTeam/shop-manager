/* * @Author: 徐长剑 * @Date: 2018-07-27 14:57:16 * @LastEditors: 徐长剑 * @LastEditTime: 2018-07-27 15:13:28 * @Description: 头部组件
*/
<template>
  <header>
    <!-- 店铺相关 展示区域 -->
    <div class="logo-box" v-if='stores'>
      <router-link :to="{name:'home'}">
        <img :src="stores.coverImgUrl" alt="">
        <span class="shop-name">{{stores.name}}</span>
      </router-link>
      <router-link :to="{path:'/mailList'}" v-if='storeLen>0'>
        <span class='changeMall'>
          <i class='el-icon-refresh'></i> 切换商铺</span>
      </router-link>
    </div>
    <!-- 用户相关 展示区域 -->
    <div class="user-box">
      <el-popover placement="bottom" width="200" trigger="click" v-model="showPopFlag">
        <div class="user-head-box">
          <ul>
            <li>
              <img :src="userInfo&&userInfo.headImg">
            </li>
            <li>
              <span v-text='userInfo&&userInfo.nickName'></span>
            </li>
            <li>
              <p class="tel" v-text='userInfo&&userInfo.mobile'></p>
            </li>
            <li>
              <el-button @click='gotopage'>
                修改密码
              </el-button>
              <el-button @click='loginOut'>退&nbsp;&nbsp;&nbsp;&nbsp;出</el-button>
            </li>
          </ul>
        </div>
        <div class="user-name-btn" slot="reference" v-if='userInfo'>
          {{userInfo.nickName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </el-popover>
    </div>
  </header>
</template>
<script>
  import {
    mapActions,
    mapGetters
  } from "vuex";

  export default {
    data() {
      return {
        showPopFlag: false //控制用户信息弹出框显示隐藏
      };
    },
    computed: {
      ...mapGetters({
        userInfo: "getUserInfo",
        stores: "getStores",
        storeLen: "getStoreLen"
      })
    },
    props: [],
    components: {},
    methods: {
      ...mapActions({
        delUser: "loginOut"
      }),
      /**
       * 登出事件
       * */
      loginOut() {
        this.delUser();
        this.$router.push("/login");
      },
      /**
       * 去修改页面
       * */
      gotopage() {
        this.showPopFlag = false; //点击进入修改密码页面 弹出层不消失
        this.$router.push("/userManage/modifyPassWord");
      }
    },
    created() {},
    mounted() {},
    destroyed() {},
    watch: {}
  };
</script>
<style scoped lang="scss">
  $heightBase: 60px;
  $bgColorBase: #fff;
  .el-header {
    padding: 0 !important;
  }

  header {
    width: 100%;
    height: $heightBase;
    line-height: $heightBase;
    padding: 0 50px;
    background-color: $bgColorBase; // logo style
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    .logo-box {
      float: left;
      img {
        width: 40px;
        height: 40px;
        float: left;
        margin-top: 10px;
        margin-left: -20px;
        margin-right: 10px;
        border-radius: 100%;
      }
      .shop-name {
        font-size: 16px;
        color: #323232;
      }
    } // user style
    .changeMall {
      margin-left: 15px;
      color: #ff2553; // color: #e6a23c;
      font-size: 14px;
    }
    .user-box {
      float: right;
      .user-name-btn {
        color: #323232;
        cursor: pointer;
        font-size: 15px;
      }
    }
  }

  .user-head-box {
    text-align: center;
    >ul {
      >li {
        margin-bottom: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
          border: 1px solid $bgColorBase;
        }
      }
    }
  }
</style>