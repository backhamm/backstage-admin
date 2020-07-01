<template>
  <div>
    <table-page v-if="currentUserInfo.userId" class="mt-05 info-table" :table-data="[currentUserInfo]"
                :columns="userColumns" :height="70">
      <span slot="role" slot-scope="data">{{ data.props.row.role | roleName }}</span>
    </table-page>
    <table-search :search-list="searchList" :params.sync="searchParams" @search="getTableList(1)">
      <div slot="before">
        <el-dropdown class="mr-1" trigger="click">
          <el-button type="warning" size="mini">{{btnText}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) of tableList" :key="item" @click.native="toggleTable(i)">{{item}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-auth="'subordinate:addUser'" size="mini" type="warning" @click="showModelFun(1)">添加下级</el-button>
        <el-button v-auth="'subordinate:addUser'" class="mr-1" size="mini" type="warning" @click="showModelFun(0)">
          添加会员
        </el-button>
      </div>
    </table-search>
    <bread-crumbs :bread-list.sync="breadList" @changeCurrentInfo="changeCurrentInfo"/>
    <table-page
      :key="tableType"
      :table-data="tableData"
      :columns="columns"
      :loading="loading"
      :page-data.sync="pageData"
      height="calc(100vh - 265px)"
    >
      <div v-if="tableType" slot="name" slot-scope="data" class="blue" @click="changeCurrentInfo(data.props.row)">{{
        data.props.row.name }}
      </div>
      <span v-else>{{ data.props.row.name }}</span>
      <span slot="role" slot-scope="data">{{ data.props.row.role | roleName }}</span>
      <el-switch slot="status" v-model="data.props.row.status" slot-scope="data" active-color="#42b983"
                 :disabled="!hasRole('subordinate:editUserStatus')" :active-value="0" :inactive-value="1"
                 @change="changeStatus(data.props.row)"/>
      <el-button-group slot="operate" slot-scope="data">
        <el-button v-if="!tableType" v-auth="'gameReport:memberHistoryReport'" size="mini">
          <router-link :to="{path: '/noteData/noteSummary', query: {name: data.props.row.name}}">注单</router-link>
        </el-button>
        <el-button v-auth="'subordinate:editUser'" size="mini" @click="showModelFun(2, data)">编辑</el-button>
        <el-button v-auth="'subordinate:transfer'" size="mini" @click="showModelFun(3, data)">加减点</el-button>
        <el-button v-if="tableType" v-auth="'subordinate:editUserAuth'" size="mini" @click="showModelFun(4, data)">权限</el-button>
        <el-button v-if="!tableType" v-auth="'subordinate:getGameBalance'" size="mini" @click="showModelFun(5, data)">游戏厅余额</el-button>
      </el-button-group>
    </table-page>
    <offline-add :visible.sync="showStepModel" :data.sync="modelData" @confirm="modelConfirm"/>
    <v-model :visible.sync="showModel" :data.sync="modelData" :card-style="cardStyle" @confirm="modelConfirm"/>
  </div>
</template>

