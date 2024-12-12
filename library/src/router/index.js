import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import CadastroPage from '../views/CadastroPage.vue';
import GerenciamentoPage from '../views/GerenciamentoPage.vue';
import EditarPage from '../views/EditProfile.vue';
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
    meta: { requiresAuth: true, requiresAdmin: true }, // Requer autenticação e ser admin
  },
  {
    path: '/editar-perfil',
    name: 'editarperfil',
    component: EditarPage,
    meta: { requiresAuth: true }, // Apenas requer autenticação
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Middleware para verificação de autenticação e role
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // Verifica se o usuário está autenticado
  const isAdmin = store.getters.isAdmin; // Verifica se o usuário é admin

  // Log de depuração para verificar se os dados do Vuex estão corretos
  console.log('isAuthenticated:', isAuthenticated); // Verifique se o usuário está autenticado
  console.log('isAdmin:', isAdmin); // Verifique se o usuário tem a role de admin

  // Verifica se a rota exige autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Se não estiver autenticado, redireciona para login
    if (!isAuthenticated) {
      console.log('Usuário não autenticado. Redirecionando para login.');
      next({ name: 'login' }); // Redireciona para a página de login
    } 
    // Se a rota exigir admin e o usuário não for admin, redireciona para a home
    else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      console.log('Usuário não tem permissão de admin. Redirecionando para home.');
      next({ name: 'home' }); // Redireciona para a página inicial
    } else {
      console.log('Acesso permitido.');
      next(); // Permite o acesso à rota
    }
  } else {
    console.log('Rota pública, acesso permitido.');
    next(); // Permite o acesso a rotas públicas
  }
});

export default router;
