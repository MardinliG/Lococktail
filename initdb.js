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

async function createTable() {
  try {
    console.log("🔍 Vérification et création de la table 'products' si nécessaire...");

    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(query);
    console.log("✅ Table 'products' prête !");
  } catch (error) {
    console.error("❌ Erreur lors de la création de la table :", error.message);
  } finally {
    await pool.end(); // Ferme la connexion après l'exécution
    console.log("🔌 Connexion PostgreSQL fermée.");
  }
}

// Exécuter le script
createTable();
