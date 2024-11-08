import { createApp } from 'vue';
import App from './App.vue';
import router from '../router'; // Certifique-se de que o caminho está correto


import './assets/css/main.css';
import './assets/css/styles.css';
const app = createApp(App); // Cria a instância do aplicativo
app.use(router); // Usa o roteador
app.mount('#app'); // Monta o aplicativo na div com id "app"
