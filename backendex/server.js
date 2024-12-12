const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path'); // Importa path para lidar com caminhos de arquivos
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Inicialização do app
const app = express();

// Middleware para permitir requisições de diferentes origens
app.use(cors());

// Middleware para tratar requisições com JSON
app.use(express.json());

// Conexão ao MongoDB usando as credenciais fornecidas
const mongoURI = 'mongodb+srv://victorgoes145:ionpey9hnAW9zypW@library.0gg7l.mongodb.net/?retryWrites=true&w=majority&appName=library2';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB conectado');
})
.catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1); // Finaliza o processo caso a conexão falhe
});

// Definindo o modelo de usuário
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', UserSchema);

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo');
        req.user = decoded; // Armazena as informações do usuário no request
        next(); // Se o token for válido, prossiga para a próxima função
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

// Middleware para verificar se o usuário é admin
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado. Requer permissões de administrador.' });
    }
    next(); // Se o usuário for admin, prossiga
};

// Rota de registro (sign-up)
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário
    const user = new User({ username, password: hashedPassword });
    try {
        await user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
});

// Rota de login (sign-in)
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'seu_segredo');
            return res.json({ token, role: user.role });
        }

        return res.status(401).json({ message: 'Credenciais inválidas' });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro no login', error: error.message });
    }
});

// Middleware para servir arquivos estáticos na pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importação das rotas de livros
const booksRoutes = require('./routes/bookRoutes');
app.use('/api/books', booksRoutes); // Usando as rotas de livros

// Middleware de erro para capturar erros não tratados
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra o erro no console para debugging
    res.status(500).json({ message: 'Algo deu errado!', error: err.message });
});

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
