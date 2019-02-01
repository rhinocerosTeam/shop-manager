<!--
  作者：宋佩兰
  创建时间 ：2018-7-11
  描述：商品基本信息组件
-->
<template>
    <div class="baseInfoContainer">
        <el-form ref="baseInfoform" :model="product" :rules="rules" label-width="130px">
            <el-form-item label="商品标题" prop="name">
                <el-input v-model="product.name" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="商品展示" prop="swiper">

                <template v-if="disabled">
                    <picture-card v-for="file,index in product.swiper" class="upload-list" :key="index" width="150px" :src="file.imgUrl" border="1px dashed #c0ccda">
                        <el-tag class='mainTag' v-if='index==0' size='mini' slot='mainTag'>主图</el-tag>
                    </picture-card>
                </template>
                <template v-else>
                    <draggable :list="product.swiper" :move="getdata" @update="datadragEnd" :options="{animation: 300,handle:disabled?'':'.upload-list'}">
                        <transition-group name="list-complete">
                            <div v-for="file,index in product.swiper" class="upload-list" :key="index">
                                <el-tag class='mainTag' v-if='index==0' size='mini'>主图</el-tag>
                                <picture-card width="150px" :src="file.imgUrl" border="1px dashed #c0ccda"></picture-card>
                                <div class="delete" v-if="!disabled">
                                    <i class="el-icon-circle-close-outline" @click.stop="deletePictrue(index)"></i>
                                </div>
                            </div>
                        </transition-group>
                    </draggable>

                    <upload-oss v-if="product.swiper.length <5" @success="handleSuccess"></upload-oss>
                </template>
                <p class="tips">注：建议尺寸750X750，大小不超过2M，请上传1至5张展示图片。 图片可拖动排序。 </p>
            </el-form-item>
            <el-form-item label="商品白底图" prop="coverImg">
                <div class="productPictureCont">
                    <uploadOss @success="coverImgUrl_handleSuccess" v-if="!disabled"></uploadOss>
                    <picture-card class="showPictrue" :src="product.coverImg" v-if="product.coverImg"></picture-card>
                </div>
                <p class="tips">注：建议尺寸750X750，大小不超过2M。 </p>
            </el-form-item>
            <!--<el-form-item label="单人单日限购数量">-->
                <!--<el-input-number v-model="product.peopleLimitNum" @change="numberChangehandle" :min="0" :max="999999999" :disabled="disabled" prop="peopleLimitNum" :precision="0" label="描述文字"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="单人限购数量">-->
                <!--<el-input-number v-model="product.dayLimitNum" @change="numberChangehandle" :min="0" :max="999999999" :disabled="disabled" prop="dayLimitNum" :precision="0" label="描述文字"></el-input-number>-->
            <!--</el-form-item>-->
        </el-form>

    </div>


</template>
<script>
    import { Form, formItem, upload, dialog } from "element-ui"
    import draggable from 'vuedraggable'
    import pictureCard from 'components/common/pictureCard'
    import uploadOss from 'components/common/upload'
    import Vue from "vue";
    import api from 'api'
    import { waresPattern } from 'constants/wares'

    Vue.use(Form)
    Vue.use(formItem)
    Vue.use(upload)
    Vue.use(dialog)


    export default {
        name: 'baseInfo',
        components: {
            draggable,
            pictureCard,
            uploadOss
        },
        props: ['pattern', 'product'],
        data() {
            return {
                disabled: this.pattern == waresPattern.show || this.pattern == waresPattern.upWares,
                rules: {
                    name: [
                        { required: true, message: '请输入商品标题', trigger: 'blur' },
                        { min: 1, max: 500, message: '大于等于1的整数值 （不填默认为5）', trigger: 'blur' }
                    ],
                    pics: [
                        { type: 'array', required: true, message: '请上传商品展示', trigger: 'change' },
                    ],
                    coverImgUrl: [
                        { required: false, message: '请输入商品封面图', trigger: 'change' },
                    ],
                    peopleLimitNum: [
                        { type: 'number', min: 1, max: 500, message: '大于等于1的整数值 （不填默认为5）', trigger: 'blur' }
                    ],
                    dayLimitNum: [
                        { type: 'number', min: 1, max: 500, message: '大于等于1的整数值 （不填默认为5）', trigger: 'blur' }
                    ],

                },
            }
        },
        created() {

        },
        methods: {

            /*数量改变事件*/
            numberChangehandle() {

            },
            handleSuccess(imgObj) {

                var img_url = imgObj.imgUrl;
                var img = new Image();
                img.src = img_url;
                img.onload = () => {
                    imgObj.imgWidth = img.width
                    imgObj.imgHeight = img.height

                    imgObj.imgSort = this.product.swiper.length

                    this.product.swiper.push({ ...imgObj })
                    this.$refs['baseInfoform'].clearValidate(['swiper'])
                };

            },
            coverImgUrl_handleSuccess(imgObj) {
                this.product.coverImg = imgObj.imgUrl
                this.$refs['baseInfoform'].clearValidate(['coverImg'])
            },
            deletePictrue(index) {
                this.product.pics.splice(index, 1)
                this.changePicsSort()
            },
            getdata(evt) {
                /*console.log('getdata:', evt.draggedContext)*/
            },
            datadragEnd(evt) {
                this.changePicsSort()
            },
            /*改变图片的排序*/
            changePicsSort() {
                this.product.swiper.map((obj, index) => {
                    obj.imgSort = index
                })
                console.log('this.product.swiper', this.product.swiper)
            },
            validate() {
                let flag = false
                console.log('baseInfoform start!!')
                this.$refs['baseInfoform'].validate((valid) => {
                    if (valid) {
                        console.log('baseInfoform success submit!!');
                        flag = true
                    } else {
                        console.log('baseInfoform error submit!!');
                        flag = false;
                    }
                });
                console.log('baseInfoform end!!')
                return flag

            }

        },
        watch: {
            uploadConfig: (val) => {
                console.log('1222-->', val)
            }
        }

    }
</script>

<style scoped lang="scss">
    .baseInfoContainer {
        max-width: 1000px;
        margin: 15px auto 0;
    }

    .upload-list {

        float: left;

        margin: 0 15px 15px 0;
        display: inline-block;
        position: relative;

        .mainTag {
            position: absolute;
            left: 5px;
            top: 5px;
            z-index: 2;
        }

    }

    .upload-list .photo {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        width: 148px;
        height: 148px;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .upload-list .photo img {
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
    }

    .upload-list .delete {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        /*background-color: rgba(250,250,250,0.2);*/
    }



    .upload-list .delete i {
        position: absolute;
        font-size: 20px;
        width: 20px;
        height: 20px;
        top: -10px;
        right: -10px;
        color: #716f6f;
        cursor: pointer;
    }

    .productPictureCont {
        position: relative;
        height: 150px;
    }

    .showPictrue {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    .tips {
        clear: both;
        color: #969696;
    }
</style>
