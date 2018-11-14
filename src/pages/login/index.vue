<template>
    <div class="login" id='login'>
        <div class='login-box'>
            <div class='loginMode' :class='{passWordLogin:userPassowrdLogin}'>
                <div class='crodLoginBtn' @click='passwordLogin(0)'></div>
                <div class='passWordLoginBtn' @click='passwordLogin(1)'></div>
            </div>

            <!-- <div class='title' v-text="type==1?'登录盒饭商家商城':type == 2?'设置密码':'修改密码'"></div> -->
            <template v-if='type==1'>
                <div class='title'>
                    <span>欢迎登录盒饭商家商城</span>
                </div>
                <div class='form'>
                    <loginInput placeholder='请输入手机号' v-model="loginInfo.mobile" type='number' maxlength='11'>

                    </loginInput>
                    <loginInput placeholder='请输入验证码' v-model="loginInfo.crod" class=' lastInput ' hasBtn=true v-show='!userPassowrdLogin
  '>
                        <template slot="prend">
                            <p :class='{sel:crodClick}' @click='getCordHandle'>
                                <span v-text='cordText'></span>{{crodClick?"后重新获取":""}} </p>
                        </template>
                    </loginInput>
                    <loginInput placeholder='请输入密码' class='lastInput' type='password' v-model="loginInfo.password" minlength='6' maxlength='16' hasBtn=true v-show='userPassowrdLogin'>
                        <template slot="prend">
                            <p class='forgetPassword' @click='getCordHandle'>
                                忘记密码？
                            </p>
                        </template>
                    </loginInput>
                    <div class='errTip' v-if='errorInfo' v-text='errorInfo'></div>
                </div>

                <div class='btn loginInBtn' @click='loginIn'>

                </div>

                <div class='agree'>
                    <i class="el-icon-circle-check" :class='{sel:agree}' @click='checkChange'></i>
                    <strong>阅读并同意</strong>
                    <span @click='goAgree(1)'>第三方商城授权许可协议</span>
                    <!--<span @click='goAgree(2)'>协议二</span>-->
                </div>
                <div class='firstLoginTip'>
                    首次登录请选择短信验证码登录
                </div>
            </template>
            <template v-else-if="type==2">
                <div class='title'>
                    <span>设置密码</span>
                </div>
                <div class='form'>
                    <loginInput placeholder='请设置密码' v-model="setPassword.passwordFrist" type='password' tip='6~16个字符，区分大小写'></loginInput>
                    <loginInput placeholder='请确认密码' v-model="setPassword.passwordSecond" type='password' class='lastInput' tip='6~16个字符，区分大小写'></loginInput>
                    <div class='errTip' v-if='errorInfo' v-text='errorInfo'></div>
                </div>

                <div class='btn confirmBtn' @click='setPasswordSub'></div>

            </template>
            <template v-else>
                <div class='title'>
                    <span>重置密码</span>
                </div>
                <div class='form smallMarginInput'>
                    <loginInput placeholder='请输入手机号' v-model="modifyPassword.mobile" type='number' maxlength='11'>

                    </loginInput>
                    <loginInput placeholder='请输入验证码' hasBtn=true v-model="modifyPassword.crod">
                        <template slot="prend">
                            <p :class='{sel:crodClick}' @click='getCordHandle'>
                                <span v-text='cordText'></span>{{crodClick?"后重新获取":""}} </p>
                        </template>
                    </loginInput>
                    <loginInput placeholder='请设置密码' v-model="modifyPassword.passwordFrist" type='password' tip='6~16个字符，区分大小写'></loginInput>
                    <loginInput placeholder='请确认密码' v-model="modifyPassword.passwordSecond" type='password' class='lastInput' tip='6~16个字符，区分大小写'></loginInput>
                    <div class='errTip' v-if='errorInfo' v-text='errorInfo'></div>
                </div>
                <div class='btn confirmBtn' @click='modifyPasswordSub'></div>
            </template>
        </div>
    </div>
