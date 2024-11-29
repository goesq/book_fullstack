import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

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
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/CadastroPage.vue')
    },
    {
      path: '/gerenciamento',
      name: 'gerenciamento',
      component: () => import('../views/GerenciamentoPage.vue')
    },
  ],
})

export default router
