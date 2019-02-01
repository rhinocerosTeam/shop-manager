<template>
  <div>
    模板管理
    <template-box>

    </template-box>
  </div>
</template>
<script>
  import templateBox from "components/channel/template"
  export default {
    data() {
      return {
        key:"111"
      };
    },
    components:{
      'template-box':templateBox
    }
  }
</script>
