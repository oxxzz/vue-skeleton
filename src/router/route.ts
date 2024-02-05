import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面不存在' }
  },
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '概览' }
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        components: {
          auth: () => import('@/views/auth/LoginView.vue')
        },
        meta: { title: '系统登录' }
      }
    ]
  }
]
