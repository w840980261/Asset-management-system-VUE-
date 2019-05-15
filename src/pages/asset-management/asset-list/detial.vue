<template>
  <el-dialog :visible.sync="dialogVisible" title="采购详情" @opened="dialogOpen" @closed="dialogClose" width="750px">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="detialInofo">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row style="margin-bottom:10px;">
            <el-col :span="12">卡片编号: {{ procurement.cardId }}</el-col>
            <el-col :span="12">入库时间: {{ procurement.inTime }}</el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-col :span="6">名称: {{ procurement.assetsName }}</el-col>
            <el-col :span="6">数量: {{ procurement.quantity }}</el-col>
            <el-col :span="6">单价: {{ procurement.unitPrice }}</el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-col :span="6">制造商: {{ procurement.maker }}</el-col>
            <el-col :span="6">供应商: {{ procurement.supplier }}</el-col>
            <el-col :span="6">保修年限: {{ procurement.fixYear }}</el-col>
            <el-col :span="6">使用年限: {{ procurement.lifeFactor }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12" style="height:60px;line-height:60px;">产品序列号:
              <img style="width:200px;" :src="imagesrc" alt="">
            </el-col>
            <!-- <el-col :span="8">备注: {{ procurement.orderNo }}</el-col> -->
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>财务信息</span>
          </div>
          <el-row style="margin-bottom:10px;">
            <el-col :span="8">财务编码: {{ procurement.financeId }}</el-col>
            <el-col :span="8">凭证号: {{ procurement.accountId }}</el-col>
            <!-- <el-col :span="8">入账时间: {{ procurement.inAccountTime }}</el-col> -->
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>资产信息</span>
          </div>
          <el-row style="margin-bottom:10px;">
            <el-col :span="8">资产编码: {{ procurement.assetsId }}</el-col>
            <el-col :span="8">资产类别: {{ procurement.kind }}</el-col>
            <el-col :span="8">使用状况:
              <template>
                <div class="tag-state" v-if="procurement.assetsState==0">
                  <el-tag size="small" type="success">未领用</el-tag>
                </div>
                <div class="tag-state" v-if="procurement.assetsState==1">
                  <el-tag size="small" type="info">已领用</el-tag>
                </div>
                <div class="tag-state" v-if="procurement.assetsState==2">
                  <el-tag size="small" type="danger">报废</el-tag>
                </div>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">资产归属: {{ procurement.ascription }}</el-col>
            <el-col :span="8">保管人: {{ procurement.depository }}</el-col>
            <el-col :span="8">使用人: {{ procurement.userName }}</el-col>
          </el-row>
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
      purchaseDetailSet: [],
      imagesrc: ''
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
      this.imagesrc = 'data:image/png;base64,' + this.procurement.code
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
