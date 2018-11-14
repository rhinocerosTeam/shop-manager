/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-30 15:20:57
 * @Description: 通知详情页面
 */
<template>
    <div id='notice' class='container'>
        <subTitle>通知详情</subTitle>
        <div class="notice-details-box">
            <div class="notice-details-title">
                <div>{{datas.title}}</div>
                <div>{{datas.createTime && formDate(datas.createTime)}}</div>
            </div>
            <div class="notice-details-cont">
                {{datas.content}}
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import subTitle from "components/common/subTitle";
import api from "api";
import moment from "moment";

export default {
    data() {
        return {
            datas: {
                createTime: ""
            }
        };
    },
    methods: {
         /**
         * 请求通知详情接口
         * @param {String} noticeId 通知Id
         * */
        formDate(time) {
            return moment(time).format("YYYY-MM-DD HH:mm");
        }
    },
    components: {
        subTitle
    },
    created() {
        let { id } = this.query;
        /**
         * 请求通知详情接口
         * @param {String} noticeId 通知Id
         * */
        api.getNoticeDetail({ noticeId: id }).then(res => {
            let data = api.parse(res);
            if (res.code == 1000) {
                this.datas = data.noticeDetail;
                if (!this.datas.status) {
                    /**
                     * 如果是未读信息 则请求标记已读接口
                     * @param {Array} noticeIds 通知Id
                     * */
                    api.editNotice({ noticeIds: [id] }).then(res => {
                        let data = api.parse(res);
                        // if (res.code !== 1000) {
                        //     this.$message({
                        //         message: res.msg,
                        //         type: "error"
                        //     });
                        // }
                    });
                }
            } else {
                // this.$message({
                //     message: res.msg,
                //     type: "error"
                // });
            }
            console.log("getNoticeDetail 接口反返回数据", data);
        });
    },
    computed: {
        query() {
            return this.$route.query;
        }
    }
};
</script>

<style lang="scss" scoped>
.notice-details-box {
    text-align: center;
    > .notice-details-title {
        // width: 400px;
        > div {
            height: 30px;
            line-height: 30px;
            font-size: 18px;
        }
    }
    > .notice-details-cont {
        margin-top: 20px;
        padding-top: 40px;
        min-height: 200px;
        // width: 400px;
        border: 1px solid #eee;
        border-radius: 5px;
    }
}
</style>

