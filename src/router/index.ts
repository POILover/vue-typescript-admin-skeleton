import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'


Vue.use(VueRouter)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
 * NOTE:层级菜单的redirect一定要到最深的一层，不能逐级重定向，否则tagsview会有bug
 */

/**
 ConstantRoutes
 a base page that does not have permission requirements
 all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/components',
    component: Layout,
    redirect: '/components/board',
    meta: {
      title: "组件",
      roles: ['admin', 'editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'board',
        component: () => import('@/views/components/kanban/board.vue'),
        name: 'board',
        meta: {
          title: '看板',
          roles: ['admin']
        }
      },
      {
        path: 'kanban',
        component: () => import('@/views/components/kanban/components/kanban.vue'),
        name: 'kanban',
        meta: {
          title: '看板详情',
          roles: ['admin'],
          hidden: true
        }
      }
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/translation',
    meta: {
      title: 'ECharts',
    },
    children: [
      {
        path: 'translation',
        name: 'translation',
        component: () => import('@/views/echarts-tricks/translation/charts.vue'),
        meta: {
          title: '拖拽平移',
        }
      },
      {
        path: 'bgcolors',
        name: 'bgcolors',
        component: () => import('@/views/echarts-tricks/bg-colors/charts.vue'),
        meta: {
          title: '背景色块',
        }
      },
    ]
  },
  {
    path: '/css',
    component: Layout,
    redirect: '/css/flex_center',
    meta: {
      title: 'CSS',
    },
    children: [
      {
        path: 'flex_center',
        name: 'flex_center',
        component: () => import('@/views/css-tricks/flex-center.vue'),
        meta: {
          title: 'flex居中',
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
