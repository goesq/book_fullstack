// Importa os módulos necessários
const express = require('express');
const Book = require('../models/Book');  // Importa o modelo Book para interação com o banco de dados
const multer = require('multer');  // Importa o multer para manipulação de uploads de arquivos
const path = require('path');  // Importa o path para trabalhar com caminhos de arquivos
const router = express.Router();  // Cria um roteador do Express para definir as rotas

// Configuração do multer para upload de imagem
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Define o diretório de destino dos arquivos (pasta "uploads")
    },
    filename: (req, file, cb) => {
        // Define o nome do arquivo como o timestamp atual concatenado com a extensão do arquivo
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Configuração do multer com filtro de tipos de arquivos permitidos
const upload = multer({
    storage,  // Usa a configuração de armazenamento definida acima
    fileFilter: (req, file, cb) => {
        // Define os tipos de arquivo permitidos (somente imagens)
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());  // Verifica a extensão
        const mimetype = fileTypes.test(file.mimetype);  // Verifica o tipo MIME do arquivo

        // Se o arquivo for uma imagem, permite o upload; caso contrário, retorna erro
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb(new Error('Apenas imagens são permitidas!'));  // Erro caso o tipo não seja permitido
        }
    }
});

router.get('/books',async(req,res)=>{
    try{
        const books = await Book.find(); // busca todos os livros com o metódo find
        res.status(200).json(books) // retorna a lista de livros
    }catch(error){
        res.status(500).json({message: 'Erro ao buscar os livros ',error}) // retorna o erro se houver
    }
    });
router.get('/:id',async(req,res)=>{
    try{
        const books = await Book.findById(req.params.id); // busca todos os livros com o metódo find
        res.status(200).json(books) // retorna a lista de livros
    }catch(error){
        res.status(500).json({message: 'Erro ao buscar os livros ',error}) // retorna o erro se houver
    }
    });

    // Exemplo de rota no backend para deletar um livro pelo ID
router.delete('/:id', async (req, res) => {
    
    
    try {
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(bookId);  // Deleta o livro pelo ID
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Livro não encontrado' });
      }
  
      res.status(200).json({ message: 'Livro excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      res.status(500).json({ message: 'Erro ao excluir livro' });
    }
  });
  

// Rota POST para criar um novo livro com upload de imagem e dados
router.post('/books', upload.single('image'), async (req, res) => {
    // Desestrutura os dados enviados no corpo da requisição (titulo, autor, ano)
    const { title, author, year } = req.body;
    // Define o caminho da imagem se o arquivo foi enviado, ou nulo caso contrário
    const image = req.file ? req.file.path : null;

    try {
        // Cria um novo livro com os dados recebidos
        const newBook = new Book({ title, author, year, image });
        // Salva o livro no banco de dados
        await newBook.save();
        // Retorna o livro criado com status 201 (Criado)
        res.status(201).json(newBook);
    } catch (error) {
        // Em caso de erro, retorna uma mensagem com o erro
        console.error(error);  // Registra o erro no console para depuração
        res.status(500).json({ message: 'Erro ao cadastrar livro', error: error.message });
    }
});

// Rota PUT para atualizar um livro com imagem e dados
router.put('/:id', upload.single('image'), async (req, res) => {
    // Desestrutura os dados enviados no corpo da requisição (titulo, autor, ano)
    const { title, author, year } = req.body;
    // Define o caminho da imagem se o arquivo foi enviado, ou nulo caso contrário
    const image = req.file ? req.file.path : null;

    try {
        // Atualiza o livro pelo ID, utilizando os dados enviados
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,  // ID do livro a ser atualizado
            { title, author, year, ...(image && { image }) },  // Atualiza imagem apenas se fornecida
            { new: true }  // Retorna o livro atualizado
        );

        // Caso o livro não seja encontrado, retorna erro 404
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Retorna o livro atualizado com status 200 (OK)
        res.status(200).json(updatedBook);
    } catch (error) {
        // Em caso de erro, retorna uma mensagem com o erro
        console.error(error);  // Registra o erro no console para depuração
        res.status(500).json({ message: 'Erro ao atualizar livro', error: error.message });
    }
});

// Middleware para captura de erro do multer
router.use((err, req, res, next) => {
    // Verifica se o erro é relacionado ao Multer (como falha no upload)
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Erro de upload: ${err.message}` });
    } else if (err) {
        // Outros erros, como erro no filtro de arquivo (imagem inválida)
        return res.status(400).json({ message: err.message });
    }
    next();  // Passa para o próximo middleware se não houver erro
});

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;
