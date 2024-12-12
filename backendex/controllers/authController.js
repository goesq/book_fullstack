const User = require("../models/user"); // Ajuste o caminho conforme necessário
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Para gerar tokens JWT

// Função para registrar um novo usuário
exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Verifica se o usuário já existe
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).json({ message: "Usuário já existe." });
        }

        // Cria um novo usuário
        const newUser  = new User({
            username,
            password, // A senha será criptografada pelo middleware
            role: role || 'user' // Define o role como 'user' por padrão, se não for fornecido
        });

        await newUser .save();
        res.status(201).json({ message: "Usuário registrado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Função para autenticar um usuário
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado." });
        }

        // Verifica a senha
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Senha incorreta." });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "seu_segredo", { expiresIn: "1h" }); // Use uma chave secreta segura

        // Retorna o token e o papel do usuário
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};