<template>
  <div :style="{width:width,height:width}" class="___pictureContainer" >
    <div class="___pictureBox" :style="{width:width,height:width,border:border}">
      <slot name='mainTag'></slot>
      <img :src="src" />
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      width:{
        type:String,
        defaults:'150px'
      },
      src:{
        type:String,
        defaults:''
      },
      border:{
        type:String,
        defaults:'1px solid #c0ccda'
      },
    }



  }
</script>
<style lang="scss">
  .___pictureContainer{
    width: 148px;
    height: 148px;
    position: relative;
  }
  .___pictureBox{
    background-color: #fbfdff;
    border-radius: 6px;
    width: 148px;
    height: 148px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    border:1px solid #c0ccda;
    background: url("../../assets/img/common/loading.png") no-repeat;
    background-size:100% 100% ;
  }

  .___pictureBox img{
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
    background-color: #fff;
  }
</style>
