import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import Rating from "./Rating"

export const ProductCard = ({ product, compact = false }) => {
  const [imgError, setImgError] = useState(false)
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.available || product.stock === 0) return
    addToCart(product, 1)
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative">
        <div className={`overflow-hidden rounded-t-xl ${compact ? "h-32" : "h-48"}`}>
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center bg-surface-alt text-4xl">
              🐔
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {!product.available ? (
          <span className="absolute top-2 right-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
            Out of Stock
          </span>
        ) : product.stock <= 5 ? (
          <span className="absolute top-2 right-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Only {product.stock} left
          </span>
        ) : null}

        {product.freshness && (
          <span className="absolute top-2 left-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            Fresh
          </span>
        )}
      </div>

      <div className={`p-4 ${compact ? "pb-3" : "pb-4"}`}>
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-text line-clamp-1">{product.name}</h3>
          <button
            onClick={handleToggleFavorite}
            className={`rounded-full p-1.5 transition-colors ${
              isFavorite(product.id)
                ? "bg-accent/10 text-accent"
                : "text-text-tertiary hover:bg-surface-alt hover:text-accent"
            }`}
            aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite(product.id) ? "fill-current" : ""
              }`}
            />
          </button>
        </div>

        <div className="mb-2 space-y-0.5">
          <p className="text-xs text-text-secondary">{product.unitLabel || product.unit}</p>
          <p className="text-xs text-text-secondary">Weight: {product.weight}</p>
        </div>

        <Rating rating={product.rating} reviews={product.reviews} size="sm" showReviews={!compact} />

        <div className="mt-3 mb-2 flex items-center gap-2">
          <span className="text-lg font-bold text-text">RWF {product.price.toLocaleString()}</span>
          {product.unit && (
            <span className="text-xs text-text-secondary">/{product.unit}</span>
          )}
        </div>

        <p className="mb-2 text-xs text-text-secondary line-clamp-1">
          {product.sellerName} • {product.location}
        </p>

        <div className="mt-3 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.available || product.stock === 0}
            className={`flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <ShoppingCart className="h-4 w-4 inline mr-1" />
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="rounded-md border border-border bg-surface-alt px-3 py-2 text-sm font-medium text-text-secondary hover:bg-primary hover:text-white"
            aria-label="View product details"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
