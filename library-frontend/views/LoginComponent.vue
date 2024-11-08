<template>
    <div>
      <header>
        <div class="titlebook2">
          <a href="/login" class="home-link">
            <h1>bookcase.com</h1>
          </a>
        </div>
        <h1 class="titlelogin">LOGIN</h1>
      </header>
  
      <main>
        <div class="login-container">
          <form @submit.prevent="handleLogin" class="login-form">
            <h2 class="form-title">Entre na sua conta</h2>
            <div class="form-group">
              <label for="username">Nome de usuário</label>
              <input type="text" id="username" v-model="username" required />
            </div>
            <div class="form-group">
              <label for="password">Senha</label>
              <input type="password" id="password" v-model="password" required />
            </div>
            <div class="form-group">
              <a href="forgetpassword.html" class="forgot-password">Esqueceu a senha?</a>
            </div>
            <button type="submit" class="login-btn">Entrar</button>
          </form>
        </div>
      </main>
  
      <footer>
        <div class="footer-content">
          Todos os direitos reservados © | bookcase.com - 2024
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        // Lógica para validar o login (isso é apenas um exemplo)
        if (this.username && this.password) {
          // Você pode adicionar lógica de autenticação aqui (e.g., chamada API)
          console.log('Logando com', this.username, this.password);
          // Exemplo de redirecionamento para a página principal após o login bem-sucedido
          this.$router.push('/login');
        } else {
          alert('Por favor, preencha ambos os campos.');
        }
      }
    }
  };
  </script>
<style src="../src/assets/css/main.css"></style>
<style src="../src/assets/css/styles.css"></style>