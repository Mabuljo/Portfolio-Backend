const express = require("express");
const { setProjets, getProjets, deleteProjet } = require("../controllers/projet.controller");
const router = express.Router();


// la logique de nos routes
router.get("/", getProjets); // Route pour récupérer les projets
router.post("/", setProjets); // Route pour ajouter un projet
router.delete("/:id", deleteProjet); // Route pour supprimer un projet

module.exports = router;
