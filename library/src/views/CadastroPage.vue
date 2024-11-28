<template>
        <h1 class="titlelogin">REGISTRE-SE</h1>

    <main>
        <div class="login-container">
            <form action="#" method="" class="login-form">
                <h2 class="form-title">Crie uma nova conta</h2>
                <div class="form-group">
                    <label for="username">Nome de usuário</label>
                    <input v-model="username" id="username" name="username" type="text" required>
                </div>
                <div class="form-group">
                    <!-- <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" required> -->
                </div>
                <div class="form-group">
                    <label for="password">Senha</label>
                    <input v-model="password" id="password" name="password" type="password" required>
                </div>
                <div class="form-group">
                    <!-- <label for="confirm-password">Confirmar Senha</label>
                    <input type="password" id="confirm-password" name="confirm-password" required> -->
                </div>
                <div class="form-group">
                    <router-link to="/" class="forgot-password"> Já tem conta? Faça login</router-link>
                </div>
                <button @click="register()" type="submit" class="login-btn">Entrar</button>
            </form> 
        </div>
    </main>
</template>


<script>
import axios from 'axios';

export default {

    data() {
        // Instânciando as variabeis para armazenar os dados
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        // Função para realizar o register 
        async register() {
            // Utilizando o axios para conectar na api
            await axios.post("http://localhost:3000/api/auth/register", {
                // Enviando os dados do formulário para a api, username e password
                username: this.username,
                password: this.password
            }).then(() => {
                // Se o register obter sucesso, redireciona para a página ho 
                this.$router.push('/')
            })
        }
    }
}
</script>