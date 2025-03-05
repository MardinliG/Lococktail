import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./db/home-page.jsx"
import CocktailPage from "./db/CocktailPage.jsx"
import ProductsCatalog from "./db/products-catalog.jsx"
import ProductDetails from "./db/product-details.jsx"
import RegisterPage from "./db/register-page.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/cocktails" element={<CocktailPage />} />
        <Route path="/products" element={<ProductsCatalog />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App

