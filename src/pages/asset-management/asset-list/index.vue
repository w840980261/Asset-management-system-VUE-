<template>
  <d2-container>
    <el-button type="text" style="color:#666;" icon="el-icon-refresh" @click="pageRefresh">刷新</el-button>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      size="small"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!--<el-table-column fixed type="selection" width="30"/>-->
      <!-- <el-table-column fixed type="index" label="序号" align="center" width="80" /> -->
      <el-table-column prop="cardId" label="卡片编号" align="center" width="100" />
      <el-table-column prop="assetsId" label="资产编码" align="center" width="200" />
      <el-table-column prop="assetsName" label="名称" align="center"/>
      <el-table-column prop="kind" label="类型" align="center"/>
      <el-table-column prop="quantity" label="数量" align="center"/>
      <el-table-column prop="unitPrice" label="单价" align="center"/>
      <el-table-column prop="assetsState" label="资产状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.assetsState==0">
            <el-tag size="small" type="success">未领用</el-tag>
          </div>
          <div v-if="scope.row.assetsState==1">
            <el-tag size="small" type="info">已领用</el-tag>
          </div>
          <div v-if="scope.row.assetsState==2">
            <el-tag size="small" type="danger">报废</el-tag>
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
    <!-- <edit-form :procurement="procurement" v-model="editFormVisible" @submit="getTableData"/> -->
    <detial-form :procurement="procurement" v-model="detialFormVisible" @submit="getTableData"/>
  </d2-container>
</template>

<script>
import * as assetsService from '@/api/assets/assets'
// import editForm from './editForm'
import detialForm from './detial'
export default {
  // 采购
  name: 'assetList',
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
      assetsService.AssetsList(param).then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.tableData = []
          this.tableData = data.Assets.list
          this.page.total = parseInt(data.Assets.size)
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
      this.editFormVisible = true
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
