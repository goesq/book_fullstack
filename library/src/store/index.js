import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Verifica se existe o usuário no localStorage
  },
  mutations: {
    setUser(state, user) {
      state.user = user; // Armazena o usuário no estado
      localStorage.setItem('user', JSON.stringify(user)); // Salva o usuário no localStorage
    },
    clearUser(state) {
      state.user = null; // Limpa o usuário do estado
      localStorage.removeItem('user'); // Remove o usuário do localStorage
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user; // Verifica se o usuário está autenticado
    },
    isAdmin(state) {
      return state.user && state.user.role === 'admin'; // Verifica se o usuário tem a role 'admin'
    },
    userRole(state) {
      return state.user ? state.user.role : null; // Retorna o papel do usuário
    },
  },
});

export default store;
