    import { createStore } from 'vuex';

    const store = createStore({
    state: {
        user: null, // O usuário será armazenado aqui
    },
    mutations: {
        setUser (state, user) {
        state.user = user; // Armazena o usuário no estado
        },
        clearUser (state) {
        state.user = null; // Limpa o usuário do estado
        },
    },
    getters: {
        isAdmin(state) {
        return state.user && state.user.role === 'admin'; // Verifica se o usuário é admin
        },
        isLoggedIn(state) {
        return !!state.user; // Verifica se o usuário está logado
        },
        userRole(state) {
        return state.user ? state.user.role : null; // Retorna o papel do usuário
        },
    },
    });

    export default store;