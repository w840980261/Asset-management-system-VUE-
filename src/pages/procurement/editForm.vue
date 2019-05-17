<template>
  <el-dialog :visible.sync="dialogVisible" title="新增采购单" @opened="dialogOpen" @closed="dialogClose" width="750px">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card :body-style="{ padding: '20px 20px 0 20px' }">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm" size="mini">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="类别" prop="kindId">
                  <el-select v-model="form.kindId">
                    <el-option
                      v-for="item in kinds"
                      :key="item.id"
                      :label="item.kind"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="quantity">
                  <el-input-number v-model="form.quantity" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="单价" prop="unitPrice">
                  <el-input-number v-model="form.unitPrice" :min="0" :precision="2"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地区" prop="area">
                  <el-input v-model="form.summaryAssets.area"></el-input>
                </el-form-item>
                <el-form-item label="货物归属" prop="ascription">
                  <el-input v-model="form.summaryAssets.ascription"></el-input>
                </el-form-item>
                <el-form-item label="制造商" prop="maker">
                  <el-input v-model="form.summaryAssets.maker"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplier">
                  <el-input v-model="form.summaryAssets.supplier"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <!-- <el-form-item label="凭证号" prop="accountId">
                  <el-input v-model="form.summaryAssets.accountId"></el-input>
                </el-form-item>
                <el-form-item label="保管人" prop="depository">
                  <el-input v-model="form.summaryAssets.depository"></el-input>
                </el-form-item> -->
                <el-form-item label="使用年限" prop="lifeFactor">
                  <el-input v-model="form.summaryAssets.lifeFactor"></el-input>
                </el-form-item>
                <el-form-item label="保修年限" prop="fixYear">
                  <el-input v-model="form.summaryAssets.fixYear"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item >
              <el-button type="primary" @click="addGood('form')">添加商品</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card :body-style="{ padding: '20px' }">
          <el-table
            :data="purchaseDetailSet"
            size="small"
            stripe
            style="width: 100%"
            ref="multipleTable">
            <el-table-column fixed type="index" label="序号" align="center" width="80" />
            <el-table-column prop="kind" label="类别" align="center"/>
            <el-table-column prop="name" label="名称" align="center"/>
            <el-table-column prop="quantity" label="数量" align="center"/>
            <el-table-column prop="unitPrice" label="单价" align="center"/>
            <el-table-column prop="summaryAssets.area" label="地区" align="center"/>
            <el-table-column prop="summaryAssets.ascription" label="货物归属" align="center"/>
            <el-table-column prop="summaryAssets.maker" label="制造商" align="center"/>
            <el-table-column prop="summaryAssets.supplier" label="供应商" align="center"/>
            <el-table-column prop="summaryAssets.accountId" label="凭证号" align="center"/>
            <el-table-column prop="summaryAssets.depository" label="保管人" align="center"/>
            <el-table-column prop="summaryAssets.lifeFactor" label="使用年限" align="center"/>
            <el-table-column prop="summaryAssets.fixYear" label="保修年限" align="center"/>
            <el-table-column fixed="right" label="操作" align="center" width="80px">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  title="删除"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="deleteRow(scope.$index)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-button :loading="loading" type="primary" @click="saveProcurement">确定</el-button>
    <el-button @click="close">取消</el-button>

  </el-dialog>

</template>
<script>
import * as procurementService from '@/api/procurement/procurement'
import * as dictionaryService from '@/api/sys/data-dictionary'
export default {
  name: 'procurementEditForm',
  props: {
    procurement: Object,
    value: Boolean
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        kindId: '',
        name: '',
        quantity: '',
        unitPrice: '',
        summaryAssets: {
          area: '',
          ascription: '',
          maker: '',
          supplier: '',
          accountId: '',
          depository: '',
          lifeFactor: '',
          fixYear: ''
        }
      },
      kinds: [],
      purchaseDetailSet: [],
      rules: {
        // 校验手机号码，主要通过validator来指定验证器名称
        kindId: [{
          required: true,
          message: '请选择类型',
          trigger: 'change'
        }],
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        quantity: [{
          required: true,
          message: '请输入数量',
          trigger: 'blur'
        }],
        unitPrice: [{
          required: true,
          message: '请输入单价',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted () {
    this.getDictionary()
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
    getDictionary () {
      dictionaryService.getDictionary().then(data => {
        if (!data.hasOwnProperty('code')) {
          this.kinds = data.dictionaryList
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    addGood (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.purchaseDetailSet.push(JSON.parse(JSON.stringify(this.form)))
          this.$refs[formName].resetFields()
        }
      })
    },
    deleteRow (id) {
      this.purchaseDetailSet.splice(id, 1)
    },
    saveProcurement () {
      if (this.purchaseDetailSet.length > 0) {
        this.loading = true
        const param = {
          'remark': '', // 类型：String  可有字段  备注：备注——可为空
          'purchaseDetailSet': this.purchaseDetailSet
        }
        procurementService.AddPurchase(param).then(data => {
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
          message: '请添加商品!',
          type: 'warning'
        })
      }
    },
    dialogOpen () {
      this.$refs.form.resetFields()
      this.purchaseDetailSet = []
    },
    close () {
      this.dialogClose()
    },
    dialogClose () {
      // this.$refs['form'].resetFields()
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.el-card{
  margin-bottom: 20px;
}
</style>
