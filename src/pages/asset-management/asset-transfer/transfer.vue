<template>
  <el-dialog :visible.sync="dialogVisible" title="发起调拨" @opened="dialogOpen" @closed="dialogClose" width="900px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="detialInofo">
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
            <el-form-item label="接收人" prop="department">
              <el-select v-model="form.currentId" placeholder="必选" size="mini">
                <el-option
                  v-for="item in personList"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="移交资产" prop="department" style="margin-bottom:10px;">
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
      <el-button :loading="loading" type="primary" @click="saveTransfer">调拨</el-button>
      <el-button @click="close">取消</el-button>
    </span>
  </el-dialog>

</template>
<script>
import * as assetsServer from '@/api/assets/assets'
export default {
  name: 'transferDialog',
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
      personList: [], // 公司选项列
      form: {
        currentId: '',
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
    this.getPersonList()
  },
  methods: {
    // 获取个人资产列表
    getOwnerAssets () {
      this.loading = true
      assetsServer.OwnerAssets().then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.tableData = data.Assets
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    // 获取可移交对象列表
    getPersonList () {
      this.loading = true
      assetsServer.GetCouldTransferUserList().then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.personList = data.couldTransferUsers
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    dialogOpen () {
      this.getOwnerAssets()
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
    saveTransfer () {
      this.form.cardIdItems = this.multipleSelection.map(function (item) {
        return item['cardId']
      })
      if (this.form.currentId !== '') {
        if (this.form.cardIdItems.length !== 0) {
          this.loading = true
          const param = {
            'currentId': this.form.currentId.toString(),
            'cardIdItems': this.form.cardIdItems
          }
          assetsServer.Transfer(param).then(data => {
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
            message: '移交资产不可为空!',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '接收人不可为空!',
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
