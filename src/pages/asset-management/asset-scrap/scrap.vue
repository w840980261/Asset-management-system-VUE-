<template>
  <el-dialog :visible.sync="dialogVisible" title="添加报废" @opened="dialogOpen" @closed="dialogClose">

    <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm" size="mini">
      <el-form-item label="资产类型">
        <el-select v-model="kindId" placeholder="可选择" size="mini" @change="getTableData">
          <el-option
            key="0"
            label="全部"
            value="0">
          </el-option>
          <el-option
            v-for="item in kindOptions"
            :key="item.id"
            :label="item.kind"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.note"></el-input>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      size="small"
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:20px;"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column prop="assetsId" label="资产编码" align="center" width="200" />
      <el-table-column prop="assetsName" label="名称" align="center"/>
      <el-table-column prop="kind" label="类型" align="center"/>
      <el-table-column prop="quantity" label="数量" align="center"/>
      <el-table-column prop="unitPrice" label="单价" align="center"/>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="saveScrap">报废</el-button>
      <el-button @click="close">取消</el-button>
    </span>
  </el-dialog>

</template>
<script>
import * as getDictionaryList from '@/api/sys/data-dictionary'
import * as person from '@/api/sys/person'
import * as assetsServer from '@/api/assets/assets'
export default {
  name: 'scrapDialog',
  props: {
    // procurement: Object,
    value: Boolean
  },
  data () {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      kindOptions: [], // 资产类型选项
      kindId: '0', // 资产类型
      department: '',
      form: {
        note: '',
        assetsId: ''
      },
      multipleSelection: [],
      loading: false,
      dialogVisible: false,
      tableData: [],
      rules: []
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
    this.getDepartment()
  },
  methods: {
    // 获取公司名字
    getDepartment () {
      this.loading = true
      person.GetCurrentPerson().then(data => {
        if (!data.hasOwnProperty('code')) {
          this.department = data.user.departmentName
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    // 获取类型列表
    getDictionary () {
      this.loading = true
      getDictionaryList.getDictionary().then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.kindOptions = data.dictionaryList
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    // 获取资产列表
    getTableData () {
      // this.loading = true
      const param = {
        'kindId': this.kindId.toString(),
        'department': this.department
      }
      if (param.kindId === '0') {
        param.kindId = null
      }
      assetsServer.UseList(param).then(data => {
        if (!data.hasOwnProperty('code')) {
          // this.loading = false
          this.tableData = data.Assets
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    dialogOpen () {
      this.getDictionary()
      this.getTableData()
    },
    close () {
      this.dialogClose()
    },
    dialogClose () {
      this.dialogVisible = false
    },
    // 表格单选框改变
    handleCurrentChange (val) {
      this.form.assetsId = val.assetsId
    },
    // tag删除
    // handleClose (tag) {
    //   this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1)
    // },
    saveScrap () {
      if (this.form.note !== '') {
        if (this.form.assetsId !== '') {
          this.loading = true
          const param = {
            'note': this.form.note,
            'assetsId': this.form.assetsId
          }
          assetsServer.Scrap(param).then(data => {
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
          this.$message({
            message: '请选择报废资产!',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '备注不可为空!',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
.el-card{
  margin-bottom: 20px;
}
.detialInofo .el-col{
  height: 24px;
}
.tag-state{
  display: inline-block;
}
.el-tag {
  margin-bottom: 10px;
}
</style>
