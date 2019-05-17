<template>
  <d2-container>
		<el-button type="text" style="color:#666;" icon="el-icon-refresh" @click="pageRefresh">刷新</el-button>
		<!-- 表格 -->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      :default-sort = "{prop: 'date', order: 'descending'}"
      size="small"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!--<el-table-column fixed type="selection" width="30"/>-->
      <el-table-column fixed type="index" label="序号" align="center" width="80" />
      <el-table-column prop="orderNo" label="采购单号" align="center" width="200"/>
      <el-table-column prop="totalPrice" label="总价" align="center"/>
      <el-table-column prop="entryOperator" label="入账操作员" align="center"/>
      <el-table-column prop="entryTime" label="入账时间" align="center"/>
      <el-table-column prop="state" label="订单状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state==0">
            <el-tag size="small" type="info">未入库</el-tag>
          </div>
          <div v-if="scope.row.state==1">
            <el-tag size="small">已入库</el-tag>
          </div>
          <div v-if="scope.row.state==2">
            <el-tag size="small" type="success">已入账</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="60px">
        <template slot-scope="scope">
          <el-button
            title="查看"
            size="mini"
            icon="el-icon-view"
            circle
            @click="showDetial(scope.row)"
          />
        </template>
      </el-table-column>
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
    <!-- <edit-form :dictionary="dictionary" v-model="editFormVisible" @submit="getTableData"/> -->
    <detial-form :procurement="procurement" v-model="detialFormVisible" @submit="getTableData"/>
  </d2-container>
</template>

<script>
import * as billActionService from '@/api/bill/bill'
import detialForm from './detial'
export default {
  // 入账
  name: 'stockIn',
  components: { detialForm },
  data () {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      procurement: {
      },
      tableData: [
      ],
      multipleSelection: [],
      loading: false,
      editFormVisible: false,
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
      billActionService.BillList(param).then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.tableData = []
          this.tableData = data.purchaseMasterList.list
          this.page.total = parseInt(data.purchaseMasterList.size)
        }
      }).catch(err => {
        if (err) {
          this.loading = false
        }
      })
    },
    selectChange () {
      this.getTableData()
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
    // 批量删除
    // alertDel () {
    //   this.$confirm('确认删除？', '确认信息', {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: '删除',
    //     cancelButtonText: '取消'
    //   }).then(() => {
    //     const data = {
    //       'orderNoOfDeletePurchaseItems': this.InListPurchaseMaster.map(s => s.orderNo)
    //     }
    //     entryActionService.DeletePurchase(data).then(() => {
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
