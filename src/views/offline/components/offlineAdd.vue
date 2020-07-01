<template>
  <transition name="show">
    <div v-if="visible" class="model">
      <div class="model-content" :style="cardStyle">
        <div class="title">{{ data.title }}<i class="close-icon fr el-icon-close" @click="close" /></div>
        <el-steps style="margin-top: 20px" align-center :active="active" finish-status="success">
          <el-step v-for="item of (maxActive + 1)" :key="item" />
        </el-steps>
        <div class="main two-columns">
          <template v-if="active === 0 || active === maxActive">
            <div class="step-title">用户基本信息</div>
            <template v-for="item of data.list[0]">
              <div :key="item.key" class="tow-item">
                <div class="item-wrapper">
                  <div class="item-title">{{ checkData[item.key].title }}:</div>
                  <!--文本域（备注）-->
                  <el-input v-if="checkData[item.key].type === 'textarea'" v-model="data.params[item.key]" class="item-main" type="textarea" />
                  <!--输入框-->
                  <div v-else class="item-main">
                    <el-input v-model.trim="data.params[item.key]" :placeholder="item.placeholder || checkData[item.key].placeholder || checkData[item.key].errMsg" :disabled="item.disabled" :type="checkData[item.key].inputType || 'text'" :maxlength="checkData[item.key].maxlength" size="mini" @blur="checkName(item.key)">
                      <template v-if="item.append" slot="append">{{ item.append }}</template>
                    </el-input>
                    <div class="input-prompt">{{item.prompt}}</div>
                  </div>
                  <div v-if="item.must" class="must">*</div>
                </div>
              </div>
            </template>
          </template>
          <template v-if="active === 1 || active === maxActive">
            <div class="step-title">占成配置</div>
            <el-row type="flex" style="line-height: 30px">
              <el-col :span="12"></el-col>
              <el-col :span="12">占成（%）</el-col>
            </el-row>
            <template v-for="(item, i) of data.list[1]">
              <div :key="item.key" class="occupy-list">
                <el-row type="flex">
                  <el-col class="occupy-title" :span="12">{{ item.title }}</el-col>
                  <el-col v-for="occupy of item.list" :key="occupy.key" :span="12">
                    <el-input-number v-model="data.params.occupyList[i][occupy.key]" style="width: 80%; max-width: 180px" :precision="2" :step="0.1" :min="0" :max="occupy.max" size="mini" @change="$forceUpdate()" />
                    <div class="input-prompt">最大 {{ (occupy.max).toFixed(2) }}%</div>
                  </el-col>
                </el-row>
              </div>
            </template>
          </template>
          <!--<div v-if="active === 2 || active === maxActive">-->
            <!--<div class="step-title">盘口配置</div>-->
            <!--<table-page :table-data="currentUserInfo.handicapList" :columns="handicapColumns" :height="330"/>-->
          <!--</div>-->
        </div>
        <div class="footer">
          <el-button class="btn cancel" @click="nextStep(-1)">{{ 0 === this.active ? '取消' : '上一步' }}</el-button>
          <el-button :loading="isRequest" class="btn confirm" @click="nextStep(1)">{{ this.maxActive === this.active ? '确定' : '下一步' }}</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import {checkData} from '../../../utils/checkData'
  import {validUsername} from '../../../api/offline'

  const {mapState, mapActions} = createNamespacedHelpers('common')
  const handicapColumns = {
    type: 'select',
    list: [
      {key: 'handicap', prop: 'handicap', label: '盘口', fixed: true},
      {key: 'handicapDesc', prop: 'handicapDesc', label: '描述', minWidth: 400}
    ]
  }

  export default {
    name: 'OfflineAdd',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      cardStyle: {
        type: Object,
        default: null
      },
      data: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        checkData,
        handicapColumns,
        copyParams: {},
        active: 0,
        maxActive: 2
      }
    },
    computed: mapState(['isRequest', 'tableSelect', 'currentUserInfo']),
    watch: {
      visible(val) {
        if (val) {
          this.copyParams = JSON.parse(JSON.stringify(this.data))
        } else {
          this.active = 0
          this.$emit('update:data', JSON.parse(JSON.stringify(this.copyParams)))
        }
      }
    },
    methods: {
      ...mapActions(['setState']),
      checkParams() {
        if (this.data.list[0]) {
          for (let i = 0; i < this.data.list[0].length; i++) {
            const item = this.data.list[0][i]
            const params = this.data.params[item.key]
            if (item.must && !params && params !== 0) {
              this.$message({
                message: `请正确填写必填项: ${checkData[item.key].title}！`,
                type: 'error'
              })
              return 'Error'
            }
            if (item.reg && !item.reg.test(params)) {
              this.$message({
                message: checkData[item.key].title + item.placeholder,
                type: 'error'
              })
              return 'Error'
            } else if (!item.reg && checkData[item.key].reg && !checkData[item.key].reg.test(params)) {
              this.$message({
                message: checkData[item.key].title + checkData[item.key].errMsg,
                type: 'error'
              })
              return 'Error'
            }
          }
        }
      },
      confirm() {
        if (!this.isRequest) {
          this.setState(['isRequest', true])
          this.$emit('confirm', this.data.params.role)
        }
      },
      close() {
        this.setState(['isRequest', false])
        this.setState(['selectedRow', []])
        this.$emit('update:visible', false)
      },
      checkName(type) {
        if (type === 'name' && this.data.params.name) {
          this.setState(['isRequest', true])
          validUsername({name: this.data.params.name})
        }
      },
      nextStep(type) {
        if (type > 0 && (this.active === 0 || this.active === this.maxActive) && this.checkParams() === 'Error') return
        // if (type > 0 && (this.active === 2 || this.active === this.maxActive)) {
        //   if (!this.tableSelect.length) {
        //     return this.$message({
        //       message: '盘口不能为空',
        //       type: 'error'
        //     })
        //   } else if (this.data.params.role === 'member' && this.tableSelect.length > 1) {
        //     return this.$message({
        //       message: '会员只能选择一个盘口',
        //       type: 'error'
        //     })
        //   }
        // }
        this.active += type
        if (this.active < 0) {
          this.active = 0
          this.close()
        } else if (this.active > this.maxActive) {
          this.active = this.maxActive
          this.confirm()
          this.setState(['selectedRow', []])
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .model {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, .2);
    opacity: 1;
    transition: all .2s;

    .model-content {
      transform-origin: top;
      transform: perspective(700px) rotateX(0);
      width: 800px;
      max-width: 100%;
      text-align: center;
      border-radius: 5px;
      opacity: 1;
      background: #fff;
      transition: all .2s;

      .title {
        position: relative;
        line-height: 50px;
        border-bottom: 1px solid #e7e7e7;
        font-size: 16px;
        color: #E6A23C;

        .close-icon {
          position: absolute;
          top: 12px;
          right: 16px;
          font-size: 25px;
          cursor: pointer;
          color: #999;
        }
      }

      .main {
        padding: 20px;
        font-size: 12px;

        .model-item {
          display: flex;
          width: 100%;
          height: 45px;
          line-height: 45px;

          .item-text {
            width: 40%;
            padding-right: 10px;
            text-align: right;
          }

          .item-input {
            width: 200px;
            text-align: left;
          }
        }
      }

      .two-columns {
        max-height: 610px;
        min-height: 300px;
        overflow: auto;
        line-height: 50px;
        text-align: left;

        .step-title {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          color: #E6A23C;
        }

        .occupy-list {
          .occupy-title {
            padding-right: 90px;
            text-align: right;
            font-weight: bold;
          }
        }

        /deep/ .el-input-group__append {
          padding: 0 10px;
        }

        .tow-item {
          display: inline-block;
          width: 50%;

          .item-wrapper {
            display: flex;

            .item-title {
              width: 40%;
              padding-right: 20px;
              text-align: right;
            }

            .item-main {
              width: 200px;
            }
          }
        }

        .input-prompt {
          margin-top: -5px;
          line-height: 1;
          white-space: nowrap;
          color: red;
        }

        .must {
          margin-left: 5px;
          color: red;
        }
      }

      .footer {
        line-height: 60px;
        border-top: 1px solid #e7e7e7;

        .btn {
          padding: 7px 20px;
          border-radius: 5px;
          background: none;
          border: 1px solid #909399;
          color: #909399;

          &.cancel {
            margin-right: 80px;
          }

          &.confirm {
            color: #fff;
            border: 1px solid #E6A23C;
            background: #E6A23C;
          }
        }
      }
    }

    &.show-enter, &.show-leave-to {
      opacity: 0;

      .model-content {
        transform: rotateX(40deg);
        opacity: 0;
      }
    }
  }
</style>
