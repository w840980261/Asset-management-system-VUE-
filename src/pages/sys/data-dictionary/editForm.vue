<template>
  <el-dialog :visible.sync="dialogVisible" title="字典信息" @opened="dialogOpen" @closed="dialogClose">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item :rules="[{ required: true, message: '不能为空'}]" prop="kind" label="名称">
        <el-input v-model="form.kind"/>
      </el-form-item>
      <el-form-item :rules="[{ required: true, trigger: 'change', message: '必选项'}]" prop="quantityState" label="保存方式">
        <el-radio v-model="form.quantityState" label="1">按个</el-radio>
        <el-radio v-model="form.quantityState" label="2">按批</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" @click="saveDictionary">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as dictionaryService from '@/api/sys/data-dictionary'
export default {
  name: 'DictionaryEditForm',
  props: {
    dictionary: Object,
    value: Boolean
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        kind: '',
        quantityState: ''
      }
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
  methods: {
    dialogOpen () {
      this.$refs.form.resetFields()
    },
    saveDictionary () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            'kind': this.form.kind,
            'quantityState': parseInt(this.form.quantityState)
          }
          dictionaryService.AddDictionary(data).then(data => {
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
          return false
        }
      })
    },
    close () {
      this.dialogClose()
    },
    dialogClose () {
      this.$refs['form'].resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
