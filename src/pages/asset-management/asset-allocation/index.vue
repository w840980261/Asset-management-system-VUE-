<template>
  <d2-container>
    <el-button type="primary" size="mini" icon="el-icon-circle-plus" v-if="allotAble" @click="openAdd">发起调拨</el-button>
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
      <el-table-column prop="owner" label="调拨方" align="center" width="160"/>
      <el-table-column prop="current" label="接收方" align="center" width="160"/>
      <el-table-column prop="startTime" label="发起时间" align="center" minWidth="160"/>
      <el-table-column prop="state" label="订单状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state==0">
            <el-tag size="small" type="info">等待调拨方核对</el-tag>
          </div>
          <div v-if="scope.row.state==1">
            <el-tag size="small" type="warning">等待接收方核对</el-tag>
          </div>
          <div v-if="scope.row.state==2">
            <el-tag size="small" type="success">调拨完成</el-tag>
          </div>
        </template>
      </el-table-column>
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
            title="核对"
            v-if="scope.row.alc==true"
            size="mini"
            type="success"
            icon="el-icon-check"
            circle
            @click="check(scope.row.allotId)"
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
    <allot-form v-model="useFormVisible" @submit="getTableData"/>
    <detial-form :row="row" v-model="detialFormVisible"/>
  </d2-container>
</template>

<script>
import util from '@/libs/util.js'
import * as assetsService from '@/api/assets/assets'
import allotForm from './allot'
import detialForm from './detial'
export default {
  // 资产调拨
  name: 'assetAllocation',
  components: { allotForm, detialForm },
  data () {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      tableData: [
      ],
      row: {},
      multipleSelection: [],
      loading: false,
      useFormVisible: false,
      detialFormVisible: false,
      allotAble: false
    }
  },
  mounted () {
    this.getTableData()
    const department = util.cookies.get('department')
    if (department === '1') {
      this.allotAble = true
    }
  },
  methods: {
    // 获取表格内容
    getTableData () {
      this.loading = true
      const param = {
        'pageNum': this.page.current,
        'pageSize': this.page.size
      }
      assetsService.AllotList(param).then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.tableData = []
          this.tableData = data.AllotMaster.list
          this.page.total = parseInt(data.AllotMaster.size)
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
      this.$confirm('核对确认？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const data = {
          'AllotId': id
        }
        assetsService.AllotCheck(data).then(() => {
          if (!data.hasOwnProperty('code')) {
            this.getTableData()
          }
        })
      })
    }
  }
}
</script>
