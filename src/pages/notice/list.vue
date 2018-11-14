/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-30 15:23:02
 * @Description: 通知页面
 */
<template>
    <div id='notice' class='container'>
        <subTitle>通知</subTitle>
        <div class="notice-cont-box">
            <noticeList :datas='dataList' :checkBox='true' @notice-list='noticeList_handler'></noticeList>
        </div>
        <div class="pagination-box" v-show="total!==0">
            <el-pagination background @current-change='pageChange' layout="total,prev, pager, next" :page-size="pageSize" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import subTitle from "components/common/subTitle";
import noticeList from "components/home/noticeList";
import api from "api";

export default {
    data() {
        return {
            dataList: [""], //通知列表数据
            total: 0, //总页数
            pageNo: 0, //当前页数
            pageSize: 10 //每页条数
        };
    },
    components: {
        subTitle,
        noticeList
    },
    methods: {
        /**
         * 获得通知列表接口
         * @param {Number} pageSize 每页展示条数
         * @param {Number} pageNo 当前页数
         * */
        getNoticeList(pageNo) {
            let { pageSize } = this;
            api.getNoticeList({ pageSize, pageNo }).then(res => {
                let data = api.parse(res);
                if (res.code == 1000) {
                    //将返回的数据每一项添加个属性 checked 用于复选框标记用
                    let list = data.noticeList.map(k => {
                        return {
                            ...k,
                            checked: false
                        };
                    });
                    this.dataList = list;
                    this.total = data.total;
                } else {
                    // this.$message({
                    //     message: res.msg,
                    //     type: "error"
                    // });
                }
                console.log("getNoticeList 接口返回数据", this.dataList);
            });
        },
        /**
         * 分页组件回调函数
         * @param {Number} pageNo 返回的当前页数
         * */
        pageChange(pageNo) {
            this.pageNo = pageNo;
        },
        /**
         * 通知消息组件回调函数 标记选择未读消息成功 执行当前函数
         * @param {Number} pageNo 返回的当前页数
         * */
        noticeList_handler() {
            this.getNoticeList(this.pageNo);
        }
    },
    watch: {
        pageNo(val) {
            console.log(val);
            this.getNoticeList(val);
        }
    },
    created() {
        this.pageNo = 1;
    }
};
</script>
<style lang="scss" scoped>
.home-cont-box {
    .home-notice-box {
        > h2 {
            height: 50px;
            line-height: 50px;
            background: #eee;
            padding: 0 20px;
            font-size: 16px;
            color: #666;
            span {
                margin-left: 5px;
                cursor: pointer;
                &.more-btn {
                    float: right;
                }
            }
        }
    }
}
.pagination-box {
    margin-top: 20px;
    text-align: center;
}
</style>

