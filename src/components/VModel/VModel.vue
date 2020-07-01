<template>
  <transition name="show">
    <div v-if="visible" class="model">
      <div class="model-content" :style="cardStyle">
        <div class="title">{{data.title}}<i class="close-icon fr el-icon-close" @click="close"/></div>
        <div v-if="data.type === 'slot'" class="main two-columns">
          <slot/>
        </div>
        <div v-else class="main two-columns">
          <div v-for="item of data.list" :key="item.key" class="tow-item"
               :style="{width: data.type === 'single' ? '100%' : ''}">
            <div class="item-wrapper">
              <div v-if="item.title || checkData[item.key]" class="item-title">{{item.title ||
                checkData[item.key].title}}:
              </div>

              <!--select选择器-->
              <el-select v-if="item.type === 'select'" v-model="data.params[item.key]" class="item-main" size="mini">
                <el-option v-for="option in item.options" :key="option.id" :label="option.name" :value="option.id"/>
              </el-select>

              <!--游戏余额-->
              <div v-else-if="item.type === 'gameBalance'" style="width: 100%;">
                <el-button size="mini" @click="breakBalance('')">刷新全部</el-button>
                <table-page :table-data="item.tableList" :loading="loading" :columns="item.columns" :height="370">
                  <span slot="balance" slot-scope="data"
                        :style="{color: typeof data.props.row.balance !== 'number' && 'red'}">{{data.props.row.balance}}</span>
                  <el-button-group v-if="data.props.row.gameCode" slot="operate" slot-scope="data">
                    <el-button v-auth="'subordinate:rollOutGameBalance'" size="mini"
                               @click="rollOut(data.props.row.gameCode)">转出
                    </el-button>
                    <el-button size="mini" @click="breakBalance(data.props.row.gameCode)">刷新</el-button>
                  </el-button-group>
                </table-page>
              </div>

              <!--树形结构-->
              <div v-else-if="item.type === 'tree'" style="width: 100%;">
                <el-button size="mini" @click="selectAll(item.key)">全选</el-button>
                <el-tree
                  ref="tree"
                  class="tree-style"
                  :data="item.treeArr"
                  check-strictly
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :default-checked-keys="data.params[item.key]"
                  @check="checkTree"
                />
              </div>

              <!--滑块选择-->
              <el-switch
                v-else-if="item.type === 'switch'"
                v-model="data.params[item.key]"
                class="switch"
                active-color="#E6A23C"
                :active-text="item.active"
                :inactive-text="item.inactive"
                :active-value="0"
                :inactive-value="1"
              />

              <!--文本域-->
              <el-input v-else-if="checkData[item.key].type === 'textarea'" v-model="data.params[item.key]"
                        class="item-main" type="textarea"/>

              <!--数字输入框-->
              <div v-else-if="checkData[item.key].type === 'number'">
                <el-input-number v-model="data.params[item.key]" style="width: 80%; max-width: 180px" :precision="2"
                                 :step="0.1" :min="0" :max="item.max" size="mini"/>
                <div class="input-prompt" v-html="item.prompt"/>
              </div>

              <!--输入框-->
              <div v-else class="item-main">
                <el-input v-model.trim="data.params[item.key]"
                          :placeholder="item.placeholder || checkData[item.key].placeholder || checkData[item.key].errMsg"
                          :disabled="item.disabled" :type="checkData[item.key].inputType || 'text'"
                          :maxlength="checkData[item.key].maxlength" size="mini">
                  <template v-if="item.append" slot="append">{{ item.append }}</template>
                </el-input>
                <div class="input-prompt" v-html="item.prompt"/>
              </div>
              <div v-if="item.must" class="must">*</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <el-button v-if="data.btnType === 'close'" class="btn" @click="$emit('confirm')">确定</el-button>
          <el-button v-else :loading="isRequest" class="btn" @click="confirm">确定</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('common')
  import {checkData} from '../../utils/checkData'

  export default {
    name: 'VModel',
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
        copyParams: {},
        menuIdList: [],
        isSelectAll: true,
        loading: false
      }
    },
    computed: mapState(['isRequest']),
    watch: {
      visible(val) {
        if (val) {
          this.copyParams = JSON.parse(JSON.stringify(this.data))
        } else {
          this.$emit('update:data', JSON.parse(JSON.stringify(this.copyParams)))
        }
      }
    },
    methods: {
      ...mapActions(['setState']),
      confirm() {
        if (this.isRequest) return
        if (this.data.list) {
          for (let i = 0; i < this.data.list.length; i++) {
            const item = this.data.list[i]
            const params = this.data.params[item.key]
            if (item.must && !params && params !== 0) {
              return this.$message({
                message: `请正确填写必填项: ${checkData[item.key].title}！`,
                type: 'error'
              })
            }
            if (item.reg && !item.reg.test(params)) {
              return this.$message({
                message: checkData[item.key].title + item.placeholder,
                type: 'error'
              })
            } else if (!item.reg && checkData[item.key] && checkData[item.key].reg && !checkData[item.key].reg.test(params)) {
              return this.$message({
                message: checkData[item.key].title + checkData[item.key].errMsg,
                type: 'error'
              })
            }
          }
        }
        if (this.menuIdList.length) {
          const newData = JSON.parse(JSON.stringify(this.data))
          newData.params.menuIdList = this.menuIdList
          this.$emit('update:data', newData)
        }
        this.setState(['isRequest', true])
        this.$emit('confirm')
        this.menuIdList = []
      },
      close() {
        this.setState(['isRequest', false])
        this.$emit('update:visible', false)
      },
      checkTree(node, {checkedKeys}) {
        this.menuIdList = checkedKeys
      },
      getTreeId(arr, checkedArr) {
        arr.forEach(item => {
          checkedArr.push(item.id)
          if (item.children && item.children.length) {
            this.getTreeId(item.children, checkedArr)
          }
        })
      },
      selectAll(key) {
        if (this.isSelectAll) {
          const arr = this.data.list.find(item => item.key === key).treeArr
          const checkedArr = []
          this.getTreeId(arr, checkedArr)
          this.$refs.tree[0].setCheckedKeys(checkedArr)
          this.menuIdList = checkedArr
        } else {
          this.$refs.tree[0].setCheckedKeys([])
          this.menuIdList = []
        }
        this.isSelectAll = !this.isSelectAll
      },
      breakBalance(gameType) {
        this.loading = true
        this.$parent.showBalanceModel(gameType, () => {
          this.loading = false
        })
      },
      rollOut(gameType) {
        this.loading = true
        this.$parent.rollOutBalance(gameType, () => {
          this.breakBalance(gameType)
        })
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
        max-height: 70vh;
        overflow: auto;
        line-height: 50px;
        text-align: left;

        .cross-column {
          display: flex;
          margin-top: 10px;

          .item-title {
            width: 20%;
            padding-right: 20px;
            text-align: right;
          }

          .item-main {
            width: 680px;
          }
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

            .switch {
              height: 50px;

              /deep/ .el-switch__label.is-active {
                color: #E6A23C;
              }
            }

            .tree-style {
              width: 100%;
              min-height: 350px;
            }
          }
        }

        .must {
          margin-left: 5px;
          color: red;
        }

        .input-prompt {
          margin-top: -5px;
          line-height: 1;
          white-space: nowrap;
          color: red;
        }
      }

      .footer {
        line-height: 60px;
        border-top: 1px solid #e7e7e7;

        .btn {
          padding: 7px 20px;
          border-radius: 5px;
          border: 1px solid #E6A23C;
          background: #E6A23C;
          color: #fff;
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
