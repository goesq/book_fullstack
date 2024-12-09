// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null,
        isAuthenticated: false,
        role: null, // Adicione uma propriedade para o papel
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
            state.isAuthenticated = !!user;
            state.role = user.role; // Armazena o papel do usuário
        },
        clearUser (state) {
            state.user = null;
            state.isAuthenticated = false;
            state.role = null; // Limpa o papel do usuário
        },
    },
    actions: {
        logout({ commit }) {
            commit('clearUser '); // Limpa o usuário do estado
        },
    },
});

export default store;