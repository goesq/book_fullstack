const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Adicionando unique para evitar usuários duplicados
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // Adicionando o campo role
});

// Middleware para criptografar a senha antes de salvar
userSchema.pre("save", async function (next) {
  // Verifica se a senha foi modificada
  if (!this.isModified("password")) return next();
  
  // Gera um salt e criptografa a senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar a senha fornecida com a senha armazenada
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Exportando o modelo User
module.exports = mongoose.model("User ", userSchema);