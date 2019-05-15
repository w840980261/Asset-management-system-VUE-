<template>
  <el-dialog :visible.sync="dialogVisible" title="移交详细" @opened="dialogOpen" @closed="dialogClose" width="750px">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="detialInofo">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">领用编号: {{ row.receiveId }}</el-col>
            <el-col :span="8">领用状况:
              <template>
                <div class="tag-state" v-if="row.getState==0">
                  <el-tag size="small" type="success">已归还</el-tag>
                </div>
                <div class="tag-state" v-if="row.getState==1">
                  <el-tag size="small" type="info">未归还</el-tag>
                </div>
              </template>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">领用人: {{ row.userName }}</el-col>
            <el-col :span="12">领用时间: {{ row.receiveTime }}</el-col>
          </el-row>
          <el-row style="margin-bottom:10px;" v-if="row.getState==0">
            <el-col :span="12">归还人: {{ row.recordReturn.returnName }}</el-col>
            <el-col :span="12">归还时间: {{ row.recordReturn.returnTime }}</el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">用途: {{ row.purpose }}</el-col>
            <el-col :span="12">备注: {{ row.note }}</el-col>
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
