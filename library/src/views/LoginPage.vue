<template>
    <main>
        <div class="login-container">
            <form action="#" method="" class="login-form">
                <h2 class="form-title">Entre na sua conta</h2>
                <div class="form-group">
                    <label for="username">Nome de usuário</label>
                    <input v-model="email" type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Senha</label>
                    <input v-model="password" type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <router-link to="/cadastro" class="forgot-password"> Não tem conta? Cadastre-se</router-link>
                </div>
                <button @click="login()" type="submit" class="login-btn">Entrar</button>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    // name:"LoginPage",
    data() {
        // Instânciando as variabeis para armazenar os dados
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        // Função para realizar o login 

        async login() {
            // Utilizando o axios para conectar na api
            await axios.post("http://localhost:3000/api/auth/login", {
                // Enviando os dados do formulário para a api, email e password
                email: this.email,
                password: this.password
            }).then((respo) => {
                // Se o login obter sucesso, redireciona para a página home
                this.$router.push('/home')
            }).catch((erro) =>{
                alert("Erro ao tentar fazer login!")
            })
        }
    }
}
</script>