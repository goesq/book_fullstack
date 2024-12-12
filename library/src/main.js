import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Importa o store do Vuex
import './assets/main.css'

const app = createApp(App);

app.use(router); // Adiciona o router
app.use(store);   // Adiciona o store do Vuex

app.mount('#app'); // Monta a aplicação