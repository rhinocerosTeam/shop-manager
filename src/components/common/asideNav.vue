/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 18:23:23
 * @Description: 侧边导航公共组件
 */
<template>
  <div id="aside">
    <el-menu :style='{minHeight:minHeight}' :default-openeds='subMenuActive' :unique-opened='true' :default-active="childMenuActive" class="el-menu-vertical-demo">
      <!-- 首页 -->
      <router-link :to='{name : "home"}'>
        <el-menu-item index="home">首页</el-menu-item>
      </router-link>
      <!-- 频道管理 -->
      <el-submenu index="channelManage">
        <template slot="title">
          <span>频道管理</span>
        </template>
        <el-menu-item-group>
          <router-link :to='{name : "templateManage"}'>
            <el-menu-item index="templateManage">模板管理</el-menu-item>
          </router-link>
          <router-link :to='{name : "channelManage"}'>
            <el-menu-item index="channelManage">频道管理</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <!-- 商品管理 -->
      <el-submenu index="waresManage">
        <template slot="title">
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <!--<router-link :to='{name : "applyList"}'>-->
            <!--<el-menu-item index="applyList">申请列表</el-menu-item>-->
          <!--</router-link>-->
          <router-link :to='{name : "waresList"}'>
            <el-menu-item index="waresList">商品列表</el-menu-item>
          </router-link>
          <router-link :to='{name : "publishWares"}'>
            <el-menu-item index="publishWares">发布商品</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- 订单管理 -->
      <el-submenu index="orderManage">
        <template slot="title">
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <router-link :to='{name : "allOrderList"}'>
            <el-menu-item index="allOrderList">全部</el-menu-item>
          </router-link>
          <router-link :to='{name : "waitingPayList"}'>
            <el-menu-item index="waitingPayList">等待付款</el-menu-item>
          </router-link>
          <router-link :to='{name : "waitingDeliveryList"}'>
            <el-menu-item index="waitingDeliveryList">等待发货</el-menu-item>
          </router-link>
          <router-link :to='{name : "alreadyShippedList"}'>
            <el-menu-item index="alreadyShippedList">已发货</el-menu-item>
          </router-link>
          <router-link :to='{name : "overPayList"}'>
            <el-menu-item index="overPayList">已完成</el-menu-item>
          </router-link>
          <router-link :to='{name : "cancelPayList"}'>
            <el-menu-item index="cancelPayList">交易取消</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- 通知 -->
      <router-link :to='{name : "noticeList"}'>
        <el-menu-item index="noticeList">通知</el-menu-item>
      </router-link>
      <!-- 账号管理 -->
      <el-submenu index="userManage">
        <template slot="title">
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <router-link :to='{name : "modifyPassWord"}'>
            <el-menu-item index="modifyPassWord">修改密码</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
    data() {
        return {
            minHeight: document.documentElement.clientHeight - 60 + "px",
            subMenuActive: [], //一级菜单选中的菜单
            childMenuActive: "" //二级菜单选中的菜单
        };
    },
    props: [],
    components: {},
    methods: {},
    mounted() {},
    destroyed() {},
    watch: {
        /**
         * 根据路由变化 记录导航选中状态
         * */
        $route(to, from) {
            let { path } = to;
            this.subMenuActive = [path.split("/")[1]];
            this.childMenuActive = path.split("/")[2] || "home";
        }
    }
};
</script>
<style scoped lang="scss">
$heightBase: 60px;
$bgColorBase: rgb(110, 71, 240);
</style>

