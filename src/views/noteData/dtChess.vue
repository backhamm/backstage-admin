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
      <span slot="profit" slot-scope="data" :style="{color: data.props.row.profit < 0 ? 'red' : 'green'}">{{data.props.row.profit}}</span>
      <span v-if="noResolution.includes(data.props.row.gameId)" slot="cardValue" slot-scope="data">无解析牌值</span>
      <el-button v-else-if="data.props.row.cardValue" slot="cardValue" slot-scope="data" size="mini" @click="seeDetails(data.props.row)">详情</el-button>
      <span v-else-if="data.props.row.gameName" slot="cardValue">暂无数据</span>
    </table-page>
  </div>
</template>

<script>
  import {columns, pageData, searchParams, searchList, userOptions} from './data/dtChess'
  import {getDtChess} from '../../api/nodeData'
  import mixin from '@/components/mixin'
  import {mapGetters} from 'vuex'

  export default {
    name: 'DtChess',
    mixins: [mixin],
    data() {
      return {
        columns,
        pageData,
        searchParams,
        searchList,
        userOptions,
        tableData: [],
        loading: false,
        noResolution: ['500', '510', '520', '530', '1350']
      }
    },
    computed: mapGetters(['cardObj']),
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
      seeDetails({cardValue, chairId, gameName, gameId}) {
        this.$store.dispatch('common/setState', ['cardObj', {cardValue, chairId, gameId, gameName, gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '2924273722242627', chairId, gameId: '720', gameName: '百人二八杠', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '360c2c14180000000000140c2d17130000000000102', chairId, gameId: '830', gameName: '抢庄牛牛', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '1072D11283B2371A1C06233362B2A2134432181327095142631382C020304', chairId, gameId: '930', gameName: '百人牛牛', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '161c', chairId, gameId: '900', gameName: '百人龙虎', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '161c1c000000262c2c000000363c3d402', chairId, gameId: '860', gameName: '三公', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '253607213A18', chairId, gameId: '210', gameName: '红黑大战', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '012d1317,103d062a,23032703,3023253d-2233b|411c29,50393b', chairId, gameId: '600', gameName: '二十一点', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '360c2c14180000000000140c2d17130000000000002', chairId, gameId: '870', gameName: '通比牛牛', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '161c1d2715262c2d142300000000000000000000000000000002', chairId, gameId: '400', gameName: '通比牛牛', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '360c2c14180000000000140c2d17130000000000102', chairId, gameId: '890', gameName: '看牌抢庄牛牛', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '0703320C1902120B16262D28383614103', chairId, gameId: '240', gameName: '抢庄炸金花', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '1D1B0217361A26060A0905153B0127221632333A303', chairId, gameId: '880', gameName: '百变抢庄牛牛', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '3A37390C35042A063215', chairId, gameId: '200', gameName: '红黑斗牛', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '1313461644552634202', chairId, gameId: '730', gameName: '抢庄牌九', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '3b2c110,04352607384,323d2d1d0d7,3;342b0b1,2336062a1a2,22123929096,0;1112131415161718191a1b1c1d231', chairId, gameId: '630', gameName: '十三水', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '0||0,0|9,1,2,4,7,2,6,7,5,10,2,5,11,1,5|0-0', chairId, gameId: '1810', gameName: '水果机', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '0||0,0|9,1,2,4,7,2,6,7,5,10,2,5,11,1,5|0-0', chairId, gameId: '1820', gameName: '新水果机', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '5-20', chairId, gameId: '1960', gameName: '奔驰宝马', gameClass: 'DTQP'}])
        // this.$store.dispatch('common/setState', ['cardObj', {cardValue: '0-8', chairId, gameId: '1940', gameName: '金鲨银鲨', gameClass: 'DTQP'}])
      }
    }
  }
</script>
