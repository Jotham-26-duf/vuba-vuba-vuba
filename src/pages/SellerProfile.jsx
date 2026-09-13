import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import SellerProfileComponent from "../components/SellerProfile"
import ProductCard from "../components/ProductCard"
import Rating from "../components/Rating"
import ReviewCard from "../components/ReviewCard"
import { getSellerBySlug } from "../data/sellers"
import { getReviewsBySeller } from "../data/reviews"
import { products } from "../data/products"

export const SellerProfilePage = () => {
  const { slug } = useParams()
  const seller = getSellerBySlug(slug)
  const [activeTab, setActiveTab] = useState("products")

  if (!seller) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Seller Not Found</h2>
          <p className="mt-2 text-text-secondary">
            The seller you're looking for doesn't exist.
          </p>
          <Link to="/sellers" className="mt-4 inline-block text-primary hover:underline">
            ← Back to Sellers
          </Link>
        </div>
      </div>
    )
  }

  const sellerProducts = products.filter((p) => p.sellerId === seller.id)
  const sellerReviews = getReviewsBySeller(seller.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/sellers"
        className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text"
      >
        ← Back to Sellers
      </Link>

      <div className="mt-4">
        <SellerProfileComponent seller={seller} />
      </div>

      <div className="mt-8">
        <div className="border-b border-border">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === "products"
                  ? "border-b-2 border-primary text-primary"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              Products ({sellerProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === "reviews"
                  ? "border-b-2 border-primary text-primary"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              Reviews ({sellerReviews.length})
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === "products" && (
            <div>
              {sellerProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sellerProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary">No products available.</p>
              )}
            </div>
          )}
          {activeTab === "reviews" && (
            <div>
              {sellerReviews.length > 0 ? (
                <div className="space-y-4">
                  {sellerReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerProfilePage
