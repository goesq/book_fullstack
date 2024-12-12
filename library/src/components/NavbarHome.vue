<template>
    <div> <!-- Elemento raiz adicionado aqui -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <header>
            <div class="header-container">
                <div class="titlebook">
                    <router-link to="/home" class="home-link">
                        <h1>bookcase.com</h1>
                    </router-link>
                </div>
                <div class="top">
                    <form action="#" class="search-form">
                        <input type="text" id="search-input" class="search-input" placeholder="Buscar...">
                    </form>
                    <div class="auth-buttons">
                        <router-link to="/editar-perfil" class="login">
                            <i class="fa-solid fa-user"></i>
                        </router-link>
                        <button @click="handleLogout" class="login">
                            <i class="fa-solid fa-sign-out-alt"></i>
                        </button>   
                    </div>
                </div>
            </div>
        </header>
    </div> <!-- Fim do elemento raiz -->
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'NavbarHome',
    methods: {
        ...mapActions(['logout']), // Mapeia a ação de logout do Vuex
        async handleLogout() {
            await this.logout(); // Chama a ação de logout
            this.$router.push({ name: 'login' }); // Redireciona para a página de login
        }
    }
};
</script>

<style scoped>
/* Seu estilo aqui */
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f8f9fa;
}

.home-link {
    text-decoration: none;
    color: inherit;
}

.home-link:hover {
    color: #19191a;
}

.top {
    display: flex;
    align-items: center;
}

.search-form {
    margin-right: 20px;
}

.search-input {
    padding: 5px;
}

.auth-buttons .login {
    background: none;
    border: none;
    color: #000; /* Cor do ícone */
    cursor: pointer;
    display: flex;
    align-items: center; /* Alinha o ícone e o texto */
}

.auth-buttons .login:hover {
    color: #007bff; /* Cor ao passar o mouse */
}
</style>