import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/offline',
    meta: {title: '下线管理', icon: 'tree', roles: ['subordinate']},
    alwaysShow: true,
    children: [
      {
        path: 'offline',
        name: 'Offline',
        component: () => import('@/views/offline/offline'),
        meta: {title: '下线列表', roles: ['subordinate:userListPage'], keepAlive: true}
      },
      {
        path: 'subAccount',
        name: 'SubAccount',
        component: () => import('@/views/offline/subAccount'),
        meta: {title: '子账号列表', roles: ['userSub:listPage']}
      }
    ]
  },

  {
    path: '/quotaRecord',
    component: Layout,
    redirect: '/quotaRecord/proxyQuota',
    meta: {title: '额度记录', icon: 'form', roles: ['transform']},
    alwaysShow: true,
    children: [
      {
        path: 'proxyQuota',
        name: 'ProxyQuota',
        component: () => import('@/views/quotaRecord/proxyQuota'),
        meta: {title: '代理额度记录', roles: ['transform:proxyListPage']}
      },
      {
        path: 'memberQuota',
        name: 'MemberQuota',
        component: () => import('@/views/quotaRecord/memberQuota'),
        meta: {title: '会员额度记录', roles: ['transform:memberListPage']}
      }
    ]
  },

  {
    path: '/noteData',
    component: Layout,
    redirect: '/noteData/noteSummary',
    meta: {title: '注单数据', icon: 'nested', roles: ['gameReport']},
    alwaysShow: true,
    children: [
      {
        path: 'noteSummary',
        name: 'NoteSummary',
        component: () => import('@/views/noteData/noteSummary'),
        meta: {title: '历史注单汇总', roles: ['gameReport:memberHistoryReport']}
      },
      {
        path: 'dtChess',
        name: 'DtChess',
        component: () => import('@/views/noteData/dtChess'),
        meta: {title: '大唐棋牌注单', roles: ['gameReport:DTQP:listPage']}
      },
      {
        path: 'txhVideo',
        name: 'TxhVideo',
        component: () => import('@/views/noteData/txhVideo'),
        meta: {title: '天下滙视讯注单', roles: ['gameReport:TXH:listPage']}
      },
      {
        path: 'mgElectron',
        name: 'MgElectron',
        component: () => import('@/views/noteData/mgElectron'),
        meta: {title: 'MG电子注单', roles: ['gameReport:MG:listPage']}
      },
      {
        path: 'ptElectron',
        name: 'PtElectron',
        component: () => import('@/views/noteData/ptElectron'),
        meta: {title: 'PT电子注单', roles: ['gameReport:PT:listPage']}
      },
      {
        path: 'igLottery',
        name: 'IgLottery',
        component: () => import('@/views/noteData/igLottery'),
        meta: {title: 'IG彩票注单', roles: ['gameReport:IG:listPage']}
      },
      {
        path: 'igpjLottery',
        name: 'IgpjLottery',
        component: () => import('@/views/noteData/igpjLottery'),
        meta: {title: 'IG埔京彩票注单', roles: ['gameReport:IGPJ:listPage']}
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/systemLog',
    meta: {title: '系统管理', icon: 'example', roles: ['system']},
    alwaysShow: true,
    children: [
      {
        path: 'systemLog',
        name: 'SystemLog',
        component: () => import('@/views/system/systemLog'),
        meta: {title: '系统日志', roles: ['operatorLog:listPage']}
      },
      {
        path: 'orderForm',
        name: 'OrderForm',
        component: () => import('@/views/system/orderForm'),
        meta: {title: '补单查询', roles: ['order:listPage']}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
