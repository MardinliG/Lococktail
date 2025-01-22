import { exec } from 'child_process';
import { promisify } from 'util';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

const execAsync = promisify(exec); // Pour utiliser exec avec des Promises
const { Pool } = pkg;

// Variables d'environnement pour PostgreSQL
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'sql';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_DATABASE = process.env.DB_DATABASE || 'dbcocktail';
const SQL_FILE_PATH = './dblococktail.sql'; // Chemin vers votre fichier SQL

// Connexion au serveur PostgreSQL
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: 'postgres', // Connexion initiale à la base "postgres"
});

async function initializeDatabase() {
  try {
    // Vérifier si la base de données existe déjà
    console.log(`Vérification de l'existence de la base de données "${DB_DATABASE}"...`);
    const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname = '${DB_DATABASE}';`;
    const result = await pool.query(checkDbQuery);

    if (result.rows.length > 0) {
      console.log(`La base de données "${DB_DATABASE}" existe déjà. Aucune action nécessaire.`);
    } else {
      // Créer la base de données
      console.log(`Création de la base de données "${DB_DATABASE}"...`);
      await pool.query(`CREATE DATABASE ${DB_DATABASE};`);
      console.log(`Base de données "${DB_DATABASE}" créée avec succès.`);
    }

    // Importer le fichier SQL
    console.log(`Importation du fichier SQL "${SQL_FILE_PATH}" dans la base de données "${DB_DATABASE}"...`);
    const importCommand = `psql -U ${DB_USER} -d ${DB_DATABASE} -f "${SQL_FILE_PATH}"`;
    const { stdout, stderr } = await execAsync(importCommand);

    console.log(stdout);
    if (stderr) console.error('stderr :', stderr);

    console.log('Importation des données terminée avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données :', error.message);
  } finally {
    // Fermer la connexion à PostgreSQL
    await pool.end();
    console.log('Connexion au serveur PostgreSQL fermée.');
  }
}

// Exécuter le script
initializeDatabase();
