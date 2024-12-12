<template>
  <div>
    <div class="titlelogin">GERENCIAMENTO</div>
    <main>
      <div class="crud-container">
        <h2 class="crud-title">Adicionar Novo Livro</h2>

        <!-- Formulário para adicionar livro -->
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
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async saveBook() {
      try {
        const formData = new FormData();
        formData.append('title', this.bookForm.title);
        formData.append('author', this.bookForm.author);
        formData.append('year', this.bookForm.year);

        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }

        await axios.post('http://localhost:3000/api/books', formData, {
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
  },
};
</script>

<style scoped>
.titlelogin {
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
}

.crud-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.crud-title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
}

.crud-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button.login-btn {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.login-btn:hover {
  background-color: #0056b3;
}
</style>
