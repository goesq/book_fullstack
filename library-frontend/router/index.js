// router/index.js
import { createRouter, createWebHistory } from 'vue-router'; // Certifique-se de que essas funções estão sendo importadas corretamente
import Index from '../src/components/IndexComponent.vue';
import Login from '../views/LoginComponent.vue';

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), // usa createWebHistory para Vue 3
    routes,
});

// Middleware de verificação de autenticação
router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
