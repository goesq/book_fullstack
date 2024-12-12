const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo');
        req.user = decoded; // Armazena as informações do usuário no request
        next(); // Se o token for válido, prossiga para a próxima função
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

// Middleware para verificar se o usuário é admin
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado. Requer permissões de administrador.' });
    }
    next(); // Se o usuário for admin, prossiga
};

module.exports = { verifyToken, verifyAdmin };
