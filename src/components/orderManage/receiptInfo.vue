/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:58:57
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 15:01:25
 * @Description: 填写发货信息组件
 * @params: datas {string} 当前订单数据; 
 * @params: save-handler {function} 保存按钮回调函数
 * @params: cancel-handler {function} 取消按钮回调函数
 */
<template>
    <div class="receipt-info">
        <el-dialog title="收货信息" :close-on-click-modal='false' :center='true' :visible="true" width="30%" :show-close="false">
            <el-form ref="receipt_form" :model="dataInfo" :rules="rules" label-width="100px">
                <el-form-item label="收货人:" prop="receiveName">
                    <el-input v-model="dataInfo.receiveName" size='small'></el-input>
                </el-form-item>
                <el-form-item label="联系号:" prop="receiveMobile">
                    <el-input v-model="dataInfo.receiveMobile" :maxlength='11' size='small'></el-input>
                </el-form-item>
                <el-form-item label="收货地址:" prop="address">
                    <el-cascader placeholder="请选择地址" v-model='address' separator=' ' :options="cityLists" filterable></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址:" prop="detailedAddress">
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="dataInfo.detailedAddress">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelInfo_handler">取 消</el-button>
                <el-button type="primary" @click="saveInfo_clickHandler">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import provincesInfo from "constants/provincesInfo";
export default {
    data() {
        // 判断是否输入收获地址 自定义验证规则
        var checkAddress = (rule, value, callback) => {
            if (!this.address.length || !this.address[0]) {
                callback(new Error("请输入收货地址"));
            } else {
                callback();
            }
        };
        return {
            cityLists: provincesInfo, //省市县三级联动数据
            dataInfo: {}, //填写的用户信息
            address: [], //省市县三级联动选择值
            rules: {
                receiveName: [
                    {
                        required: true,
                        message: "请输入用户名称",
                        trigger: "blur"
                    }
                ],
                receiveMobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        validator: checkAddress,
                        trigger: "change"
                    }
                ],
                detailedAddress: [
                    {
                        required: true,
                        message: "请输入详细地址",
                        trigger: "blur"
                    }
                ],
                email: []
            }
        };
    },
    props: ["datas"],
    components: {},
    methods: {
        /**
         * 保存信息 点击回调事件
         * */
        saveInfo_clickHandler() {
            this.$refs["receipt_form"].validate(valid => {
                if (valid) {
                    let address = this.address;
                    Object.assign(this.dataInfo, {
                        provinceName: address[0],
                        cityName: address[1],
                        countyName: address[2]
                    });
                    this.$emit("save-handler", this.dataInfo);
                } else {
                    return false;
                }
            });
        },
        //取消 回调事件
        cancelInfo_handler() {
            this.$emit("cancel-handler");
        },
        //初始化 信息框数据
        initData() {
            //将传入的订单信息 深拷贝给dataInfo 防止双向数据绑定 修改当前页面的值 影响到父组件
            this.dataInfo = { ...this.datas };
            this.address = [
                this.dataInfo.provinceName,
                this.dataInfo.cityName,
                this.dataInfo.countyName
            ];
        }
    },
    created() {
        this.initData();
    },
    mounted() {},
    destroyed() {},
    watch: {}
};
</script>
<style scoped lang="scss">
.receipt-info {
    .el-dialog {
        .el-input {
            width: 80%;
        }
        .el-cascader {
            width: 80%;
        }
        .el-textarea {
            width: 80%;
        }
    }
}
</style>

