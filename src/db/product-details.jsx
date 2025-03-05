"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useParams, Link } from "react-router-dom"

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${id}`)

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        console.error("Erreur lors du chargement des détails du produit:", err)
        setError("Impossible de charger les détails du produit.")
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

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
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ArrowLeft size={18} className="mr-2" />
            Retour aux cocktails
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 text-white p-4">
            <h1 className="text-2xl font-bold">Détails du Cocktail</h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center bg-indigo-50 rounded-xl p-8">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt={product?.name}
                  className="max-h-80 object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-indigo-800 mb-6">{product?.name}</h2>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="bg-sky-100 p-3 font-medium">NOM</td>
                        <td className="p-3">{product?.name}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="bg-sky-100 p-3 font-medium">DESCRIPTION</td>
                        <td className="p-3">{product?.description}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="bg-sky-100 p-3 font-medium">PRIX</td>
                        <td className="p-3">{product?.price} €</td>
                      </tr>
                      <tr className="border-b">
                        <td className="bg-sky-100 p-3 font-medium">INGRÉDIENTS</td>
                        <td className="p-3">{product?.ingredients || "Non spécifié"}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="bg-sky-100 p-3 font-medium">ALCOOL</td>
                        <td className="p-3">{product?.alcohol || "Non spécifié"}</td>
                      </tr>
                      <tr>
                        <td className="bg-sky-100 p-3 font-medium">DISPONIBILITÉ</td>
                        <td className="p-3">{product?.available ? "En stock" : "Épuisé"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                    Commander
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

