import { Link } from "react-router-dom"
import { Package, Calendar, Clock, MapPin, Phone, User } from "lucide-react"
import Rating from "./Rating"
import StatusBadge from "./StatusBadge"
import { formatCurrency } from "../utils/currency"
import { formatDate } from "./FormatDate"

export const OrderCard = ({ order, showSellerActions = false }) => {
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm font-semibold text-text">
            {order.id}
          </span>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mb-3 flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(order.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{order.estimatedDelivery}</span>
        </div>
      </div>

      <div className="mb-3 space-y-2">
        {order.items.map((item) => (
          <div key={item.productId} className="flex items-center gap-3">
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border">
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/48"
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text line-clamp-1">
                {item.name}
              </p>
              <p className="text-xs text-text-secondary">
                {item.quantity}x • {item.weight}
              </p>
            </div>
            <span className="text-sm font-medium text-text">
              {formatCurrency(item.total)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Total</span>
          <span className="text-lg font-bold text-text">
            {formatCurrency(order.total)}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <MapPin className="h-3 w-3 text-text-tertiary" />
          <span className="text-xs text-text-secondary">
            {order.deliveryAddress.district}, {order.deliveryAddress.sector}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {!showSellerActions && (
          <Link
            to={`/order/${order.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        )}
        {!showSellerActions && order.status === "delivered" && (
          <Link
            to={`/order/${order.id}#rate`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Rate Order
          </Link>
        )}
        {showSellerActions && (
          <Link
            to={`/seller/order/${order.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Manage Order
          </Link>
        )}
      </div>
    </div>
  )
}

export default OrderCard
