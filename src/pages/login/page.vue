<template>
  <div class="login-page">
    <div id="login" class="layer bg"/>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/logo.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form
            ref="loginForm"
            :rules="rules"
            :model="formLogin"
            label-position="top"
            size="default"
          >
            <el-form-item prop="userId">
              <el-input v-model="formLogin.userId" type="text" placeholder="用户名">
                <i slot="prepend" class="fa fa-user-circle-o"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="formLogin.password" type="password" placeholder="密码">
                <i slot="prepend" class="fa fa-keyboard-o"/>
              </el-input>
            </el-form-item>
            <el-button-group>
              <el-button size="default" type="primary" @click="submit">登录</el-button>
              <!-- <el-button size="default" @click="resetDb">初始化</el-button> -->
            </el-button-group>
          </el-form>
        </el-card>
      </div>
      <!-- 快速登录按钮 -->
      <el-button
        size="default"
        type="info"
        class="button-help"
        @click="dialogVisible = true"
      >快速选择用户（测试权限）</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="快速选择用户" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="user-btn" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o"/>
            <span>{{ user.name }}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import * as sysService from "@/api/sys/sys";
// import * as logins from '@/api/sys/login'
// import util from '@/libs/util'
export default {
  data () {
    return {
      // 快速选择用户
      dialogVisible: false,
      users: [
        {
          name: '超级管理员',
          userId: 'admin',
          password: '88888888'
        },
        {
          name: '财务管理',
          userId: 'wyq2',
          password: '88888888'
        },
        {
          name: '普通用户',
          userId: 'wyq1',
          password: '88888888'
        }
      ],
      // 表单
      formLogin: {
        userId: 'admin',
        password: '88888888'
      },
      // 校验
      rules: {
        userId: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    // 初始化例子插件

    // var d = new Date().getTime();
    // this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //   var r = (d + Math.random() * 16) % 16 | 0;
    //   d = Math.floor(d / 16);
    //   return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    // });
    // particlesJS("login", config);
  },
  methods: {
    ...mapActions('d2admin/account', ['login']),
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick (user) {
      this.formLogin.userId = user.userId
      this.formLogin.password = user.password
      // this.submit();
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login({
            vm: this,
            account: this.formLogin.userId,
            password: this.formLogin.password
          })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
