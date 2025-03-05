"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus, Edit, Trash, ArrowLeft, Search } from "lucide-react"

const CocktailPage = () => {
  // États pour la liste et le formulaire d'ajout
  const [cocktails, setCocktails] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // États pour le formulaire d'ajout (on reprend la logique de ProductsPage)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  // Chargement des cocktails depuis l'API
  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }
        const data = await response.json()
        setCocktails(data)
      } catch (err) {
        console.error("Erreur lors du chargement des cocktails:", err)
        setError("Impossible de charger les cocktails.")
      } finally {
        setLoading(false)
      }
    }
    fetchCocktails()
  }, [])

  // Ajouter un cocktail via un formulaire
  const handleAddCocktail = async (e) => {
    e.preventDefault()
    setError("")

    if (!name || !description || !price) {
      setError("Tous les champs sont obligatoires.")
      return
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price }),
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }

      const newCocktail = await response.json()
      // On suppose que le back renvoie { cocktail: {…} }
      setCocktails([...cocktails, newCocktail.cocktail || newCocktail])
      setName("")
      setDescription("")
      setPrice("")
    } catch (err) {
      console.error("Erreur lors de l’ajout du cocktail :", err)
      setError("Impossible d’ajouter le cocktail.")
    }
  }

  // Supprimer un cocktail
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cocktail ?")) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }

        setCocktails(cocktails.filter((cocktail) => cocktail.id !== id))
      } catch (err) {
        console.error("Erreur lors de la suppression du cocktail:", err)
        alert("Impossible de supprimer le cocktail.")
      }
    }
  }

  // Filtrer les cocktails en fonction de la recherche
  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-100 flex items-center justify-center">
        <div className="text-indigo-600 text-xl">Chargement...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-indigo-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-sky-100">
      <div className="container mx-auto px-4 py-8">
        {/* Lien retour et titre */}
        <div className="mb-6 flex items-center">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mr-4">
            <ArrowLeft size={18} className="mr-2" />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold text-indigo-800">Administration des Cocktails</h1>
        </div>

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-indigo-600 text-white p-4">
            <h2 className="text-xl font-bold">Ajouter un Cocktail</h2>
          </div>
          <div className="p-4">
            {error && <p className="mb-4 text-red-600">{error}</p>}
            <form onSubmit={handleAddCocktail} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Nom du cocktail :</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex. Mojito"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description :</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex. Un cocktail rafraîchissant..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Prix :</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ex. 12"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Plus size={18} className="mr-2" /> Ajouter le cocktail
              </button>
            </form>
          </div>
        </div>

        {/* Liste des cocktails */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Liste des Cocktails</h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Rechercher un cocktail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-indigo-100 text-indigo-800">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Nom</th>
                  <th className="py-3 px-4 text-left">Prix</th>
                  <th className="py-3 px-4 text-left">Disponibilité</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCocktails.length > 0 ? (
                  filteredCocktails.map((cocktail) => (
                    <tr key={cocktail.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{cocktail.id}</td>
                      <td className="py-3 px-4 font-medium">{cocktail.name}</td>
                      <td className="py-3 px-4">{cocktail.price} €</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            cocktail.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {cocktail.available ? "Disponible" : "Indisponible"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/cocktails/edit/${cocktail.id}`}
                            className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 p-2 rounded-lg transition-colors duration-200"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(cocktail.id)}
                            className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-lg transition-colors duration-200"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                      {searchTerm ? "Aucun cocktail ne correspond à votre recherche." : "Aucun cocktail disponible."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CocktailPage
