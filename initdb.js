import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement
const { Pool } = pkg;

// Connexion à PostgreSQL sur Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
      "postgresql://postgres:MhvcwXmKiEhZBSLsYeidywHbTYgSjFzR@interchange.proxy.rlwy.net:16547/railway",
  ssl: {
    rejectUnauthorized: false, // Utile pour Railway
  }
});

async function createTables() {
  try {
    console.log("🔍 Vérification et création des tables 'products' et 'users' si nécessaire...");

    const productsQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const usersQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(productsQuery);
    console.log("✅ Table 'products' prête !");

    await pool.query(usersQuery);
    console.log("✅ Table 'users' prête !");

  } catch (error) {
    console.error("❌ Erreur lors de la création des tables :", error.message);
  } finally {
    await pool.end(); // Ferme la connexion après l'exécution
    console.log("🔌 Connexion PostgreSQL fermée.");
  }
}

// Exécuter le script
createTables();
