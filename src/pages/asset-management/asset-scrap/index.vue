<template>
  <d2-container>
    <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="openAdd">报废</el-button>
    <el-button type="text" style="color:#666;" icon="el-icon-refresh" @click="pageRefresh">刷新</el-button>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      size="small"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column fixed type="selection" width="30"/> -->
      <el-table-column prop="scrapId" label="报废编号" align="center" width="160" />
      <el-table-column prop="assetsId" label="资产编号" align="center" width="200"/>
      <el-table-column prop="notifier" label="申报人" align="center" width="100"/>
      <el-table-column prop="scrapTime" label="报废时间" align="center"/>
      <el-table-column prop="note" label="备注" show-overflow-tooltip/>
    </el-table>

    <template slot="footer">
      <el-pagination
        :current-page="page.current"
        :page-sizes="[10,20,30]"
        :page-size="page.size"
        :total="page.total"
        layout="total, sizes, prev, pager, next"
        style="margin: -10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <scrap-form v-model="useFormVisible" @submit="getTableData"/>
  </d2-container>
</template>

<script>
import * as assetsService from '@/api/assets/assets'
import scrapForm from './scrap'
export default {
  // 资产调拨
  name: 'assetScrap',
  components: { scrapForm },
  data () {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      tableData: [
      ],
      multipleSelection: [],
      loading: false,
      useFormVisible: false,
      detialFormVisible: false
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    // 获取表格内容
    getTableData () {
      this.loading = true
      const param = {
        'pageNum': this.page.current,
        'pageSize': this.page.size
      }
      assetsService.ScrapList(param).then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.tableData = []
          this.tableData = data.RecordScrap.list
          this.page.total = parseInt(data.RecordScrap.size)
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    // 搜索刷新
    pageRefresh () {
      this.getTableData()
    },
    // 表格复选框改变
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 分页条数变化
    handleSizeChange (val) {
      this.page.size = val
      this.getTableData()
    },
    // 分页页面变化
    handleCurrentChange (val) {
      this.page.current = val
      this.getTableData()
    },
    // 添加窗口弹出
    openAdd () {
      this.useFormVisible = true
    },
    // 批量删除
    // alertDel () {
    //   this.$confirm('确认删除？', '确认信息', {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: '删除',
    //     cancelButtonText: '取消'
    //   }).then(() => {
    //     const data = {
    //       'orderNoOfDeletePurchaseItems': this.multipleSelection.map(s => s.orderNo)
    //     }
    //     procurementService.DeletePurchase(data).then(() => {
    //       if (!data.hasOwnProperty('code')) {
    //         this.getTableData()
    //       }
    //     })
    //   })
    // },
    // 详情窗口弹出
    showDetial (row) {
      this.procurement = row
      this.detialFormVisible = true
    }
  }
}
</script>
