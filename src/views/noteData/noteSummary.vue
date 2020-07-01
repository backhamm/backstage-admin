<template>
  <div>
    <table-search :search-list="searchList" :params.sync="searchParams" @search="getTableList(1)"></table-search>
    <table-page
      class="subtotal-table"
      :table-data="tableData"
      :columns="columns"
      :loading="loading"
      :page-data.sync="pageData"
    >
      <span v-if="gameTypeList.length" slot="platformType" slot-scope="data">{{ getGameType(data.props.row.platformType) }}</span>
      <span slot="netAmount" slot-scope="data" :style="{color: data.props.row.netAmount < 0 ? 'red' : 'green'}">{{data.props.row.netAmount}}</span>
    </table-page>
  </div>
</template>

<script>
  import {columns, pageData, searchParams, searchList} from './data/noteSummary'
  import {getUserNode} from '../../api/nodeData'
  import {getGameType} from '../../api/system'
  import mixin from '@/components/mixin'

  export default {
    name: 'NoteSummary',
    mixins: [mixin],
    data() {
      return {
        columns,
        pageData,
        searchParams,
        searchList,
        tableData: [],
        loading: false,
        gameTypeList: []
      }
    },
    created() {
      this.searchParams.userName = this.$route.query.name || ''
      getGameType().then(res => {
        const gameKey = Object.keys(res.data)
        this.gameTypeList = gameKey.map(item => ({id: item, name: res.data[item]}))
        this.searchList[1].options = [{id: '', name: '全部'}, ...this.gameTypeList]
      })
    },
    methods: {
      // 当前table列表
      getTableList(currentPage) {
        this.getTableListApi(currentPage, getUserNode)
      },
      getGameType(type) {
        const arr = this.gameTypeList.find(item => item.id === type)
        if (arr) return arr.name
      }
    }
  }
</script>
