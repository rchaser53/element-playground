var Vue = require('vue');
const {
  Table: ElTable,
  TableColumn: ElTableColumn,
  Pagination: ElPagination,
  Loading,
  Button: ElButton,
  FormItem: ElFormItem
} = require('element-ui')

require('element-theme-chalk/lib/table.css')
require('element-theme-chalk/lib/pagination.css')
require('element-theme-chalk/lib/icon.css')
require('element-theme-chalk/lib/loading.css')

Vue.use(Loading.directive)

new Vue({
  el: '#app',
  mounted () {
    fetch('http://localhost:3100/tabledata', {
      mode: 'cors'
    }).then((ret) => ret.json())
      .then((ret) => {
        Vue.set(this, 'tableData', ret.data)
        // actually doen't need to setTimeout. this setTimeout exists just to show loading
        setTimeout(() => {
          Vue.set(this, 'loading', false)
        }, 1000)
      })
      .catch((err) => {
        console.error(err)
      })

    setInterval(() => {
      Vue.set(this, 'filterValue', this.$refs.filter.value)
    }, 200)
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      filterValue: '',
      loading: true,
      deleteTargetRows: []
    }
  },
  components: {
    'el-pagination': ElPagination,
    'el-table': ElTable,
    'el-table-column': ElTableColumn,
    'el-button': ElButton,
    'el-form-item': ElFormItem
  },
  methods: {
    changePage (value) {
      Vue.set(this, 'currentPage', value)
    },
    changeFilterValue (event) {
      Vue.set(this, 'filterValue', event.target.value)
    },
    fireRemoveRows () {
      this.removeTargetRows(this.deleteTargetRows)
      Vue.set(this, 'deleteTargetRows', [])
    },
    handleEdit (index, row) {
      console.log(index, row, 'edit')
    },
    handleSelectionChange (targetRows) {
      Vue.set(this, 'deleteTargetRows', targetRows)
    },
    removeTargetRows (targetRows) {
      const newData = targetRows.reduce((stack, current) => {
        return stack.filter((targetData) => {
          return targetData.id !== current.id
        })
      }, this.tableData)
      Vue.set(this, 'tableData', newData)
    },
    sortTableRow (columnData) {
      console.log('you can get columnData to sort', columnData)
    }
  },
  computed: {
    dataLength () {
      return this.tableData.length
    },
    filteredData () {
      const filteredData = this.filterValue !== ''
        ? this.tableData.filter((record) => {
          return Object.values(record).some((recordValue) => {
            return recordValue.includes(this.filterValue)
          })
        })
        : this.tableData
      return filteredData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    pageSize () {
      return 20
    }
  }
})