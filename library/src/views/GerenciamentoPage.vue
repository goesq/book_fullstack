<template>
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
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      searchQuery: '',
      isFormVisible: false,
      isEditMode: false,
      bookForm: {
        title: '',
        author: '',
        year: '',
        image: ''
      },
      selectedBookId: null
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:5000/api/books', {
          params: { search: this.searchQuery }
        });
        this.books = response.data;
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    },

    async searchBooks() {
      this.fetchBooks();
    },

    async createNewBook() {
      this.isFormVisible = true;
      this.isEditMode = false;
      this.bookForm = { title: '', author: '', year: '', image: '' };
    },

    async editBook(book) {
      this.isFormVisible = true;
      this.isEditMode = true;
      this.bookForm = { ...book };
      this.selectedBookId = book._id;
    },

    async saveBook() {
      try {
        if (this.isEditMode) {
          await axios.put(`http://localhost:5000/api/books/${this.selectedBookId}`, this.bookForm);
        } else {
          await axios.post('http://localhost:5000/api/books', this.bookForm);
        }
        this.isFormVisible = false;
        this.fetchBooks();
      } catch (error) {
        console.error('Erro ao salvar livro:', error);
      }
    },

    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${bookId}`);
        this.fetchBooks();
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
      }
    },

    cancelEdit() {
      this.isFormVisible = false;
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
/* Seu estilo aqui */
.book-image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
}
</style>