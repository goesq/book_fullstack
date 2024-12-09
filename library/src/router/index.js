import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import store from '../store'; // Importa o store do Vuex


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/CadastroPage.vue'),
    },
    {
      path: '/gerenciamento',
      name: 'gerenciamento',
      component: () => import('../views/GerenciamentoPage.vue'),
      meta: { requiresAuth: true }, // Protege a rota de gerenciamento
    },
  ],
});

// Middleware para verificar autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // Verifica se o usuário está autenticado

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' }); // Redireciona para a página de login se não estiver autenticado
    } else {
      next(); // Permite o acesso à rota
    }
  } else {
    next(); // Permite o acesso a rotas públicas
  }
});

export default router;