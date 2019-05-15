<template>
  <d2-container>
    <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="openAdd">新增</el-button>
    <el-button
      v-if="multipleSelection.length>0"
      type="danger"
      size="mini"
      icon="el-icon-delete"
      @click="alertDel"
    >删除</el-button>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="30"/>
      <el-table-column fixed prop="id" label="序号" align="center" width="100"/>
      <el-table-column prop="kind" label="名称" width="300"/>
      <el-table-column prop="quantityState" label="保存方式">
        <template slot-scope="scope">
          <div v-if="scope.row.quantityState==1">
            <el-tag size="small" type="info">按个</el-tag>
          </div>
          <div v-if="scope.row.quantityState==2">
            <el-tag size="small">按批</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <edit-form :dictionary="dictionary" v-model="editFormVisible" @submit="getTableData"/>
  </d2-container>
</template>

<script>
import * as dictionaryService from '@/api/sys/data-dictionary'
import editForm from './editForm'
export default {
  // 数据字典
  name: 'dataDictionary',
  components: { editForm },
  data () {
    return {

      page: {
        current: 1,
        size: 10,
        total: 0
      },
      dictionary: {
      },
      tableData: [],
      multipleSelection: [],
      loading: false,
      editFormVisible: false
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    // 获取表格内容
    getTableData () {
      this.loading = true
      dictionaryService.getDictionary().then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.tableData = []
          this.tableData = data.dictionaryList
          // this.page.total = parseInt(data.dictionaryList.total)
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
    // 添加窗口弹出
    openAdd () {
      this.editFormVisible = true
    },
    // 批量删除
    alertDel () {
      this.$confirm('确认删除？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        const data = {
          'dictionaryIdList': this.multipleSelection.map(s => s.id)
        }
        dictionaryService.DeleteDictionary(data).then(() => {
          if (!data.hasOwnProperty('code')) {
            this.getTableData()
          }
        })
      })
    },
    // 表格中按钮-编辑
    openEdit (dictionary) {
      this.dictionary = dictionary
      this.editFormVisible = true
    }
  }
}
</script>