<script>
  import {
    addList,
    addParams,
    columns,
    editList,
    modelData,
    pageData,
    searchList,
    searchParams,
    transferList,
    transferParams,
    userColumns,
    authList,
    authParams
  } from './data/offline'
  import OfflineAdd from './components/offlineAdd'
  import {filterRole} from '../../utils/filter'
  import * as api from '../../api/offline'
  import mixin from '../../components/mixin'
  import {createNamespacedHelpers, mapGetters} from 'vuex'
  import {hasRole} from '../../utils/directive'

  const {mapState, mapActions} = createNamespacedHelpers('common')

  export default {
    name: 'Offline',
    components: {OfflineAdd},
    mixins: [mixin],
    data() {
      return {
        columns,
        userColumns,
        pageData,
        searchParams,
        searchList,
        modelData,
        hasRole,
        cardStyle: {},
        loading: false,
        showStepModel: false,
        showModel: false,
        breadList: [{name: '', userId: 0}],
        tableData: [],
        tableList: ['会员列表', '代理列表', '子账户列表'],
        tableType: 1,
        modelType: 0,
        currentOperateId: null,
        balanceTableList: []
      }
    },
    computed: {
      ...mapState(['tableSelect']),
      ...mapGetters(['userData', 'currentUserInfo']),
      btnText() {
        return this.tableList[this.tableType]
      }
    },
    watch: {
      'modelData.params.type'(val) {
        if (val === undefined) return
        const money = this.tableData.find(item => item.userId === this.currentOperateId).balance
        this.modelData.list[1].max = val ? money : this.currentUserInfo.balance
        this.modelData.list[1].prompt = val ? `当前账户还有${money}可减` : `上级还有${this.currentUserInfo.balance}可加`
      }
    },
    mounted() {
      this.breadList[0].name = this.userData.name
      this.breadList[0].userId = this.userData.userId
    },
    destroyed() {
      this.setState(['currentUserInfo', {}])
    },
    methods: {
      ...mapActions(['setState']),
      // 当前table列表
      async getTableList(currentPage) {
        this.searchParams.isMember = this.tableType
        !this.currentUserInfo.userId && await this.getUserInfo()
        this.searchParams.parentId = this.currentUserInfo.userId
        this.getTableListApi(currentPage, api.getSubUserList)
      },
      // 当前用户信息
      getUserInfo(id = this.userData.userId, save = true, success) {
        this.loading = true
        return new Promise(resolve => {
          api.getUserInfo({id}).then(res => {
            if (res.status === 10000) {
              success && success(res.data)
              save && this.setState(['currentUserInfo', res.data])
              this.loading = false
              resolve(res.data)
            }
          })
        })
      },
      // 切换为代理/会员/子账号列表
      toggleTable(i) {
        if (i === 2) {
          return this.$router.push({path: '/subAccount'})
        }
        this.tableType = i
        this.searchList[0].placeholder = this.tableList[this.tableType].replace('列表', '用户名')
        this.getTableList(1)
      },
      // 切换账号状态
      changeStatus({status, userId}) {
        this.loading = true
        api.changeUserStatus({status, userId}).then(() => {
          this.getTableList()
        })
      },
      // 切换当前用户
      async changeCurrentInfo({name, userId}) {
        !this.breadList.some(item => item.userId === userId) && this.breadList.push({name, userId})
        await this.getUserInfo(userId)
        this.getTableList(1)
      },
      // 显示Model
      async showModelFun(type, data) {
        const dataObj = data && data.props.row
        this.currentOperateId = dataObj && dataObj.userId
        if ([3, 4, 5].includes(type)) {
          this.cardStyle = {width: '500px'}
          this.modelData.type = 'single'
        } else {
          this.cardStyle = {}
          this.modelData.type = ''
        }
        this.modelType = type
        const titleArr = ['添加会员', '添加下级', '编辑', '加减点', '权限', '游戏厅余额']
        const titleName = data ? data.props.row.name : this.currentUserInfo.name
        this.modelData.title = titleName + titleArr[type]
        switch (type) {
          case 0: case 1:
            return this.showAddModel(type)
          case 2:
            const res = await this.getUserInfo(dataObj.userId, false)
            return this.showEditModel(res)
          case 3:
            await this.getUserInfo(this.currentUserInfo.userId)
            return this.showTransferModel(dataObj)
          case 4:
            return this.showAuthModel(dataObj)
          case 5:
            return this.showBalanceModel()
        }
      },
      // Model确定
      modelConfirm() {
        this.modelType < 2 && (this.tableType = this.modelType)
        switch (this.modelType) {
          case 0:
          case 1:
            return this.apiRequest(api.getAddSubUser)
          case 2:
            return this.apiRequest(api.editSubUser)
          case 3:
            return this.apiRequest(api.transferCount, () => this.getUserInfo(this.currentUserInfo.userId))
          case 4:
            return this.apiRequest(api.editUserAuth)
          case 5:
            this.setState(['isRequest', false])
            return (this.showModel = false)
        }
      },
      getOccupyList(data) {
        data.occupyList.forEach((item, i) => {
          const occupy = (this.modelType === 1 || data.role === 'member') ? 0 : item.occupy * 100
          this.modelData.params.occupyList[i] = {gameType: item.gameType, occupy}
        })
        this.currentUserInfo.occupyList.forEach((item, i) => {
          const {gameName, occupy} = item
          this.modelData.list[1][i] = {title: gameName, list: [{key: 'occupy', max: occupy * 100}]}
        })
      },
      // 添加Model
      showAddModel(type) {
        this.modelData.params = JSON.parse(JSON.stringify(addParams))
        this.modelData.params.role = type ? filterRole(this.currentUserInfo.role, 2) : 'member'
        this.modelData.params.topUserId = this.currentUserInfo.userId
        if (type) {
          this.modelData.list = addList
          this.getOccupyList(this.currentUserInfo)
          this.showStepModel = true
        } else {
          this.modelData.list = addList[0]
          this.showModel = true
        }
      },
      // 编辑Model
      showEditModel(res) {
        const arr = ['name', 'userId', 'nickName', 'phone', 'rmk']
        this.modelData.params = JSON.parse(JSON.stringify(addParams))
        arr.forEach(key => {
          this.modelData.params[key] = res[key]
        })
        if (res.role === 'member') {
          this.modelData.list = editList[0]
          this.showModel = true
        } else {
          this.modelData.list = editList
          this.getOccupyList(res)
          this.showStepModel = true
        }
      },
      // 显示加减点
      showTransferModel(data) {
        this.modelData.params = JSON.parse(JSON.stringify(transferParams))
        this.modelData.params.userId = data.userId
        this.modelData.list = transferList
        const max = this.currentUserInfo.balance
        this.modelData.list[1].max = max
        this.modelData.list[1].prompt = `上级还有${max}可加`
        this.showModel = true
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
      // 权限model
      showAuthModel({userId}) {
        this.modelData.params = JSON.parse(JSON.stringify(authParams))
        this.modelData.params.userId = userId
        this.modelData.list = authList
        api.getUserAuth({id: userId}).then(res => {
          if (res.status === 10000) {
            const treeArr = []
            this.modelData.params.menuIdList = res.data.userMenus
            this.getAuthTree(res.data.topUserMenus, treeArr)
            this.modelData.list[0].treeArr = treeArr
            this.showModel = true
          }
        })
      },
      // 显示余额
      async showBalanceModel(gameType, success) {
        const userInfo = await this.getUserInfo(this.currentOperateId, false)
        !success && (this.loading = true)
        api.getGameBalance({userId: this.currentOperateId, gameType}).then(res => {
          success && success()
          this.loading = false
          if (res.status === 10000) {
            let total = 0
            res.data.push({gameName: '中心钱包', balance: userInfo.balance})
            res.data.forEach(item => {
              item.balance === undefined ? total += 0 : total += item.balance
            })
            res.data.push({gameName: '总计', balance: total})
            const tableList = res.data.map(item => ({...item, balance: item.balance === undefined ? '维护中' : item.balance}))
            if (gameType) {
              this.balanceTableList.find(item => item.gameCode === gameType).balance = tableList[0].balance
              this.balanceTableList.find(item => item.gameName === '中心钱包').balance = userInfo.balance
            } else {
              this.balanceTableList = tableList
            }
            this.modelData.list = [{
              type: 'gameBalance',
              tableList: this.balanceTableList,
              columns: {
                list: [
                  {key: 'gameName', prop: 'gameName', label: '游戏名'},
                  {key: 'balance', prop: 'balance', label: '余额', slot: 'balance'},
                  {key: 'operate', prop: 'operate', label: '操作', slot: 'operate'}
                ]
              }
            }]
          }
          this.showModel = true
        })
      },
      // 转出余额
      rollOutBalance(gameType, success) {
        api.rollOutGameBalance({userId: this.currentOperateId, gameType}).then(() => {
          success && success()
        })
      }
    }
  }
</script>
