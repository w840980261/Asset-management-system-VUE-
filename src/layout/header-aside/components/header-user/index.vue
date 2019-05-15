<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">你好 {{ info.name }}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="editInfo">
        <d2-icon name="user-circle-o" class="d2-mr-5"/>查看信息
      </el-dropdown-item>
      <el-dropdown-item @click.native="changePwd">
        <d2-icon name="pencil" class="d2-mr-5"/>修改密码
      </el-dropdown-item>
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>注销
      </el-dropdown-item>
    </el-dropdown-menu>
    <div class="head-user">
      <el-dialog
        :before-close="close"
        :visible.sync="dialogFormVisible"
        title="修改密码"
        class="dialogWidth"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small">
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" type="password" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="reNewPassword">
            <el-input v-model="form.reNewPassword" type="password" placeholder="请输入"/>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="UpdatePassword">保存</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog
        :before-close="close"
        :visible.sync="infoDialogFormVisible"
        title="个人信息"
        class="dialogWidth"
        @opened="infoDialogOpen"
      >
        <el-form ref="personForm" :model="personForm" :rules="rules" label-width="80px" size="small">
          <el-form-item prop="account" label="账号">
            {{ personForm.account }}
          </el-form-item>
          <el-form-item :rules="[{ required: true, message: '不能为空'}]" prop="userName" label="用户名">
            <el-input v-model="personForm.userName"/>
          </el-form-item>
          <el-form-item :rules="[{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            }, {
              pattern: /^1[34578]\d{9}$/,
              message: '请输入正确的手机号',
              trigger: ['blur', 'change']
            }]" prop="phone" label="手机号">
            <el-input v-model="personForm.phone"/>
          </el-form-item>
          <el-form-item prop="sex" label="性别">
            <el-radio v-model="personForm.sex" label="男">男</el-radio>
            <el-radio v-model="personForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item prop="sex" label="状态">
            <div v-if="personForm.status==0">
              <el-tag size="small" type="info">离职</el-tag>
            </div>
            <div v-if="personForm.status==1">
              <el-tag size="small" type="success">在职</el-tag>
            </div>
            <div v-if="personForm.status==2">
              <el-tag size="small">锁定</el-tag>
            </div>
          </el-form-item>
          <el-form-item prop="department" label="公司">
            {{ personForm.departmentName }}
          </el-form-item>
          <el-form-item prop="role" label="角色">
            {{ personForm.roleName }}
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="savePerson">保存</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
  </el-dropdown>
</template>

<script>
import util from '@/libs/util'
import { mapState, mapActions } from 'vuex'
import * as person from '@/api/sys/person'
import router from '@/router/index'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    var validatePass1 = (rule, value, callback) => {
      const pwdTest = /^[a-zA-Z0-9_]+$/
      if (!pwdTest.test(value)) {
        callback(new Error('只能包含字母数字下划线'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      infoDialogFormVisible: false,
      loading: false,
      form: {
        newPassword: '',
        reNewPassword: ''
      },
      personForm: {
        account: '',
        phone: '',
        userName: '',
        roleName: '',
        sex: '男',
        departmentName: '',
        status: ''
      },

      rules: {
        newPassword: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        reNewPassword: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  methods: {
    infoDialogOpen () {
      person.GetCurrentPerson().then(data => {
        this.loading = false
        if (!data.hasOwnProperty('code')) {
          this.personForm = data.user
          console.log(this.personForm)
          this.$emit('submit')
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    ...mapActions('d2admin/account', ['logout']),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        vm: this,
        confirm: true
      })
    },
    changePwd () {
      this.dialogFormVisible = true
    },
    editInfo () {
      this.infoDialogFormVisible = true
    },
    // 修改密码
    UpdatePassword () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const param = {
            'id': util.cookies.get('id'),
            'password': this.form.newPassword
          }
          this.loading = true
          person.UpdatePassword(param).then(data => {
            this.loading = false
            if (!data.code) {
              this.$message.success('修改密码成功，请重新登录！')
              this.dialogFormVisible = false
              util.cookies.remove('id')
              util.cookies.remove('userName')
              util.cookies.remove('userRole')
              setTimeout(() => {
                router.push({
                  name: 'login'
                })
              }, 1000)
            }
          }).catch(err => {
            if (err) {
              this.loading = false
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    savePerson () {
      this.$refs['personForm'].validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            'id': this.personForm.id.toString(),
            'account': this.personForm.account,
            'sex': this.personForm.sex,
            'phone': this.personForm.phone,
            'role': this.personForm.role.toString(),
            'department': this.personForm.department.toString(),
            'userName': this.personForm.userName,
            'status': parseInt(this.personForm.status)
          }
          person.UpdatePerson(data).then(data => {
            this.loading = false
            if (!data.hasOwnProperty('code')) {
              this.infoDialogFormVisible = false
            }
          }).catch(err => {
            if (err) {
              this.loading = false
            }
          })
        } else {
          return false
        }
      })
    },
    close () {
      this.dialogFormVisible = false
      this.infoDialogFormVisible = false
    }
  }
}
</script>
