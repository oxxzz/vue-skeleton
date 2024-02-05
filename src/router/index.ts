import { useSessionState } from '@/states/session'
import ls from 'localstorage-slim'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './route'

const siteTitle = import.meta.env.VITE_SITE_TITLE || 'N4'
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL)
})

router.beforeEach(async (to) => {
  const sessionState = useSessionState()

  // wait for sessionState to be initialized
  if (!sessionState.ready && ls.get('token')) {
    // await sessionState.init()
    // loadRoutes(router, sessionState.permissions)

    return to.fullPath
  } else if (to.path != '/auth/login' && !sessionState.ready) {
    return '/auth/login'
  }
})

router.afterEach((to) => {
  siteTitle && to.meta.title && (document.title = [siteTitle, to.meta.title].join(' - '))
  // collect logs or other analytics here
})

export default router
