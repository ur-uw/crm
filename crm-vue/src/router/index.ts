import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});
export default router;
