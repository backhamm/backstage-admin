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
      <span slot="netAmount" slot-scope="data" :style="{color: data.props.row.netAmount < 0 ? 'red' : 'green'}">{{data.props.row.netAmount}}</span>
      <div style="line-height: 1" slot="gamecode" slot-scope="data">
        {{data.props.row.gamecode}}-<br>{{data.props.row.sessionid}}
      </div>
    </table-page>
  </div>
</template>

<script>
  import {columns, pageData, searchParams, searchList, userOptions} from './data/ptElectron'
  import {getDtChess} from '../../api/nodeData'
  import mixin from '@/components/mixin'

  export default {
    name: 'PtElectron',
    mixins: [mixin],
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
      }
    }
  }
</script>
