const express = require('express');
const { login } = require('../controllers/admin.controller');
const { verifyToken } = require('../middlewares/auth-token'); // Importer le middleware
const router = express.Router();

// Route pour l'authentification de l'admin
router.post('/login', login);

// Route protégée pour accéder à la page admin
router.get('/dashboard', verifyToken, (req, res) => {
    // Si le token est valide, cette route sera exécutée
    res.status(200).json({ message: 'Bienvenue sur la page admin' });
  });

module.exports = router;