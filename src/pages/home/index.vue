/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 18:40:46
 * @Description: 首页
 */
<template>
    <div id='home' class='container'>
        <subTitle>我的工作台</subTitle>
        <div class="home-cont-box">
            <!-- 首页统计数据 展示区域 -->
            <div class="home-title-bar">
                <router-link :to="{name:'waitingDeliveryList'}">
                    <div class="title-box">
                        <h3>等待发货订单</h3>
                        <span>{{datas.unDeOrderCount}}</span>
                    </div>
                </router-link>
                <router-link :to="{name:'alreadyShippedList'}">
                    <div class="title-box">
                        <h3>已发货订单</h3>
                        <span>{{datas.unReOrderCount}}</span>
                    </div>
                </router-link>
                <router-link :to="{name:'applyList',query:{'type':0}}">
                    <div class="title-box">
                        <h3>待提交申请商品</h3>
                        <span>{{datas.unSuProCount}}</span>
                    </div>
                </router-link>
                <router-link :to="{name:'applyList',query:{'type':1}}">
                    <div class="title-box">
                        <h3>待审核商品</h3>
                        <span>{{datas.unAuProCount}}</span>
                    </div>
                </router-link>
                <!-- <el-row :gutter="50">
                    <el-col :span='6'>
                        <router-link :to="{name:'waitingDeliveryList'}">
                            <div class="title-box">
                                <h3>待发货订单</h3>
                                <span>{{datas.unDeOrderCount}}</span>
                            </div>
                        </router-link>
                    </el-col>
                    <el-col :span='6'>
                        <router-link :to="{name:'alreadyShippedList'}">
                            <div class="title-box">
                                <h3>待收货订单</h3>
                                <span>{{datas.unReOrderCount}}</span>
                            </div>
                        </router-link>
                    </el-col>
                    <el-col :span='6'>
                        <router-link :to="{name:'applyList',query:{'type':0}}">
                            <div class="title-box">
                                <h3>待提交申请商品</h3>
                                <span>{{datas.unSuProCount}}</span>
                            </div>
                        </router-link>
                    </el-col>
                    <el-col :span='6'>
                        <router-link :to="{name:'applyList',query:{'type':1}}">
                            <div class="title-box">
                                <h3>待审核商品</h3>
                                <span>{{datas.unAuProCount}}</span>
                            </div>
                        </router-link>
                    </el-col>
                </el-row> -->
            </div>
            <!-- 通知列表展示区域 -->
            <div class="home-notice-box">
                <h2>
                    <i class="el-icon-message"></i>
                    <span>通知</span>
                    <span class="more-btn">
                        <router-link :to="{name:'noticeList',query:{'type':0}}">
                            更多
                        </router-link>
                    </span>
                </h2>
                <noticeList :datas='dataList'></noticeList>
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import subTitle from "components/common/subTitle";
import noticeList from "components/home/noticeList";
import api from "api";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            dataList: [""], //通知列表数据
            datas: {}, //首页统计数据展示区域
            pageNo: 0, //当前页数
            pageSize: 5 //每页条数
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
                    this.dataList = data.noticeList;
                }
                console.log(this.dataList, "===");
            });
        },
        /**
         * 获得首页统计数据接口
         * */
        getCountData() {
            api.getCountData().then(res => {
                let data = api.parse(res);
                if (res.code == 1000) {
                    this.datas = data;
                }
                console.log("getCountData 接口返回数据", this.datas);
            });
        }
    },
    created() {
        this.getNoticeList(1);
        this.getCountData();
    }
};
</script>
<style lang="scss" scoped>
$titleW: 280px;
@media screen and (max-width: 1366px) {
    .home-title-bar {
        min-width: 980px !important;
        .title-box {
            width: 220px !important;
        }
    }
}
.home-cont-box {
    .home-title-bar {
        text-align: center;
        margin-bottom: 40px;
        // overflow: hidden;
        height: 140px;
        min-width: 1250px;
        a {
            float: left;
            margin-right: 25px;
            &:nth-of-type(1) {
                .title-box {
                    background: #9f77fe;
                    box-shadow: 0 2px 5px rgba(159, 119, 254, 0.4);
                }
            }
            &:nth-of-type(2) {
                .title-box {
                    background: #3cdcbe;
                    box-shadow: 0 2px 5px rgba(60, 220, 190, 0.4);
                }
            }
            &:nth-of-type(3) {
                .title-box {
                    background: #ffb55a;
                    box-shadow: 0 2px 5px rgba(255, 181, 90, 0.4);
                }
            }
            &:nth-of-type(4) {
                .title-box {
                    background: #ff6a76;
                    box-shadow: 0 2px 5px rgba(255, 106, 118, 0.4);
                }
            }
            .title-box {
                padding-top: 40px;
                min-height: 100px;
                width: $titleW;
                // border: 1px solid red;
                cursor: pointer;
                border-radius: 4px;
                transition: 0.3s;
                color: #fff;
                &:hover {
                    transform: scale(1.1);
                }
                > h3 {
                    margin-bottom: 20px;
                    font-size: 14px;
                }
                > span {
                    font-size: 28px;
                }
            }
        }
    }
    .home-notice-box {
        > h2 {
            height: 50px;
            line-height: 50px;
            // background: #eee;
            border: 1px solid #eee;
            border-bottom: none;
            padding: 0 20px;
            font-size: 16px;
            color: #666;
            span {
                margin-left: 5px;
                &.more-btn {
                    float: right;
                }
            }
        }
    }
}
</style>

