<template>
  <el-dialog :visible.sync="dialogVisible" title="人员信息" @opened="dialogOpen" @closed="dialogClose">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item :rules="[{ required: true, message: '不能为空'}]" prop="account" label="账号">
        <el-input v-model="form.account" :disabled="accountDisabled"/>
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '不能为空'}]" prop="userName" label="用户名">
        <el-input v-model="form.userName"/>
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
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio v-model="values.sex" label="男">男</el-radio>
        <el-radio v-model="values.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item prop="sex" label="状态">
        <el-radio v-model="values.status" label="0">离职</el-radio>
        <el-radio v-model="values.status" label="1">在职</el-radio>
        <el-radio v-model="values.status" label="2">锁定</el-radio>
      </el-form-item>
      <el-form-item prop="department" label="公司">
        <el-select v-model="values.department" placeholder="请选择">
          <el-option
            v-for="item in departmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="role" label="角色">
        <el-select v-model="values.role" placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="savePerson">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as personService from '@/api/sys/person'
export default {
  name: 'PersonEditForm',
  props: {
    person: Object,
    value: Boolean
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      roleOptions: [{
        value: '1',
        label: '系统管理员'
      }, {
        value: '2',
        label: '普通员工'
      }, {
        value: '3',
        label: '财务'
      }],
      departmentOptions: [],
      values: {
        role: '1',
        sex: '男',
        department: '1',
        status: '0'
      },
      form: {
        account: '',
        phone: '',
        userName: ''
      },
      accountDisabled: true
    }
  },
  watch: {
    value (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      this.$emit('input', val)
    }
  },
  mounted () {
    this.getDepartmentOptions()
  },
  methods: {
    dialogOpen () {
      this.$refs['form'].resetFields()
      if (this.person.id) {
        this.accountDisabled = true
        const form = {}
        form.account = this.person.account
        form.phone = this.person.phone
        form.userName = this.person.userName
        this.form = form
        this.values.role = this.person.role.toString()
        this.values.sex = this.person.sex.toString()
        this.values.department = this.person.department.toString()
        this.values.status = this.person.status.toString()
      } else {
        this.accountDisabled = false
        this.form = {}
      }
    },
    getDepartmentOptions () {
      personService.GetDepartmentList().then(data => {
        this.loading = false
        if (!data.hasOwnProperty('code')) {
          data.departmentList.forEach(item => {
            this.departmentOptions.push({
              value: item.id.toString(),
              label: item.name
            })
          })
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    savePerson () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            // 'id': '',
            'account': this.form.account,
            'sex': this.values.sex,
            'phone': this.form.phone,
            'role': this.values.role,
            'department': this.values.department,
            'userName': this.form.userName,
            'status': parseInt(this.values.status)
          }
          console.log(data)
          if (this.person.id) {
            data.id = this.person.id.toString()
            personService.UpdatePerson(data).then(data => {
              this.loading = false
              if (!data.hasOwnProperty('code')) {
                this.dialogVisible = false
                this.$emit('submit')
              }
            }).catch(err => {
              if (err) {
                this.loading = false
              }
            })
          } else {
            data.password = '88888888'
            personService.AddPerson(data).then(data => {
              this.loading = false
              if (!data.hasOwnProperty('code')) {
                this.dialogVisible = false
                this.$emit('submit')
              }
            }).catch(err => {
              if (err) {
                this.loading = false
              }
            })
          }
        } else {
          return false
        }
      })
    },
    close () {
      this.dialogClose()
    },
    dialogClose () {
      this.$refs['form'].resetFields()
      this.values = {
        role: '1',
        sex: '男',
        department: '1',
        status: '0'
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.el-select{
  width:100%;
}
</style>
