import { Star, MapPin, Phone, Mail, Package } from "lucide-react"

export const SellerProfile = ({ seller }) => {
  if (!seller) {
    return (
      <div className="py-8 text-center text-text-secondary">
        Seller not found
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="relative h-32 w-full overflow-hidden rounded-lg">
        {seller.banner ? (
          <img
            src={seller.banner}
            alt={`${seller.name} banner`}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x128"
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-alt text-4xl">
            🐔
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow">
            <img
              src={seller.logo}
              alt={seller.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80"
              }}
            />
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2">
              <h1 className="text-2xl font-bold text-text">{seller.name}</h1>
              {seller.verified && (
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800"
                  title={seller.verifiedLabel}
                >
                  ✓ {seller.verifiedLabel}
                </span>
              )}
            </div>

            <p className="mb-2 text-sm text-text-secondary">
              {seller.specialization?.join(", ")}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-text">{seller.rating}</span>
                <span className="text-text-secondary">
                  ({seller.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4 text-text-secondary" />
                <span className="text-text-secondary">
                  {seller.productsCount} Products
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-text-secondary">
                  {seller.ordersCompleted} Orders Completed
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{seller.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{seller.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{seller.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <p className="text-sm text-text-secondary">{seller.description}</p>
      </div>
    </div>
  )
}

export default SellerProfile
