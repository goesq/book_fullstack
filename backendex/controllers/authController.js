const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Função de registro
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Erro no registro", error });
  }
};

// Função de login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Credenciais inválidas" });
  }
  try {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro no registro", error });

  }
};