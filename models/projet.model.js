const mongoose = require("mongoose");

// Définition du schéma pour un projet
const projetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  description: {
    type: [String], // Tableau de chaînes de caractères
    required: true,
  },
  technologies: {
    type: [String], // Tableau de chaînes de caractères
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: false, // Le champ site est optionnel
  },
});

// Création du modèle Project
const Projet = mongoose.model("Projet", projetSchema);

module.exports = Projet;
