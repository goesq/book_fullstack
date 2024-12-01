const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");


// Função para registrar um novo usuário
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Falha ao registrar usuário", error });
  }
};

// Função de autenticação (login)
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Credenciais incorretas" });
  }

  try {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao gerar token", error });
  }
};
