

import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import { store as myStore } from '@/store';
import Dashboard from '@/views/Dashboard.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

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

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
const store = myStore;

router.beforeEach((to, from, next) => {
    authGuard(to, from, next);
});
const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext
) => {
    const routeProtected = to.meta.auth && 'auth' in to.meta;
    if (routeProtected && !store.getters.isUserLoggedIn) {
        document.title = "Login";
        next('/login');
    } else if (!routeProtected && store.getters.isUserLoggedIn) {
        document.title = "Dashboard";
        next('/dashboard');
    } else {
        document.title = `${to.meta.title}`;
        next();
    }
};


export default router;
