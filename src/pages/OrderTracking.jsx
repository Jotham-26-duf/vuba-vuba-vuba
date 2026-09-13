import { useParams, Link } from "react-router-dom"
import { Package, MapPin, Calendar, Clock, Share2 } from "lucide-react"
import OrderTracker from "../components/OrderTracker"
import StatusBadge from "../components/StatusBadge"
import Rating from "../components/Rating"
import ReviewForm from "../components/ReviewForm"
import { useOrders } from "../context/OrderContext"
import { formatCurrency } from "../utils/currency"
import { formatDate } from "../components/FormatDate"

export const OrderTracking = () => {
  const { id } = useParams()
  const { getOrderById } = useOrders()
  const order = getOrderById(id)

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Order Not Found</h2>
          <p className="mt-2 text-text-secondary">
            The order you're looking for doesn't exist.
          </p>
          <Link
            to="/orders"
            className="mt-4 inline-block text-primary hover:underline"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/orders"
        className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text"
      >
        ← Back to Orders
      </Link>

      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-text">Order {order.id}</h1>
        <p className="mt-1 text-text-secondary">
          Placed on {formatDate(order.createdAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Tracking Information
            </h2>
            <OrderTracker order={order} />

            <div className="mt-6 rounded-md bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm text-blue-800">
                <strong>Real-time GPS tracking</strong> is simulated in this
                prototype. A real backend with mapping services would be needed
                for live driver location and delivery notifications.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">
                Order Items
              </h2>
              <StatusBadge status={order.status} />
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3"
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded border border-border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {item.quantity} × • {item.weight}
                    </p>
                  </div>
                  <span className="font-medium text-text">
                    {formatCurrency(item.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {order.status === "delivered" && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-text mb-4">
                Rate This Order
              </h2>
              <p className="text-sm text-text-secondary mb-4">
                How was your chicken? Share your experience.
              </p>
              <ReviewForm
                productId={order.items[0]?.productId || 1}
                onSubmit={() => {
                  alert("Review submitted (demo). Thank you!")
                }}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Order Details
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-text-secondary">Customer</span>
                <p className="font-medium text-text">{order.customerName}</p>
              </div>
              <div>
                <span className="text-sm text-text-secondary">Phone</span>
                <p className="font-medium text-text">{order.customerPhone}</p>
              </div>
              <div>
                <span className="text-sm text-text-secondary">Email</span>
                <p className="font-medium text-text">{order.customerEmail}</p>
              </div>
              <div>
                <span className="text-sm text-text-secondary">Seller</span>
                <p className="font-medium text-text">{order.sellerName}</p>
              </div>
              <div>
                <span className="text-sm text-text-secondary">Payment</span>
                <p className="font-medium text-text">{order.paymentLabel}</p>
                <span className="text-xs">
                  <StatusBadge status={order.paymentStatus} />
                </span>
              </div>
              <div>
                <span className="text-sm text-text-secondary">
                  Estimated Delivery
                </span>
                <p className="font-medium text-text">
                  {order.estimatedDelivery}
                </p>
              </div>
              {order.notes && (
                <div>
                  <span className="text-sm text-text-secondary">Notes</span>
                  <p className="font-medium text-text">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Delivery Address
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-text">{order.customerName}</p>
              <p className="text-sm text-text-secondary">
                {order.deliveryAddress.province},{" "}
                {order.deliveryAddress.district},{" "}
                {order.deliveryAddress.sector},{" "}
                {order.deliveryAddress.cell}
              </p>
              <p className="text-sm text-text-secondary">
                {order.deliveryAddress.street}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-text mb-4">
              Price Summary
            </h2>
            <div className="space-y-2 border-t border-border pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Delivery</span>
                <span className="text-text">
                  {formatCurrency(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                <span className="text-text">TOTAL</span>
                <span className="text-primary">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
