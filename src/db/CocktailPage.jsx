import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    // Charger les produits depuis l'API
    useEffect(() => {
        console.log('📡 Chargement des produits depuis /api/products...');
        fetch('/api/products')
            .then((response) => {
                console.log('✅ Réponse reçue :', response);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('📦 Données reçues depuis /api/products :', data);
                setProducts(data);
            })
            .catch((err) => {
                console.error('❌ Erreur lors du chargement des produits :', err);
            });
    }, []);

    // Ajouter un produit
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !description || !price) {
            console.error('❌ Erreur : tous les champs sont obligatoires.');
            setError('Tous les champs sont obligatoires.');
            return;
        }

        try {
            console.log('📤 Envoi des données pour ajouter un produit...', { name, description, price });

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, price }),
            });

            console.log('✅ Réponse après ajout du produit :', response);

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const newProduct = await response.json();
            console.log('✅ Nouveau produit ajouté :', newProduct);
            setProducts([...products, newProduct]);
            setName('');
            setDescription('');
            setPrice('');
        } catch (err) {
            console.error('❌ Erreur lors de l’ajout du produit :', err);
            setError('Impossible d’ajouter le produit.');
        }
    };

    // Supprimer un produit
    const handleDeleteProduct = async (productId) => {
        console.log(`🗑️ Tentative de suppression du produit ID ${productId}...`);

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

            console.log('✅ Réponse après suppression :', response);

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            console.log(`✅ Produit ID ${productId} supprimé avec succès !`);
            setProducts(products.filter((product) => product.id !== productId));
        } catch (err) {
            console.error(`❌ Erreur lors de la suppression du produit ID ${productId} :`, err);
            setError(`Impossible de supprimer le produit ID ${productId}.`);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Gestion des Produits</h1>

            {/* Formulaire pour ajouter un produit */}
            <form onSubmit={handleAddProduct} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Nom du produit:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Prix:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{ marginLeft: '10px', padding: '5px', width: '100px' }}
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ padding: '5px 10px' }}>
                    Ajouter
                </button>
            </form>

            {/* Liste des produits */}
            <h2>Liste des Produits</h2>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <strong>{product.name}</strong> - {product.description} - ${product.price}
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                style={{ marginLeft: '10px', padding: '5px 10px', background: 'red', color: 'white' }}
                            >
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun produit ajouté pour le moment.</p>
            )}
        </div>
    );
};

export default ProductsPage;
