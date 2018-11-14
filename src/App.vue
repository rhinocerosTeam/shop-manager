<template>
  <div id="app" >
    <div class="main">
      呵呵 哈哈
      <el-button type="primary">主要按钮</el-button>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>


  import {mapGetters} from 'vuex';

  export default {
    name: 'App',
    components: {
    },
    computed: {
     
    },
    data() {
      return {
      }
    },
    created() {


    },
    mounted () {

    },
    watch: {

    }
  }



</script>
