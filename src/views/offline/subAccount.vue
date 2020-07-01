<template>
  <div>
    <table-search :search-list="searchList" :params.sync="searchParams" @search="getTableList(1)">
      <div slot="before" class="mr-1" style="line-height: 30px;">
        <span class="mr-1">总账户：{{parentName}}</span>
        <el-button v-auth="'userSub:userSubAdd'" size="mini" type="warning" icon="el-icon-plus" @click="showModelFun(0)">添加</el-button>
      </div>
    </table-search>
    <table-page
      :table-data="tableData"
      :columns="columns"
      :loading="loading"
      :page-data.sync="pageData"
    >
      <el-switch slot="status" v-model="data.props.row.status" slot-scope="data" :disabled="!hasRole('userSub:userSubEditStatus')" active-color="#42b983" :active-value="0" :inactive-value="1" @change="changeStatus(data.props.row)" />
      <el-button-group slot="operate" slot-scope="data">
        <el-button v-auth="'userSub:userSubEdit'" size="mini" @click="showModelFun(1, data)">编辑</el-button>
        <el-button v-auth="'userSub:editSubUserAuth'" size="mini" @click="showModelFun(2, data)">权限</el-button>
      </el-button-group>
    </table-page>
    <v-model :visible.sync="showModel" :data.sync="modelData" :card-style="{width: '500px'}" @confirm="modelConfirm" />
  </div>
</template>

<script>
  import {columns, pageData, searchParams, searchList, modelData, addParams, addList, editParams, editList, authParams, authList} from './data/subAccount'
  import * as api from '../../api/offline'
  import mixin from '@/components/mixin'
  import {mapGetters} from 'vuex'
  import {hasRole} from '../../utils/directive'

  export default {
    name: 'SubAccount',
    mixins: [mixin],
    props: {
      type: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        columns,
        pageData,
        searchParams,
        searchList,
        modelData,
        hasRole,
        tableData: [],
        currentOperateUser: {},
        loading: false,
        modelType: 0,
        showModel: false
      }
    },
    computed: {
      ...mapGetters(['currentUserInfo', 'userData']),
      parentName() {
        return this.currentUserInfo.name || this.userData.name
      }
    },
    created() {
      this.searchParams.fatherId = this.currentUserInfo.userId || this.userData.userId
    },
    methods: {
      parentVal(key = 'name') {
        return this.currentUserInfo[key] || this.userData[key]
      },
      // 当前table列表
      getTableList(currentPage) {
        this.getTableListApi(currentPage, api.getSubAccountList)
      },
      // 切换账号状态
      changeStatus({status, userId}) {
        this.loading = true
        api.changeSubAccount({status, userId}).then(() => {
          this.getTableList()
        })
      },
      // 当前操作用户信息
      getUserInfo(id) {
        this.loading = true
        return new Promise(resolve => {
          api.getSubUserInfo({id}).then(res => {
            this.currentOperateUser = res.data
            this.loading = false
            resolve()
          })
        })
      },
      // 显示Model
      async showModelFun(type, data) {
        const dataObj = data && data.props.row
        this.modelType = type
        const titleArr = ['添加子账号', '编辑']
        const titleName = data ? data.props.row.name : this.parentVal()
        this.modelData.title = titleName + titleArr[type]
        type === 1 && await this.getUserInfo(dataObj.userId)
        switch (type) {
          case 0:
            this.showAddModel()
            break
          case 1:
            this.showEditModel()
            break
          case 2:
            this.showAuthModel(dataObj)
            break
        }
        this.showModel = true
      },
      // Model确定
      modelConfirm() {
        switch (this.modelType) {
          case 0:
            return this.apiRequest(api.addSubAccount)
          case 1:
            return this.apiRequest(api.editSubAccount)
          case 2:
            return this.apiRequest(api.editSubUserAuth)
        }
      },
      showAddModel() {
        this.modelData.params = JSON.parse(JSON.stringify(addParams))
        this.modelData.params.fatherId = this.parentVal('userId')
        this.modelData.list = addList
      },
      showEditModel() {
        const arr = ['userId', 'rmk', 'nickName', 'name']
        this.modelData.params = JSON.parse(JSON.stringify(editParams))
        arr.forEach(item => {
          this.modelData.params[item] = this.currentOperateUser[item]
        })
        this.modelData.list = editList
      },
      getAuthTree(data, arr) {
        data.forEach((item, i) => {
          arr.push({id: item.id, label: item.name})
          if (item.menuTree.length) {
            arr[i].children = []
            this.getAuthTree(item.menuTree, arr[i].children)
          }
        })
      },
      showAuthModel({userId}) {
        this.modelData.params = JSON.parse(JSON.stringify(authParams))
        this.modelData.params.userId = userId
        this.modelData.list = authList
        api.getSubUserAuth({id: userId}).then(res => {
          if (res.status === 10000) {
            const treeArr = []
            this.modelData.params.menuIdList = res.data.userMenus
            this.getAuthTree(res.data.topUserMenus, treeArr)
            this.modelData.list[0].treeArr = treeArr
            this.showModel = true
          }
        })
      }
    }
  }
</script>
