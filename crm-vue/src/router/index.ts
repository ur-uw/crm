import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import Home from '@/views/Home.vue'
import { store as myStore } from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard.show',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login.show',
    component: () => import('@/views/Login.vue'),

    meta: {
      title: 'Login',
      auth: false
    }
  },
  {
    path: '/register',
    name: 'register.show',
    component: () => import('@/views/Register.vue'),
    meta: {
      title: 'Register',
      auth: false
    }
  },
  {
    path: '/project/:id',
    name: 'project.show',
    component: () => import('@/views/ProjectShow.vue'),
    meta: {
      title: 'Project',
      auth: true
    }
  },
  {
    path: '/project/:id/:taskStatus?/add-task',
    name: 'project.task.add',
    component: () => import('@/views/AddProjectTask.vue'),
    props: true,
    meta: {
      title: 'Add Task',
      auth: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue'),
    meta: {
      title: 'Testing',
      auth: true
    }
  },
  {
    path: '/error',
    name: 'error.show',
    component: () => import('@/views/Error.vue'),
    meta: {
      title: 'Server Error'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found.show',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Not Found'
    }
  }
]

const store = myStore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
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
