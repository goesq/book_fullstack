import axios from 'axios';
 
// Cria instância do Axios com URL base da API
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/books',
    headers: {
        'Content-Type': 'application/json'
    }
});
 
// Exporta funções CRUD usando Axios
export default {
    getBooks() {
        return apiClient.get('/');
    },
    addBook(book) {
        return apiClient.post('/', book);
    },
    updateBook(id, book) {
        return apiClient.put(`/${id}`, book);
    },
    deleteBook(id) {
        return apiClient.delete(`/${id}`);
    }
};