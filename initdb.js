const { Pool } = require('pg'); // Assurez-vous que `pg` est installé
const fs = require('fs');
const path = require('path');

// Configuration de la base de données
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // La base par défaut pour démarrer
  password: 'root', // Remplacez par votre mot de passe
  port: 5432,
});

const initScript = fs.readFileSync(path.join(__dirname, 'dblococktail.sql')).toString();

(async () => {
  try {
    console.log("Connexion à PostgreSQL...");
    const client = await pool.connect();

    console.log("Initialisation de la base de données...");
    await client.query(initScript); // Exécute le fichier SQL pour créer les tables et insérer les données
    console.log("Base de données initialisée avec succès.");

    client.release();
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données :", error);
  } finally {
    pool.end();
  }
})();
