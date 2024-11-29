const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  image: String  // Campo para armazenar URL da imagem
});

module.exports = mongoose.model('Book', BookSchema);
