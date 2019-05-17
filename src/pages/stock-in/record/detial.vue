<template>
  <el-dialog :visible.sync="dialogVisible" title="入库详情" @opened="dialogOpen" @closed="dialogClose" width="750px">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="detialInofo">
          <el-row style="margin-bottom:10px;">
            <el-col :span="10">采购单号: {{ procurement.orderNo }}</el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">订单状态:
              <template>
                <div class="tag-state" v-if="procurement.state==0">
                  <el-tag size="small" type="info">未入库</el-tag>
                </div>
                <div class="tag-state" v-if="procurement.state==1">
                  <el-tag size="small">已入库</el-tag>
                </div>
                <div class="tag-state" v-if="procurement.state==2">
                  <el-tag size="small" type="success">已入账</el-tag>
                </div>
              </template>
            </el-col>
            <el-col :span="12">总价: <div style="color: red; display: inline-block;">{{ procurement.totalPrice }}￥</div> </el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">采购操作员: {{ procurement.operator }}</el-col>
            <el-col :span="12">采购时间: {{ procurement.orderTime }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">入库操作员: {{ procurement.inOperator }}</el-col>
            <el-col :span="12">入库时间: {{ procurement.inTime }}</el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="12">入账操作员: {{ procurement.operator }}</el-col>
            <el-col :span="12">入账时间: {{ procurement.orderTime }}</el-col>
          </el-row> -->
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
          </el-table>
        </el-card>
      </el-col>
    </el-row>

  </el-dialog>

</template>
<script>
// import * as procurementService from '@/api/procurement/procurement'
export default {
  name: 'procurementDetial',
  props: {
    procurement: Object,
    value: Boolean
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      purchaseDetailSet: []
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
      console.log(this.procurement)
      this.purchaseDetailSet = this.procurement.purchaseDetailSet
    },
    close () {
      this.dialogClose()
    },
    dialogClose () {
      this.dialogVisible = false
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
</style>
