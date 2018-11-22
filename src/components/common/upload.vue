<template>

  <el-upload
    action=""
    :show-file-list="showFileList"
    list-type="picture-card"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :http-request="request"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>
<script>

  import {upload, dialog} from "element-ui"
  import {IMG_HOST} from 'api/config'
  //import UploadOSSUtil from 'utils/uploadOSS'
  import UploadCOSUtil from 'utils/uploadCos'
  export default {
    data(){
      return {
        file: {},
        imgObj: {
          imgUrl: '',
          imgWidth: '',
          imgHeight: '',
          imgSort: 0
        },
        showFileList: false,
        upload: new UploadCOSUtil()
      }
    },
    props: ['index'],

    methods: {
      handleSuccess(){

        this.$emit('success', this.imgObj, this.index)

      },
      async request(){
        let imgSrc = await this.upload.upload(this.file).catch(() => {
          this.$message('网络错误，请稍后再试')
          return
        })

        this.imgObj.imgUrl = imgSrc

      },
      async beforeUpload(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('图片大小不超过2M，请重新上传!');
          return false
        }


        this.file = file
      }
    }
  }
</script>
