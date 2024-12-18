const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware pour vérifier la validité du token

module.exports.verifyToken = (req, res, next) => {
  // Chercher le token dans l'en-tête 'Authorization'
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Si le token est absent, ça renvoie une erreur 401
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé, token manquant" });
  }

  // Si le token est présent, vérifier sa validité
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérification du token
    req.user = decoded; // Ajouter les données du token dans la requête
    next(); // Passer à la prochaine étape (la route protégée)
  } catch (error) {
    res.status(401).json({ message: "Token invalide" }); // Si le token est invalide, ça renvoie une erreur 401
  }
};
