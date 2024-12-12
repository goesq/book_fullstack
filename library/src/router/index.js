import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import CadastroPage from '../views/CadastroPage.vue';
import GerenciamentoPage from '../views/GerenciamentoPage.vue';
import store from '../store'; // Importa o store do Vuex

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage, // Carrega o LoginPage diretamente
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: CadastroPage,
  },
  {
    path: '/gerenciamento',
    name: 'gerenciamento',
    component: GerenciamentoPage,
    meta: { requiresAuth: true }, // Protege a rota de gerenciamento
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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