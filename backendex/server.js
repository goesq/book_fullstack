const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

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

// Definindo o modelo de usuário
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User ', UserSchema);

// Rota de registro
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário já existe
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

// Rota de login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'seu_segredo'); // Use um segredo forte
        return res.json({ token, role: user.role });
    }
    return res.status(401).json({ message: 'Credenciais inválidas' });
});

// Importação das rotas
const booksRoutes = require('./routes/bookRoutes');
app.use('/api/books', booksRoutes);

// Definir a porta do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});