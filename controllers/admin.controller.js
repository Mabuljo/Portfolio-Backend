const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config(); // Charge les variables d'environnement depuis .env

// FONCTION POUR L'AUTHENTIFICATION DE L'ADMIN
module.exports.login = (req, res) => {
  const { pseudo, password } = req.body;

  // Vérifie que le pseudo correspond à celui défini dans .env
  if (pseudo === process.env.ADMIN_PSEUDO) {
    console.log('Pseudo correct, comparaison du mot de passe');

    // Compare le mot de passe soumis avec le mot de passe haché stocké dans .env
    bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe' });
      }

      if (isMatch) {
        // Crée un token JWT
        const token = jwt.sign(
          { pseudo: pseudo }, // Payload
          process.env.JWT_SECRET, // Secret pour signer le token
          { expiresIn: '1h' } // Le token expire après 1 heure
        );
        res.status(200).json({ message: 'Authentification réussie', token: token });  // Authentification réussie, Retourne le token à l'utilisateur
      } else {
        res.status(401).json({ message: 'Pseudo ou mot de passe incorrect' }); // Pseudo ou mot de passe incorrect
      }
    });
  } else {
    res.status(401).json({ message: 'Pseudo ou mot de passe incorrect' }); // Pseudo ou mot de passe incorrect
  }
};