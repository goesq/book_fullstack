// Importa o módulo express para criar rotas
const express = require("express");

// Cria um roteador do Express
const router = express.Router();

// Importa o controlador de autenticação para manipular as requisições
const authController = require("../controllers/authController");

// Rota POST para registro de usuário
// Essa rota chama o método 'register' no authController para registrar um novo usuário
router.post("/register", authController.register);

// Rota POST para login de usuário
// Essa rota chama o método 'login' no authController para realizar o login de um usuário
router.post("/login", authController.login);

// Rota GET para verificar se o usuário existe
// Essa rota chama o método 'checkUser' no authController para verificar se um usuário existe, passando o nome de usuário na URL
router.get("/check-user/:username", authController.checkUser);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
