<template>
  <div>
    <div>
      <div :id="editor" type="text/plain" :style="{width:width || '750px',height:height || '500px'}">
      </div>
      <div class="ivu-form-item-error-tip">{{editTips}}</div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex';
  export default{
    data (){
      return {
        editor: new Date().getTime(),
        editContent: '',
        Ueditor: null
      }
    },
    props: ['editUeCont', 'editTips','width','height'],
    components: {},
    methods: {
      ...mapActions({
        setUEditor: 'setUEditor',
      }),
    },

    mounted(){
      const editor = this.Ueditor = UE.getEditor(this.editor + '');
      editor.ready(() => {
        //设置编辑器的内容
//        let edit = editor.getContent().replace(/px/g, 'rem');
        let edit = editor.getContent();
        this.setUEditor(edit)
        editor.addListener("contentChange", () => {
//          let edit = editor.getContent().replace(/px/g, 'rem');
          let edit = editor.getContent();
          this.setUEditor(edit)
        });
      });
    },
    destroyed() {
        //  this.Ueditor.destroy();
    },
    watch: {}
  }

</script>
