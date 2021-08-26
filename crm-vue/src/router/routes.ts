import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
/*
 * Authentication Routes
 */
const authRoutes: Array<RouteRecordRaw> = [
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
  }
]

/*
 * Project Routes
 */
const projectRoutes: Array<RouteRecordRaw> = [
  {
    path: '/project/:slug',
    name: 'project.show',
    component: () => import('@/views/ProjectShow.vue'),
    meta: {
      title: 'Project',
      auth: true
    }
  },
  {
    path: '/project/:slug/:taskStatus?/add-task',
    name: 'project.task.add',
    component: () => import('@/views/AddProjectTask.vue'),
    props: true,
    meta: {
      title: 'Add Task',
      auth: true
    }
  }
]

/*
 * User Routes:
  settings.account
  settings.notifications
  settings.plan
  settings.security
 */
const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/user/:slug/settings',
    name: 'settings.show',
    component: () => import('@/views/settings/Settings.vue'),
    meta: {
      title: 'Settings',
      auth: true
    },
    children: [
      {
        path: '',
        name: 'settings.account',
        component: () => import('@/views/settings/SettingsAccount.vue')
      },
      {
        path: 'notifications',
        name: 'settings.notifications',
        // TODO: IMPLEMENT THIS COMPONENT
        component: () => import('@/views/settings/SettingsNotifications.vue'),
        meta: {
          title: 'Settings | Notifications',
          auth: true
        }
      },
      {
        path: 'plan',
        name: 'settings.plan',
        // TODO: IMPLEMENT THIS COMPONENT
        component: () => import('@/views/settings/SettingsPlan.vue'),
        meta: {
          title: 'Settings | Plan',
          auth: true
        }
      },
      {
        path: 'security',
        name: 'settings.security',
        // TODO: IMPLEMENT THIS COMPONENT
        component: () => import('@/views/settings/SettingsSecurity.vue'),
        meta: {
          title: 'Settings | Security',
          auth: true
        }
      }
    ]
  }
]

/*
 * Error Routes
 */
const errorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/error',
    name: 'error.show',
    component: () => import('@/views/errors/Error.vue'),
    meta: {
      title: 'Server Error'
    }
  },
  {
    path: '/forbidden',
    name: 'forbidden.show',
    component: () => import('@/views/errors/Forbidden.vue'),
    meta: {
      title: 'Forbidden'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found.show',
    component: () => import('@/views/errors/NotFound.vue'),
    meta: {
      title: 'Not Found'
    }
  }
]

// ALL ROUTES
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
  ...authRoutes,
  ...projectRoutes,
  ...errorRoutes,
  ...userRoutes,
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue'),
    meta: {
      title: 'Testing',
      auth: true
    }
  }
]

export default routes
