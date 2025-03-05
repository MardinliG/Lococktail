"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const ProductsCatalog = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err)
        setError("Impossible de charger les produits.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/" className="bg-white rounded-full p-2 mr-4 shadow-md">
            <ArrowLeft size={20} className="text-indigo-600" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Nos Cocktails Premium</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 bg-sky-100 flex items-center justify-center rounded-t-xl">
                <div className="bg-sky-200 rounded-full p-4 w-40 h-40 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=120&width=120"
                    alt={product.name}
                    className="h-32 w-32 object-contain"
                  />
                </div>
              </div>

              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">{product.name}</h3>
                <Link
                  to={`/products/${product.id}`}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 mt-2"
                >
                  Voir plus
                </Link>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-600">Aucun cocktail disponible pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsCatalog

