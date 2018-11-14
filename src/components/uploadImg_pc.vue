<template>
  <div :style="{paddingLeft:pl+'px'}">
    <Upload
      ref='upload'
      :accept="accept()"
      :action="upload.host"
      :before-upload='uploadBefore'
      :on-success='uploadSuccess'
      :on-error='uploadError'
      :on-remove='photoRemove'
      :format="format()"
      :on-format-error="uploadTypeError"
      :multiple=false
      :show-upload-list=true
      :data='upload.osssignature'>
      <Button type="text" class='upload_file_btn' icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    <div class="newsPhoto_list" v-for='(data,index) in filePhoto'
         :style="{width:imageType == 2?'500px':'',height:imageType == 2?'400px':''}">
      <video :src="data" v-if="imageType == 2" controls @loadedmetadata="videoEnded" ref="video"></video>
      <img :src="data" alt="" v-else>
      <Icon class='closeBtn' type="ios-close-outline" @click.native="photoRemove(index)"></Icon>
    </div>
    <div class="ivu-form-item-error-tip" v-show='ShowErrorFlag'>{{uploadShowError}}</div>
  </div>
</template>

<script>

  import api from 'api';

  export default{
    props: ['parentUpload', 'pl', 'initPhoto', 'imageType', 'uploadShowError'],
    data (){
      return {
        upload: {
          host: '',
          osssignature: {},
        },
        filePhoto: [],
        videoDuration: '',
        expireEndTime: 0,
        uploadSuccessNmae: ''
      }
    },
    components: {},
    methods: {
      /**
       * 初始化 oss
       **/
      doSignature() {
        let _this = this;
        let imageType = this.imageType || 1
        api.doSignature(imageType).done((ress) => {
          let res = ress.data;
          if (res) {
            this.upload.osssignature = {
              'dir': res.dir,
              'policy': res.policy,
              'OSSAccessKeyId': res.accessid,
              'success_action_status': '200', //让服务端返回200,不然，默认会返回204
              'signature': res.signature,
            };

            this.upload.urlDomain = res.urlDomain;
            this.upload.host = res.host;
            this.pathname = res.dir;
            this.expireEndTime = res.expireEndTime;
          }
        });
      },
      /**
       * 上传类型
       **/
      accept(){
          if(this.imageType == 3) return
        return this.imageType == 2 ? 'video' : 'image';
      },
      /**
       * 上传文件类型
       **/
      format(){
        if(this.imageType == 3) return
        return this.imageType == 2 ? ['mp4', 'avi', 'mov'] : ['jpg', 'png'];
      },
      /**
       * 图片上传前
       **/
      uploadBefore(file) {
        if (this.filePhoto.length >= 1) {
          this.imageType == 2 ? this.$Notice.warning({title: '最多只能上传 1 个视频。'}) : this.$Notice.warning({title: '最多只能上传 1 张图片。'});
          return false
        } else {
          let newTime = new Date().getTime();
          if (this.expireEndTime - newTime < 2000) this.doSignature();
          this.uploadSuccessNmae = Math.random() + new Date().getTime();
          this.upload.osssignature.key = this.upload.osssignature.dir + this.uploadSuccessNmae;
        }
      },
      /**
       *  图片上传成功
       **/
      uploadSuccess(response, file, fileList){
          console.log('执行：',this.uploadShowError)
        let fileListArr = []
        fileList.forEach((data, index) => {
          fileListArr.push(this.upload.urlDomain + this.upload.osssignature.dir + this.uploadSuccessNmae)
        })
        this.filePhoto = fileListArr
      },
      /**
       * 上传失败
       **/
      uploadError(response, file, fileList){
        this.$Notice.warning({
          title: '上传失败',
          desc: '文件 ' + file.name + ' 上传失败，请重新上传。'
        });
      },
      /**
       * 格式不正确
       **/
      uploadTypeError (file) {
        if (this.imageType == 2) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 mp4 avi 或 mov 格式的视频。'
          });
        } else {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
          });
        }

      },
      /**
       * 删除图片
       **/
      photoRemove(index){
        this.filePhoto.splice(index, 1)
        this.$refs.upload.clearFiles()
      },
      /**
       * 视频加载后获取视频时长
       **/
      videoEnded(e){
        this.videoDuration = Math.floor(this.$refs.video[0].duration);
      }
    },
    mounted(){
      if (this.initPhoto) {
        this.filePhoto.push(this.initPhoto);
//          console.log(this.filePhoto);
      } else {
        this.filePhoto = []
      }
      this.parentUpload ? this.upload = this.parentUpload : this.doSignature();
    },
    computed: {
      ShowErrorFlag(){
          if(this.filePhoto.length > 0){
              return false
          }else {
              return true
          }
      }
    },
    watch: {
      filePhoto: {
        handler (e) {
          this.$emit('change-filePhoto', this.filePhoto);
        },
        deep: true
      },
      videoDuration: {
        handler (e) {
          this.$emit('change-videoDuration', this.videoDuration);
        },
        deep: true
      },
    },
  }

</script>
<style>
  .newsPhoto_list {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    position: relative;
  }

  .newsPhoto_list img {
    width: 100%;
    height: 100%;
  }

  .newsPhoto_list .closeBtn {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    font-size: 14px;
  }

  .upload_file_btn {
    margin-left: -20px;
  }
</style>
