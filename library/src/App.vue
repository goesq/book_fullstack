<template>
    <div id="app">
        <component :is="navbarComponent"></component>
        <RouterView />
        <Footer />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'; // Importa o Vuex para acessar o estado
import Navbar from './components/Navbar.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import NavbarHome from './components/NavbarHome.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const store = useStore(); // Cria uma instância do store

const navbarComponent = computed(() => {
    // Verifica se a rota atual é a de login ou cadastro
    if (route.path === '/' || route.path === '/cadastro') {
        return Navbar; // Retorna a Navbar para login e cadastro
    }

    // Verifica se o usuário é admin
    const userRole = store.state.role; // Obtém o papel do usuário do Vuex
    return userRole === 'admin' ? NavbarAdmin : NavbarHome; // Retorna NavbarAdmin se for admin, caso contrário NavbarHome
});
</script>

<style scoped>
/* Estilos do App.vue, se necessário */
</style>