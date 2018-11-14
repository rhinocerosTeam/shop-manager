<template>
    <span :class="mClass" @click.stop.prevent="click"><slot>HfButton</slot></span>
</template>
<script>
    import $ from "jquery";
    import api from 'api';
    export default {
        props: {
            mClass: {
                type: String,
                default: 'hf_btn'
            }
            
        },
        methods: {
            click () {
                this.$emit('click');
            }
        }
    }

</script>
<style>
    .hf_btn {
        width: 100px;
        height: 30px;
        background: rgba(252, 204, 39, 1);
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        float: right;
        cursor: pointer;
    }

    /*主播设置 保存 和 取消 按钮*/
    .saveButton{
        margin-left: 200px;
        background: #fccc27;
        cursor: pointer;
        width: 120px;
        height: 34px;
        float: left;
        line-height: 34px;
        text-align: center;
        color: #fff;
    }
    .resetButton{
        margin-left: 40px;
        background: #adadad;
        cursor: pointer;
        width: 120px;
        height: 34px;
        float: left;
        line-height: 34px;
        text-align: center;
        color: #fff;
    }

</style>