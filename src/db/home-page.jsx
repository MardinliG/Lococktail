import { Link } from "react-router-dom"
import { Globe, Ship, Search, Menu } from "lucide-react"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-sky-200 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-sky-600 text-white font-bold py-2 px-4 rounded">LOGO</div>
            </div>

            <div className="hidden md:flex space-x-8">
              <Link to="/register" className="text-indigo-800 font-medium hover:text-indigo-600">
                Accueil
              </Link>
              <Link to="/products" className="text-indigo-800 font-medium hover:text-indigo-600">
                Cocktails
              </Link>
              <Link to="/about" className="text-indigo-800 font-medium hover:text-indigo-600">
                À Propos
              </Link>
              <Link to="/admin/cocktails" className="text-indigo-800 font-medium hover:text-indigo-600">
                admincocktails
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-white rounded-full py-2 pl-10 pr-4 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
              <button className="md:hidden">
                <Menu size={24} className="text-indigo-800" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">CocktailWorld</h1>
            <p className="text-xl text-indigo-600 mb-2">Découvrez des Saveurs, Explorez des Possibilités!</p>
            <p className="text-gray-700 mb-8 max-w-lg">
              Explorez notre collection exclusive de cocktails artisanaux, préparés avec les meilleurs ingrédients et un
              savoir-faire inégalé.
            </p>

            <Link
              to="/products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Découvrir
            </Link>
          </div>

          <div className="relative">
            <div className="bg-sky-100 rounded-xl p-4 relative z-10">
              <img
                src=""
                alt="image a mettre tu le sais mais tu connais on sais pas trop"
                className="rounded-lg w-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-200 rounded-full z-0"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-sky-300 rounded-full z-0"></div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">Nos Avantages</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Livraison Mondiale</h3>
            <p className="text-gray-600">
              Nous livrons nos cocktails dans le monde entier, pour que vous puissiez profiter de nos créations où que
              vous soyez.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ship className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Qualité Premium</h3>
            <p className="text-gray-600">
              Nos cocktails sont préparés avec les meilleurs ingrédients et un savoir-faire artisanal pour une
              expérience gustative exceptionnelle.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Personnalisation</h3>
            <p className="text-gray-600">
              Créez votre propre cocktail sur mesure en choisissant parmi notre sélection d'ingrédients et de saveurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

