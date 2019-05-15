<template>
  <el-dialog :visible.sync="dialogVisible" title="移交详细" @opened="dialogOpen" @closed="dialogClose" width="750px">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="detialInofo">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">移交编号: {{ row.receiveId }}</el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">发起人: {{ row.ownerName }}</el-col>
            <el-col :span="12">发起时间: {{ row.time }}</el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">接收人: {{ row.currentName }}</el-col>
            <el-col :span="12">接收时间: {{ row.checkTime }}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>资产信息</span>
          </div>
          <el-row style="margin-bottom:10px;">
            <el-table
      ref="multipleTable"
      :data="row.transferDetailList"
      size="small"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- <el-table-column fixed type="selection" width="30"/> -->
      <el-table-column fixed type="index" label="序号" align="center" width="80" />
      <el-table-column prop="assetsId" label="资产编码" align="center" width="160"/>
      <el-table-column prop="assetsItem.asssetsName" label="名字" align="center" width="100"/>
      <el-table-column prop="assetsItem.kind" label="资产类型" align="center" width="100"/>
      <el-table-column prop="assetsItem.price" label="单价" align="center"/>
      <el-table-column prop="assetsItem.quantity" label="数量" align="center"/>
    </el-table>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

  </el-dialog>

</template>
<script>
// import * as rowService from '@/api/row/row'
export default {
  name: 'rowDetial',
  props: {
    row: Object,
    value: Boolean
  },
  data () {
    return {
      loading: false,
      dialogVisible: false
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
    //   console.log(this.row)
    //   this.imagesrc = 'data:image/png;base64,' + this.row.code
    //   this.purchaseDetailSet = this.row.purchaseDetailSet
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