</template>
<script>
    import api from "api";
    import loginInput from "components/common/loginInput";
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                //界面
                type: "1", //1 登录 2 设置密码 3 重设密码
                loginShow: true,
                ajaxing: null,
                noticing: false,
                loginInfo: {
                    mobile: process.env.NODE_ENV === 'development' ? '18510455934':'',
                    // mobile: '18510455934',
                    crod: '',
                    password: ''
                },
                correct: false,

                password: '',
                agree: true,
                cordText: '短信验证码',
                loginSel: false,
                crodClick: false,
                crodFlag: true,
                userId: "",
                token: "",
                isLogin: false,
                errorInfo: '',
                userPassowrdLogin: false,

                //设置密码
                setPassword: {
                    passwordFrist: "",
                    passwordSecond: ""
                },
                modifyPassword: {
                    mobile: '',
                    crod: '',
                    passwordFrist: "",
                    passwordSecond: ""
                }

            }
        },
        props: [],
        components: {
            loginInput
        },

        computed: {
            ...mapGetters({
                userInfo: 'getUserInfo'
            })
        },
        methods: {
            ...mapActions({
                setUserInfo: 'loginIn'
            }),

            /**
             * @description 切换到密码登陆
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            passwordLogin(val) {
                if (this.userPassowrdLogin == val) return
                if (this.crodTimer) clearInterval(this.crodTimer)
                this.errorInfo = ''
                this.type = 1
                this.cordText = '短信验证码'
                this.crodClick = false
                this.userPassowrdLogin = val;
            },
            /**
             * @description 协议同意切换
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            checkChange() {
                this.agree = !this.agree
            },
            /**
             * @description 跳转到协议
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            goAgree(type) {
                //        let agreeType = type == 1 ? "一" : "二"
                //        this.$message.success('成功跳转协议' + agreeType);

                this.$router.push('/dianprotocol')

            },
            /**
             * @description 获取验证码事件
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            getCordHandle() {
                this.errorInfo = ''

                if (this.crodClick) return

                if (this.userPassowrdLogin && this.type != 3) {
                    if (this.crodTimer) clearInterval(this.crodTimer)

                    this.cordText = '短信验证码'
                    this.crodClick = false
                    this.modifyPassword = {
                        mobile: this.loginInfo.mobile,
                        crod: '',
                        passwordFrist: "",
                        passwordSecond: ""
                    }
                    this.type = 3
                    return
                }
                let mobile = '';
                if (this.type == 3) {

                    if (this.crodClick) return
                    if (!this.validateMobile(this.modifyPassword.mobile)) return
                    mobile = this.modifyPassword.mobile
                } else {
                    if (this.crodClick) return
                    if (!this.validateMobile(this.loginInfo.mobile)) return
                    mobile = this.loginInfo.mobile
                }

                if (!this.crodFlag) {
                    return
                }
                this.crodFlag = false

                this.getCrod(mobile) //获取验证码
            },
            /**
             * @description 更改验证码状态
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            changeStatus() {
                this.mobile = ''
                this.crod = ''
                if (this.crodTimer) {
                    clearInterval(this.crodTimer)
                }
                this.cordText = '获取验证码'
                this.crodClick = false
            },
            /**
             * @description 验证码倒计时功能
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            crodTime() {
                if (this.crodTimer) {
                    clearInterval(this.crodTimer)
                }

                this.cordText = '60s'

                let timer = 60;
                this.crodTimer = setInterval(() => {
                    if (timer == 0) {
                        clearInterval(this.crodTimer)
                        this.cordText = '获取验证码'
                        this.crodClick = false
                    } else {
                        this.cordText = timer + 's'
                    }
                    timer--
                }, 1000)

            },
            /**
             * @description 获取验证码接口调用
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            // //获取验证码

            async getCrod(mobile) {
                let data = await api.sendCrod({
                    mobile
                }).catch(err => {
                    this.crodFlag = true
                    this.errorInfo = '请检查网络'
                })
                if (data.code == 1000) {
                    this.$message.success('验证码发送成功！');
                    this.crodClick = true;
                    this.crodFlag = true;
                    this.crodTime(); //验证码倒计时
                } else {
                    this.crodFlag = true;

                    this.errorInfo = data.msg
                }
            },
            /**
             * @description 验证手机号
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */

            validateMobile(mobile) {

                let res = true;
                if (mobile === '') {
                    this.errorInfo = '请输入手机号'
                    res = false
                } else if (mobile && (mobile.length != 11 || !/^1/.test(mobile))) {
                    this.errorInfo = '请输入正确手机号'
                    res = false
                }
                return res
            },
            /**
             * @description 验证验证码
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            validateCrod(mobcrod) {
                let res = true;
                if (mobcrod == '') {
                    this.errorInfo = '请输入验证码'
                    res = false
                }
                return res
            },
            /**
             * @description 验证密码
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            validatePassword(password = -1, passwordSec = -1) {
                let res = true;
                if (password != -1) {
                    if (password == '') {
                        this.errorInfo = '请输入密码'
                        res = false
                    } else if (password.length < 6 || password.length > 16) {
                        this.errorInfo = '6~16个字符，区分大小写'
                        res = false
                    } else {
                        if (passwordSec != -1) {
                            if (passwordSec == '') {
                                this.errorInfo = '请再次输入密码'
                                res = false
                            } else if (password != passwordSec) {
                                this.errorInfo = '两次输入密码不一致'
                                res = false
                            }
                        }

                    }
                }
                return res
            },
            /**
             * @description 修改密码接口调用
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            async modifyPasswordSub() {
                if (this.noticing) return
                this.errorInfo = ''
                if (!this.validateMobile(this.modifyPassword.mobile)) return
                if (!this.validateCrod(this.modifyPassword.crod)) return
                if (!this.validatePassword(this.modifyPassword.passwordFrist, this.modifyPassword.passwordSecond)) return
                this.loading()
                let data = await api.resetPassword({
                    pwd: this.modifyPassword.passwordFrist,
                    msgCode: this.modifyPassword.crod,
                    mobile: this.modifyPassword.mobile
                }).catch((err) => {
                    this.errorInfo = '请检查网络'
                });
                if (data) {
                    if (data.code == 1000) {
                        this.noticing = true;
                        this.$message.success('密码重置成功，请重新登录！');
                        setTimeout(() => {
                            this.noticing = false;
                            this.userPassowrdLogin = 1
                            this.loginInfo = {
                                mobile: this.modifyPassword.mobile,
                                crod: '',
                                password: ''
                            }
                            this.type = 1

                        }, 1000);

                    } else {
                        this.errorInfo = data['msg']
                    }
                } else {
                    this.errorInfo = '请检查网络'
                }
                this.ajaxing.close()
            },
            /**
             * @description 设置密码接口调用
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            async setPasswordSub() {
                if (this.noticing) return
                this.errorInfo = ''
                if (!this.validatePassword(this.setPassword.passwordFrist, this.setPassword.passwordSecond)) return
                this.loading()
                let data = await api.setPassword({
                    pwd: this.setPassword.passwordFrist,

                }).catch((err) => {
                    this.errorInfo = '请检查网络'
                });
                if (data) {
                    if (data.code == 1000) {
                        this.noticing = true
                        setTimeout(() => {
                            this.noticing = false;
                            this.$router.push('/mailList')
                        }, 1000);
                        this.$message.success('密码设置成功');
                    } else {
                        this.errorInfo = data['msg']
                    }
                } else {
                    this.errorInfo = '请检查网络'
                }
                this.ajaxing.close()
            },
            /**
             * @description 登陆功能
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            async loginIn() {
                if (this.noticing) return
                this.errorInfo = ''
                if (!this.validateMobile(this.loginInfo.mobile)) return
                if (!this.userPassowrdLogin && !this.validateCrod(this.loginInfo.crod)) return
                if (this.userPassowrdLogin && !this.validatePassword(this.loginInfo.password)) return
                if (!this.agree) {
                    this.errorInfo = '请勾选阅读协议'
                    return
                }

                let data = {}
                this.loading()
                if (this.userPassowrdLogin) {
                    data = await this.loginByPassword()
                } else {
                    data = await this.loginByCrod()
                }
                if (data) {
                    if (data.code == 1000) {


                        this.token = data.data.token;
                        this.isLogin = true
                        /* 状态未申请 -1    通过1    不通过2 盛情中0 */
                        this.setUserInfo({
                            token: data.data.token
                        })
                        // let userInfo = await api.getUser().catch((err) => {
                        //   this.$message.error('获取用户信息失败');
                        // })
                        // if (userInfo) {
                        //   if (userInfo.code == 1000) {
                        //     if (userInfo.data.user) this.setUserInfo(userInfo.data.user)
                        //   }
                        // }
                        if (!this.userPassowrdLogin) {
                            if (!data.data.setPwdFlag) {
                                this.setPassword = {
                                    passwordFrist: "",
                                    passwordSecond: ""
                                }
                                this.type = 2
                                this.$message.success('您还未设置密码，请设置！');
                            } else {
                                this.noticing = true
                                this.$message.success('登录成功');
                                setTimeout(() => {
                                    this.noticing = false;
                                    this.$router.push('/mailList')
                                }, 1000);
                            }
                        } else {
                            this.noticing = true
                            this.$message.success('登录成功');
                            setTimeout(() => {
                                this.noticing = false;
                                this.$router.push('/mailList')
                            }, 1000);
                        }
                    } else if (data.code == 4050) {
                        this.errorInfo = '找不到该用户'
                    } else {
                        this.errorInfo = data['msg']
                    }
                } else {
                    this.errorInfo = '请检查网络'
                }
                this.ajaxing.close()

            },
            /**
             * @description 验证码接口调用
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            async loginByCrod() {
                let params = {
                    msgCode: this.loginInfo.crod,
                    mobile: this.loginInfo.mobile
                }
                let data = await api.loginByCrod(params).catch((err) => {
                    this.errorInfo = '请检查网络'
                })

                return data
            },
            /**
             * @description 密码登陆接口调用
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            async loginByPassword() {
                let params = {
                    mobile: this.loginInfo.mobile,
                    pwd: this.loginInfo.password
                }
                let data = await api.loginByPassword(params).catch((err) => {
                    this.errorInfo = '请检查网络'
                })
                return data
            },
            /**
             * @description 加载总弹层
             * @author DaWei
             * @date 2018-07-23
             * @returns
             */
            loading() {
                this.ajaxing = this.$loading({
                    fullscreen: true,
                    lock: true,
                    text: '请稍等...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.1)',
                    customClass: 'loadingC'
                })
            }
        },
        created() {},
        mounted() {
            $('html,body,.login').width($(window).width()).height($(window).height())
        },
        destroyed() {},
        watch: {
            loginInfo: {
                handler() {
                    this.errorInfo = ''
                },
                deep: true
            }

        }
    };
</script>
<style scoped lang='scss'>
</style>