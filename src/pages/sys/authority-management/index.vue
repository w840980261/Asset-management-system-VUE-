<template>
  <d2-container>
    <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="openAdd">新增人员</el-button>
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
      <el-table-column prop="account" label="账号" align="center"/>
      <el-table-column prop="userName" label="用户名" align="center"/>
      <el-table-column prop="departmentName" label="公司" align="center"/>
      <el-table-column prop="phone" label="手机号" align="center" width="150" />
      <el-table-column prop="roleName" label="角色" align="center"/>
      <el-table-column prop="sex" label="性别" align="center"/>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status==0">
            <el-tag size="small" type="info">离职</el-tag>
          </div>
          <div v-if="scope.row.status==1">
            <el-tag size="small" type="success">在职</el-tag>
          </div>
          <div v-if="scope.row.status==2">
            <el-tag size="small">锁定</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="160px">
        <template slot-scope="scope">
          <el-button
            title="编辑"
            size="mini"
            icon="el-icon-edit"
            circle
            @click="Edit(scope.row)"
          />
          <el-button
            title="删除"
            size="mini"
            icon="el-icon-delete"
            circle
            @click="Delete(scope.row.id)"
          />
          <el-button
            title="重置密码"
            size="mini"
            icon="el-icon-setting"
            circle
            @click="updatePassword(scope.row.id)"
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
    <edit-form :person="person" v-model="editFormVisible" @submit="getTableData"/>
    <!-- <detial-form :procurement="procurement" v-model="detialFormVisible" @submit="getTableData"/> -->
  </d2-container>
</template>

<script>
import * as personActionService from '@/api/sys/person'
import editForm from './editForm'
export default {
  // 入库
  name: 'authorityManagement',
  components: { editForm },
  data () {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      person: {
      },
      tableData: [
      ],
      multipleSelection: [
      ],
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
      personActionService.GetPersonList(param).then(data => {
        if (!data.hasOwnProperty('code')) {
          this.loading = false
          this.tableData = []
          this.tableData = data.userList
          this.page.total = parseInt(data.total)
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
    //     personActionService.DeletePurchase(data).then(() => {
    //       if (!data.hasOwnProperty('code')) {
    //         this.getTableData()
    //       }
    //     })
    //   })
    // },
    // 详情窗口弹出
    openAdd () {
      this.person = {}
      this.editFormVisible = true
    },
    // 详情窗口弹出
    Edit (row) {
      this.person = row
      this.editFormVisible = true
    },
    Delete (id) {
      this.$confirm('确认删除？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        const data = {
          'id': id.toString()
        }
        personActionService.DeletePerson(data).then(() => {
          if (!data.hasOwnProperty('code')) {
            this.getTableData()
          }
        })
      })
    },
    updatePassword (id) {
      this.$confirm('确认重置密码为"88888888"？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        const data = {
          'id': id.toString(),
          'password': '88888888'
        }
        personActionService.UpdatePassword(data).then(() => {
          if (!data.hasOwnProperty('code')) {
            // this.getTableData()
          }
        })
      })
    }
  }
}
</script>
