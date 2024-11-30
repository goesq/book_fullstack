<template>
    <div>
        <h1 class="titlelogin">LOGIN</h1>
        <main>
            <div class="login-container">
                <form class="login-form" @submit.prevent="login">
                    <h2 class="form-title">Entre na sua conta</h2>
                    <div class="form-group">
                        <label for="username">Nome de usuário</label>
                        <input v-model="username" type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Senha</label>
                        <input v-model="password" type="password" id="password" name="password" required>
                    </div>
                    <div class="form-group">
                        <router-link to="/cadastro" class="forgot-password">Não tem conta? Cadastre-se</router-link>
                    </div>
                    <button type="submit" class="login-btn">Entrar</button>
                </form>
            </div>

            <!-- Mensagem de sucesso -->
            <p v-if="successMessage" class="success">{{ successMessage }}</p>

            <!-- Mensagem de erro -->
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </main>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: "",
            password: "",
            successMessage: "", // Mensagem de sucesso
            errorMessage: ""    // Mensagem de erro
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post("http://localhost:3000/api/auth/login", {
                    username: this.username,
                    password: this.password
                });

                // Se o login for bem-sucedido, exibe a mensagem de sucesso e redireciona
                if (response.status === 200) {
                    this.successMessage = "Login realizado com sucesso! Redirecionando...";
                    this.errorMessage = ""; // Limpa a mensagem de erro

                    setTimeout(() => {
                        this.$router.push('/home');
                    }, 2000);
                }
            } catch (error) {
                // Em caso de erro, exibe uma mensagem amigável
                this.errorMessage = "Usuário ou senha incorretos. Tente novamente!";
                this.successMessage = ""; // Limpa a mensagem de sucesso
            }
        }
    }
};
</script>

<style>
.success {
    color: green;
    font-weight: bold;
    margin-top: -10px;
}

.error {
    color: red;
    font-weight: bold;
    margin-top: -10px;
}
</style>
