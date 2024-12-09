<template>
    <div>
        <h1 class="titlelogin">REGISTRE-SE</h1>

        <main>
            <div class="login-container">
                <form class="login-form" @submit.prevent="register">
                    <h2 class="form-title">Crie uma nova conta</h2>
                    <div class="form-group">
                        <label for="username">Nome de usuário</label>
                        <input v-model="username" id="username" name="username" type="text" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Senha</label>
                        <input v-model="password" id="password" name="password" type="password" required>
                    </div>
                    <div class="form-group">
                        <router-link to="/" class="forgot-password">Já tem conta? Faça login</router-link>
                    </div>
                    <button type="submit" class="login-btn">Cadastrar</button>
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
        // Instânciando as variáveis para armazenar os dados
        return {
            username: "",
            password: "",
            successMessage: "", // Mensagem de sucesso
            errorMessage: ""    // Mensagem de erro
        };
    },
    methods: {
        // Função para realizar o registro
        async register() {
            try {
                // Conexão com a API para registrar
                await axios.post("http://localhost:3000/api/auth/register", {
                    username: this.username,
                    password: this.password
                });

                // Define mensagem de sucesso
                this.successMessage = "Registrado com sucesso! Redirecionando...";

                // Limpa mensagem de erro (se existir)
                this.errorMessage = "";

                // Redireciona após 2 segundos
                setTimeout(() => {
                    this.$router.push('/');
                }, 2000);
            } catch (error) {
                // Exibe mensagem de erro
                this.errorMessage = "Ocorreu um erro ao registrar. Tente novamente.";
                this.successMessage = "";
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
    text-align: center;
}

.error {
    color: red;
    font-weight: bold;
    margin-top: -10px;
    text-align: center;
}
</style>
