import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


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
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    name: '用户审核',
    meta: { title: '用户审核', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/user/userlist'),
        meta: { title: '用户列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    name: '留言回复',
    meta: { title: '留言回复', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'feedbackList',
        name: 'feedbackList',
        component: () => import('@/views/feedback/feedback'),
        meta: { title: '留言列表', icon: 'table' }
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
