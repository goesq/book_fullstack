import axios from 'axios';

// Cria uma instância do axios com uma URL base
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',  // A URL base da API (ajuste conforme necessário)
  timeout: 10000,  // Tempo limite para a requisição
});

// Adiciona o cabeçalho de autenticação (se o token estiver disponível no localStorage)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Adiciona o token ao cabeçalho da requisição
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepta respostas para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,  // Se a resposta for bem-sucedida, apenas retorna
  (error) => {
    // Trata erros globais (como resposta 401 de autenticação, etc.)
    if (error.response && error.response.status === 401) {
      // Se não estiver autenticado, talvez seja interessante redirecionar para a página de login
      console.error('Token inválido ou expirado. Redirecionando para login...');
      // Aqui, você pode redirecionar para a página de login (se estiver usando Vue Router, por exemplo)
    }
    return Promise.reject(error);  // Retorna o erro para o componente que fez a requisição
  }
);

export default api;  // Exporta a instância do axios configurada
