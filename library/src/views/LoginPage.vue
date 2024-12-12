<template>
    <div>
        <h1 class="titlelogin">LOGIN</h1>
        <main>
            <div class="login-container">
                <form class="login-form" @submit.prevent="login">
                    <h2 class="form-title">Entre na sua conta</h2>
                    <div class="form-group">
                        <label for="username">Nome de usuário</label>
                        <div class="input-container">
                            <i class="fa-solid fa-user"></i>
                            <input v-model="username" type="text" id="username" name="username" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Senha</label>
                        <div class="input-container">
                            <i class="fa-solid fa-lock"></i>
                            <input v-model="password" type="password" id="password" name="password" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <router-link to="/cadastro" class="forgot-password">Não tem conta? Cadastre-se</router-link>
                    </div>
                    <button type="submit" class="login-btn" :disabled="loading">
                        <span v-if="loading">Carregando...</span>
                        <span v-else>Entrar</span>
                    </button>
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
import { mapMutations } from 'vuex'; // Para mapear as mutations do Vuex

export default {
    data() {
        return {
            username: "",
            password: "",
            successMessage: "", // Mensagem de sucesso
            errorMessage: "",    // Mensagem de erro
            loading: false       // Estado de carregamento
        };
    },
    methods: {
        ...mapMutations(['setUser']), // Mapeia a mutation para atualizar o usuário no Vuex
        
        async login() {
            this.loading = true; // Inicia o carregamento
            try {
                const response = await axios.post("http://localhost:3000/api/auth/login", {
                    username: this.username,
                    password: this.password
                });

                // Se o login for bem-sucedido, exibe a mensagem de sucesso e redireciona
                if (response.status === 200) {
                    this.successMessage = "Login realizado com sucesso! Redirecionando...";
                    this.errorMessage = ""; // Limpa a mensagem de erro

                    // Armazena o token e o role no localStorage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.role); // Armazena o papel do usuário

                    // Limpa os campos após o login
                    this.username = "";
                    this.password = "";

                    // Atualiza o Vuex com os dados do usuário (para persistência)
                    this.setUser({
                        username: this.username,
                        role: response.data.role,
                        token: response.data.token
                    });

                    setTimeout(() => {
                        // Verifica o papel do usuário e redireciona adequadamente
                        if (response.data.role === 'admin') {
                            // Redireciona para a página de gerenciamento se for admin
                            this.$router.push('/gerenciamento');
                        } else {
                            // Redireciona para a página principal se for um usuário normal
                            this.$router.push('/home');
                        }
                    }, 2000);
                }
            } catch (error) {
                // Em caso de erro, exibe uma mensagem amigável
                if (error.response) {
                    // Verifica o erro com base na resposta do servidor
                    this.errorMessage = error.response.data.message || "Erro desconhecido. Tente novamente!";
                } else {
                    this.errorMessage = "Erro de rede. Verifique sua conexão.";
                }
                this.successMessage = ""; // Limpa a mensagem de sucesso
            } finally {
                this.loading = false; // Finaliza o carregamento
            }
        }
    }
};
</script>

<style scoped>
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

.input-container {
    display: flex;
    align-items: center;
}

.input-container i {
    margin-right: 10px; /* Espaçamento entre o ícone e o input */
    color: #007bff; /* Cor do ícone */
}

.login-btn {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    width: 100%;
}

.login-btn:disabled {
    background-color: #cccccc; /* Cor do botão desabilitado */
    cursor: not-allowed; /* Cursor de não permitido */
}
</style>
