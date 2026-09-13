import { useParams, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Heart, Share2, ShoppingCart, ChevronLeft } from "lucide-react"
import Rating from "../components/Rating"
import StatusBadge from "../components/StatusBadge"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import ReviewCard from "../components/ReviewCard"
import { PRODUCT_IMAGES } from "../data/images"
import { formatCurrency } from "../utils/currency"
import { getSellerById } from "../data/sellers"
import { getReviewsByProduct } from "../data/reviews"
import { getProductById } from "../data/products"

export const ProductDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const product = getProductById(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [imgError, setImgError] = useState(false)

  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Product Not Found</h2>
          <p className="mt-2 text-text-secondary">
            The chicken product you're looking for doesn't exist.
          </p>
          <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const seller = getSellerById(product.sellerId)
  const productReviews = getReviewsByProduct(product.id)

  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price

  const handleQuantityChange = (newQty) => {
    const maxStock = product.stock || 1
    const validQty = Math.max(1, Math.min(newQty, maxStock))
    setQuantity(validQty)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate("/checkout")
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image]

  const relatedProducts = PRODUCT_IMAGES.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/shop"
        className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="relative">
            {imgError ? (
              <div className="flex h-80 w-full items-center justify-center rounded-lg bg-surface-alt text-6xl">
                🐔
              </div>
            ) : (
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-80 w-full rounded-lg object-cover"
                onError={() => setImgError(true)}
              />
            )}

            {!product.available && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                <span className="text-xl font-bold text-white">
                  Out of Stock
                </span>
              </div>
            )}

            {product.freshness && (
              <span className="absolute top-3 left-3 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                {product.freshness}
              </span>
            )}

            {!product.available && (
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`absolute top-3 right-3 rounded-full p-2 ${
                  isFavorite(product.id)
                    ? "bg-accent text-white"
                    : "bg-surface-alt text-text-secondary hover:bg-accent hover:text-white"
                }`}
                aria-label="Toggle favorite"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite(product.id) ? "fill-current" : ""
                  }}`}
                />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(idx)
                    setImgError(false)
                  }}
                  className={`h-14 w-14 rounded-md border-2 object-cover ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="h-full w-full object-cover"
                    onError={() => setImgError(true)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-text">{product.name}</h1>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`rounded-full p-2 transition-colors ${
                isFavorite(product.id)
                  ? "bg-accent/10 text-accent"
                  : "text-text-tertiary hover:bg-surface-alt hover:text-accent"
              }`}
              aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite(product.id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          <Rating
            rating={product.rating}
            reviews={product.reviews}
            size="md"
          />

          <div className="mt-4 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-text">
                {formatCurrency(product.price)}
              </span>
              {product.discount && (
                <>
                  <span className="text-lg text-text-tertiary line-through">
                    {formatCurrency(discountedPrice)}
                  </span>
                  <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {product.discount}% off
                  </span>
                </>
              )}
              <span className="text-sm text-text-secondary">
                / {product.unit}
              </span>
            </div>

            <p className="text-sm text-text-secondary">
              {product.unitLabel}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-xs text-text-tertiary">Weight</span>
                <p className="font-medium text-text">{product.weight}</p>
              </div>
              <div>
                <span className="text-xs text-text-tertiary">Category</span>
                <p className="font-medium text-text">{product.category}</p>
              </div>
              <div>
                <span className="text-xs text-text-tertiary">Type</span>
                <p className="font-medium text-text">{product.type}</p>
              </div>
              <div>
                <span className="text-xs text-text-tertiary">Stock</span>
                <p className="font-medium text-text">
                  {product.stock} {product.unit}
                </p>
              </div>
            </div>
          </div>

          {product.freshness && (
            <div className="mt-4 rounded-md bg-green-50 border border-green-200 p-3">
              <p className="text-xs text-green-800">
                <strong>Freshness:</strong> {product.freshness}
              </p>
              <p className="text-xs text-green-800">
                <strong>Storage:</strong> {product.storageInfo}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-text">Quantity:</label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="rounded-md border border-border px-2 py-1 text-sm text-text-secondary hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium text-text">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= (product.stock || 1)}
                  className="rounded-md border border-border px-2 py-1 text-sm text-text-secondary hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.available || product.stock === 0}
                className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4 inline mr-1" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.available || product.stock === 0}
                className="flex-1 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
          </div>

          {seller && (
            <div className="mt-6 rounded-lg border border-border bg-surface-alt p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                  <img
                    src={seller.logo}
                    alt={seller.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/seller/${seller.slug}`}
                      className="font-medium text-text hover:text-primary"
                    >
                      {seller.name}
                    </Link>
                    {seller.verified && (
                      <span
                        className="text-xs text-green-600"
                        title={seller.verifiedLabel}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <Rating
                    rating={seller.rating}
                    reviews={seller.reviews}
                    size="sm"
                  />
                </div>
              </div>
              <div className="mt-2">
                <StatusBadge status={seller.verified ? "paid" : "pending"} />
              </div>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert("Link copied!")
              }}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text"
            >
              <Share2 className="h-4 w-4" />
              Share this product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-text">Product Details</h2>
        <p className="mt-4 text-text-secondary">{product.description}</p>

        {product.preparationStatus && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-text">Preparation Status</h3>
            <p className="mt-1 text-sm text-text-secondary">
              {product.preparationStatus}
            </p>
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-text">Customer Reviews</h2>
        <div className="mt-6 space-y-4">
          {productReviews.length > 0 ? (
            productReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <p className="text-text-secondary">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
