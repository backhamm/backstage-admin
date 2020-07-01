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
    </table-page>
  </div>
</template>

<script>
  import {columns, pageData, searchParams, searchList, userOptions} from './data/mgElectron'
  import {getDtChess} from '../../api/nodeData'
  import mixin from '@/components/mixin'

  export default {
    name: 'MgElectron',
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
