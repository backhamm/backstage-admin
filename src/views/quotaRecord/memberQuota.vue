<template>
  <div>
    <table-search :search-list="searchList" :params.sync="searchParams" @search="getTableList(1)"></table-search>
    <table-page
      class="subtotal-table"
      :table-data="tableData"
      :columns="type ? proxyColumns : columns"
      :loading="loading"
      :page-data.sync="pageData"
    >
      <span slot="type" slot-scope="data">{{ operateTypeArr[data.props.row.type] }}</span>
      <span v-if="gameTypeList.length" slot="gameType" slot-scope="data">{{ getGameType(data.props.row.gameType) }}</span>
      <span slot="money" slot-scope="data" :style="{color: data.props.row.money < 0 ? 'red' : 'green'}">{{ data.props.row.money }}</span>
    </table-page>
  </div>
</template>

<script>
  import {columns, proxyColumns, pageData, searchParams, searchList} from './data/memberQuota'
  import * as api from '../../api/offline'
  import mixin from '@/components/mixin'
  import {mapGetters} from 'vuex'

  export default {
    name: 'MemberQuota',
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
        proxyColumns,
        searchList,
        options: [{id: '', name: '全部'}, {id: 0, name: '转出'}, {id: 1, name: '转入'}, {id: 2, name: '加点'}, {id: 3, name: '减点'}],
        tableData: [],
        operateTypeArr: ['转出', '转入', '加点', '减点'],
        loading: false
      }
    },
    computed: mapGetters(['gameTypeList']),
    watch: {
      gameTypeList(val) {
        !this.type && (this.searchList[2].options = val)
      }
    },
    created() { this.init() },
    methods: {
      init() {
        !this.type && (this.searchList[2].options = this.gameTypeList)
        this.searchList[0].placeholder = `下线${this.type ? '代理' : '会员'}账号`
        if (this.type) {
          this.searchList[1].options = [{id: '', name: '全部'}, {id: 0, name: '加点'}, {id: 1, name: '减点'}]
          this.operateTypeArr = this.operateTypeArr.slice(-2)
          this.searchList = this.searchList.filter(item => item.key !== 'gameType')
        } else {
          this.searchList[1].options = this.options
        }
      },
      // 当前table列表
      async getTableList(currentPage) {
        this.getTableListApi(currentPage, this.type ? api.getProxyQuotaRecord : api.getMemberQuotaRecord)
      },
      getGameType(type) {
        const arr = this.gameTypeList.find(item => item.id === type)
        if (arr) return arr.name
      }
    }
  }
</script>
