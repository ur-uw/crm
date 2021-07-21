

import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import { store as myStore } from '@/store';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home',
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            auth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',
            auth: false,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register',
            auth: false,
        },
    },
];

const store = myStore;
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    authGuard(to, from, next);
});
const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext
) => {
    const routeProtected = to.meta.auth;
    if (routeProtected && 'auth' in to.meta && !store.getters.isUserLoggedIn) {
        document.title = "Login";
        next('/login');
    } else if (!routeProtected && 'auth' in to.meta && store.getters.isUserLoggedIn) {
        document.title = "Dashboard";
        next('/dashboard');
    } else {
        document.title = `${to.meta.title}`;
        next();
    }
};


export default router;
