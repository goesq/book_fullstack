const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rota POST para registro de usuário
router.post("/register", authController.register);

// Rota POST para login de usuário
router.post("/login", authController.login);

// Rota GET para verificar se o usuário existe
router.get("/check-user/:username", authController.checkUser);

module.exports = router;
