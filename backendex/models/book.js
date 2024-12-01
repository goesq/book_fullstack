const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  image: String,  // Campo para armazenar URL da imagem
  isbn: String
});

module.exports = mongoose.model('Book', BookSchema);
