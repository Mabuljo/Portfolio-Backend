const ProjetModel = require("../models/projet.model");

//POUR RECUPERER LES PROJETS DE L'API
module.exports.getProjets = async (req, res) => {
    try {
      const projets = await ProjetModel.find(); // Récupérer tous les projets de la base de données
      res.status(200).json(projets); // Retourner les projets

    } catch (error) {
      // Gérer les erreurs en cas de problème avec la base de données
      res.status(500).json({
        message: "Erreur lors de la récupération des projets",
        error: error.message,
      });
    }
  };

// POUR AJOUTER UN PROJET
module.exports.setProjets = async (req, res) => {
  // Variable regroupant tous les champs
  const { title, cover, description, technologies, github, site } = req.body;

  // Vérifier si tous les champs nécessaires sont présents et si le projet existe
  if (!title || !cover || !description ||!Array.isArray(description) || description.length === 0 || !technologies || !Array.isArray(technologies) || technologies.length === 0 || !github) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Créer un nouveau projet avec les données de la requête
    const projet = await ProjetModel.create({
      title,
      cover,
      description,
      technologies,
      github,
      site, // "site" peut être omis si non présent dans la requête
    });
    return res.status(201).json(projet); // Retourner le projet créé

  } catch (error) {
    // En cas d'erreur, retourner un message d'erreur
    return res.status(500).json({
        message: "Erreur lors de la création du projet",
        error: error.message,
      });
  }
};

// POUR SUPPRIMER UN PROJET
module.exports.deleteProjet = async (req, res) => {
    try {
      const projetId = req.params.id; // Récupérer l'ID du projet
  
      const projet = await ProjetModel.findById(projetId); // Rechercher le projet par son id
  
      // Vérifier si le projet existe
      if (!projet) {
        return res.status(404).json({ message: "Projet non trouvé" });
      }
  
      // Supprimer le projet
      await ProjetModel.deleteOne({ _id: projetId });
      res.status(200).json({ message: `Projet supprimé avec succès, id: ${projetId}` }); // Réponse après suppression
      
    } catch (error) {
      // Gestion des erreurs serveur
      res.status(500).json({ message: "Erreur lors de la suppression du projet", error: error.message });
    }
  };
  