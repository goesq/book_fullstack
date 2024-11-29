<template>
    <h1 class="titlelogin">LOGIN</h1>
    <main>
        <div class="login-container">
            <form class="login-form">
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
                    <router-link to="/cadastro" class="forgot-password"> Não tem conta? Cadastre-se</router-link>
                </div>
                <button @click.prevent="login()" class="login-btn">Entrar</button>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        async login() {
            try {
                const response = await axios.post("http://localhost:3000/api/auth/login", {
                    username: this.username,
                    password: this.password
                });

                // Se o login for bem-sucedido, redireciona para "/home"
                if (response.status === 200) {
                    this.$router.push('/home');
                }
            } catch (error) {
                console.error("Erro ao realizar login:", error);
                alert("Usuário ou senha incorretos. Tente novamente!");
            }
        }
    },
    data() {
        return {
            username: "",
            password: ""
        };
    }
};
</script>
