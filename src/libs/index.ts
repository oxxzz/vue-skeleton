import type { Permission } from '@/types/model'
import type { Router } from 'vue-router'

// all views
const components = import.meta.glob('@/views/**/*.vue')

// load routes
export const loadRoutes = (router: Router, items: Permission[]) => {
  items.forEach((route) => {
    if (!router.hasRoute(route.uuid) && route.type == 0 && route.component) {
      router.addRoute({
        path: (route.path?.startsWith('/') ? route.path : '/' + route.path) || '/page-not-found',
        name: route.uuid,
        component: components[['../views/', route.component, '.vue'].join('')],
        meta: { title: route.name, icon: route.icon, origin: route }
      })
    }

    route.children.length && loadRoutes(router, route.children)
  })
}
