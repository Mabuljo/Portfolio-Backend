const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI); //await pour attendre que la connexion avec Mongo se fasse.
    console.log("Mongo connecté");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error.message);
    process.exit(1); // Arrête le serveur proprement en cas d'erreur de connexion
  }
};

module.exports = connectDB;
