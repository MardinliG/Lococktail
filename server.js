import pkg from 'pg'; // Importe le package pg
const { Pool } = pkg; // Extraction de Pool depuis l'importation par défaut

import 'dotenv/config'; // Charge les variables d'environnement
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de la connexion à PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL ||
        "postgresql://postgres:MhvcwXmKiEhZBSLsYeidywHbTYgSjFzR@interchange.proxy.rlwy.net:16547/railway",
    ssl: {
        rejectUnauthorized: false, // Utile pour Railway si besoin
    }
});
pool.connect()
    .then(() => console.log("✅ Connecté à PostgreSQL sur Railway"))
    .catch(err => console.error("❌ Erreur de connexion :", err));


// Route pour récupérer les produits
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur SQL :', err.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
    }
});


// Route pour ajouter un produit
app.post('/api/products', async (req, res) => {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
        return res.status(400).json({ error: 'Name, description, and price are required.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erreur lors de l’ajout du produit.' });
    }
});
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`🗑️ Tentative de suppression du produit ID: ${id}`);

    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        res.json({ message: "Produit supprimé avec succès", deletedProduct: result.rows[0] });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression du produit :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erreur lors de l’enregistrement de l’utilisateur.' });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
