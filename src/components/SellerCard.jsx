import { Link } from "react-router-dom"
import { Star, MapPin } from "lucide-react"

export const SellerCard = ({ seller }) => {
  return (
    <Link
      to={`/seller/${seller.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
          <img
            src={seller.logo}
            alt={seller.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/64"
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
              {seller.name}
            </h3>
            {seller.verified && (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                title={seller.verifiedLabel}
              >
                ✓
              </span>
            )}
          </div>

          <div className="mb-2 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-text-tertiary" />
            <span className="text-sm text-text-secondary">{seller.location}</span>
          </div>

          <div className="mb-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-text">{seller.rating}</span>
            <span className="text-xs text-text-secondary">
              ({seller.reviews} reviews)
            </span>
          </div>

          <p className="text-xs text-text-secondary line-clamp-2">
            {seller.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="text-text-secondary">
          {seller.productsCount} Products
        </span>
        <span className="text-text-secondary">
          {seller.ordersCompleted} Orders Completed
        </span>
      </div>
    </Link>
  )
}

export default SellerCard
