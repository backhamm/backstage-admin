export default {
  mounted() {
    this.getTableList()
  },
  watch: {
    pageData() {
      this.getTableList()
    }
  },
  methods: {
    /**
     * @param currentPage 当前页，不传保持原来的页数
     * @param request 需要发送的post请求
     * @param callback 请求成功后需要执行的操作
     */
    getTableListApi(currentPage, request, callback) {
      currentPage && (this.pageData.page = currentPage)
      this.loading = true
      const {page, limit} = this.pageData
      request({page, limit, ...this.searchParams}).then(({data}) => {
        callback && callback()
        if (data.total) {
          this.pageData.total = data.total
          this.tableData = data.records
        } else {
          this.tableData = []
        }
        this.loading = false
      })
    },
    // 确认操作（编辑，添加，权限修改，加减点等）的公用方法
    apiRequest(callback, success) {
      callback(this.modelData.params).then(res => {
        this.getTableList()
        success && success()
        this.showModel = res.status !== 10000
        this.showStepModel !== undefined && (this.showStepModel = res.status !== 10000)
      })
    }
  }
}
