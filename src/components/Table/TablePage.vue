<template>
  <div class="table-content">
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      :height="tableHeight"
      size="mini"
      @selection-change="handleSelectionChange"
    >
      <!--排序-->
      <el-table-column v-if="columns.type === 'index' && !isMB" type="index" width="40" />
      <!--选择框-->
      <el-table-column v-if="columns.type === 'select'" :selectable="row => !disabledList.includes(row.id)" type="selection" width="40" />
      <!--列表项-->
      <el-table-column
        v-for="item of columns.list"
        :key="item.key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        align="center"
        :show-overflow-tooltip="!item.hideTip"
        :fixed="item.fixed && isMB"
      >
        <div v-if="item.slot" slot-scope="scope">
          <slot :name="item.slot" :props="scope" />
        </div>
        <div v-else slot-scope="scope">
          {{scope.row[item.prop]}}
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pageData"
      :current-page="pageData.page"
      :page-sizes="pageData.pageSizes"
      :total="pageData.total"
      :page-size="pageData.limit"
      :pager-count="5"
      :layout="layout"
      @size-change="(val) => handlePageChange({limit: val, page: 1})"
      @current-change="(val) => handlePageChange({page: val})"
    />
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapState, mapActions} = createNamespacedHelpers('common')

  export default {
    name: 'TablePage',
    props: {
      tableData: {
        type: Array,
        default: null
      },
      columns: {
        type: Object,
        default: null
      },
      pageData: {
        type: Object,
        default: null
      },
      loading: {
        type: Boolean,
        default: null
      },
      height: {
        type: [Number, String],
        default: 'calc(100vh - 160px)'
      }
    },
    data() {
      return {
        selection: null,
        layout: '',
        tableHeight: null
      }
    },
    computed: mapState(['disabledList', 'isMB', 'selectedRow']),
    mounted() {
      this.selectedRow.length && this.$nextTick(() => {
        this.selectedRow.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(this.tableData.find(item => item.handicap === row.handicap))
        })
      })
      this.layout = this.isMB ? 'pager, jumper' : 'total, sizes, prev, pager, next, jumper'
      if (this.isMB && typeof this.height === 'string') {
        const vh = window.innerHeight + 'px'
        this.tableHeight = this.height.replace('100vh', vh)
      } else {
        this.tableHeight = this.height
      }
    },
    destroyed() {
      this.setState(['tableSelect', []])
      this.setState(['disabledList', []])
    },
    methods: {
      ...mapActions(['setState', 'setTableSelect']),
      // 每页显示条数或当前页切换
      handlePageChange(val) {
        let pageData = JSON.parse(JSON.stringify(this.pageData))
        pageData = {...pageData, ...val}
        this.$emit('update:pageData', pageData)
      },
      // select选中的列
      handleSelectionChange(val) {
        this.setTableSelect(['tableSelect', val])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-content {
    width: 100%;
    font-size: 0;
    text-align: center;
    background: #fff;
    color: #333;

    /deep/ .operate-btn {
      display: inline-block;
      padding: 0 5px;
    }
  }
</style>
