<template>
    <div class="reserve-page">
        <header>
            <div class="header-container">
                <router-link to="/" class="home-link">
                    <i class="fas fa-arrow-left"></i>
                    <h1>Voltar</h1>
                </router-link>
            </div>
        </header>

        <main>
            <div class="book">
                <div class="book-cover">
                    <img :src="book.cover" alt="Capa do Livro">
                </div>
                <div class="book-details">
                    <h2 class="book-title">{{ book.title }}</h2>
                    <p class="book-author">Por {{ book.author }}</p>
                </div>
                <button class="reserve-btn" @click="reserveBook">Reservar</button>
            </div>

            <div v-if="showAlert" class="alert-success">
                Livro reservado com sucesso!
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "ReserveBookPage",
    data() {
        return {
            book: {
                // Esses dados podem ser passados por props ou carregados dinamicamente
                title: "Título do Livro",
                author: "Autor do Livro",
                cover: "https://via.placeholder.com/120x180" // Placeholder para a capa
            },
            showAlert: false,
        };
    },
    methods: {
        reserveBook() {
            this.showAlert = true;
            setTimeout(() => {
                this.showAlert = false;
            }, 3000); // Esconde o alerta após 3 segundos
        },
    },
};
</script>

<style scoped>
.alert-success {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    text-align: center;
}
</style>