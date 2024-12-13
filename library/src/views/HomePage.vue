<template>
    <div>
      <header>
        <h1 class="highlight-title">ESTANTE<br> ONLINE</h1>
      </header>
  
      <main>
        <section class="book-highlight">
          <article class="book" v-for="book in books" :key="book.title">
            <div class="book-cover">
              <img :src="'http://localhost:3000/' + book.image" :alt="book.title">
            </div>
            <div class="book-details">
              <h2 class="book-title">{{ book.title }}</h2>
              <p class="book-author"><b>{{ book.author }}</b></p>
              <h5 class="book-year">{{ book.year }}</h5>
              <router-link to="ReservePage.vue" class="reserve-btn">Reservar</router-link>
            </div>
          </article>
        </section>
      </main>
      
    </div>
  </template>
  
  <script>
  import api from '../axios';  // Certifique-se de que o caminho está correto
  
  export default {
    data() {
      return {
        books: [],  // Inicializa o array de livros como vazio
      };
    },
    mounted() {
      this.fetchBooks();  // Chama o método para carregar os livros quando o componente for montado
    },
    methods: {
      async fetchBooks() {
        try {
          // Faz a requisição GET para pegar os livros da API
          const response = await api.get('/books/books');  // A URL pode ser ajustada conforme sua API
          this.books = response.data;  // Armazena os livros na variável 'books'
        } catch (error) {
          console.error('Erro ao carregar os livros:', error);
        }
      },
  
      async addBook() {
        // Exemplo de novo livro que será adicionado
        const newBook = {
          title: "Novo Livro Exemplo",
          author: "Autor Exemplo",
          image: "https://via.placeholder.com/120x180",  // Imagem de exemplo
        };
  
        try {
          // Faz a requisição POST para adicionar um novo livro
          const response = await api.post('/books', newBook);
          
          // Após o livro ser adicionado com sucesso, recarrega a lista de livros
          this.books.push(response.data);  // Adiciona o novo livro à lista local
          console.log('Livro adicionado com sucesso:', response.data);
        } catch (error) {
          console.error('Erro ao adicionar o livro:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Seu código de estilos permanece o mesmo */
  </style>
  