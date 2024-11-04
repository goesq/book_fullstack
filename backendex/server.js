const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config() // Carrega as variaveis do arquivo venv
// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());
 
// Conexão ao MongoDB
mongoose.connect('mongodb+srv://victorgoes145:ionpey9hnAW9zypW@library.0gg7l.mongodb.net/?retryWrites=true&w=majority&appName=library2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));
 
// Importação das rotas
const booksRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)
app.use('/api/books', booksRoutes)


 
// Definir a porta do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
});