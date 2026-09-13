import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useFavorites } from "../context/FavoritesContext"
import EmptyState from "../components/EmptyState"

export const Favorites = () => {
  const { favoriteProducts, count } = useFavorites()

  if (count === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text">Your Favorites</h1>
        </div>

        <EmptyState
          title="No favorites yet"
          description="Save your favorite chicken products to see them here."
          actionLabel="Browse Chicken"
          onAction={() => {}}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Your Favorites</h1>
        <p className="mt-1 text-text-secondary">
          {count} saved {count === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
