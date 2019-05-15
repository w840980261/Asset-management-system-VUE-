<template>
  <el-dialog :visible.sync="dialogVisible" title="发起调拨" @opened="dialogOpen" @closed="dialogClose" width="900px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="detialInofo">
          资产类型
          <el-select style="margin-bottom: 20px;" v-model="kindId" placeholder="可选择" size="mini" @change="getTableData">
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
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="tableData"
            size="small"
            tooltip-effect="dark"
            style="width: 100%"
            max-height="350"
            @selection-change="handleSelectionChange"
          >
            <el-table-column fixed type="selection" width="30"/>
            <el-table-column prop="assetsId" label="资产编码" align="center" width="200" />
            <el-table-column prop="assetsName" label="名称" align="center"/>
            <el-table-column prop="kind" label="类型" align="center"/>
            <el-table-column prop="quantity" label="数量" align="center"/>
            <el-table-column prop="unitPrice" label="单价" align="center"/>
          </el-table>
          <!-- <el-button style="margin-top: 10px;" size="small" type="primary" @click="addGood">添加商品</el-button> -->
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="detialInofo">
          <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm" size="mini">
            <el-form-item label="调拨公司" prop="department">
              <el-select v-model="form.owner" placeholder="必选" size="mini" @change="getTableData">
                <el-option
                  v-for="item in departmentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接收公司" prop="userName">
              <el-select v-model="form.current" placeholder="必选" size="mini">
                <el-option
                  v-for="item in departmentList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="调拨资产" prop="department" style="margin-bottom:10px;">
              <el-tag
                :key="tag"
                v-for="tag in multipleSelection"
                :disable-transitions="false">
                {{tag.assetsId+','+tag.assetsName}}
              </el-tag>
            </el-form-item>

          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="saveAllot">调拨</el-button>
      <el-button @click="close">取消</el-button>
    </span>
  </el-dialog>

</template>
<script>
import * as getDictionaryList from '@/api/sys/data-dictionary'
import * as assetsServer from '@/api/assets/assets'
import * as GetDepartmentList from '@/api/sys/person'
export default {
  name: 'allotDialog',
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
      departmentList: [], // 公司选项列
      form: {
        owner: '',
        current: '',
        cardIdItems: ''
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
    this.getDictionary()
    this.getDepartment()
  },
  methods: {
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
    // 获取公司列表
    getDepartment () {
      this.loading = true
      GetDepartmentList.GetDepartmentList().then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.departmentList = data.departmentList
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
      if (this.form.owner === '') {
        this.$message({
          message: '请先选择调拨公司!',
          type: 'warning'
        })
        return
      }
      if (this.kindid === '0') {
        this.kindId = null
      }
      const param = {
        'kindId': this.kindId.toString(),
        'department': this.form.owner
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
    },
    close () {
      this.dialogClose()
    },
    dialogClose () {
      this.dialogVisible = false
    },
    // 表格复选框改变
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // tag删除
    // handleClose (tag) {
    //   this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1)
    // },
    saveAllot () {
      this.form.cardIdItems = this.multipleSelection.map(function (item) {
        return item['cardId']
      })
      if (this.form.owner !== '') {
        if (this.form.current !== '') {
          if (this.form.owner === this.form.current) {
            this.$message({
              message: '调拨公司与接收公司不可相同!',
              type: 'warning'
            })
            return
          }
          if (this.form.cardIdItems.length !== 0) {
            this.loading = true
            const param = {
              'owner': this.form.owner,
              'current': this.form.current,
              'cardIdItems': this.form.cardIdItems
            }
            assetsServer.Allot(param).then(data => {
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
            this.$message({
              message: '调拨资产不可为空!',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '接收公司不可为空!',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '调拨公司不可为空!',
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
