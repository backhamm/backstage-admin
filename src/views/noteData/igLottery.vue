<template>
  <div>
    <table-search :search-list="searchList" :params.sync="searchParams" @search="search"></table-search>
    <table-page
      class="subtotal-table"
      :table-data="tableData"
      :columns="columns"
      :loading="loading"
      :page-data.sync="pageData"
    >
      <span slot="winLoss" slot-scope="data" :style="{color: data.props.row.winLoss < 0 ? 'red' : 'green'}">{{data.props.row.winLoss}}</span>
      <span slot="odds" slot-scope="data" v-if="data.props.row.odds">{{getOdds(data.props.row)}}</span>
      <div v-if="data.props.row.gameName" style="line-height: 1" slot="gameName" slot-scope="data">
        <span>{{data.props.row.gameName}}</span><br>
        <span style="color: green">{{data.props.row.gameNo}}期</span>
      </div>
    </table-page>
  </div>
</template>

<script>
  import {columns, pageData, searchParams, searchList, userOptions} from './data/igLottery'
  import {getDtChess} from '../../api/nodeData'
  import mixin from '@/components/mixin'

  export default {
    name: 'IgLottery',
    mixins: [mixin],
    props: {
      type: {
        type: String,
        default: 'IG'
      }
    },
    data() {
      return {
        columns,
        pageData,
        searchParams,
        searchList,
        userOptions,
        tableData: [],
        loading: false
      }
    },
    created() {
      this.searchParams.gameType = this.type
    },
    methods: {
      // 当前table列表
      getTableList(currentPage) {
        this.getTableListApi(currentPage, getDtChess)
      },
      search() {
        this.userOptions.forEach(item => {
          this.searchParams[item.id] = ''
        })
        this.searchParams[this.searchParams.nameType] = this.searchParams.name
        this.getTableList(1)
      },
      getOdds({betOnValue, betTypeValue, odds}) {
        return `${betOnValue}【${betTypeValue}】@${odds}`
      }
    }
  }
</script>
