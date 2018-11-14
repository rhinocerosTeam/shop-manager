/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 16:11:46
 * @Description: 通知列表组件
 * @params: datas {Array} 列表数据
 * @params: checkBox {Blooen} 是否显示复选框
 * @params: notice-list {Function} 选择标记未读消息回调函数
 */
<template>
    <div class="notice-box" v-loading='loadingFlag'>
        <div class="npData" v-show="!datas.length">
            暂无通知
        </div>
        <dl v-show="datas.length">
            <dt v-if="checkBox">
                <el-checkbox @change='chooseList_changeHandler' v-model="allChecked"></el-checkbox>
                <span @click="choseRead_clickHandler">
                    <el-button size='small'>标记为已读</el-button>
                </span>
            </dt>
            <template v-for="(item,index) in datas">
                <dd :key="index">
                    <el-checkbox v-model="item.checked" v-if="checkBox"></el-checkbox>
                    <div class="list-cont" @click="enter_clickHandler(item.noticeId)">
                        <span class="notice-title">
                            <i v-show="item.status == '0'">新</i>{{item.title}}</span>
                        <span class="notice-time">{{formDate(item.createTime)}}</span>
                    </div>
                </dd>
            </template>
        </dl>
    </div>
</template>
<script>
import moment from "moment";
import api from "api";

export default {
    data() {
        return {
            checkList: "", //选择列表
            allChecked: false, //是否全部选择状态
            loadingFlag: true   //页面loding状态
        };
    },
    props: ["datas", "checkBox"],
    components: {},
    methods: {
        // formdate time
        formDate(time) {
            return moment(time).format("YYYY-MM-DD HH:mm");
        },
        // 标记已读 点击事件
        choseRead_clickHandler() {
            let _datas = [];
            this.datas.map(k => {
                if (k.checked) {
                    _datas.push(k.noticeId);
                }
            });
            if (_datas.length) {
                //标记选择未读消息
                api.editNotice({ noticeIds: _datas }).then(res => {
                    let data = api.parse(res);
                    if (res.code == 1000) {
                        this.$message({
                            message: "标记成功",
                            type: "success"
                        });
                        this.$emit("notice-list");
                        this.allChecked=false;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                });
            } else {
                this.$message({
                    message: "请选择未读信息",
                    type: "warning"
                });
            }
        },
        //通知列表 全选change事件
        chooseList_changeHandler(val) {
            let _flag = true;
            for (let k = 0; k < this.datas.length; k++) {
                if (!this.datas[k].checked) {
                    //有没选中的
                    _flag = false;
                    break;
                }
            }
            this.allChecked = !_flag;
            this.datas.map(k => {
                k.checked = !_flag;
            });
        },
        //进入通知详情
        enter_clickHandler(id) {
            this.$router.push({ name: "noticeDetails", query: { id } });
        }
    },
    created() {
        
    },
    mounted() {},
    destroyed() {},
    watch: {
        datas(val) {
            if(this.loadingFlag) this.loadingFlag = false;
        }
    }
};
</script>
<style scoped lang="scss">
.notice-box {
    min-width: 500px;
    > .npData {
        border: 1px solid #eee;
        min-height: 400px;
        text-align: center;
        font-size: 30px;
        line-height: 400px;
        color: #666;
    }
    dl {
        border: 1px solid #eee;
        dd,
        dt {
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #eee;
            padding: 0 20px;
            box-sizing: border-box;
            cursor: pointer;
            .list-cont {
                > span {
                    display: block;
                    &.notice-title {
                        float: left;
                        i {
                            display: block;
                            float: left;
                            width: 15px;
                            height: 15px;
                            line-height: 15px;
                            margin: 10px 10px 0 0;
                            text-align: center;
                            border: 1px solid #eee;
                            color: red;
                        }
                    }
                    &.notice-time {
                        float: right;
                    }
                }
            }
            .el-checkbox {
                float: left;
                margin-right: 10px;
            }
        }
    }
}
</style>

