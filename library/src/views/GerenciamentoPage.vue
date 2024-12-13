<template>
  <div>
    <div class="titlelogin">GERENCIAMENTO</div>
    <main>
      <div class="crud-container">
        <!-- Formulário para adicionar novo livro -->
        <h2 class="crud-title">Adicionar Novo Livro</h2>
        <form @submit.prevent="saveBook" class="crud-form">
          <div class="form-group">
            <label for="title">Título</label>
            <input type="text" v-model="bookForm.title" id="title" placeholder="Título do Livro" required />
          </div>

          <div class="form-group">
            <label for="author">Autor</label>
            <input type="text" v-model="bookForm.author" id="author" placeholder="Autor do Livro" required />
          </div>

          <div class="form-group">
            <label for="year">Ano de Publicação</label>
            <input type="number" v-model="bookForm.year" id="year" placeholder="Ano" required />
          </div>

          <div class="form-group">
            <label for="image">Imagem</label>
            <input type="file" @change="handleFileUpload" id="image" />
          </div>

          <button type="submit" class="login-btn">Salvar Livro</button>
        </form>

        <!-- Formulário para buscar, editar ou excluir livro por ID -->
        <h2 class="crud-title">Editar/Excluir Livro por ID</h2>
        <form @submit.prevent="findBookById" class="crud-form">
          <div class="form-group">
            <label for="bookId">ID do Livro</label>
            <input type="text" v-model="bookId" id="bookId" placeholder="ID do Livro" required />
          </div>

          <button type="submit" class="login-btn">Buscar Livro</button>
        </form>

        <!-- Exibição de dados do livro encontrado para edição -->
        <div class="crud-container">
          <h3>Editar Livro</h3>
          <form @submit.prevent="updateBook" class="crud-form">
            <div class="form-group">
              <label for="editTitle">Título</label>
              <input type="text" v-model="bookToEdit.title" id="editTitle" placeholder="Título do Livro" required />
            </div>

            <div class="form-group">
              <label for="editAuthor">Autor</label>
              <input type="text" v-model="bookToEdit.author" id="editAuthor" placeholder="Autor do Livro" required />
            </div>

            <div class="form-group">
              <label for="editYear">Ano de Publicação</label>
              <input type="number" v-model="bookToEdit.year" id="editYear" placeholder="Ano" required />
            </div>

            <button type="submit" class="login-btn">Salvar Alterações</button>
          </form>

          <button @click="deleteBook()" class="login-btn" style="background-color: red;">Excluir Livro</button>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bookForm: {
        title: '',
        author: '',
        year: '',
      },
      selectedFile: null,
      bookId: '', // Para armazenar o ID do livro a ser buscado
      bookToEdit: "", // Para armazenar os dados do livro encontrado
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },

    // Método para salvar um novo livro
    async saveBook() {
      try {
        const formData = new FormData();
        formData.append('title', this.bookForm.title);
        formData.append('author', this.bookForm.author);
        formData.append('year', this.bookForm.year);

        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }

        await axios.post('http://localhost:3000/api/books/books', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Limpar o formulário após salvar
        this.bookForm = { title: '', author: '', year: '' };
        this.selectedFile = null;
        alert('Livro adicionado com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar livro:', error);
        alert('Erro ao salvar livro. Tente novamente.');
      }
    },

    // Método para buscar livro pelo ID
    async findBookById() {
      console.log(this.bookId);
      
      try {
        const response = await axios.get(`http://localhost:3000/api/books/${this.bookId}`);
        if (response.data) {
          this.bookToEdit = response.data; // Armazena os dados do livro encontrado para edição
          console.log(response.data);
          
        } else {
          alert('Livro não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar livro:', error);
        alert('Livro não encontrado. Tente novamente.');
      }
    },

    // Método para atualizar os dados do livro
    async updateBook() {
      try {
        const response = await axios.put(`http://localhost:3000/api/books/${this.bookToEdit._id}`, this.bookToEdit);
        this.bookToEdit = null; // Limpa os dados após salvar
        alert('Livro atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        alert('Erro ao atualizar livro. Tente novamente.');
      }
    },

    // Método para excluir livro
    async deleteBook() {
      console.log(this.bookId);
      try {
        const response = await axios.delete(`http://localhost:3000/api/books/${this.bookId}`);
        console.log('Resposta da exclusão:', response);  // Verifique o que está sendo retornado
        this.bookToEdit = null; // Limpa os dados após a exclusão
        alert('Livro excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
        alert('Erro ao excluir livro. Tente novamente.');
      }
    }

  },
};
</script>

<style scoped>
/* Estilos do componente permanecem os mesmos, se necessário ajuste o layout */
</style>
