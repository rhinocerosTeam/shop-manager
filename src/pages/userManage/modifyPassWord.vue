<template>
  <div id='modifyPassWord' class='container'>
    <subTitle>修改密码</subTitle>
    <el-form :model="setPassword" ref="setPassword" label-width="100px" class="setPassword">
      <el-form-item label="旧密码">
        <el-input v-model="setPassword.oldPassword" placeholder='请输入旧密码' type='password'></el-input>
      </el-form-item>
      <el-form-item label="请设置新密码">
        <el-input v-model="setPassword.passwordFrist" placeholder='6~16个字符，区分大小写' type='password'></el-input>
      </el-form-item>
      <el-form-item label="请确认新密码">
        <el-input v-model="setPassword.passwordSecond" placeholder='请再次填写密码' type='password'></el-input>
      </el-form-item>
      <div class='errTip' v-if='errorInfo' v-text='errorInfo'></div>

      <el-button type="primary" class='subBtn' @click='setPasswordSub'>确认修改</el-button>
    </el-form>

  </div>
</template>

<script>
  import api from "api";
  import subTitle from "components/common/subTitle";
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {

    components: {

      subTitle
    },
    data() {
      return {
        noticing: false,
        errorInfo: '',
        setPassword: {
          oldPassword: '',
          passwordFrist: "",
          passwordSecond: ""
        },
      }
    },
    methods: {
      ...mapActions({
        setStoreInfo: 'setStore',
        delUser: "loginOut"
      }),
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
            this.errorInfo = '请输入新密码'
            res = false
          } else if (password.length < 6 || password.length > 16) {
            this.errorInfo = '请按照密码格式输入密码（6~16个字符，区分大小写）'
            res = false
          } else {
            if (passwordSec != -1) {
              if (passwordSec == '') {
                this.errorInfo = '请再次填写密码'
                res = false
              } else if (password != passwordSec) {
                this.errorInfo = '两次密码输入不一致，请确认后重新输入'
                res = false
              }
            }

          }
        }
        return res
      },
      validateOldPassword(password) {
        let res = true;
        if (!password || password.length < 6 || password.length > 16) {
          this.errorInfo = '请输入正确的旧密码'
          res = false
        }
        return res
      },
      async setPasswordSub() {
        if (!this.validateOldPassword(this.setPassword.oldPassword)) return;
        if (!this.validatePassword(this.setPassword.passwordFrist, this.setPassword.passwordSecond)) return;
        let ajaxing = this.$loading({
            fullscreen: true,
            lock: true,
            text: '请稍等...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.1)',
            customClass: 'loadingC'
          }),
          data = await api.modifiyPassword({
            oldPwd: this.setPassword.oldPassword,
            pwd: this.setPassword.passwordFrist,
          }).catch((err) => {

            this.errorInfo = '请检查网络'
          });
        if (data) {
          if (data.code == 1000) {
            this.$message.success('密码修改成功');
            this.errorInfo = ''
          } else if (data["code"] == "7100" || data["code"] == "7101" || data["code"] == "7103") {
            this.delUser();
            this.$router.replace({
              name: "login"
            });
            this.errorInfo = ''
          } else {

            this.errorInfo = data['msg']
          }
        } else {

          this.errorInfo = '请检查网络'
        }
        ajaxing.close()
      },
    },
    watch: {
      setPassword: {
        handler() {
          this.errorInfo = ''
          console.log(2222)
        },
        deep: true
      }
    }
  };
</script>
<style scoped lang="scss">
  #modifyPassWord {
    .errTip {
      position: absolute;
      left: 0;
      bottom: 60px;
      width: 100%;
      font-size: 14px;
      color: #ff2553;
      text-align: center;
    }
    .setPassword {
      position: relative;
      width: 500px;
      padding-top: 60px;
      margin: 0 auto;
    }
    .subBtn {
      display: block;
      margin: 0 auto;
      margin-top: 100px;
    }
  }
</style>