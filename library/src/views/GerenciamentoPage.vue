<template>
  <div> <!-- Elemento raiz adicionado aqui -->
    <div class="titlelogin">
      GERENCIAMENTO
    </div>
    <main>
      <div class="crud-container">
        <h2 class="crud-title">Lista de Livros</h2>
        <table class="crud-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Imagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book._id">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
              <td>
                <img v-if="book.image" :src="book.image" alt="Imagem do livro" class="book-image" />
                <span v-else>Sem imagem</span>
              </td>
              <td>
                <button @click="editBook(book)">Editar</button>
                <button @click="deleteBook(book._id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="createNewBook">Criar Novo Livro</button>
      </div>

      <!-- Formulário de criação/edição -->
      <div class="form-container" v-if="isFormVisible">
        <form @submit.prevent="saveBook" class="crud-form">
          <h2 class="form-title">{{ isEditMode ? 'Editar Livro' : 'Adicionar Livro' }}</h2>
          <div class="form-group">
            <label for="title">Título</label>
            <input type="text" v-model="bookForm.title" id="title" name="title" required>
          </div>
          <div class="form-group">
            <label for="author">Autor</label>
            <input type="text" v-model="bookForm.author" id="author" name="author" required>
          </div>
          <div class="form-group">
            <label for="year">Ano de Publicação</label>
            <input type="number" v-model="bookForm.year" id="year" name="year" required>
          </div>
          <div class="form-group">
            <label for="image">Imagem (URL)</label>
            <input type="text" v-model="bookForm.image" id="image" name="image" placeholder="URL da imagem">
          </div>
          <button type="submit" class="login-btn">Salvar</button>
          <button type="button" @click="cancelEdit" class="cancel-btn">Cancelar</button>
        </form>
      </div>
    </main>
  </div> <!-- Fim do elemento raiz -->
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],  // Armazena a lista de livros
      isFormVisible: false,  // Controle de visibilidade do formulário
      isEditMode: false,  // Controle se o formulário está em modo de edição
      bookForm: {          // Formulário de livro com campos para título, autor, ano e imagem
        title: '',
        author: '',
        year: '',
        image: ''
      },
      selectedBookId: null  // ID do livro selecionado para edição
    };
  },
  methods: {
    // Método para buscar todos os livros
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        this.books = response.data;  // Armazena os livros no estado
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    },

    // Método para criar um novo livro
    async createNewBook() {
      this.isFormVisible = true;  // Exibe o formulário
      this.isEditMode = false;    // Define o modo como criação
      this.bookForm = { title: '', author: '', year: '', image: '' };  // Limpa os campos do formulário
    },

    // Método para editar um livro
    async editBook(book) {
      this.isFormVisible = true;  // Exibe o formulário
      this.isEditMode = true;     // Define o modo como edição
      this.bookForm = { ...book };  // Preenche o formulário com os dados do livro
      this.selectedBookId = book._id;  // Armazena o ID do livro para futuras edições
    },

    // Método para salvar um livro (criar ou editar)
    async saveBook() {
      try {
        if (this.isEditMode) {
          // Se estiver no modo de edição, faz uma requisição PUT
          await axios.put(`http://localhost:5000/api/books/${this.selectedBookId}`, this.bookForm);
        } else {
          // Caso contrário, faz uma requisição POST para criar um novo livro
          await axios.post('http://localhost:5000/api/books', this.bookForm);
        }
        this.isFormVisible = false;  // Esconde o formulário após salvar
        this.fetchBooks();           // Atualiza a lista de livros
      } catch (error) {
        console.error('Erro ao salvar livro:', error);
      }
    },

    // Método para excluir um livro
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${bookId}`);
        this.fetchBooks();  // Atualiza a lista de livros após a exclusão
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
      }
    },

    // Método para cancelar a edição
    cancelEdit() {
      this.isFormVisible = false;  // Esconde o formulário
    }
  },
  mounted() {
    this.fetchBooks();  // Carrega os livros ao montar o componente
  }
};
</script>

