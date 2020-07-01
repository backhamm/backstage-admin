<template>
  <div>
    <table-search :search-list="searchList" :params.sync="searchParams" @search="getTableList(1)"></table-search>
    <table-page
      :table-data="tableData"
      :columns="columns"
      :loading="loading"
      :page-data.sync="pageData"
    >
    </table-page>
  </div>
</template>

<script>
  import {columns, pageData, searchParams, searchList} from './data/systemLog'
  import {getLogList, getLogType} from '../../api/system'
  import mixin from '@/components/mixin'

  export default {
    name: 'SystemLog',
    mixins: [mixin],
    data() {
      return {
        columns,
        pageData,
        searchParams,
        searchList,
        tableData: [],
        loading: false
      }
    },
    created() {
      getLogType().then(res => {
        const options = this.getOptions(res.data)
        this.searchList[1].options = [{value: '', label: '全部'}, ...options]
      })
    },
    methods: {
      // 当前table列表
      getTableList(currentPage) {
        this.searchParams.functionName = this.searchParams.cascader[1] || ''
        this.searchParams.modelName = this.searchParams.cascader[0] || ''
        this.getTableListApi(currentPage, getLogList)
      },
      getOptions(list) {
        return Object.keys(list).map(item => {
          const children = list[item].map(child => ({value: child, label: child}))
          return {value: item, label: item, children}
        })
      }
    }
  }
</script>
