<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <el-dropdown trigger="click">
        <div class="avatar-container">
          <div v-if="loginName !== name" class="item">总账户：{{name}}</div>
          <div class="item">
            用户名：{{loginName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="showModel = true">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <v-model :visible.sync="showModel" :data.sync="modelData" :card-style="{width: '500px'}" @confirm="editPassword" />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import {editPassword} from '../../api/user'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    data() {
      return {
        showModel: false,
        modelData: {
          type: 'single',
          title: '修改密码',
          params: {oldPassword: '', newPassword: '', verifyNewPassword: ''},
          list: [{key: 'oldPassword'}, {key: 'newPassword'}, {key: 'verifyNewPassword'}]
        }
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ]),
      loginName() {
        return this.$cookies.get('loginName')
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      editPassword() {
        editPassword(this.modelData.params).then(res => {
          if (res.status === 10000) {
            window.location.reload()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mb {
    .navbar {
      .right-menu {
        position: absolute;
        right: 0;
        line-height: 1.5;

        .avatar-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 50px;
          font-size: 12px;

          .item {
            width: 100%;

            &:first-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .avatar-container {
        display: block;
        height: 100%;
        margin-right: 15px;
        cursor: pointer;

        .item {
          display: inline-block;

          &:first-child {
            margin-right: 10px;
          }
        }

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
