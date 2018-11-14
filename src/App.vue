<template>
  <div id="app">
    <div v-if='$route.meta.noSide'>
      <router-view></router-view>
    </div>
    <el-container v-else>
      <el-header>
        <headers></headers>
      </el-header>
      <el-container>
        <el-aside width="240px">
          <aside-nav></aside-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import "scss/main.scss";
import { mapGetters } from "vuex";
import headers from "components/common/header";
import asideNav from "components/common/asideNav";

export default {
    name: "App",

    computed: {},
    data() {
        return {};
    },
    components: {
        headers,
        asideNav
    },
    created() {},
    mounted() {},
    watch: {}
};
</script>
<style scoped lang="scss">
$bgColorBase: rgb(110, 71, 240);
.el-header {
    padding: 0 !important;
}
.el-main {
    height: 100%;
}
</style>

