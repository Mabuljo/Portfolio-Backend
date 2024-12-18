// variables
const express = require("express"); // variable qui permet d'appeler la biblio Express
const connectDB = require("./config/db"); 
const dotenv = require("dotenv").config();
const cors = require('cors'); 
const app = express(); // variable qui, lorsqu'on codera app.get app.use etc, ira chercher les fonctions dans la biblio express
const path = require('path'); // pour utiliser 'path'
const port = process.env.PORT || 5000;  // Utiliser le port défini par l'environnement, sinon 5000 en local

// Connexion à la DB
connectDB();

// Middleware : permet de traiter les données de "req"= la requête. C'est une fonction qui intervient entre la requête et la réponse dans le cycle de vie d'une requête HTTP.
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors()); // permet d'autoriser le frontend à faire des requêtes à l'API

// Routes
app.use("/api/projets", require("./routes/projet.routes")); // Routes pour les projets
app.use("/api/admin", require("./routes/admin.routes"));  // Routes pour l'administration

// pour lancer le server
app.listen(port, () => console.log("Le serveur a démarré au port " + port));