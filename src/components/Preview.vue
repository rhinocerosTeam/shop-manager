<template>
    <div>
      <div class='Preview' v-show='PreviewShowStatus'>
        <div class="phoneBg">
          <div @click='closePreview_clickHandler()'>
            <Icon type="close-circled" class='close-circled' ></Icon>
          </div>
          <div class='PreviewCont' v-html='previewDetail()'></div>
        </div>
        <div class="previewDetail" style='width: 0;height: 0;overflow: hidden'></div>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';

    export default{
        data (){
            return {
              PreviewShowStatus : false
            }
        },
        props: ['PreviewShow'],
        components: {},
        methods: {
          previewDetail(){
            $('.previewDetail').html('')
            $('.previewDetail').append(this.getUEditor);
            $(".previewDetail img").each((index,ele)=>{
              $(ele).css({'width':(ele.width/3.3) +'px','height':(ele.height/3.3)+'px'});
            });
            return  $('.previewDetail').html()
          },
          closePreview_clickHandler(){
            this.PreviewShowStatus = false
          }
        },
        mounted(){
          $(function () {
            $(".PreviewCont img").each((index,ele)=>{
              console.log(ele.width);
              $(ele).css({'width':(ele.width/3.3) +'px','height':(ele.height/3.3)+'px'});
            });
          })
        },
        watch: {
          PreviewShow:{
              handler(val){
                  this.PreviewShowStatus = true
                console.log(1);
              },
            deep:true
          }
        },
      computed: {
        ...mapGetters(['getUEditor']),
      }
    }

</script>
