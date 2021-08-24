import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'
import { store as myStore } from '@/store'
import routes from './routes'
const store = myStore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
  }
})
router.beforeEach((to, from, next) => {
  authGuard(to, from, next)
})
const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const routeProtected = to.meta.auth
  if (routeProtected && 'auth' in to.meta && !store.getters.isUserLoggedIn) {
    document.title = 'Login'
    next('/login')
  } else if (!routeProtected && 'auth' in to.meta && store.getters.isUserLoggedIn) {
    document.title = 'Dashboard'
    next('/dashboard')
  } else {
    document.title = `${to.meta.title}`
    next()
  }
}

export default router
