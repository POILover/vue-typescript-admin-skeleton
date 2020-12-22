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
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta:{
      title:'首页'
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'page',
        component: () => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: '权限页面',
          // icon: 'lock',
          // alwaysShow: true,
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: '权限分配'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      }
    ]
  },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import(/* webpackChunkName: "icons" */ '@/views/icons/index.vue'),
  //       name: 'Icons',
  //       meta: {
  //         title: 'icons',
  //         icon: 'icon',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  {
    path: '/example',
    component: Layout,
    redirect: '/example/create',
    meta: {
      title: '测试页面',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        name: 'CreateArticle',
        redirect:'create/create_1/create_1_1',
        meta: {
          title: '创建',
          icon: 'edit'
        },
        children: [
          {
            path: 'create_1',
            component: () => import(/* webpackChunkName: "example-create" */ '@/views/example/edit.vue'),
            name: 'CreateArticle',
            meta: {
              title: '创建-子1',
              icon: 'edit'
            },
            children: [
              {
                path: 'create_1_1',
                component: () => import(/* webpackChunkName: "example-create" */ '@/views/example/edit.vue'),
                name: 'CreateArticle',
                meta: {
                  title: '创建-子-子1',
                  icon: 'edit'
                }
              },{
                path: 'create_1_2',
                component: () => import(/* webpackChunkName: "example-create" */ '@/views/example/edit.vue'),
                name: 'CreateArticle',
                meta: {
                  title: '创建-子-子2',
                  icon: 'edit'
                }
              }]
          },
          {
            path: 'create_2',
            component: () => import(/* webpackChunkName: "example-create" */ '@/views/example/edit.vue'),
            name: 'CreateArticle',
            meta: {
              title: '创建-子2',
              icon: 'edit'
            }
          },
        ]
      },
      {
        path: 'edit',
        component: () => import(/* webpackChunkName: "example-edit" */ '@/views/example/edit.vue'),
        name: 'EditArticle',
        meta: {
          title: '编辑',
          noCache: true,
          icon: 'example',
        }
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "example-list" */ '@/views/example/list.vue'),
        name: 'ArticleList',
        meta: {
          title: '表格',
          icon: 'list'
        }
      }
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
