<template>
  <div>
    <!-- Link para o ícone do admin -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <header v-if="isAdmin"> <!-- Exibe o cabeçalho apenas se o usuário for admin -->
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
            <router-link to="/gerenciamento" class="login">
              <i class="fa-solid fa-book"></i> +
            </router-link>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NavbarAdmin',
  data() {
    return {
      isAdmin: false, // Inicializa a variável isAdmin como falso
    };
  },
  created() {
    // Verifica o papel do usuário armazenado no localStorage
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'admin'; // Define isAdmin como true se o papel for admin

    // Exibe no console para depuração
    console.log('Papel do usuário:', role);
    console.log('isAdmin:', this.isAdmin);
  },
  methods: {
    ...mapActions(['logout']), // Mapeia a ação de logout do Vuex

    async handleLogout() {
      console.log('Logout chamado');
      await this.logout(); // Chama a ação de logout
      localStorage.removeItem('role'); // Remove o papel do usuário do localStorage
      localStorage.removeItem('token'); // Remove o token do usuário
      this.$router.push({ name: 'login' }); // Redireciona para a página de login
    }
  }
};
</script>

<style scoped>
/* Estilo do cabeçalho */
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
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.auth-buttons .login:hover {
  color: #007bff;
}
</style>
