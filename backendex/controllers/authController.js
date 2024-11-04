const User = require("../models/user");
   const jwt = require("jsonwebtoken");
   const bcrypt = require("bcryptjs");

   // Função de registro
   exports.register = async (req, res) => {
     try {
       const { name, email, password } = req.body;
       const user = new User({ name, email, password });
       await user.save();
       res.status(201).json({ message: "Usuário registrado com sucesso!" });
     } catch (error) {
       res.status(500).json({ message: "Erro no registro", error });
     }
   };

   // Função de login
   exports.login = async (req, res) => {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user || !(await bcrypt.compare(password, user.password))) {
       return res.status(400).json({ message: "Credenciais inválidas" });
     }
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
     res.json({ token });
   };