<template>
  <d2-container>
    <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="openAdd">领用</el-button>
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
      <el-table-column fixed type="index" label="序号" align="center" width="80" />
      <el-table-column prop="receiveId" label="领用编号" align="center" width="140"/>
      <el-table-column prop="receiveTime" label="领用时间" align="center" minWidth="160"/>
      <el-table-column prop="userName" label="领用人" align="center"/>
      <el-table-column prop="purpose" label="用途" align="center"/>
      <el-table-column prop="getState" label="订单状态" align="center" width="140">
        <template slot-scope="scope">
          <div v-if="scope.row.getState==0">
            <el-tag size="small" type="success">已归还</el-tag>
          </div>
          <div v-if="scope.row.getState==1">
            <el-tag size="small" type="info">未归还</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" />
      <el-table-column fixed="right" label="操作" align="center" width="120px">
        <template slot-scope="scope">
          <el-button
            title="查看"
            size="mini"
            icon="el-icon-view"
            circle
            @click="showDetial(scope.row)"
          />
          <el-button
            title="归还"
            v-if="scope.row.getState==1&&role=='admin'"
            size="mini"
            type="success"
            icon="el-icon-check"
            circle
            @click="check(scope.row.receiveId)"
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
    <use-form v-model="useFormVisible" @submit="getTableData"/>
    <detial-form :row="row" v-model="detialFormVisible"/>
  </d2-container>
</template>

<script>
import util from '@/libs/util.js'
import * as assetsService from '@/api/assets/assets'
import useForm from './use'
import detialForm from './detial'
export default {
  // 资产领用/归还/报废
  name: 'assetOperations',
  components: { useForm, detialForm },
  data () {
    return {
      activeName: 'first',
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      row: {
      },
      tableData: [
      ],
      role: '',
      multipleSelection: [],
      loading: false,
      useFormVisible: false,
      detialFormVisible: false
    }
  },
  mounted () {
    this.getTableData()
    this.role = util.cookies.get('userRole')
    console.log(this.role)
  },
  methods: {
    // 获取表格内容
    getTableData () {
      this.loading = true
      const param = {
        'pageNum': this.page.current,
        'pageSize': this.page.size
      }
      assetsService.UsedList(param).then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.tableData = []
          this.tableData = data.ReceiveMasterList.list
          this.page.total = parseInt(data.ReceiveMasterList.size)
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
      this.row = row
      this.detialFormVisible = true
    },
    check (id) {
      this.$confirm('确认归还？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const data = {
          'receiveIdList': [id]
        }
        assetsService.Return(data).then(() => {
          if (!data.hasOwnProperty('code')) {
            this.getTableData()
          }
        })
      })
    }
  }
}
</script>
