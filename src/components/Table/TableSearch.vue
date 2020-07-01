<template>
  <div class="table-search">
    <slot name="before"></slot>
    <div v-for="item of searchList" :key="item.key" class="mr-1">
      <!--添加按钮-->
      <el-button v-if="item.type === 'add'" size="mini" type="warning" icon="el-icon-plus" @click="$emit('showModel')">添加</el-button>
      <!--输入框-->
      <el-input v-else-if="item.type === 'input'" v-model.trim="params[item.key]" class="input" clearable :placeholder="item.placeholder" size="mini" type="text" @keyup.13.native="$emit('search')"></el-input>
      <!--级联选择器-->
      <el-cascader v-else-if="item.type === 'cascader'" v-model="params[item.key]" style="width: 160px;" :placeholder="item.placeholder" size="mini" :options="item.options" clearable></el-cascader>
      <!--select选择器-->
      <div v-else-if="item.type === 'select'">
        {{item.title}}:
        <el-select v-model="params[item.key]" class="select" :style="{width: item.width + 'px'}" size="mini">
          <el-option
            v-for="option of item.options"
            :key="option.id"
            :label="option.name"
            :value="option.id">
          </el-option>
        </el-select>
      </div>
      <!--时间选择器-->
      <div v-else-if="item.type === 'time'">
        <el-date-picker
          v-model="params[item.key]"
          size="mini"
          style="width: 180px"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          :placeholder="item.title"
          :clearable="false"
          :picker-options="pickerOptions"
          :default-time="item.defaultTime">
        </el-date-picker>
        <span style="margin-left: 5px">{{item.timeText}}</span>
      </div>
      <!--查询按钮-->
      <el-button v-else-if="item.type === 'search'" class="mr-1" size="mini" type="warning" icon="el-icon-search" @click="$emit('search')">查询</el-button>
    </div>
    <div>
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../utils/filter'

  export default {
    name: 'TableSearch',
    props: {
      params: {
        type: Object,
        default: null
      },
      searchList: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        showMore: false,
        pickerOptions: {
          disabledDate: (time) => {
            return this.dealDisabledDate(time)
          }
        }
      }
    },
    watch: {
      'params.startTime'(val) {
        !val && this.defaultTime('startTime')
      },
      'params.endTime'(val) {
        !val && this.defaultTime('endTime')
      }
    },
    created() {
      this.params.startTime !== undefined && this.defaultTime()
    },
    methods: {
      dealDisabledDate(time) {
        const times = Date.now()
        return time.getTime() > times || time.getTime() < times - 92 * 24 * 3600 * 1000
      },
      defaultTime(type) {
        if (this.params && !this.params.startTime) {
          const now = Date.now()
          const params = JSON.parse(JSON.stringify(this.params))
          if (type === 'startTime') {
            params.startTime = formatDate(now, 'yyyy-mm-dd') + ' 00:00:00'
          } else if (type === 'endTime') {
            params.endTime = formatDate(now, 'yyyy-mm-dd') + ' 23:59:59'
          } else {
            // params.startTime = formatDate(now, 'yyyy-mm-dd') + ' 00:00:00'
            params.startTime = '1999-12-12 00:00:00'
            params.endTime = formatDate(now, 'yyyy-mm-dd') + ' 23:59:59'
          }
          this.$emit('update:params', params)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-search {
    display: flex;
    height: 40px;
    padding-top: 6px;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;

    .input {
      width: 130px;
    }

    .select {
      width: 95px;
    }
  }
</style>
