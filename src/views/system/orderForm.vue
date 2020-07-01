<template>
  <div>
    <table-search :search-list="searchList" :params.sync="searchParams" @search="getTableList(1)"></table-search>
    <table-page
      :table-data="tableData"
      :columns="columns"
      :loading="loading"
      :page-data.sync="pageData"
    >
      <span slot="type" slot-scope="data" :style="{color: data.props.row.type === '0'? 'red' : 'green'}">{{data.props.row.type === '0' ? '转出' : '转入'}}</span>
      <span v-if="gameTypeList.length" slot="gameType" slot-scope="data">{{ getGameType(data.props.row.gameType) }}</span>
      <el-button-group slot="operate" slot-scope="data">
        <el-button v-auth="'order:queryOrder'" size="mini" @click="showModelFun(0, data)">第三方订单</el-button>
      </el-button-group>
    </table-page>
  </div>
</template>

<script>
  import {columns, pageData, searchParams, searchList, modelData} from './data/orderForm'
  import * as api from '../../api/system'
  import mixin from '@/components/mixin'
  import {mapGetters} from 'vuex'

  export default {
    name: 'OrderForm',
    mixins: [mixin],
    data() {
      return {
        columns,
        pageData,
        searchParams,
        searchList,
        modelData,
        tableData: [],
        loading: false,
        showModel: false,
        modelType: 0
      }
    },
    computed: mapGetters(['gameTypeList']),
    methods: {
      // 当前table列表
      getTableList(currentPage) {
        this.getTableListApi(currentPage, api.getOrderFormList)
      },
      getGameType(type) {
        const arr = this.gameTypeList.find(item => item.id === type)
        if (arr) return arr.name
      },
      // 显示Model
      async showModelFun(type, data) {
        const dataObj = data && data.props.row
        this.modelType = type
        const titleArr = ['第三方订单']
        const titleName = data ? data.props.row.name : this.parentVal()
        this.modelData.title = titleName + titleArr[type]
        switch (type) {
          case 0:
            this.showOtherModel(dataObj)
            break
        }
        this.showModel = true
      },
      showOtherModel({userId, gameType, billno}) {
        this.loading = true
        api.getOtherOrder({userId, gameType, orderNo: billno}).then(res => {
          this.loading = false
          this.$alert(res.data ? '订单存在' : '订单异常', '订单详情',
            {
              type: res.data ? 'success' : 'error',
              confirmButtonText: '确定'
            })
        })
      }
    }
  }
</script>
