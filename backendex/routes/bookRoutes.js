const express = require('express');
const Book = require('../models/Book');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configuração do multer para upload de imagem
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb(new Error('Apenas imagens são permitidas!'));
        }
    }
});

// Rota para criar um novo livro com upload de imagem e dados
router.post('/', upload.single('image'), async (req, res) => {
    const { title, author, year } = req.body; // Campos enviados no formulário
    const image = req.file ? req.file.path : null; // Caminho da imagem salva

    try {
        const newBook = new Book({ title, author, year, image });
        await newBook.save();
        res.status(201).json(newBook); // Retorna o livro criado com sucesso
    } catch (error) {
        console.error(error); // Registra o erro no console para depuração
        res.status(500).json({ message: 'Erro ao cadastrar livro', error: error.message });
    }
});

// Rota para atualizar livro com imagem e dados
router.put('/:id', upload.single('image'), async (req, res) => {
    const { title, author, year } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, year, ...(image && { image }) }, // Só atualiza imagem se fornecida
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json(updatedBook); // Retorna o livro atualizado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar livro', error: error.message });
    }
});

// Middleware para captura de erro do multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Erro relacionado ao Multer (como falha no upload)
        return res.status(400).json({ message: `Erro de upload: ${err.message}` });
    } else if (err) {
        // Outros erros (como erro no filtro de arquivo)
        return res.status(400).json({ message: err.message });
    }
    next();
});

module.exports = router;
