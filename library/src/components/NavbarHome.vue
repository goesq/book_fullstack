<template>
    <div>
        <!-- Elemento raiz adicionado aqui -->
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
                        <input type="text" v-model="searchTerm" class="search-input" placeholder="Buscar..." />
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

        <!-- Exibe os livros filtrados -->
        <div v-for="book in filteredBooks" :key="book._id" class="book">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
    name: 'NavbarHome',
    data() {
        return {
            searchTerm: '', // Valor da busca do usuário
            books: [],      // Lista de livros
        };
    },
    computed: {
        // Computed property para filtrar os livros
        filteredBooks() {
            return this.books.filter(book => {
                const lowerSearchTerm = this.searchTerm.toLowerCase();
                return (
                    book.title.toLowerCase().includes(lowerSearchTerm) ||
                    book.author.toLowerCase().includes(lowerSearchTerm)
                );
            });
        }
    },
    methods: {
        ...mapActions(['logout']), // Mapeia a ação de logout do Vuex

        async handleLogout() {
            await this.logout(); // Chama a ação de logout
            this.$router.push({ name: 'login' }); // Redireciona para a página de login
        },

        // Método para buscar todos os livros ao carregar o componente
        async fetchBooks() {
            try {
                const response = await axios.get('http://localhost:3000/api/books');
                this.books = response.data; // Armazena os livros na variável `books`
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
            }
        }
    },
    mounted() {
        // Chama a função para buscar livros quando o componente é montado
        this.fetchBooks();
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
    color: #000;
    /* Cor do ícone */
    cursor: pointer;
    display: flex;
    align-items: center;
    /* Alinha o ícone e o texto */
}

.auth-buttons .login:hover {
    color: #007bff;
    /* Cor ao passar o mouse */
}
</style>